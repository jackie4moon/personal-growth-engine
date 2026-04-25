'use client'

import Image from 'next/image'
import { trackCtaClicked } from '@/lib/analytics'

const stats = [
  { num: '8+', label: 'Years in growth & performance' },
  { num: '€50k', label: 'Monthly ad budget managed' },
  { num: '18%', label: 'CAC reduction at Instagrid' },
  { num: '400', label: 'MQLs at CPL < €50' },
]

export function Hero() {
  return (
    <section
      id="hero"
      style={{
        paddingTop: '160px',
        paddingBottom: '96px',
        maxWidth: '1100px',
        margin: '0 auto',
        paddingLeft: '40px',
        paddingRight: '40px',
      }}
    >
      {/* Top row: copy left, photo right */}
      <div className="hero-layout">
        {/* Left: copy */}
        <div className="hero-copy">
          {/* Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'var(--brand-s)',
              border: '1px solid oklch(65% 0.17 78 / 0.12)',
              borderRadius: '99px',
              padding: '5px 12px',
              fontFamily: 'var(--font-mono), JetBrains Mono, monospace',
              fontSize: '11.5px',
              color: 'var(--brand)',
              marginBottom: '28px',
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: 'var(--brand)',
                boxShadow: '0 0 8px var(--brand)',
                flexShrink: 0,
                display: 'inline-block',
              }}
            />
            Open to GTM Architect · Growth Ops · AI Lead roles
          </div>

          {/* Title */}
          <h1
            style={{
              fontFamily: 'var(--font-display), Space Grotesk, system-ui, sans-serif',
              fontSize: 'clamp(36px, 5.5vw, 68px)',
              fontWeight: 700,
              letterSpacing: '-0.04em',
              lineHeight: 1.05,
              color: 'var(--fg)',
              marginBottom: '24px',
            }}
          >
            I build the systems<br />
            that make marketing{' '}
            <span style={{ color: 'var(--brand)' }}>measurable.</span>
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: '17px',
              color: 'var(--fg-2)',
              maxWidth: '520px',
              lineHeight: 1.65,
              marginBottom: '40px',
            }}
          >
            GTM Architect with 8+ years in performance marketing, data infrastructure,
            and AI-powered growth ops — building the accountability layer between
            marketing execution and revenue.
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
            <a
              href="#contact"
              onClick={() => trackCtaClicked('Schedule a call', 'hero', '#contact')}
              style={{
                background: 'var(--brand)',
                color: 'oklch(10% 0 0)',
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                fontWeight: 600,
                padding: '11px 22px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'background 120ms var(--ease)',
                boxShadow: '0 0 24px oklch(65% 0.17 78 / 0.16)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--brand-h)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--brand)')}
            >
              Schedule a call <span aria-hidden>→</span>
            </a>
            <a
              href="https://julianjais.com"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackCtaClicked('See live GTM demo', 'hero', 'https://julianjais.com')}
              style={{
                background: 'transparent',
                color: 'var(--fg-2)',
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                fontWeight: 500,
                padding: '11px 22px',
                borderRadius: '8px',
                border: '1px solid var(--border)',
                cursor: 'pointer',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'border-color 120ms var(--ease), background 120ms, color 120ms',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-hover)'
                e.currentTarget.style.background = 'var(--bg-subtle)'
                e.currentTarget.style.color = 'var(--fg)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)'
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = 'var(--fg-2)'
              }}
            >
              See live GTM demo ↗
            </a>
          </div>
        </div>

        {/* Right: photo */}
        <div className="hero-photo-wrap">
          <div
            style={{
              position: 'relative',
              width: '240px',
              height: '300px',
              borderRadius: '12px',
              overflow: 'hidden',
              border: '1px solid oklch(30% 0 0)',
              flexShrink: 0,
            }}
          >
            <Image
              src="/images/julian-jais.jpg"
              alt="Julian Jais — Senior Growth & GTM Ops Manager"
              fill
              style={{ objectFit: 'cover', objectPosition: 'center top' }}
              priority
            />
            {/* Subtle amber tint overlay to match brand */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to bottom, transparent 60%, oklch(8% 0 0 / 0.5) 100%)',
                pointerEvents: 'none',
              }}
            />
          </div>
          {/* Name tag below photo */}
          <div style={{ marginTop: '14px', textAlign: 'center' }}>
            <div
              style={{
                fontFamily: 'var(--font-display), Space Grotesk, sans-serif',
                fontSize: '15px',
                fontWeight: 600,
                color: 'var(--fg)',
                letterSpacing: '-0.01em',
              }}
            >
              Julian Jais
            </div>
            <div
              style={{
                fontFamily: 'var(--font-mono), JetBrains Mono, monospace',
                fontSize: '10.5px',
                color: 'var(--brand)',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                marginTop: '3px',
              }}
            >
              Growth Ops · GTM · AI Marketing
            </div>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div
        style={{
          marginTop: '56px',
          background: 'var(--bg-subtle)',
          borderRadius: '12px',
          padding: '32px 36px',
          display: 'flex',
          gap: '48px',
          flexWrap: 'wrap',
        }}
      >
        {stats.map((s) => (
          <div key={s.label}>
            <div
              style={{
                fontFamily: 'var(--font-display), Space Grotesk, sans-serif',
                fontSize: '28px',
                fontWeight: 700,
                letterSpacing: '-0.03em',
                color: 'var(--fg)',
              }}
            >
              {s.num}
            </div>
            <div style={{ fontSize: '13px', color: 'var(--fg-2)', marginTop: '2px' }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .hero-layout {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 48px;
        }
        .hero-copy { flex: 1; min-width: 0; }
        .hero-photo-wrap { flex-shrink: 0; display: flex; flex-direction: column; align-items: center; padding-top: 8px; }
        @media (max-width: 760px) {
          #hero { padding: 120px 20px 64px !important; }
          .hero-layout { flex-direction: column-reverse; align-items: flex-start; gap: 32px; }
          .hero-photo-wrap { flex-direction: row; align-items: center; gap: 16px; }
          .hero-photo-wrap > div:first-child { width: 80px !important; height: 80px !important; border-radius: 50% !important; }
        }
      `}</style>
    </section>
  )
}
