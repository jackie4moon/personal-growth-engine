// Central analytics module — import only in Client Components or other client-side code

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[]
    // gtag is provided by GTM after it loads; defined here so TypeScript knows it exists
    gtag?: (...args: unknown[]) => void
  }
}

// Module-level RudderStack instance — avoids conflicts with SDK's own global types
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let _rs: any = null

// ---------------------------------------------------------------------------
// Consent state
// ---------------------------------------------------------------------------
let _consentGranted = false

export function setConsent(granted: boolean): void {
  _consentGranted = granted
  if (granted) void initRudderStack()
}

export function getConsent(): boolean {
  return _consentGranted
}

// ---------------------------------------------------------------------------
// GTM Consent Mode v2 update
// Tells GTM (and therefore GA4, Google Ads etc.) that the user has consented.
// This is separate from RudderStack consent and required for Google's ecosystem.
// ---------------------------------------------------------------------------
function updateGtmConsent(categories: { analytics: boolean; advertisement: boolean }): void {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer || []

  const push = (...args: unknown[]) => window.dataLayer.push(args as unknown as Record<string, unknown>)

  push('consent', 'update', {
    analytics_storage: categories.analytics ? 'granted' : 'denied',
    ad_storage: categories.advertisement ? 'granted' : 'denied',
    ad_user_data: categories.advertisement ? 'granted' : 'denied',
    ad_personalization: categories.advertisement ? 'granted' : 'denied',
    functionality_storage: 'granted',
  })
}

// ---------------------------------------------------------------------------
// CookieYes Consent Listener
// CookieYes fires 'cookieyes-consent-update' on every consent interaction AND
// on page load for returning visitors (reading stored consent from localStorage).
// Call this once from AnalyticsProvider on mount.
// ---------------------------------------------------------------------------
export function initConsentListeners(): void {
  if (typeof window === 'undefined') return

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleConsentUpdate = (e: Event) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const detail = (e as CustomEvent<any>).detail
    console.debug('[Analytics] CookieYes event fired:', e.type, detail)
    if (!detail) return

    // CookieYes payload shapes have varied across versions. Support all known forms:
    //   v1: { accepted: ['analytics', ...], rejected: [...] }
    //   v2: { categories: { analytics: true, advertisement: false, ... } }
    let analyticsAccepted = false
    let adAccepted = false

    if (Array.isArray(detail.accepted)) {
      analyticsAccepted = detail.accepted.includes('analytics')
      adAccepted = detail.accepted.includes('advertisement') || detail.accepted.includes('marketing')
    } else if (detail.categories && typeof detail.categories === 'object') {
      analyticsAccepted = !!detail.categories.analytics
      adAccepted = !!(detail.categories.advertisement || detail.categories.marketing)
    }

    console.debug('[Analytics] Consent parsed:', { analyticsAccepted, adAccepted })

    // Update GTM Consent Mode first (affects Google tags inside GTM)
    updateGtmConsent({ analytics: analyticsAccepted, advertisement: adAccepted })

    // Then update RudderStack gate (affects our CDP + all RudderStack destinations)
    if (analyticsAccepted && !_consentGranted) {
      console.debug('[Analytics] Granting consent → loading RudderStack')
      setConsent(true)
      // Replay the initial page_view that was missed before consent was granted
      trackPageView()
    }
  }

  // Listen for ALL known CookieYes event name variants
  const eventNames = [
    'cookieyes_consent_update',  // underscore — current CookieYes versions
    'cookieyes-consent-update',  // hyphen — older versions / fallback
    'cookieyes_consent_renew',   // when user changes consent later
  ]
  eventNames.forEach((name) => {
    document.addEventListener(name, handleConsentUpdate)
    window.addEventListener(name, handleConsentUpdate)
  })

  console.debug('[Analytics] Consent listeners registered for:', eventNames)

  // Read stored consent on first load (returning visitors who already accepted).
  // CookieYes exposes a getCkyConsent() function once its script is loaded.
  const readStoredConsent = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const getCky = (window as any).getCkyConsent
    if (typeof getCky !== 'function') return false
    try {
      const stored = getCky()
      console.debug('[Analytics] Stored CookieYes consent:', stored)
      if (stored?.categories?.analytics) {
        handleConsentUpdate(
          new CustomEvent('cookieyes_consent_update', { detail: stored })
        )
        return true
      }
    } catch (err) {
      console.debug('[Analytics] readStoredConsent error:', err)
    }
    return false
  }

  // Try immediately; if CookieYes hasn't loaded yet, retry every 300ms for up to 5s.
  if (!readStoredConsent()) {
    let attempts = 0
    const interval = setInterval(() => {
      attempts++
      if (readStoredConsent() || attempts > 16) {
        clearInterval(interval)
      }
    }, 300)
  }
}

// ---------------------------------------------------------------------------
// RudderStack initialization — lazy, only after consent
// ---------------------------------------------------------------------------
async function initRudderStack(): Promise<void> {
  if (typeof window === 'undefined' || _rs) return

  const writeKey = process.env.NEXT_PUBLIC_RUDDERSTACK_WRITE_KEY
  const dataPlaneUrl = process.env.NEXT_PUBLIC_RUDDERSTACK_DATA_PLANE_URL

  if (!writeKey || !dataPlaneUrl) {
    console.warn(
      '[Analytics] RudderStack not configured. ' +
        'NEXT_PUBLIC_RUDDERSTACK_WRITE_KEY or NEXT_PUBLIC_RUDDERSTACK_DATA_PLANE_URL missing.'
    )
    return
  }

  console.debug('[Analytics] Loading RudderStack SDK with key', writeKey.slice(0, 6) + '...')
  const { RudderAnalytics } = await import('@rudderstack/analytics-js')
  const analytics = new RudderAnalytics()
  analytics.load(writeKey, dataPlaneUrl)
  _rs = analytics
  console.debug('[Analytics] RudderStack SDK ready')
}

// ---------------------------------------------------------------------------
// DataLayer helper
//
// The GTM DataLayer is a JavaScript array that acts as an event bus between
// your website and GTM. GTM reads from it to trigger tags (HubSpot pixel,
// LinkedIn, etc.) without you needing to hardcode those tags.
// ---------------------------------------------------------------------------
function pushToDataLayer(event: string, properties: Record<string, unknown>): void {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event, ...properties })
}

// ---------------------------------------------------------------------------
// Core event helper — use this everywhere instead of calling RudderStack directly
// ---------------------------------------------------------------------------
export function trackEvent(event: string, properties: Record<string, unknown> = {}): void {
  if (typeof window === 'undefined') return
  if (!_consentGranted) {
    console.debug('[Analytics] trackEvent blocked (no consent):', event)
    return
  }
  console.debug('[Analytics] trackEvent:', event, properties)
  pushToDataLayer(event, properties)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  _rs?.track(event, properties)
}

// ---------------------------------------------------------------------------
// Typed event helpers — one function per event schema
// ---------------------------------------------------------------------------

export function trackPageView(): void {
  if (typeof window === 'undefined') return
  if (!_consentGranted) {
    console.debug('[Analytics] page_view blocked (no consent yet)')
    return
  }
  const properties = {
    page_title: document.title,
    page_url: window.location.href,
    referrer: document.referrer,
  }
  console.debug('[Analytics] page_view:', properties.page_url)
  pushToDataLayer('page_view', properties)
  // .page() — for HubSpot, segment-style destinations, GA4 page tracking
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  _rs?.page(properties)
  // .track('page_view') — ensures GA4 BigQuery export receives it as a discoverable event
  // (RudderStack→GA4 Measurement Protocol does not always forward .page() calls as page_view)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  _rs?.track('page_view', properties)
}

export function trackSectionViewed(sectionName: string, timeOnPage: number): void {
  trackEvent('section_viewed', {
    section_name: sectionName,
    time_on_page: timeOnPage,
  })
}

export function trackCtaClicked(
  ctaLabel: string,
  ctaLocation: string,
  destinationUrl: string
): void {
  trackEvent('cta_clicked', {
    cta_label: ctaLabel,
    cta_location: ctaLocation,
    destination_url: destinationUrl,
  })
}

export function trackContactFormSubmitted(data: {
  form_name: string
  recruiter_email?: string
  recruiter_company?: string
  recruiter_message?: string
}): void {
  trackEvent('contact_form_submitted', data as Record<string, unknown>)
}

export function trackCalendlyBookingInitiated(buttonLocation: string): void {
  trackEvent('calendly_booking_initiated', {
    button_location: buttonLocation,
  })
}

// Fires when the Calendly booking is actually confirmed (meeting scheduled)
export function trackMeetingBooked(data: {
  event_name: string
  invitee_email?: string
  scheduled_at?: string
}): void {
  trackEvent('meeting_booked', data as Record<string, unknown>)
}
