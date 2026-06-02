'use client'

import { InlineWidget, useCalendlyEventListener } from 'react-calendly'
import { trackMeetingBooked, trackCtaClicked } from '@/lib/analytics'

const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL ?? ''

// pageSettings apply only on paid Calendly plans.
// The wrapper in book-section.tsx applies invert(1) hue-rotate(180deg) at the
// display layer so the widget looks dark regardless of plan.
// These values are left as defaults so they don't fight the CSS filter.
const PAGE_SETTINGS = {
  hideEventTypeDetails: false,
  hideLandingPageDetails: false,
}

export function CalendlyWidget() {
  // useCalendlyEventListener listens to postMessage events from Calendly's iframe.
  // Calendly sends a message when the user completes a booking.
  useCalendlyEventListener({
    onEventScheduled: (e) => {
      const payload = e.data.payload as {
        event?: { start_time?: string }
        event_type?: { name?: string }
        invitee?: { email?: string }
      }

      trackMeetingBooked({
        event_name:    payload.event_type?.name ?? '30min Interview',
        invitee_email: payload.invitee?.email,
        scheduled_at:  payload.event?.start_time,
      })
    },
    onDateAndTimeSelected: () => {
      trackCtaClicked('Calendly time slot selected', 'book_section', CALENDLY_URL)
    },
  })

  if (!CALENDLY_URL) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: 'var(--fg-2)', fontSize: '14px' }}>
        Calendly not configured. Add NEXT_PUBLIC_CALENDLY_URL to .env.local
      </div>
    )
  }

  return (
    <InlineWidget
      url={CALENDLY_URL}
      pageSettings={PAGE_SETTINGS}
      styles={{ height: '680px', minWidth: '320px' }}
    />
  )
}
