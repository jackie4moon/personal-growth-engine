'use client'

import { useState, useEffect } from 'react'

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '#about', label: 'About' },
    { href: '#stack', label: 'Stack' },
    { href: '#project', label: 'Projects' },
    { href: '#experience', label: 'Experience' },
  ]

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: scrolled
          ? 'oklch(8% 0 0 / 0.92)'
          : 'oklch(8% 0 0 / 0.7)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border)',
        transition: 'background 200ms var(--ease)',
      }}
    >
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '0 40px',
          height: '56px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <a
          href="#hero"
          style={{
            fontFamily: 'var(--font-display), Space Grotesk, system-ui, sans-serif',
            fontSize: '17px',
            fontWeight: 600,
            letterSpacing: '-0.03em',
            color: 'var(--fg)',
            textDecoration: 'none',
          }}
        >
          Julian Jais<span style={{ color: 'var(--brand)' }}>.</span>
        </a>

        {/* Desktop links */}
        <ul
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '32px',
            listStyle: 'none',
            margin: 0,
            padding: 0,
          }}
          className="nav-desktop-links"
        >
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                style={{
                  fontSize: '13.5px',
                  color: 'var(--fg-2)',
                  textDecoration: 'none',
                  fontWeight: 500,
                  transition: 'color 120ms var(--ease)',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--fg)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--fg-2)')}
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              style={{
                background: 'var(--brand)',
                color: 'oklch(10% 0 0)',
                padding: '7px 14px',
                borderRadius: '7px',
                fontWeight: 600,
                fontSize: '13px',
                textDecoration: 'none',
                display: 'inline-block',
                transition: 'background 120ms var(--ease)',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = 'var(--brand-h)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = 'var(--brand)')
              }
            >
              Schedule a call
            </a>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          className="nav-mobile-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          style={{
            background: 'transparent',
            border: '1px solid var(--border)',
            borderRadius: '6px',
            padding: '6px 10px',
            color: 'var(--fg-2)',
            cursor: 'pointer',
            fontSize: '13px',
            fontFamily: 'var(--font-mono)',
            display: 'none',
          }}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="nav-mobile-menu"
          style={{
            borderTop: '1px solid var(--border)',
            padding: '16px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            background: 'oklch(8% 0 0 / 0.98)',
          }}
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontSize: '14px',
                color: 'var(--fg-2)',
                textDecoration: 'none',
                padding: '10px 0',
        borderBottom: '1px solid oklch(28% 0 0)',
                fontWeight: 500,
              }}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            style={{
              marginTop: '8px',
              background: 'var(--brand)',
              color: 'oklch(10% 0 0)',
              padding: '10px 16px',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '14px',
              textDecoration: 'none',
              textAlign: 'center',
            }}
          >
            Schedule a call
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 760px) {
          .nav-desktop-links { display: none !important; }
          .nav-mobile-btn { display: block !important; }
        }
        @media (min-width: 761px) {
          .nav-mobile-menu { display: none !important; }
        }
      `}</style>
    </nav>
  )
}
