'use client'

const roles = [
  {
    company: 'Instagrid',
    location: 'Remote',
    title: 'Senior Performance Marketing / Growth Ops Manager',
    period: '2023 – 2025',
    highlights: [
      'Managed €50k/mo paid advertising across Google, Meta, LinkedIn and Display — reduced CAC by 18% through continuous bid strategy optimisation and audience refinement.',
      'Planned and implemented server-side tracking via GTM Server-Side, improving cross-channel attribution accuracy and enabling reliable Lead-to-SQL reporting for the combined Growth and Sales team.',
      'Conducted a comprehensive global SEO audit, increasing organic traffic by 8% within one quarter through technical fixes and on-page optimisation across international markets.',
      'Oversaw global website initiatives, coordinating cross-functional teams and external performance marketing and tracking agencies.',
    ],
    tags: ['GTM Server-Side', 'Google Ads', 'Meta Ads', 'LinkedIn Ads', 'Lead Gen', 'SEO', 'CRO', 'Attribution'],
  },
  {
    company: 'SoftwareOne',
    location: 'Leipzig',
    title: 'Performance Marketing Manager',
    period: '2017 – 2023',
    highlights: [
      'Designed and executed a full-funnel cybersecurity lead-gen campaign generating 400 MQLs at CPL < €50 — significantly below enterprise software market benchmarks.',
      'Rolled out unified tag management and analytics dashboards across 60+ international websites, standardising measurement and enabling consistent cross-market reporting.',
      'Led A/B testing and CRO initiatives that systematically improved conversion rates across key landing pages; managed multi-channel paid advertising across Google, Bing, Meta and LinkedIn.',
      'Built Looker Studio performance dashboards for website and campaign monitoring — adopted by marketing and management stakeholders for data-driven decision-making.',
    ],
    tags: ['Looker Studio', 'Tag Management', 'Lead Gen', 'A/B Testing', 'CRO', 'Multi-channel Ads'],
  },
]

const certifications = [
  {
    name: 'AI & Automation in Digital Marketing',
    org: 'MOD Education (Masters of Digital GmbH)',
    period: 'Apr – Jun 2026',
    note: '6-week intensive · AI system architectures, generative AI in marketing toolchains, AI-driven campaign infrastructure',
  },
  {
    name: 'Digital Leadership: AI & Agility',
    org: 'Learning Digital GmbH',
    period: 'Dec 2025 – Mar 2026',
    note: '270 units · Grade 1.0 · AI project management, EU AI Act, agile organisational design, leadership in AI-driven transformation',
  },
]

export function Experience() {
  return (
    <section
      id="experience"
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
        Experience
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
        Where I have worked
      </h2>

      {/* Roles */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '40px' }}>
        {roles.map((r) => (
          <div
            key={r.company}
            style={{
              background: 'var(--bg-subtle)',
              borderRadius: '10px',
              borderLeft: '3px solid var(--brand)',
              padding: '28px 32px',
              transition: 'background 150ms var(--ease), border-color 150ms var(--ease)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--bg-elevated)'
              e.currentTarget.style.borderLeftColor = 'var(--brand-h)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--bg-subtle)'
              e.currentTarget.style.borderLeftColor = 'var(--brand)'
            }}
          >
            {/* Role header */}
            <div
              className="role-header"
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px', gap: '16px' }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px', flexWrap: 'wrap' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-display), Space Grotesk, sans-serif',
                      fontSize: '17px',
                      fontWeight: 600,
                      color: 'var(--fg)',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {r.company}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono), JetBrains Mono, monospace',
                      fontSize: '10px',
                      color: 'var(--fg-2)',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {r.location}
                  </span>
                </div>
                <div style={{ fontSize: '14px', color: 'var(--fg-2)', fontWeight: 500 }}>
                  {r.title}
                </div>
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono), JetBrains Mono, monospace',
                  fontSize: '12px',
                  color: 'var(--fg-2)',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  paddingTop: '2px',
                  background: 'var(--brand-s)',
                  border: '1px solid oklch(65% 0.17 78 / 0.14)',
                  borderRadius: '99px',
                  padding: '3px 10px',
                }}
              >
                {r.period}
              </div>
            </div>

            {/* Highlights */}
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {r.highlights.map((h) => (
                <li
                  key={h}
                  style={{
                    fontSize: '14px',
                    color: 'var(--fg-2)',
                    lineHeight: 1.6,
                    paddingLeft: '16px',
                    position: 'relative',
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      left: 0,
                      color: 'var(--brand)',
                      fontWeight: 700,
                    }}
                  >
                    ›
                  </span>
                  {h}
                </li>
              ))}
            </ul>

            {/* Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
              {r.tags.map((t) => (
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
        ))}
      </div>

      {/* Certifications */}
      <div>
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
          Certifications
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {certifications.map((c) => (
            <div
              key={c.name}
              style={{
                background: 'var(--brand-s)',
                border: '1px solid oklch(65% 0.17 78 / 0.14)',
                borderRadius: '10px',
                padding: '20px 28px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                gap: '24px',
                flexWrap: 'wrap',
                transition: 'background 150ms var(--ease)',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = 'oklch(16% 0.05 78 / 0.9)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = 'var(--brand-s)')
              }
            >
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontFamily: 'var(--font-display), Space Grotesk, sans-serif',
                    fontSize: '15px',
                    fontWeight: 600,
                    color: 'var(--fg)',
                    letterSpacing: '-0.01em',
                    marginBottom: '2px',
                  }}
                >
                  {c.name}
                </div>
                <div style={{ fontSize: '13px', color: 'var(--fg-2)', marginBottom: '4px' }}>
                  {c.org}
                </div>
                <div style={{ fontSize: '12.5px', color: 'var(--fg-2)', lineHeight: 1.5 }}>
                  {c.note}
                </div>
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono), JetBrains Mono, monospace',
                  fontSize: '11px',
                  color: 'var(--brand)',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  background: 'oklch(8% 0 0 / 0.4)',
                  border: '1px solid oklch(65% 0.17 78 / 0.14)',
                  borderRadius: '99px',
                  padding: '3px 10px',
                }}
              >
                {c.period}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 760px) {
          #experience { padding: 64px 20px !important; }
          .role-header { flex-direction: column !important; }
        }
      `}</style>
    </section>
  )
}
