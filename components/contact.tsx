'use client'

import { useState } from 'react'
import { trackContactFormSubmitted } from '@/lib/analytics'

const inputStyle: React.CSSProperties = {
  background: 'var(--bg-subtle)',
  border: '1px solid oklch(28% 0 0)',
  borderRadius: '8px',
  color: 'var(--fg)',
  fontFamily: 'var(--font-body), DM Sans, sans-serif',
  fontSize: '14px',
  padding: '10px 14px',
  outline: 'none',
  width: '100%',
  transition: 'border-color 120ms var(--ease), box-shadow 120ms var(--ease)',
}

const labelStyle: React.CSSProperties = {
  fontSize: '12px',
  fontWeight: 500,
  color: 'var(--fg-2)',
  display: 'block',
  marginBottom: '5px',
}

export function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [message, setMessage] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    trackContactFormSubmitted({
      form_name: 'contact_recruiter',
      recruiter_email: email,
      recruiter_company: company,
      recruiter_message: message,
    })
    setSubmitted(true)
  }

  return (
    <section
      id="contact"
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
        Contact
      </div>

      <div className="contact-grid">
        {/* Left */}
        <div>
          <h2
            style={{
              fontFamily: 'var(--font-display), Space Grotesk, sans-serif',
              fontSize: '32px',
              fontWeight: 600,
              letterSpacing: '-0.03em',
              color: 'var(--fg)',
              lineHeight: 1.2,
              marginBottom: '16px',
            }}
          >
            {"Let's talk."}<br />30 minutes is enough.
          </h2>
          <p
            style={{
              fontSize: '15px',
              color: 'var(--fg-2)',
              lineHeight: 1.7,
              marginBottom: '28px',
              maxWidth: '400px',
            }}
          >
            If you are hiring for a GTM Architect, Growth Ops Manager,
            MarTech Specialist, or AI Implementation Lead and think we might
            be a fit, fill in the form. I will get back to you within
            24 hours with a calendar link.
          </p>

          {/* Contact links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              {
                icon: '✉',
                href: 'mailto:julian.u.jais@gmail.com',
                label: 'julian.u.jais@gmail.com',
                iconFont: 'inherit',
              },
              {
                icon: 'in',
                href: 'https://linkedin.com/in/julianjais',
                label: 'linkedin.com/in/julianjais',
                iconFont: 'var(--font-mono)',
              },
              {
                icon: '⌂',
                href: 'https://julianjais.com',
                label: 'julianjais.com',
                iconFont: 'inherit',
              },
            ].map((l) => (
              <a
                key={l.label}
                href={l.href}
                target={l.href.startsWith('http') ? '_blank' : undefined}
                rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontSize: '14px',
                  color: 'var(--fg-2)',
                  textDecoration: 'none',
                  transition: 'color 120ms',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--brand)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--fg-2)')}
              >
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    background: 'var(--brand-s)',
                    border: '1px solid oklch(65% 0.17 78 / 0.14)',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                    flexShrink: 0,
                    fontFamily: l.iconFont,
                  }}
                >
                  {l.icon}
                </div>
                <span>{l.label}</span>
              </a>
            ))}
          </div>

          {/* Note */}
          <div
            style={{
              marginTop: '32px',
              padding: '16px 20px',
              background: 'var(--brand-s)',
              border: '1px solid oklch(65% 0.17 78 / 0.12)',
              borderRadius: '8px',
              maxWidth: '360px',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-mono), JetBrains Mono, monospace',
                fontSize: '10px',
                color: 'var(--brand)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: '6px',
              }}
            >
              How this works
            </div>
            <p style={{ fontSize: '13px', color: 'var(--fg-3)', lineHeight: 1.6 }}>
              Your form submission triggers an n8n workflow that enriches your
              profile via Clay and sends you an AI-personalised reply — the exact
              pipeline I build for clients. Live demo.
            </p>
          </div>
        </div>

        {/* Right: form */}
        <div>
          {!submitted ? (
            <form
              onSubmit={handleSubmit}
              style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}
                className="form-row"
              >
                <div>
                  <label style={labelStyle}>First name</label>
                  <input
                    type="text"
                    placeholder="Sarah"
                    required
                    style={inputStyle}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = 'var(--brand)'
                      e.currentTarget.style.boxShadow = '0 0 0 3px oklch(65% 0.17 78 / 0.10)'
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border)'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Last name</label>
                  <input
                    type="text"
                    placeholder="Chen"
                    required
                    style={inputStyle}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = 'var(--brand)'
                      e.currentTarget.style.boxShadow = '0 0 0 3px oklch(65% 0.17 78 / 0.10)'
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border)'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Work email</label>
                <input
                  type="email"
                  placeholder="sarah@company.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={inputStyle}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'var(--brand)'
                    e.currentTarget.style.boxShadow = '0 0 0 3px oklch(65% 0.17 78 / 0.10)'
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                />
              </div>

              <div>
                <label style={labelStyle}>Company</label>
                <input
                  type="text"
                  placeholder="Acme Corp"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  style={inputStyle}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'var(--brand)'
                    e.currentTarget.style.boxShadow = '0 0 0 3px oklch(65% 0.17 78 / 0.10)'
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                />
              </div>

              <div>
                <label style={labelStyle}>Role type</label>
                <div style={{ position: 'relative' }}>
                  <select
                    style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = 'var(--brand)'
                      e.currentTarget.style.boxShadow = '0 0 0 3px oklch(65% 0.17 78 / 0.10)'
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border)'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  >
                    <option value="">Select a role type…</option>
                    <option>GTM Architect</option>
                    <option>Growth Ops Manager</option>
                    <option>MarTech Specialist</option>
                    <option>AI Implementation Lead</option>
                    <option>Head of Growth</option>
                    <option>Other</option>
                  </select>
                  <div
                    style={{
                      position: 'absolute',
                      right: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      pointerEvents: 'none',
                      color: 'var(--fg-2)',
                      fontSize: '12px',
                    }}
                  >
                    ▾
                  </div>
                </div>
              </div>

              <div>
                <label style={labelStyle}>Message (optional)</label>
                <textarea
                  placeholder="Tell me a bit about the role and company…"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  style={{
                    ...inputStyle,
                    resize: 'vertical',
                    minHeight: '90px',
                    lineHeight: 1.55,
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'var(--brand)'
                    e.currentTarget.style.boxShadow = '0 0 0 3px oklch(65% 0.17 78 / 0.10)'
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                />
              </div>

              <button
                type="submit"
                style={{
                  background: 'var(--brand)',
                  color: 'oklch(10% 0 0)',
                  fontFamily: 'var(--font-body), DM Sans, sans-serif',
                  fontSize: '14px',
                  fontWeight: 600,
                  padding: '12px 24px',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  width: '100%',
                  transition: 'background 120ms var(--ease), transform 80ms',
                  boxShadow: '0 0 24px oklch(65% 0.17 78 / 0.08)',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--brand-h)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--brand)')}
              >
                Send &amp; schedule a call →
              </button>

              <p
                style={{
                  fontSize: '11.5px',
                  color: 'var(--fg-3)',
                  textAlign: 'center',
                  marginTop: '-4px',
                }}
              >
                {"I'll respond within 24 hours to confirm a time."}
              </p>
            </form>
          ) : (
            <div
              style={{
                background: 'var(--brand-s)',
                border: '1px solid oklch(65% 0.17 78 / 0.12)',
                borderRadius: '10px',
                padding: '32px',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-display), Space Grotesk, sans-serif',
                  fontSize: '20px',
                  fontWeight: 600,
                  color: 'var(--brand)',
                  marginBottom: '8px',
                }}
              >
                Message sent.
              </div>
              <p style={{ fontSize: '13.5px', color: 'var(--fg-2)', lineHeight: 1.6 }}>
                {"Thanks — I'll get back to you within 24 hours with a calendar link."}
              </p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: start;
        }
        @media (max-width: 760px) {
          .contact-grid { grid-template-columns: 1fr; gap: 40px; }
          .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
