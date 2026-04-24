'use client'

const sidebarItems = [
  { label: 'Location', value: 'Markkleeberg, Germany' },
  { label: 'Availability', value: 'August 2026 · Remote-first · International' },
  { label: 'Target roles', value: 'GTM Architect · Growth Ops Manager · MarTech Specialist · AI Implementation Lead' },
  { label: 'Languages', value: 'German (native) · English (C1)' },
  { label: 'Visa / work permit', value: 'EU citizen' },
  { label: 'Currently', value: 'Advanced cert: AI & Automation in Digital Marketing' },
]

const sectionStyle: React.CSSProperties = {
  padding: '96px 40px',
  maxWidth: '1100px',
  margin: '0 auto',
  borderTop: '1px solid oklch(28% 0 0)',
}

const sectionLabelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-mono), JetBrains Mono, monospace',
  fontSize: '11px',
  color: 'var(--brand)',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  marginBottom: '16px',
}

export function About() {
  return (
    <section id="about" style={sectionStyle}>
      <div className="section-label" style={sectionLabelStyle}>
        About
      </div>
      <div className="about-grid">
        {/* Left: copy */}
        <div className="about-text">
          <h2
            style={{
              fontFamily: 'var(--font-display), Space Grotesk, sans-serif',
              fontSize: '32px',
              fontWeight: 600,
              letterSpacing: '-0.03em',
              color: 'var(--fg)',
              marginBottom: '20px',
              lineHeight: 1.2,
            }}
          >
            Strategy that ships.<br />Infrastructure that proves it.
          </h2>
          <p
            style={{
              color: 'var(--fg-2)',
              fontSize: '15px',
              lineHeight: 1.75,
              marginBottom: '16px',
            }}
          >
            My work sits at the intersection of GTM architecture, marketing
            technology, and AI automation. I design the systems that connect
            marketing execution to measurable revenue outcomes — first-party
            data pipelines, server-side tracking, AI-powered lead enrichment,
            and attribution models that sales teams actually trust.
          </p>
          <p
            style={{
              color: 'var(--fg-2)',
              fontSize: '15px',
              lineHeight: 1.75,
              marginBottom: '16px',
            }}
          >
            What makes me different: I can manage a €50k/mo paid budget and
            simultaneously architect the attribution model that proves its ROI.
            I have designed full-funnel lead generation systems delivering 400+
            MQLs at sub-€50 CPL, shipped server-side tracking infrastructure,
            coordinated cross-functional teams across global web properties, and
            built agentic workflows that run enrichment, scoring, and outreach
            without manual intervention.
          </p>
          <p
            style={{
              color: 'var(--fg-2)',
              fontSize: '15px',
              lineHeight: 1.75,
            }}
          >
            I am looking for senior or leadership roles as a GTM Architect,
            Growth Ops Manager, MarTech Specialist, or AI Implementation Lead —
            ideally at B2B SaaS, deep tech, or AI-native companies in
            scale-up phase where technical marketing infrastructure is a
            competitive advantage, not a nice-to-have.
          </p>
        </div>

        {/* Right: metadata */}
        <div className="about-sidebar" style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingTop: '8px' }}>
          {sidebarItems.map((item) => (
            <div
              key={item.label}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '2px',
                padding: '12px 16px',
                background: 'var(--bg-subtle)',
                borderLeft: '2px solid var(--brand)',
                borderRadius: '0 8px 8px 0',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono), JetBrains Mono, monospace',
                  fontSize: '10px',
                  color: 'var(--fg-2)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}
              >
                {item.label}
              </span>
              <span style={{ fontSize: '14px', color: 'var(--fg)', fontWeight: 500 }}>
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: start;
        }
        .about-sidebar { padding-top: 8px; }
        @media (max-width: 760px) {
          .about-grid { grid-template-columns: 1fr; gap: 40px; }
          section { padding: 64px 20px !important; }
        }
      `}</style>
    </section>
  )
}
