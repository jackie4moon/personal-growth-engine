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

  const handleConsentUpdate = (e: Event) => {
    const detail = (e as CustomEvent<{ accepted: string[]; rejected: string[] }>).detail
    if (!detail) return

    const analyticsAccepted = detail.accepted?.includes('analytics') ?? false
    const adAccepted = detail.accepted?.includes('advertisement') ?? false

    // Update GTM Consent Mode first (affects Google tags inside GTM)
    updateGtmConsent({ analytics: analyticsAccepted, advertisement: adAccepted })

    // Then update RudderStack gate (affects our CDP + all RudderStack destinations)
    if (analyticsAccepted && !_consentGranted) {
      setConsent(true)
    }
  }

  window.addEventListener('cookieyes-consent-update', handleConsentUpdate)
}

// ---------------------------------------------------------------------------
// RudderStack initialization — lazy, only after consent
// ---------------------------------------------------------------------------
async function initRudderStack(): Promise<void> {
  if (typeof window === 'undefined' || _rs) return

  const writeKey = process.env.NEXT_PUBLIC_RUDDERSTACK_WRITE_KEY
  const dataPlaneUrl = process.env.NEXT_PUBLIC_RUDDERSTACK_DATA_PLANE_URL

  if (!writeKey || !dataPlaneUrl) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(
        '[Analytics] RudderStack not configured. ' +
          'Add NEXT_PUBLIC_RUDDERSTACK_WRITE_KEY and NEXT_PUBLIC_RUDDERSTACK_DATA_PLANE_URL to .env.local'
      )
    }
    return
  }

  const { RudderAnalytics } = await import('@rudderstack/analytics-js')
  const analytics = new RudderAnalytics()
  analytics.load(writeKey, dataPlaneUrl)
  _rs = analytics
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
  if (!_consentGranted || typeof window === 'undefined') return
  pushToDataLayer(event, properties)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  _rs?.track(event, properties)
}

// ---------------------------------------------------------------------------
// Typed event helpers — one function per event schema
// ---------------------------------------------------------------------------

export function trackPageView(): void {
  if (!_consentGranted || typeof window === 'undefined') return
  const properties = {
    page_title: document.title,
    page_url: window.location.href,
    referrer: document.referrer,
  }
  pushToDataLayer('page_view', properties)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  _rs?.page(properties)
}

export function trackSectionViewed(sectionName: string, timeOnPage: number): void {
  trackEvent('section_viewed', {
    section_name: sectionName,
    time_on_page: timeOnPage,
  })
}

export function trackCtaClicked(
  buttonLabel: string,
  buttonLocation: string,
  destinationUrl: string
): void {
  trackEvent('cta_clicked', {
    button_label: buttonLabel,
    button_location: buttonLocation,
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
