'use client'

const stackCategories = [
  {
    label: 'Analytics & Data',
    tags: ['GTM (web + server-side)', 'GA4', 'BigQuery', 'Looker Studio', 'Power BI', 'Tableau', 'Google Search Console', 'Hotjar', 'VWO'],
  },
  {
    label: 'Paid, SEO & Social',
    tags: ['Google Ads', 'Meta Ads', 'LinkedIn Ads', 'Pinterest Ads', 'Bing Ads', 'Outbrain', 'Hootsuite', 'SEMrush', 'Sistrix', 'Screaming Frog'],
  },
  {
    label: 'AI & Automation',
    tags: ['Claude Code', 'Claude Design', 'ChatGPT', 'Gemini', 'n8n', 'Make', 'Clay', 'Zapier', 'RudderStack (CDP)'],
  },
  {
    label: 'CRM & Email',
    tags: ['HubSpot', 'Pardot', 'Marketo', 'Dealfront', 'Klaviyo'],
  },
  {
    label: 'Design & Creative',
    tags: ['Claude Design', 'Figma', 'Canva', 'Gamma', 'v0', 'Adobe Photoshop'],
  },
  {
    label: 'Dev & Infra',
    tags: ['Vercel', 'GitHub', 'Contentful', 'Sitecore', 'Shopify', 'Usercentrics', 'OneTrust'],
  },
]

export function Stack() {
  return (
    <section
      id="stack"
      style={{
        padding: '96px 40px',
        maxWidth: '1100px',
        margin: '0 auto',
        borderTop: '1px solid var(--border)',
      }}
    >
      <div style={{ marginBottom: '40px' }}>
        <div
          style={{
            fontFamily: 'var(--font-mono), JetBrains Mono, monospace',
            fontSize: '11px',
            color: 'var(--brand)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: '8px',
          }}
        >
          Stack
        </div>
        <h2
          style={{
            fontFamily: 'var(--font-display), Space Grotesk, sans-serif',
            fontSize: '32px',
            fontWeight: 600,
            letterSpacing: '-0.03em',
            color: 'var(--fg)',
            marginBottom: '10px',
          }}
        >
          Tools I work with
        </h2>
        <p style={{ fontSize: '14px', color: 'var(--fg-2)', lineHeight: 1.55 }}>
          Pragmatic tool selection — chosen for integration depth, not resume padding.
        </p>
      </div>

      <div className="stack-grid">
        {stackCategories.map((cat) => (
          <div
            key={cat.label}
            className="stack-cell"
            style={{
              background: 'var(--brand-s)',
              border: '1px solid oklch(65% 0.17 78 / 0.14)',
              borderRadius: '10px',
              padding: '20px 24px',
              transition: 'background 150ms var(--ease), border-color 150ms var(--ease)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'oklch(16% 0.05 78 / 0.9)'
              e.currentTarget.style.borderColor = 'oklch(65% 0.17 78 / 0.28)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--brand-s)'
              e.currentTarget.style.borderColor = 'oklch(65% 0.17 78 / 0.14)'
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-mono), JetBrains Mono, monospace',
                fontSize: '11px',
                fontWeight: 600,
                color: 'var(--brand)',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                marginBottom: '12px',
              }}
            >
              {cat.label}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
              {cat.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontFamily: 'var(--font-mono), JetBrains Mono, monospace',
                    fontSize: '12px',
                    color: 'var(--fg-2)',
                    background: 'oklch(11% 0.01 78)',
                    border: '1px solid oklch(65% 0.17 78 / 0.25)',
                    borderRadius: '4px',
                    padding: '3px 8px',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .stack-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }
        @media (max-width: 760px) {
          .stack-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 480px) {
          .stack-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  )
}
