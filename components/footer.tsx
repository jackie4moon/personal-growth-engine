'use client'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      style={{
        borderTop: '1px solid var(--border)',
        padding: '28px 40px',
        maxWidth: '1100px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-display), Space Grotesk, sans-serif',
          fontSize: '14px',
          fontWeight: 600,
          color: 'var(--fg-2)',
          letterSpacing: '-0.02em',
        }}
      >
        Julian Jais<span style={{ color: 'var(--brand)' }}>.</span>
        <span
          style={{
            fontFamily: 'var(--font-mono), JetBrains Mono, monospace',
            fontSize: '11px',
            color: 'var(--fg-3)',
            fontWeight: 400,
            marginLeft: '12px',
          }}
        >
          © {year}
        </span>
      </div>

      <div style={{ display: 'flex', gap: '20px' }}>
        {[
          { href: 'https://julianjais.com', label: 'GTM Demo' },
          { href: 'https://linkedin.com/in/julianjais', label: 'LinkedIn' },
          { href: 'mailto:julian.u.jais@gmail.com', label: 'Email' },
        ].map((l) => (
          <a
            key={l.label}
            href={l.href}
            target={l.href.startsWith('http') ? '_blank' : undefined}
            rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            style={{
              fontSize: '13px',
              color: 'var(--fg-3)',
              textDecoration: 'none',
              transition: 'color 120ms',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--fg)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--fg-3)')}
          >
            {l.label}
          </a>
        ))}
      </div>

      <style>{`
        @media (max-width: 760px) {
          footer { padding: 24px 20px !important; }
        }
      `}</style>
    </footer>
  )
}
