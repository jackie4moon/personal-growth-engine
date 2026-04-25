// Central analytics module — import only in Client Components or other client-side code

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[]
  }
}

// Module-level instance avoids conflicts with RudderStack's own global type declarations
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let _rs: any = null

// ---------------------------------------------------------------------------
// Consent state
// TODO: Connect to Cookie Consent Banner (Phase 2)
// The banner should call setConsent(true) when the user accepts tracking.
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
// RudderStack initialization
// Loads the SDK lazily after consent is granted.
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
// your website and GTM. GTM listens to it and triggers tags when events arrive.
// We push every event here so GTM tags (HubSpot pixel, Clarity, etc.) can also
// react — without needing to know about RudderStack internals.
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
  // RudderStack page() call maps to a Page event in GA4 and HubSpot
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
