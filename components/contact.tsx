'use client'

import { useState } from 'react'
import { trackContactFormSubmitted } from '@/lib/analytics'

// ---------------------------------------------------------------------------
// HubSpot Forms API — client-side submission, no backend required.
// ---------------------------------------------------------------------------
async function submitToHubSpot(data: {
  firstname: string
  lastname: string
  email: string
  company: string
  role_type: string
  message: string
}): Promise<boolean> {
  const portalId = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID
  const formGuid  = process.env.NEXT_PUBLIC_HUBSPOT_FORM_GUID

  if (!portalId || !formGuid) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[HubSpot] Add NEXT_PUBLIC_HUBSPOT_PORTAL_ID and NEXT_PUBLIC_HUBSPOT_FORM_GUID to .env.local')
    }
    return false
  }

  try {
    const res = await fetch(
      `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fields: [
            { name: 'firstname', value: data.firstname },
            { name: 'lastname',  value: data.lastname  },
            { name: 'email',     value: data.email     },
            { name: 'company',   value: data.company   },
            { name: 'role_type', value: data.role_type },
            { name: 'message',   value: data.message   },
          ],
          context: {
            pageUri:  typeof window   !== 'undefined' ? window.location.href : '',
            pageName: typeof document !== 'undefined' ? document.title       : '',
          },
        }),
      }
    )
    return res.ok
  } catch {
    return false
  }
}

// ---------------------------------------------------------------------------
// n8n Webhook — fire-and-forget via /api/n8n proxy (avoids CORS).
// Triggers: Clay enrichment → HubSpot update → personalised reply.
// ---------------------------------------------------------------------------
function fireN8nWebhook(data: {
  firstname: string
  lastname: string
  email: string
  company: string
  role_type: string
  message: string
}): void {
  fetch('/api/n8n', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).catch(console.error)
}

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

const focusHandlers = {
  onFocus: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = 'var(--brand)'
    e.currentTarget.style.boxShadow   = '0 0 0 3px oklch(65% 0.17 78 / 0.10)'
  },
  onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = 'var(--border)'
    e.currentTarget.style.boxShadow   = 'none'
  },
}

export function Contact() {
  const [submitted,  setSubmitted]  = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [firstname,  setFirstname]  = useState('')
  const [lastname,   setLastname]   = useState('')
  const [email,      setEmail]      = useState('')
  const [company,    setCompany]    = useState('')
  const [roleType,   setRoleType]   = useState('')
  const [message,    setMessage]    = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (submitting) return
    setSubmitting(true)

    const formData = { firstname, lastname, email, company, role_type: roleType, message }

    // 1. Analytics event (fires regardless of API results)
    trackContactFormSubmitted({
      form_name:         'contact_recruiter',
      recruiter_email:   email,
      recruiter_company: company,
      recruiter_message: message,
    })

    // 2. HubSpot CRM — awaited so contact exists before n8n tries to update it
    await submitToHubSpot(formData)

    // 3. n8n Workflow 2 — fire-and-forget, does not block UI
    fireN8nWebhook(formData)

    setSubmitting(false)
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
            Get in touch.
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
            No suitable time slot available, or prefer to reach out first?
            Fill in the form — whether you have a question, want to learn
            more about my background, or just want to start a conversation.
          </p>

          {/* Contact links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { icon: '✉',  href: 'mailto:julian.u.jais@gmail.com',          label: 'julian.u.jais@gmail.com',   iconFont: 'inherit'            },
              { icon: 'in', href: 'https://www.linkedin.com/in/julian-jais/', label: 'linkedin.com/in/julian-jais', iconFont: 'var(--font-mono)' },
              { icon: '⌂',  href: 'https://julianjais.com',                   label: 'julianjais.com',             iconFont: 'inherit'            },
            ].map((l) => (
              <a
                key={l.label}
                href={l.href}
                target={l.href.startsWith('http') ? '_blank' : undefined}
                rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  fontSize: '14px', color: 'var(--fg-2)', textDecoration: 'none',
                  transition: 'color 120ms',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--brand)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--fg-2)')}
              >
                <div
                  style={{
                    width: '32px', height: '32px',
                    background: 'var(--brand-s)',
                    border: '1px solid oklch(65% 0.17 78 / 0.14)',
                    borderRadius: '6px', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', fontSize: '14px', flexShrink: 0,
                    fontFamily: l.iconFont,
                  }}
                >
                  {l.icon}
                </div>
                <span>{l.label}</span>
              </a>
            ))}
          </div>

          {/* How this works note */}
          <div
            style={{
              marginTop: '32px', padding: '16px 20px',
              background: 'var(--brand-s)',
              border: '1px solid oklch(65% 0.17 78 / 0.12)',
              borderRadius: '8px', maxWidth: '360px',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-mono), JetBrains Mono, monospace',
                fontSize: '10px', color: 'var(--brand)',
                letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '6px',
              }}
            >
              How this works
            </div>
            <p style={{ fontSize: '13px', color: 'var(--fg-3)', lineHeight: 1.6 }}>
              Your form submission triggers an n8n workflow that enriches your
              profile via Clay and sends you an AI-personalised reply — a live
              automation running on this portfolio.
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
              {/* First + Last name */}
              <div
                style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}
                className="form-row"
              >
                <div>
                  <label style={labelStyle}>First name</label>
                  <input
                    type="text" placeholder="Sarah" required
                    value={firstname} onChange={(e) => setFirstname(e.target.value)}
                    style={inputStyle} {...focusHandlers}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Last name</label>
                  <input
                    type="text" placeholder="Chen" required
                    value={lastname} onChange={(e) => setLastname(e.target.value)}
                    style={inputStyle} {...focusHandlers}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label style={labelStyle}>Work email</label>
                <input
                  type="email" placeholder="sarah@company.com" required
                  value={email} onChange={(e) => setEmail(e.target.value)}
                  style={inputStyle} {...focusHandlers}
                />
              </div>

              {/* Company */}
              <div>
                <label style={labelStyle}>Company</label>
                <input
                  type="text" placeholder="Acme Corp"
                  value={company} onChange={(e) => setCompany(e.target.value)}
                  style={inputStyle} {...focusHandlers}
                />
              </div>

              {/* Role you're looking to fill — text input (Fix 0) */}
              <div>
                <label style={labelStyle}>Role you&apos;re looking to fill</label>
                <input
                  type="text"
                  placeholder="e.g. Head of Growth, GTM Architect"
                  value={roleType}
                  onChange={(e) => setRoleType(e.target.value)}
                  style={inputStyle}
                  {...focusHandlers}
                />
              </div>

              {/* Message */}
              <div>
                <label style={labelStyle}>Message (optional)</label>
                <textarea
                  placeholder="Tell me a bit about the role and company…"
                  value={message} onChange={(e) => setMessage(e.target.value)}
                  style={{ ...inputStyle, resize: 'vertical', minHeight: '90px', lineHeight: 1.55 }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'var(--brand)'
                    e.currentTarget.style.boxShadow   = '0 0 0 3px oklch(65% 0.17 78 / 0.10)'
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border)'
                    e.currentTarget.style.boxShadow   = 'none'
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                style={{
                  background: submitting ? 'var(--bg-elevated)' : 'var(--brand)',
                  color: submitting ? 'var(--fg-2)' : 'oklch(10% 0 0)',
                  fontFamily: 'var(--font-body), DM Sans, sans-serif',
                  fontSize: '14px', fontWeight: 600,
                  padding: '12px 24px', borderRadius: '8px',
                  border: 'none', cursor: submitting ? 'not-allowed' : 'pointer',
                  width: '100%',
                  transition: 'background 120ms var(--ease), transform 80ms',
                  boxShadow: submitting ? 'none' : '0 0 24px oklch(65% 0.17 78 / 0.08)',
                }}
                onMouseEnter={(e) => { if (!submitting) e.currentTarget.style.background = 'var(--brand-h)' }}
                onMouseLeave={(e) => { if (!submitting) e.currentTarget.style.background = 'var(--brand)'   }}
              >
                {submitting ? 'Sending…' : 'Send message →'}
              </button>

              <p style={{ fontSize: '11.5px', color: 'var(--fg-3)', textAlign: 'center', marginTop: '-4px' }}>
                {"You'll receive an AI-personalised reply within minutes — part of the automation running on this portfolio."}
              </p>
            </form>
          ) : (
            <div
              style={{
                background: 'var(--brand-s)',
                border: '1px solid oklch(65% 0.17 78 / 0.12)',
                borderRadius: '10px', padding: '32px', textAlign: 'center',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-display), Space Grotesk, sans-serif',
                  fontSize: '20px', fontWeight: 600, color: 'var(--brand)', marginBottom: '8px',
                }}
              >
                Message sent.
              </div>
              <p style={{ fontSize: '13.5px', color: 'var(--fg-2)', lineHeight: 1.6 }}>
                {"Message received. You'll get an AI-personalised reply within the next few minutes."}
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
