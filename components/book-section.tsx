'use client'

import dynamic from 'next/dynamic'
import { trackCtaClicked } from '@/lib/analytics'

// Calendly widget is loaded dynamically (client-only) because it depends on
// window.postMessage and the Calendly iframe — no server-side rendering needed.
const CalendlyWidget = dynamic(
  () => import('@/components/calendly-widget').then((m) => m.CalendlyWidget),
  { ssr: false, loading: () => <CalendlyPlaceholder /> }
)

function CalendlyPlaceholder() {
  return (
    <div
      style={{
        height: '680px',
        background: 'var(--bg-subtle)',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--fg-2)',
        fontSize: '14px',
      }}
    >
      Loading calendar…
    </div>
  )
}

export function BookSection() {
  return (
    <section
      id="book"
      style={{
        padding: '96px 40px',
        maxWidth: '1100px',
        margin: '0 auto',
        borderTop: '1px solid oklch(28% 0 0)',
      }}
    >
      {/* Label */}
      <div
        style={{
          fontFamily: 'var(--font-mono), JetBrains Mono, monospace',
          fontSize: '11px',
          color: 'var(--brand)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          marginBottom: '16px',
        }}
      >
        Book a call
      </div>

      {/* Headline + subtext */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          gap: '40px',
          marginBottom: '48px',
          flexWrap: 'wrap',
        }}
      >
        <h2
          style={{
            fontFamily: 'var(--font-display), Space Grotesk, sans-serif',
            fontSize: 'clamp(24px, 3.5vw, 36px)',
            fontWeight: 600,
            letterSpacing: '-0.03em',
            color: 'var(--fg)',
            lineHeight: 1.2,
          }}
        >
          30 minutes. No pitch.<br />
          <span style={{ color: 'var(--brand)' }}>Just a real conversation.</span>
        </h2>
        <p
          style={{
            fontSize: '14px',
            color: 'var(--fg-2)',
            lineHeight: 1.65,
            maxWidth: '360px',
            flexShrink: 0,
          }}
        >
          Pick a slot directly — no back-and-forth on email. I block time for
          first conversations every Tuesday and Thursday morning.
        </p>
      </div>

      {/* Calendly inline widget */}
      <div
        onClick={() => trackCtaClicked('Calendly widget interaction', 'book_section', process.env.NEXT_PUBLIC_CALENDLY_URL ?? '')}
        style={{ borderRadius: '12px', overflow: 'hidden' }}
      >
        <CalendlyWidget />
      </div>
    </section>
  )
}
