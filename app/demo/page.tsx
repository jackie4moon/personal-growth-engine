import type { Metadata } from 'next'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import { ArchitectureFlow } from '@/components/architecture-flow'
import { DemoTracker } from '@/components/demo-tracker'

export const metadata: Metadata = {
  title: 'GTM Live Demo — Julian Jais',
  description:
    'Interactive architecture demo of a live GTM pipeline: RudderStack CDP, n8n automation, Claude AI enrichment, and BigQuery analytics. Built by Julian Jais.',
  openGraph: {
    title: 'GTM Live Demo — Julian Jais',
    description:
      'A live, automated GTM pipeline running on julianjais.com — from first-party tracking to AI-personalised outreach.',
    url: 'https://julianjais.com/demo',
    type: 'website',
    siteName: 'Julian Jais',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Julian Jais — GTM Live Demo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GTM Live Demo — Julian Jais',
    description:
      'A live, automated GTM pipeline running on julianjais.com — from first-party tracking to AI-personalised outreach.',
    images: ['/og-image.png'],
  },
}

const phases = [
  {
    name: 'Phase 1 — GTM + RudderStack Tracking Foundation',
    body:
      'Set up the complete event tracking stack: Google Tag Manager with consent-mode defaults, RudderStack as CDP for fan-out routing, CookieYes consent integration, and custom DataLayer events for page views, CTA clicks, form submits, and scroll-depth tracking.',
    tags: ['GTM', 'RudderStack', 'CookieYes', 'DataLayer', 'GA4'],
  },
  {
    name: 'Phase 2 — HubSpot & Calendly Integration',
    body:
      'Connected RudderStack to HubSpot for automatic contact creation on identify() calls. Built Calendly embed with event tracking for meeting_booked events flowing into both GA4 and HubSpot CRM.',
    tags: ['HubSpot', 'Calendly', 'CRM', 'Identify'],
  },
  {
    name: 'Phase 3 — n8n Workflow (Enrichment & Outreach)',
    body:
      'Built the complete automation pipeline: contact form triggers an n8n relay webhook → Clay enriches the lead (company, industry, tech stack, funding stage) → Claude API writes a personalised reply → auto-sent via Gmail. Calendly branch: automated briefing email for booked calls.',
    tags: ['n8n', 'Clay', 'Claude API', 'Gmail', 'Webhooks'],
  },
  {
    name: 'Phase 4 — BigQuery + Analytics Infrastructure',
    body:
      'Activated GA4 native BigQuery export (EU region, GDPR compliant). Built CRM data pipeline via n8n HTTP REST API (OAuth2 workaround for blocked service account keys). Looker Studio dashboards for funnel and CRM quality views.',
    tags: ['BigQuery', 'Looker Studio', 'OAuth2', 'GA4 Export'],
  },
]

const metrics = [
  { num: '4', label: 'Phases' },
  { num: '6 wks', label: 'Build time' },
  { num: '8', label: 'Tools' },
  { num: '0', label: 'Manual steps' },
  { num: 'EU', label: 'Compliant' },
  { num: '100%', label: 'Automated' },
]

export default function DemoPage() {
  return (
    <main
      style={{
        background: 'var(--bg)',
        color: 'var(--fg)',
        minHeight: '100vh',
      }}
    >
      <Nav />
      <DemoTracker />

      {/* ─── HERO ─────────────────────────────────────────────────── */}
      <section
        id="demo-hero"
        style={{
          paddingTop: '160px',
          paddingBottom: '64px',
          maxWidth: '1100px',
          margin: '0 auto',
          paddingLeft: '40px',
          paddingRight: '40px',
        }}
      >
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
          Live Architecture Demo · Phase 1–4 complete
        </div>

        {/* H1 */}
        <h1
          style={{
            fontFamily: 'var(--font-display), Space Grotesk, system-ui, sans-serif',
            fontSize: 'clamp(36px, 5.5vw, 60px)',
            fontWeight: 700,
            letterSpacing: '-0.04em',
            lineHeight: 1.05,
            color: 'var(--fg)',
            marginBottom: '24px',
          }}
        >
          The GTM system
          <br />
          that <span style={{ color: 'var(--brand)' }}>recruits me.</span>
        </h1>

        {/* Subtext */}
        <p
          style={{
            fontSize: '17px',
            color: 'var(--fg-2)',
            maxWidth: '520px',
            lineHeight: 1.65,
            marginBottom: '40px',
          }}
        >
          Every recruiter who visits julianjais.com triggers a live GTM pipeline.
          This is the architecture behind it.
        </p>

        {/* CTAs */}
        <div
          className="demo-cta-row"
          style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}
        >
          <a
            href="/case-study.pdf"
            download
            style={{
              background: 'var(--brand)',
              color: 'oklch(10% 0 0)',
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              fontWeight: 600,
              padding: '11px 22px',
              borderRadius: '8px',
              border: 'none',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 0 24px oklch(65% 0.17 78 / 0.16)',
            }}
          >
            Download Case Study <span aria-hidden>→</span>
          </a>
          <a
            href="/"
            style={{
              background: 'transparent',
              color: 'var(--fg-2)',
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              fontWeight: 500,
              padding: '11px 22px',
              borderRadius: '8px',
              border: '1px solid oklch(34% 0 0)',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span aria-hidden>←</span> Back to Portfolio
          </a>
        </div>
      </section>

      {/* ─── ARCHITECTURE ─────────────────────────────────────────── */}
      <section
        id="architecture"
        style={{
          borderTop: '1px solid var(--border)',
          padding: '96px 40px',
          maxWidth: '1100px',
          margin: '0 auto',
        }}
      >
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
          Architecture
        </div>
        <h2
          style={{
            fontFamily: 'var(--font-display), Space Grotesk, sans-serif',
            fontSize: '32px',
            fontWeight: 600,
            letterSpacing: '-0.03em',
            color: 'var(--fg)',
            marginBottom: '14px',
          }}
        >
          How the pipeline works
        </h2>
        <p style={{ fontSize: '14px', color: 'var(--fg-2)', maxWidth: '640px', marginBottom: '40px', lineHeight: 1.6 }}>
          An interactive map of every tool, event, and automation layer — built to
          demonstrate exactly what modern GTM infrastructure looks like in practice.
        </p>

        <ArchitectureFlow />
      </section>

      {/* ─── METRICS STRIP ────────────────────────────────────────── */}
      <section
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '0 40px 64px',
        }}
      >
        <div
          style={{
            background: 'var(--bg-subtle)',
            borderRadius: '12px',
            padding: '32px 36px',
            display: 'flex',
            gap: '48px',
            flexWrap: 'wrap',
          }}
        >
          {metrics.map((m) => (
            <div key={m.label}>
              <div
                style={{
                  fontFamily: 'var(--font-display), Space Grotesk, sans-serif',
                  fontSize: '28px',
                  fontWeight: 700,
                  letterSpacing: '-0.03em',
                  color: 'var(--fg)',
                }}
              >
                {m.num}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono), JetBrains Mono, monospace',
                  fontSize: '11px',
                  color: 'var(--fg-2)',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  marginTop: '4px',
                }}
              >
                {m.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── PHASES TIMELINE ──────────────────────────────────────── */}
      <section
        id="phases"
        style={{
          borderTop: '1px solid var(--border)',
          padding: '96px 40px',
          maxWidth: '1100px',
          margin: '0 auto',
        }}
      >
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
          Phases
        </div>
        <h2
          style={{
            fontFamily: 'var(--font-display), Space Grotesk, sans-serif',
            fontSize: '32px',
            fontWeight: 600,
            letterSpacing: '-0.03em',
            color: 'var(--fg)',
            marginBottom: '32px',
          }}
        >
          What was built
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {phases.map((p) => (
            <div
              key={p.name}
              style={{
                background: 'var(--bg-subtle)',
                borderRadius: '10px',
                borderLeft: '3px solid var(--brand)',
                padding: '28px 32px',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-display), Space Grotesk, sans-serif',
                  fontSize: '17px',
                  fontWeight: 600,
                  color: 'var(--fg)',
                  letterSpacing: '-0.01em',
                  marginBottom: '10px',
                }}
              >
                {p.name}
              </div>
              <p
                style={{
                  fontSize: '14px',
                  color: 'var(--fg-2)',
                  lineHeight: 1.65,
                  marginBottom: '16px',
                }}
              >
                {p.body}
              </p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {p.tags.map((t) => (
                  <span
                    key={t}
                    style={{
                      fontFamily: 'var(--font-mono), JetBrains Mono, monospace',
                      fontSize: '11px',
                      color: 'var(--fg-2)',
                      background: 'var(--bg-elevated)',
                      border: '1px solid var(--border)',
                      borderRadius: '6px',
                      padding: '3px 8px',
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CASE STUDY CTA ───────────────────────────────────────── */}
      <section
        id="case-study"
        style={{
          borderTop: '1px solid var(--border)',
          padding: '96px 40px',
          maxWidth: '1100px',
          margin: '0 auto',
        }}
      >
        <div
          style={{
            background: 'var(--bg-subtle)',
            borderRadius: '12px',
            boxShadow: 'inset 0 3px 0 0 var(--brand)',
            padding: '64px 48px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-mono), JetBrains Mono, monospace',
              fontSize: '11px',
              color: 'var(--brand)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: '14px',
            }}
          >
            Case Study
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-display), Space Grotesk, sans-serif',
              fontSize: '32px',
              fontWeight: 600,
              letterSpacing: '-0.03em',
              color: 'var(--fg)',
              marginBottom: '16px',
            }}
          >
            The full documentation
          </h2>
          <p
            style={{
              fontSize: '15px',
              color: 'var(--fg-2)',
              maxWidth: '480px',
              margin: '0 auto 28px',
              lineHeight: 1.65,
            }}
          >
            All architectural decisions, implementation challenges, workarounds, and
            learnings from Phase 1–4. 6–8 pages. Built to show exactly how this
            system was designed.
          </p>
          <a
            href="/case-study.pdf"
            download
            style={{
              background: 'var(--brand)',
              color: 'oklch(10% 0 0)',
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              fontWeight: 600,
              padding: '12px 24px',
              borderRadius: '8px',
              border: 'none',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 0 24px oklch(65% 0.17 78 / 0.16)',
            }}
          >
            Download Case Study PDF <span aria-hidden>→</span>
          </a>
          <div
            style={{
              fontFamily: 'var(--font-mono), JetBrains Mono, monospace',
              fontSize: '12px',
              color: 'var(--fg-3)',
              marginTop: '16px',
            }}
          >
            PDF · ~8 pages · English
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        @media (max-width: 760px) {
          #demo-hero { padding: 120px 20px 48px !important; }
          #architecture { padding: 64px 20px !important; }
          #phases { padding: 64px 20px !important; }
          #case-study { padding: 64px 20px !important; }
          #case-study > div { padding: 40px 24px !important; }
          .demo-cta-row > a { flex: 1; justify-content: center; min-width: 100%; }
        }
      `}</style>
    </main>
  )
}
