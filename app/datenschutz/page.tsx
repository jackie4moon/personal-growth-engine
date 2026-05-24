import type { Metadata } from 'next'
import type { CSSProperties } from 'react'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'

export const metadata: Metadata = {
  title: 'Privacy Policy — Julian Jais',
  description:
    'Information on the processing of personal data on julianjais.com.',
  robots: 'noindex, nofollow',
}

const sectionLabel: CSSProperties = {
  fontFamily: 'var(--font-mono), JetBrains Mono, monospace',
  fontSize: '11px',
  color: 'var(--brand)',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  marginBottom: '16px',
}

const h1: CSSProperties = {
  fontFamily: 'var(--font-display), Space Grotesk, sans-serif',
  fontSize: 'clamp(32px, 4.5vw, 44px)',
  fontWeight: 700,
  letterSpacing: '-0.03em',
  lineHeight: 1.15,
  color: 'var(--fg)',
  marginBottom: '12px',
}

const subTitle: CSSProperties = {
  fontFamily: 'var(--font-mono), JetBrains Mono, monospace',
  fontSize: '13px',
  color: 'var(--fg-2)',
  letterSpacing: '0.02em',
  marginBottom: '40px',
}

const h2: CSSProperties = {
  fontFamily: 'var(--font-display), Space Grotesk, sans-serif',
  fontSize: '22px',
  fontWeight: 600,
  letterSpacing: '-0.02em',
  color: 'var(--fg)',
  marginBottom: '16px',
}

const h3: CSSProperties = {
  fontFamily: 'var(--font-display), Space Grotesk, sans-serif',
  fontSize: '16px',
  fontWeight: 600,
  letterSpacing: '-0.01em',
  color: 'var(--fg)',
  marginTop: '22px',
  marginBottom: '10px',
}

const p: CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: '15px',
  color: 'var(--fg-2)',
  lineHeight: 1.65,
  marginBottom: '14px',
}

const sectionWrap: CSSProperties = {
  borderTop: '1px solid var(--border)',
  paddingTop: '40px',
  marginTop: '40px',
}

const stepList: CSSProperties = {
  listStyle: 'none',
  padding: 0,
  margin: '16px 0 0',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
}

const stepNumber: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '26px',
  height: '26px',
  borderRadius: '50%',
  background: 'var(--brand-s)',
  border: '1px solid oklch(65% 0.17 78 / 0.3)',
  color: 'var(--brand)',
  fontFamily: 'var(--font-mono), JetBrains Mono, monospace',
  fontSize: '12px',
  fontWeight: 600,
  flexShrink: 0,
}

const stepBody: CSSProperties = {
  flex: 1,
}

const stepTitle: CSSProperties = {
  fontFamily: 'var(--font-display), Space Grotesk, sans-serif',
  fontSize: '16px',
  fontWeight: 600,
  color: 'var(--fg)',
  marginBottom: '6px',
  letterSpacing: '-0.01em',
}

const stepText: CSSProperties = {
  ...p,
  marginBottom: '8px',
}

const stepLegal: CSSProperties = {
  fontFamily: 'var(--font-mono), JetBrains Mono, monospace',
  fontSize: '12px',
  color: 'var(--fg-3)',
  lineHeight: 1.55,
}

const rightsList: CSSProperties = {
  listStyle: 'none',
  padding: 0,
  margin: '16px 0 24px',
  display: 'flex',
  flexDirection: 'column',
  gap: '14px',
}

const rightItem: CSSProperties = {
  position: 'relative',
  paddingLeft: '22px',
}

const rightArrow: CSSProperties = {
  position: 'absolute',
  left: 0,
  top: 0,
  color: 'var(--brand)',
  fontWeight: 700,
}

const rightHead: CSSProperties = {
  fontFamily: 'var(--font-display), Space Grotesk, sans-serif',
  fontSize: '15px',
  fontWeight: 600,
  color: 'var(--fg)',
  marginBottom: '3px',
}

const rightBody: CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: '14.5px',
  color: 'var(--fg-2)',
  lineHeight: 1.6,
}

const table: CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse',
  marginTop: '16px',
  fontSize: '14px',
}

const th: CSSProperties = {
  textAlign: 'left',
  padding: '10px 12px',
  fontFamily: 'var(--font-mono), JetBrains Mono, monospace',
  fontSize: '11px',
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  color: 'var(--fg-3)',
  borderBottom: '1px solid var(--border)',
  background: 'var(--bg-subtle)',
}

const td: CSSProperties = {
  padding: '12px',
  color: 'var(--fg-2)',
  borderBottom: '1px solid var(--border)',
  verticalAlign: 'top',
  lineHeight: 1.5,
}

const ul: CSSProperties = {
  listStyle: 'none',
  padding: 0,
  margin: '8px 0 0',
}

const li: CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: '15px',
  color: 'var(--fg-2)',
  lineHeight: 1.6,
  paddingLeft: '16px',
  position: 'relative',
  marginBottom: '6px',
}

const liDot: CSSProperties = {
  position: 'absolute',
  left: 0,
  color: 'var(--brand)',
  fontWeight: 700,
}

const automationSteps: {
  number: string
  title: string
  body: string[]
  legal?: string
}[] = [
  {
    number: '1',
    title: 'Forwarding to n8n',
    body: [
      'Your form data is forwarded to a self-hosted n8n server that acts as the automation orchestrator.',
    ],
  },
  {
    number: '2',
    title: 'Data enrichment via Clay',
    body: [
      'Based on your email address and company, Clay (Clay Labs Inc., USA) enriches the inquiry with publicly available information — such as industry, company size, funding stage and tech stack.',
      'This enrichment is based on publicly accessible sources (e.g. LinkedIn, company websites, databases). Pursuant to Art. 14 GDPR, you are hereby informed of this processing.',
    ],
    legal:
      'Legal basis: Art. 6 (1) lit. f GDPR (legitimate interest in qualifying incoming contact inquiries). Third-country transfer to the USA based on SCCs.',
  },
  {
    number: '3',
    title: 'AI-generated reply via Claude API',
    body: [
      'The enriched data is transmitted to the Claude API operated by Anthropic, PBC (548 Market St, San Francisco, CA 94104, USA). An AI language model then drafts a personalised reply email.',
      'There is no automated decision-making within the meaning of Art. 22 GDPR — the AI only generates the text of the reply. The Enrichment Score (an internally calculated metric from 0–6 based on the completeness of the enrichment data) is used solely to prioritise incoming inquiries and has no legal or similarly significant effect on you.',
    ],
    legal:
      'Legal basis: Art. 6 (1) lit. f GDPR. Third-country transfer to the USA based on SCCs.',
  },
  {
    number: '4',
    title: 'Storage in HubSpot CRM',
    body: [
      'Your contact data is stored in HubSpot (HubSpot, Inc., 25 First Street, Cambridge, MA 02141, USA) to manage the communication.',
    ],
    legal:
      'Legal basis: Art. 6 (1) lit. f GDPR. Third-country transfer to the USA based on SCCs.',
  },
  {
    number: '5',
    title: 'Storage in BigQuery',
    body: [
      'Structured contact data is stored in Google BigQuery (Google Ireland Ltd., Gordon House, Barrow Street, Dublin 4, Ireland) in the EU region europe-west3 (Frankfurt).',
    ],
    legal: 'Legal basis: Art. 6 (1) lit. f GDPR.',
  },
]

const rights: { head: string; body: string }[] = [
  {
    head: 'Right to information (Art. 15)',
    body: 'You can request information about the personal data I process about you.',
  },
  {
    head: 'Right to rectification (Art. 16)',
    body: 'You have the right to have inaccurate data corrected.',
  },
  {
    head: 'Right to erasure (Art. 17)',
    body: 'You can request the deletion of your data, unless statutory retention obligations apply.',
  },
  {
    head: 'Right to restriction of processing (Art. 18)',
    body: 'You can request that the processing of your data be restricted.',
  },
  {
    head: 'Right to data portability (Art. 20)',
    body: 'You have the right to receive your data in a common, machine-readable format.',
  },
  {
    head: 'Right to object (Art. 21)',
    body: 'You can object to processing based on legitimate interests at any time.',
  },
  {
    head: 'Right to withdraw consent (Art. 7 (3))',
    body: 'You can withdraw your consent (e.g. for cookies) at any time via the cookie banner.',
  },
]

const storageRows: {
  kind: string
  tool: string
  duration: string
  deletion: string
}[] = [
  {
    kind: 'Website events (anonymised)',
    tool: 'GA4',
    duration: '14 months',
    deletion: 'Automatic',
  },
  {
    kind: 'CRM contact data',
    tool: 'HubSpot',
    duration: 'Until deletion request',
    deletion: 'On request',
  },
  {
    kind: 'Structured contact data',
    tool: 'BigQuery',
    duration: '24 months',
    deletion: 'On request',
  },
  {
    kind: 'Cookie consent',
    tool: 'CookieYes',
    duration: '12 months',
    deletion: 'On withdrawal',
  },
  {
    kind: 'Server logs',
    tool: 'Vercel',
    duration: '30 days',
    deletion: 'Automatic',
  },
]

const sccProviders: string[] = [
  'Vercel Inc. (Hosting)',
  'RudderStack Inc. (Event Tracking)',
  'HubSpot, Inc. (CRM)',
  'Clay Labs Inc. (Data enrichment)',
  'Calendly Inc. (Appointment booking)',
  'Anthropic, PBC (AI language model)',
  'Google Analytics 4 / Google LLC (Analytics)',
]

export default function DatenschutzPage() {
  return (
    <main style={{ background: 'var(--bg)', color: 'var(--fg)', minHeight: '100vh' }}>
      <Nav />

      <article style={{ maxWidth: '800px', margin: '0 auto', padding: '160px 40px 96px' }}>
        <div style={sectionLabel}>Legal</div>
        <h1 style={h1}>Privacy Policy</h1>
        <div style={subTitle}>Last updated: May 2026</div>

        <section style={sectionWrap}>
          <h2 style={h2}>1. Data Controller</h2>
          <p style={p}>
            Julian Jais
            <br />
            Städtelner Straße 21
            <br />
            04416 Markkleeberg
            <br />
            Germany
            <br />
            Email: julian.u.jais@gmail.com
          </p>
        </section>

        <section style={sectionWrap}>
          <h2 style={h2}>2. Overview of Data Processing</h2>
          <p style={p}>
            This website processes personal data when you fill out the contact form, book a meeting via the embedded calendar, or simply browse the site. The sections below explain which data is processed, for which purpose, and what rights you have.
          </p>
        </section>

        <section style={sectionWrap}>
          <h2 style={h2}>3. Hosting &amp; Technical Operation</h2>

          <h3 style={h3}>Vercel (Hosting)</h3>
          <p style={p}>
            This website is hosted by Vercel Inc., 340 Pine Street, Suite 900, San Francisco, CA 94104, USA. When the website is accessed, technical data (IP address, browser, timestamp) is automatically processed in Vercel access logs. Legal basis: Art. 6 (1) lit. f GDPR (legitimate interest in the secure operation of the website). Third-country transfer to the USA based on Standard Contractual Clauses (SCCs) pursuant to Art. 46 (2) lit. c GDPR.
          </p>

          <h3 style={h3}>n8n (Automation)</h3>
          <p style={p}>
            The automation workflows run on a self-hosted server at Hostinger UAB, Schwedenkai 1, 24103 Kiel, Germany (EU data center). Incoming form data is processed and forwarded from here.
          </p>
        </section>

        <section style={sectionWrap}>
          <h2 style={h2}>4. Contact Form</h2>
          <p style={p}>When you fill out the contact form, the following data is processed:</p>
          <ul style={ul}>
            {[
              'First name, last name',
              'Email address (business)',
              'Company',
              'Role being filled',
              'Message (optional)',
            ].map((item) => (
              <li key={item} style={li}>
                <span style={liDot} aria-hidden>›</span>
                {item}
              </li>
            ))}
          </ul>
          <p style={{ ...p, marginTop: '14px' }}>
            Purpose: handling your inquiry and getting back to you. Legal basis: Art. 6 (1) lit. b GDPR (pre-contractual measures) and Art. 6 (1) lit. f GDPR (legitimate interest in responding to inquiries).
          </p>

          <h3 style={h3}>Automated further processing after form submission</h3>
          <p style={p}>After submission, your inquiry runs through the following automated steps:</p>

          <ol style={stepList}>
            {automationSteps.map((step) => (
              <li key={step.number} style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                <span aria-hidden style={stepNumber}>
                  {step.number}
                </span>
                <div style={stepBody}>
                  <div style={stepTitle}>{step.title}</div>
                  {step.body.map((para, i) => (
                    <p key={i} style={stepText}>{para}</p>
                  ))}
                  {step.legal && <p style={stepLegal}>{step.legal}</p>}
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section style={sectionWrap}>
          <h2 style={h2}>5. Appointment Booking via Calendly</h2>
          <p style={p}>
            If you book a meeting via the embedded calendar widget, your data is processed directly by Calendly Inc., 271 17th St NW, Atlanta, GA 30363, USA.
          </p>
          <p style={p}>
            Data processed: name, email address, selected appointment slot. Purpose: coordinating and confirming the meeting. Legal basis: Art. 6 (1) lit. b GDPR. Third-country transfer to the USA based on SCCs.
          </p>
          <p style={p}>
            After booking, your appointment is retrieved via n8n and a briefing email is automatically prepared (see Section 4, Steps 1–3).
          </p>
          <p style={p}>
            Calendly&rsquo;s privacy policy:{' '}
            <a
              href="https://calendly.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--brand)', textDecoration: 'underline', textUnderlineOffset: '3px' }}
            >
              https://calendly.com/privacy
            </a>
          </p>
        </section>

        <section style={sectionWrap}>
          <h2 style={h2}>6. Website Tracking &amp; Cookies</h2>

          <h3 style={h3}>Cookie consent (CookieYes)</h3>
          <p style={p}>
            Cookie consent management is provided by CookieYes (Digital Compliance House Ltd., 483 Green Lanes, London, N13 4BS, UK). Your consent decision is stored in a cookie. Legal basis: Art. 6 (1) lit. c GDPR (legal obligation to obtain consent).
          </p>

          <h3 style={h3}>Google Tag Manager</h3>
          <p style={p}>
            Google Tag Manager (Google Ireland Ltd.) is used exclusively for tag management. GTM itself does not set analytics cookies and does not transmit personal data. It is activated only with prior consent.
          </p>

          <h3 style={h3}>RudderStack (Event Tracking) — only with consent</h3>
          <p style={p}>
            With your consent (Analytics category), the RudderStack JavaScript SDK is loaded. It captures user interactions such as page views, button clicks and form submissions as anonymised events.
          </p>
          <p style={p}>RudderStack forwards these events server-side to:</p>
          <ul style={ul}>
            {[
              'Google Analytics 4 (for funnel analysis)',
              'HubSpot (for contact identification)',
              'Google BigQuery (for data storage)',
            ].map((item) => (
              <li key={item} style={li}>
                <span style={liDot} aria-hidden>›</span>
                {item}
              </li>
            ))}
          </ul>
          <p style={{ ...p, marginTop: '14px' }}>
            Because RudderStack transmits GA4 data server-side, no Google Analytics cookies are set in the browser.
          </p>
          <p style={p}>
            Provider: RudderStack Inc., 685 Market Street, Suite 500, San Francisco, CA 94105, USA. Third-country transfer to the USA based on SCCs. Legal basis: Art. 6 (1) lit. a GDPR (consent).
          </p>

          <h3 style={h3}>HubSpot Tracking Pixel — only with consent</h3>
          <p style={p}>
            With your consent (Marketing category), the HubSpot tracking pixel is loaded. It recognises returning visitors and links website activity to CRM contact records. Provider: HubSpot, Inc., 25 First Street, Cambridge, MA 02141, USA. Third-country transfer to the USA based on SCCs. Legal basis: Art. 6 (1) lit. a GDPR (consent).
          </p>
        </section>

        <section style={sectionWrap}>
          <h2 style={h2}>7. Google Analytics 4 &amp; BigQuery</h2>
          <p style={p}>
            Website events are transmitted server-side via RudderStack to Google Analytics 4. No personal data is transferred directly to Google — RudderStack sends anonymised event data.
          </p>
          <p style={p}>
            Daily event exports from GA4 are stored in Google BigQuery in the EU region europe-west3 (Frankfurt) and are used to analyse the website funnel.
          </p>
          <p style={p}>
            Google Ireland Ltd., Gordon House, Barrow Street, Dublin 4, Ireland. Legal basis: Art. 6 (1) lit. a GDPR (consent).
          </p>
        </section>

        <section style={sectionWrap}>
          <h2 style={h2}>8. Storage Periods</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={table}>
              <thead>
                <tr>
                  <th style={th}>Data category</th>
                  <th style={th}>Tool</th>
                  <th style={th}>Storage period</th>
                  <th style={th}>Deletion</th>
                </tr>
              </thead>
              <tbody>
                {storageRows.map((row) => (
                  <tr key={row.kind}>
                    <td style={td}>{row.kind}</td>
                    <td style={td}>{row.tool}</td>
                    <td style={td}>{row.duration}</td>
                    <td style={td}>{row.deletion}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section style={sectionWrap}>
          <h2 style={h2}>9. Your Rights</h2>
          <p style={p}>Under the GDPR, you have the following rights:</p>
          <ul style={rightsList}>
            {rights.map((r) => (
              <li key={r.head} style={rightItem}>
                <span style={rightArrow} aria-hidden>→</span>
                <div style={rightHead}>{r.head}</div>
                <div style={rightBody}>{r.body}</div>
              </li>
            ))}
          </ul>
          <p style={p}>
            To exercise your rights, contact:{' '}
            <a
              href="mailto:julian.u.jais@gmail.com"
              style={{ color: 'var(--brand)', textDecoration: 'underline', textUnderlineOffset: '3px' }}
            >
              julian.u.jais@gmail.com
            </a>
          </p>
        </section>

        <section style={sectionWrap}>
          <h2 style={h2}>10. Right to Lodge a Complaint</h2>
          <p style={p}>
            You have the right to lodge a complaint with a supervisory authority. The competent authority for Saxony is:
          </p>
          <p style={p}>
            The Saxon Data Protection and Transparency Commissioner
            <br />
            Devrientstraße 5
            <br />
            01067 Dresden
            <br />
            <a
              href="https://www.saechsdsb.de"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--brand)', textDecoration: 'underline', textUnderlineOffset: '3px' }}
            >
              https://www.saechsdsb.de
            </a>
          </p>
        </section>

        <section style={sectionWrap}>
          <h2 style={h2}>11. Third-Country Transfers</h2>
          <p style={p}>
            Several tools used here transfer data to the United States. These transfers are based on Standard Contractual Clauses (SCCs) pursuant to Art. 46 (2) lit. c GDPR, which the European Commission has recognised as an adequate safeguard.
          </p>
          <p style={p}>Providers concerned:</p>
          <ul style={ul}>
            {sccProviders.map((item) => (
              <li key={item} style={li}>
                <span style={liDot} aria-hidden>›</span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section style={sectionWrap}>
          <h2 style={h2}>12. Changes to this Policy</h2>
          <p style={p}>
            This privacy policy may be updated when the website changes technically or when the legal situation changes. The current version is always available on this page. The date of the last update is shown at the top.
          </p>
        </section>
      </article>

      <Footer />
    </main>
  )
}
