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

      {/* Headline + subtext — flex-start aligns both columns to the top */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
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
            flex: '1 1 280px',
          }}
        >
          30 minutes. No pitch.<br />
          <span style={{ color: 'var(--brand)' }}>Just a real conversation.</span>
        </h2>
        <div
          style={{
            fontSize: '14px',
            color: 'var(--fg-2)',
            lineHeight: 1.65,
            maxWidth: '440px',
            flex: '1 1 280px',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
          }}
        >
          <p>
            If you&apos;re looking to fill a senior individual contributor or
            first-time leadership role in Growth Operations, GTM Architecture,
            Performance Marketing or Head of Growth, I&apos;d love to connect.
            Not to sell myself, but to have an honest conversation about whether
            what I do actually matches what you need.
          </p>
          <p>Pick a slot below and let&apos;s find out.</p>
        </div>
      </div>

      {/* Calendly inline widget
          filter: invert(1) hue-rotate(180deg) is the standard cross-origin iframe
          dark-mode technique. The iframe can't be styled directly (CORS), but CSS
          filters are applied at the browser's display layer and work regardless of
          origin. invert(1) flips white→black, hue-rotate(180deg) rotates hue by 180°
          so Calendly's blue accent colours remain visually blue rather than orange.
          The pageSettings colours in calendly-widget.tsx act as a fallback for paid
          Calendly plans that support custom embed colours. */}
      <div
        onClick={() => trackCtaClicked('Calendly widget interaction', 'book_section', process.env.NEXT_PUBLIC_CALENDLY_URL ?? '')}
        style={{
          borderRadius: '12px',
          overflow: 'hidden',
          /* invert(1) flips white→near-black and dark-text→light-text.
             Dropping hue-rotate means Calendly's blue accent inverts to
             orange/amber — which aligns with the site's brand colour.
             brightness(0.88) pulls the result from harsh pure-black to the
             site's actual near-black bg (~#141414) and dims harsh light borders. */
          filter: 'invert(1) brightness(0.88)',
          border: '1px solid oklch(28% 0 0)',
          background: '#fff', /* renders as near-black after invert */
        }}
      >
        <CalendlyWidget />
      </div>
    </section>
  )
}
