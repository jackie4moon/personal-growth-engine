'use client'

const architectureSteps = [
  {
    step: '01',
    label: 'Data Collection',
    desc: 'GTM + RudderStack CDP captures first-party events from the website.',
  },
  {
    step: '02',
    label: 'Fan-out routing',
    desc: 'Single event stream fanned out to GA4, HubSpot CRM, and BigQuery simultaneously.',
  },
  {
    step: '03',
    label: 'AI enrichment',
    desc: 'n8n triggers on form submission → Clay enriches the lead → Claude API writes personalised outreach.',
  },
  {
    step: '04',
    label: 'Revenue analytics',
    desc: 'BigQuery + Looker Studio dashboards close the loop from first touch to pipeline.',
  },
]

const techStack = [
  'v0', 'Vercel', 'GTM', 'RudderStack', 'n8n', 'Clay', 'Claude API', 'HubSpot', 'BigQuery', 'Looker Studio', 'GitHub',
]

export function Project() {
  return (
    <section
      id="project"
      style={{
        padding: '96px 40px',
        maxWidth: '1100px',
        margin: '0 auto',
        borderTop: '1px solid oklch(28% 0 0)',
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
        Projects
      </div>

      {/* Main card */}
      <div
        style={{
          background: 'var(--bg-subtle)',
          borderRadius: '12px',
          overflow: 'hidden',
          /* Amber top accent stripe via box-shadow */
          boxShadow: 'inset 0 3px 0 0 var(--brand)',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '32px 32px 24px',
            borderBottom: '1px solid oklch(28% 0 0)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: 'var(--font-display), Space Grotesk, sans-serif',
                fontSize: '22px',
                fontWeight: 600,
                letterSpacing: '-0.02em',
                color: 'var(--fg)',
                marginBottom: '6px',
              }}
            >
              Personal Growth Engine
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--fg-2)', lineHeight: 1.55 }}>
              A live proof-of-concept for modern GTM architecture — built to showcase
              exactly the skills companies hire for.
            </p>
          </div>
          <a
            href="https://julianjais.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'var(--brand)',
              color: 'oklch(10% 0 0)',
              padding: '8px 16px',
              borderRadius: '7px',
              fontSize: '13px',
              fontWeight: 600,
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              flexShrink: 0,
              transition: 'background 120ms var(--ease)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--brand-h)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--brand)')}
          >
            Live demo ↗
          </a>
        </div>

        {/* What it does */}
        <div style={{ padding: '28px 32px', borderBottom: '1px solid oklch(28% 0 0)' }}>
          <div
            style={{
              fontFamily: 'var(--font-mono), JetBrains Mono, monospace',
              fontSize: '10px',
              color: 'var(--fg-2)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '14px',
            }}
          >
            The idea
          </div>
          <p style={{ fontSize: '15px', color: 'var(--fg-2)', lineHeight: 1.7, maxWidth: '680px' }}>
            I inverted the recruiting funnel — treating recruiters as leads and companies
            as accounts. The same GTM systems I build for clients are live on this website,
            from server-side event tracking to AI-personalised outreach triggered by a
            form submission. Every visitor interaction is captured, enriched, and
            acted on automatically.
          </p>
        </div>

        {/* Architecture walkthrough */}
        <div style={{ padding: '28px 32px', borderBottom: '1px solid oklch(28% 0 0)' }}>
          <div
            style={{
              fontFamily: 'var(--font-mono), JetBrains Mono, monospace',
              fontSize: '10px',
              color: 'var(--fg-2)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '20px',
            }}
          >
            Architecture
          </div>
          <div className="arch-grid">
            {architectureSteps.map((s) => (
              <div
                key={s.step}
                style={{
                  display: 'flex',
                  gap: '16px',
                  alignItems: 'flex-start',
                  background: 'var(--bg-elevated)',
                  borderRadius: '8px',
                  padding: '16px 18px',
                  border: '1px solid oklch(28% 0 0)',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-mono), JetBrains Mono, monospace',
                    fontSize: '11px',
                    color: 'var(--brand)',
                    fontWeight: 600,
                    flexShrink: 0,
                    paddingTop: '2px',
                    minWidth: '24px',
                  }}
                >
                  {s.step}
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-display), Space Grotesk, sans-serif',
                      fontSize: '14px',
                      fontWeight: 600,
                      color: 'var(--fg)',
                      marginBottom: '4px',
                    }}
                  >
                    {s.label}
                  </div>
                  <div style={{ fontSize: '13.5px', color: 'var(--fg-2)', lineHeight: 1.55 }}>
                    {s.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tech stack row */}
        <div style={{ padding: '20px 32px' }}>
          <div
            style={{
              fontFamily: 'var(--font-mono), JetBrains Mono, monospace',
              fontSize: '10px',
              color: 'var(--fg-2)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '10px',
            }}
          >
            Stack
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
            {techStack.map((t) => (
              <span
                key={t}
                style={{
                  fontFamily: 'var(--font-mono), JetBrains Mono, monospace',
                  fontSize: '11px',
                  color: 'var(--fg-2)',
                  background: 'oklch(11% 0.01 78)',
                  border: '1px solid oklch(65% 0.17 78 / 0.25)',
                  borderRadius: '4px',
                  padding: '2px 8px',
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Spacy Home */}
      <div
        style={{
          marginTop: '40px',
          background: 'var(--bg-subtle)',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: 'inset 0 3px 0 0 var(--brand)',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '28px 32px 20px',
            borderBottom: '1px solid oklch(28% 0 0)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '6px',
                flexWrap: 'wrap',
              }}
            >
              <h2
                style={{
                  fontFamily: 'var(--font-display), Space Grotesk, sans-serif',
                  fontSize: '22px',
                  fontWeight: 600,
                  letterSpacing: '-0.02em',
                  color: 'var(--fg)',
                }}
              >
                Spacy Home
              </h2>
              <span
                style={{
                  fontFamily: 'var(--font-mono), JetBrains Mono, monospace',
                  fontSize: '10px',
                  color: 'var(--fg-2)',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  background: 'var(--bg-elevated)',
                  border: '1px solid oklch(28% 0 0)',
                  borderRadius: '99px',
                  padding: '2px 9px',
                }}
              >
                2021 – 2025 · Closed
              </span>
            </div>
            <p style={{ fontSize: '14px', color: 'var(--fg-2)', lineHeight: 1.55 }}>
              B2C Shopify dropshipping store for tableware and cutlery [spacyhome.com] —
              built, scaled, and operated solo alongside a full-time role.
            </p>
          </div>
        </div>

        {/* What I built */}
        <div style={{ padding: '24px 32px', borderBottom: '1px solid oklch(28% 0 0)' }}>
          <div
            style={{
              fontFamily: 'var(--font-mono), JetBrains Mono, monospace',
              fontSize: '10px',
              color: 'var(--fg-2)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '12px',
            }}
          >
            What I built
          </div>
          <p style={{ fontSize: '15px', color: 'var(--fg-2)', lineHeight: 1.7, maxWidth: '680px' }}>
            A fully automated B2C dropshipping operation targeting the German market.
            Connected the Shopify storefront to AliExpress suppliers via DSers ERP for
            hands-off fulfilment. Managed the full performance marketing mix —
            Google Ads, Meta Ads, and Pinterest Ads — alongside organic SEO to drive
            acquisition. Produced all ad creatives in Canva and handled customer
            retention through Klaviyo email flows. Shut down in 2024 to refocus on
            full-time career priorities — but it remains a strong proof point of
            end-to-end commercial and digital marketing ownership.
          </p>
        </div>

        {/* Tech stack row */}
        <div style={{ padding: '20px 32px' }}>
          <div
            style={{
              fontFamily: 'var(--font-mono), JetBrains Mono, monospace',
              fontSize: '10px',
              color: 'var(--fg-2)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '10px',
            }}
          >
            Stack
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
            {['Shopify', 'DSers', 'AliExpress', 'Google Ads', 'Meta Ads', 'Pinterest Ads', 'Klaviyo', 'SEO', 'Canva'].map((t) => (
              <span
                key={t}
                style={{
                  fontFamily: 'var(--font-mono), JetBrains Mono, monospace',
                  fontSize: '11px',
                  color: 'var(--fg-2)',
                  background: 'oklch(11% 0.01 78)',
                  border: '1px solid oklch(65% 0.17 78 / 0.25)',
                  borderRadius: '4px',
                  padding: '2px 8px',
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .arch-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        @media (max-width: 640px) {
          .arch-grid { grid-template-columns: 1fr; }
          #project { padding: 64px 20px !important; }
        }
      `}</style>
    </section>
  )
}
