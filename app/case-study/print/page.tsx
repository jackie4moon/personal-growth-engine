import type { Metadata } from 'next'
import type { CSSProperties } from 'react'
import { ArchitectureFlow } from '@/components/architecture-flow'

export const metadata: Metadata = {
  title: 'Case Study — Personal Growth Engine',
  description:
    'GTM architecture case study — RudderStack CDP, n8n automation, Claude AI enrichment, BigQuery analytics.',
  // Inherits robots: noindex,nofollow from app/layout.tsx
}

// ───────────────────────────────────────────────────────────────────────
// Shared inline styles — site brand vars from app/page.tsx :root
// ───────────────────────────────────────────────────────────────────────
const page: CSSProperties = {
  width: '210mm',
  height: '297mm',  // fixed height (not minHeight) so content cannot trigger overflow → extra page
  background: 'var(--bg)',
  color: 'var(--fg)',
  padding: '14mm 14mm',
  boxSizing: 'border-box',
  position: 'relative',
  breakAfter: 'page',
  pageBreakAfter: 'always',
  overflow: 'hidden',
}

const sectionLabel: CSSProperties = {
  fontFamily: 'var(--font-mono), JetBrains Mono, monospace',
  fontSize: '10.5px',
  color: 'var(--brand)',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  marginBottom: '14px',
}

const h1: CSSProperties = {
  fontFamily: 'var(--font-display), Space Grotesk, sans-serif',
  fontSize: '52px',
  fontWeight: 700,
  letterSpacing: '-0.04em',
  lineHeight: 1.05,
  color: 'var(--fg)',
  marginBottom: '20px',
}

const h2: CSSProperties = {
  fontFamily: 'var(--font-display), Space Grotesk, sans-serif',
  fontSize: '26px',
  fontWeight: 700,
  letterSpacing: '-0.03em',
  lineHeight: 1.15,
  color: 'var(--fg)',
  marginBottom: '14px',
}

const h3: CSSProperties = {
  fontFamily: 'var(--font-display), Space Grotesk, sans-serif',
  fontSize: '16px',
  fontWeight: 600,
  letterSpacing: '-0.01em',
  color: 'var(--fg)',
  marginBottom: '8px',
}

const p: CSSProperties = {
  fontFamily: 'var(--font-body), DM Sans, sans-serif',
  fontSize: '11px',
  color: 'var(--fg-2)',
  lineHeight: 1.6,
  marginBottom: '10px',
}

const pillTag: CSSProperties = {
  display: 'inline-block',
  fontFamily: 'var(--font-mono), JetBrains Mono, monospace',
  fontSize: '9px',
  color: 'var(--brand)',
  background: 'var(--brand-s)',
  border: '1px solid oklch(65% 0.17 78 / 0.18)',
  borderRadius: '99px',
  padding: '3px 9px',
  marginRight: '5px',
  marginBottom: '5px',
  letterSpacing: '0.02em',
}

// ───────────────────────────────────────────────────────────────────────
// Data
// ───────────────────────────────────────────────────────────────────────
const coverMeta: [string, string][] = [
  ['Author', 'Julian Jais'],
  ['Role', 'GTM Architect · Growth Ops'],
  ['Website', 'julianjais.com'],
  ['Published', 'May 2026'],
  ['Version', '1.0'],
]

const metrics: { num: string; label: string }[] = [
  { num: '4', label: 'Phases completed' },
  { num: '8', label: 'Tools integrated' },
  { num: '0', label: 'Manual steps' },
  { num: '6 wks', label: 'Time to build' },
  { num: 'EU', label: 'Data location (GDPR)' },
  { num: '< €30', label: 'Stack cost / month' },
]

const demonstrates: string[] = [
  'End-to-end GTM architecture design and implementation',
  'First-party data infrastructure with consent management',
  'CDP fan-out routing (single event → multiple destinations)',
  'AI-powered workflow automation without code templates',
  'Server-side tracking to preserve data quality',
  'Cloud data warehousing in a GDPR-compliant setup',
]

const phase1 = {
  badge: '01',
  title: 'GTM + RudderStack',
  sub: 'Tracking Foundation',
  body: [
    'Set up the complete event-tracking stack from scratch. Google Tag Manager was configured with Consent Mode v2 defaults — all analytics denied until explicit user consent. CookieYes handles the consent banner and fires a custom event on update.',
    'RudderStack acts as the CDP layer: a single JavaScript SDK in the browser captures all events and fans them out server-side to GA4, HubSpot, and BigQuery simultaneously. No GA4 script in the browser — tracking happens entirely through RudderStack\'s backend.',
  ],
  events: [
    'page_viewed (past tense — GA4 reserves \'page_view\')',
    'cta_clicked (all CTA interactions)',
    'section_viewed (scroll depth via IntersectionObserver)',
    'contact_form_submitted',
    'meeting_booked (Calendly confirmation)',
  ],
  tags: ['GTM', 'RudderStack', 'CookieYes', 'GA4', 'DataLayer', 'Consent Mode v2', 'Next.js'],
}

const phase2 = {
  badge: '02',
  title: 'HubSpot & Calendly',
  sub: 'CRM Integration',
  body: [
    'Connected RudderStack to HubSpot as a destination. Every identify() call — triggered on contact form submission — creates or updates a contact record in HubSpot CRM automatically. No manual data entry, no Zapier middleman.',
    'Calendly was embedded directly in the Next.js page using the official widget. A postMessage listener captures the calendly.event_scheduled browser event and fires a meeting_booked track event into the RudderStack pipeline — landing in both GA4 and HubSpot simultaneously.',
    'Architecture decision: using RudderStack\'s native HubSpot destination instead of a GTM-triggered HubSpot pixel keeps the CRM integration consent-aware by default. The pixel only loads after Analytics consent is granted.',
  ],
  tags: ['HubSpot Free', 'Calendly', 'postMessage API', 'RudderStack Destinations', 'CRM Identify'],
}

const branchA = {
  title: 'Branch A · Contact Form',
  steps: [
    { head: 'Contact Form Submit', note: '' },
    { head: '/api/n8n Route', note: 'Next.js proxy to Clay webhook' },
    { head: 'Clay Enrichment', note: 'Company · industry · funding · tech stack · size · LinkedIn' },
    { head: 'n8n Relay Webhook', note: 'Enrichment score (0–6) · HubSpot upsert · BigQuery insert' },
    { head: 'Claude API', note: 'Personalised reply email' },
    { head: 'Gmail → Recruiter', note: '' },
  ],
}

const branchB = {
  title: 'Branch B · Calendly Booking',
  steps: [
    { head: 'Meeting booked on Calendly', note: '' },
    { head: 'n8n Calendly Poller', note: 'Hourly cron — no Calendly webhook needed' },
    { head: 'Clay Enrichment', note: 'Same pipeline as Branch A' },
    { head: 'n8n Relay', note: 'HubSpot upsert · BigQuery insert' },
    { head: 'Claude API', note: 'Briefing email (German) for Julian' },
    { head: 'Gmail → Julian', note: '' },
  ],
}

const phase3Decisions: string[] = [
  'Prompt engineering: Claude was initially writing "Hi [Name]," literally as a placeholder. Fixed by pre-computing firstName in the Code node and using an explicit system prompt: "NEVER use placeholders. Open with exactly: Hi {firstName},"',
  'Enrichment score: a 0–6 integer calculated from the number of Clay fields successfully populated (industry, company_size, funding_stage, tech_stack, linkedin_url, job_title). Written to BigQuery for lead quality analysis.',
]

const phase3Tags: string[] = ['n8n (self-hosted)', 'Clay Free', 'Claude API (Sonnet)', 'Gmail', 'Hostinger VPS', 'Webhooks', 'Calendly Poller']

const learnings: { title: string; body: string }[] = [
  {
    title: 'Consent architecture comes first, not last.',
    body: 'Building consent mode into the tracking foundation from day one — instead of retrofitting it — saved significant rework. Every downstream tool inherits the consent state automatically through RudderStack.',
  },
  {
    title: 'Workarounds are architecture decisions.',
    body: 'Both major blockers (OAuth2 vs service account keys, HTTP node vs native BigQuery node) produced more resilient solutions than the "happy path" would have. The direct REST API approach is actually more transparent and debuggable than the native node.',
  },
  {
    title: 'Prompt engineering is a real discipline.',
    body: 'Getting Claude to write "Hi Julian," instead of "Hi [Name]," required understanding how language models handle instructions vs. data. Pre-computing variables and explicit system-level constraints are non-negotiable in production AI workflows.',
  },
  {
    title: 'Server-side > client-side for data quality.',
    body: 'Routing GA4 data through RudderStack\'s backend eliminated ad-blocker interference, reduced browser cookie footprint, and simplified consent management — all simultaneously.',
  },
]

const wouldDoDifferently: string[] = [
  'Use a proper data catalogue from day one (BigQuery table descriptions, schema documentation)',
  'Set up staging and production environments for n8n workflows before going live',
  'Implement error alerting on the n8n relay webhook earlier — silent failures are hard to debug',
  'Consider RudderStack Cloud (managed) vs self-hosted for production use cases with SLA requirements',
]

const stack: [string, string, string, string, string][] = [
  ['Next.js', 'Frontend', 'Portfolio website', 'Vercel (EU CDN)', 'Free'],
  ['Vercel', 'Hosting', 'Deployment & CDN', 'USA / Global', 'Free'],
  ['GitHub', 'Version Control', 'Source code management', 'USA', 'Free'],
  ['GTM', 'Tag Mgmt', 'Tag orchestration', 'Google (EU)', 'Free'],
  ['CookieYes', 'Consent', 'Cookie consent banner', 'Cloud', 'Free'],
  ['RudderStack', 'CDP', 'Event capture & fan-out', 'Cloud (USA)', 'Free'],
  ['GA4', 'Analytics', 'Behavioural analytics', 'Google (USA)', 'Free'],
  ['HubSpot', 'CRM', 'Contact management', 'Cloud (USA)', 'Free'],
  ['Calendly', 'Scheduling', 'Meeting booking', 'Cloud (USA)', 'Free'],
  ['n8n', 'Automation', 'Workflow orchestration', 'Hostinger VPS', '~€5'],
  ['Clay', 'Enrichment', 'Lead data enrichment', 'Cloud (USA)', 'Free'],
  ['Claude API', 'AI', 'Personalised outreach', 'Anthropic (USA)', 'Pay-per-use'],
  ['BigQuery', 'Data Warehouse', 'Event & CRM storage', 'Google (EU-W3)', 'Free tier'],
  ['Looker Studio', 'BI', 'Analytics dashboards', 'Google', 'Free'],
]

// ───────────────────────────────────────────────────────────────────────
// Component
// ───────────────────────────────────────────────────────────────────────
export default function CaseStudyPrintPage() {
  return (
    <main className="case-study-print">
      {/* ── PAGE 1 — COVER ────────────────────────────────────────── */}
      <section style={{ ...page, display: 'flex', flexDirection: 'column' }}>
        <div style={sectionLabel}>Case Study · GTM Architecture</div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h1 style={h1}>Personal Growth Engine</h1>
          <p
            style={{
              fontFamily: 'var(--font-body), DM Sans, sans-serif',
              fontSize: '18px',
              color: 'var(--fg-2)',
              lineHeight: 1.5,
              maxWidth: '420px',
              marginBottom: '24px',
            }}
          >
            A live, automated GTM pipeline — built as a proof of concept for modern growth infrastructure.
          </p>
          <div style={{ width: '80px', height: '2px', background: 'var(--brand)' }} />
        </div>

        <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '10px', lineHeight: 1.8 }}>
          {coverMeta.map(([k, v]) => (
            <div key={k} style={{ display: 'flex' }}>
              <span style={{ color: 'var(--fg-3)', width: '90px', display: 'inline-block' }}>{k}:</span>
              <span style={{ color: 'var(--fg-2)' }}>{v}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── PAGE 2 — EXECUTIVE SUMMARY ───────────────────────────── */}
      <section style={page}>
        <div style={sectionLabel}>Executive Summary</div>
        <h2 style={h2}>The idea: invert the recruiting funnel.</h2>

        <p style={p}>
          Instead of sending cold applications, I built the same GTM systems I architect for companies —
          and deployed them on my own portfolio website. Every recruiter who visits julianjais.com becomes
          a lead in a live, automated pipeline.
        </p>
        <p style={p}>
          The system captures first-party behavioral data, enriches every contact with company intelligence,
          and sends an AI-personalised reply within minutes — without any manual intervention. This is not
          a demo environment. It runs in production, on real traffic, with real data flowing through every
          layer.
        </p>

        {/* Metrics grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '10px',
            margin: '24px 0',
          }}
        >
          {metrics.map((m) => (
            <div
              key={m.label}
              style={{
                background: 'var(--bg-subtle)',
                borderLeft: '3px solid var(--brand)',
                borderRadius: '8px',
                padding: '14px 16px',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-display), sans-serif',
                  fontSize: '24px',
                  fontWeight: 700,
                  letterSpacing: '-0.03em',
                  color: 'var(--fg)',
                  marginBottom: '4px',
                }}
              >
                {m.num}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: '9.5px',
                  color: 'var(--fg-3)',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                }}
              >
                {m.label}
              </div>
            </div>
          ))}
        </div>

        <h3 style={{ ...h3, fontSize: '17px', marginBottom: '12px', marginTop: '12px' }}>
          What this demonstrates
        </h3>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {demonstrates.map((d) => (
            <li key={d} style={{ ...p, paddingLeft: '18px', position: 'relative', marginBottom: '6px' }}>
              <span style={{ position: 'absolute', left: 0, color: 'var(--brand)', fontWeight: 700 }}>→</span>
              {d}
            </li>
          ))}
        </ul>
      </section>

      {/* ── PAGE 3 — ARCHITECTURE ─────────────────────────────────── */}
      <section style={page}>
        <div style={sectionLabel}>Architecture</div>
        <h2 style={h2}>How the pipeline works</h2>
        <p style={{ ...p, marginBottom: '20px' }}>
          Two entry points feed a single automation backbone. Every layer was chosen for integration depth
          and real-world applicability — not resume padding.
        </p>
        <div className="arch-print-scale">
          <ArchitectureFlow />
        </div>
      </section>

      {/* ── PAGE 4 — PHASES 01 + 02 ──────────────────────────────── */}
      <section style={page}>
        <div style={sectionLabel}>Phases</div>
        <h2 style={h2}>Build phases 1 &amp; 2</h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px', marginTop: '14px' }}>
          {/* Phase 1 */}
          <div>
            <span
              style={{
                display: 'inline-block',
                background: 'var(--brand)',
                color: 'oklch(10% 0 0)',
                fontFamily: 'var(--font-mono), monospace',
                fontSize: '10px',
                fontWeight: 700,
                padding: '3px 8px',
                borderRadius: '4px',
                marginBottom: '10px',
              }}
            >
              {phase1.badge}
            </span>
            <h3 style={h3}>{phase1.title}</h3>
            <div
              style={{
                fontFamily: 'var(--font-body), sans-serif',
                fontSize: '11px',
                color: 'var(--brand)',
                marginBottom: '10px',
              }}
            >
              {phase1.sub}
            </div>
            {phase1.body.map((para, i) => (
              <p key={i} style={{ ...p, fontSize: '10px' }}>{para}</p>
            ))}
            <div style={{ ...p, fontSize: '10px', marginTop: '4px' }}>Custom DataLayer events:</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: '4px 0 12px' }}>
              {phase1.events.map((e) => (
                <li
                  key={e}
                  style={{
                    ...p,
                    fontFamily: 'var(--font-mono), monospace',
                    fontSize: '9px',
                    paddingLeft: '12px',
                    position: 'relative',
                    marginBottom: '3px',
                    color: 'var(--fg-2)',
                  }}
                >
                  <span style={{ position: 'absolute', left: 0, color: 'var(--brand)' }}>·</span>
                  {e}
                </li>
              ))}
            </ul>
            <div>
              {phase1.tags.map((t) => (
                <span key={t} style={pillTag}>{t}</span>
              ))}
            </div>
          </div>

          {/* Phase 2 */}
          <div>
            <span
              style={{
                display: 'inline-block',
                background: 'var(--brand)',
                color: 'oklch(10% 0 0)',
                fontFamily: 'var(--font-mono), monospace',
                fontSize: '10px',
                fontWeight: 700,
                padding: '3px 8px',
                borderRadius: '4px',
                marginBottom: '10px',
              }}
            >
              {phase2.badge}
            </span>
            <h3 style={h3}>{phase2.title}</h3>
            <div
              style={{
                fontFamily: 'var(--font-body), sans-serif',
                fontSize: '11px',
                color: 'var(--brand)',
                marginBottom: '10px',
              }}
            >
              {phase2.sub}
            </div>
            {phase2.body.map((para, i) => (
              <p key={i} style={{ ...p, fontSize: '10px' }}>{para}</p>
            ))}
            <div style={{ marginTop: '14px' }}>
              {phase2.tags.map((t) => (
                <span key={t} style={pillTag}>{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Key challenge */}
        <div
          style={{
            background: 'var(--bg-subtle)',
            borderLeft: '3px solid var(--brand)',
            borderRadius: '6px',
            padding: '14px 18px',
            marginTop: '22px',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: '9px',
              color: 'var(--brand)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '6px',
            }}
          >
            Key challenge solved · Phase 1
          </div>
          <p style={{ ...p, fontSize: '10px', marginBottom: 0 }}>
            CookieYes fires &apos;cookieyes_consent_update&apos; (underscore) in current versions — the listener was
            built for &apos;cookieyes-consent-update&apos; (hyphen). Fixed with a robust multi-event listener on both
            document and window, supporting all known event name variants.
          </p>
        </div>
      </section>

      {/* ── PAGE 5 — PHASE 03 ────────────────────────────────────── */}
      <section style={page}>
        <div style={{ ...sectionLabel, display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span>Phase 03</span>
          <span
            style={{
              background: 'var(--brand)',
              color: 'oklch(10% 0 0)',
              padding: '2px 8px',
              borderRadius: '4px',
              fontSize: '11px',
              fontWeight: 700,
            }}
          >
            03
          </span>
        </div>
        <h2 style={h2}>n8n Workflow</h2>
        <div
          style={{
            fontFamily: 'var(--font-body), sans-serif',
            fontSize: '13px',
            color: 'var(--brand)',
            marginBottom: '12px',
          }}
        >
          Enrichment &amp; AI Outreach
        </div>
        <p style={p}>
          The automation backbone — the layer that turns a form submission into a personalised conversation
          within minutes.
        </p>

        {/* Two branches */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginTop: '18px' }}>
          {[branchA, branchB].map((branch) => (
            <div
              key={branch.title}
              style={{
                background: 'var(--bg-subtle)',
                borderRadius: '8px',
                padding: '14px 16px',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: '9px',
                  color: 'var(--brand)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginBottom: '10px',
                }}
              >
                {branch.title}
              </div>
              <ol style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {branch.steps.map((s, i) => (
                  <li key={i} style={{ display: 'flex', gap: '10px', marginBottom: i < branch.steps.length - 1 ? '10px' : 0 }}>
                    <span
                      style={{
                        flexShrink: 0,
                        width: '18px',
                        height: '18px',
                        borderRadius: '50%',
                        background: 'var(--brand)',
                        color: 'oklch(10% 0 0)',
                        fontFamily: 'var(--font-mono), monospace',
                        fontSize: '9px',
                        fontWeight: 700,
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {i + 1}
                    </span>
                    <div>
                      <div
                        style={{
                          fontFamily: 'var(--font-display), sans-serif',
                          fontSize: '10.5px',
                          fontWeight: 600,
                          color: 'var(--fg)',
                          lineHeight: 1.3,
                        }}
                      >
                        {s.head}
                      </div>
                      {s.note && (
                        <div
                          style={{
                            fontFamily: 'var(--font-body), sans-serif',
                            fontSize: '9px',
                            color: 'var(--fg-2)',
                            lineHeight: 1.4,
                            marginTop: '2px',
                          }}
                        >
                          {s.note}
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>

        {/* Key decisions */}
        <h3 style={{ ...h3, marginTop: '18px' }}>Key decisions</h3>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {phase3Decisions.map((d, i) => (
            <li key={i} style={{ ...p, fontSize: '10px', paddingLeft: '14px', position: 'relative', marginBottom: '8px' }}>
              <span style={{ position: 'absolute', left: 0, color: 'var(--brand)', fontWeight: 700 }}>·</span>
              {d}
            </li>
          ))}
        </ul>

        <div style={{ marginTop: '12px' }}>
          {phase3Tags.map((t) => (
            <span key={t} style={pillTag}>{t}</span>
          ))}
        </div>
      </section>

      {/* ── PAGE 6 — PHASE 04 ────────────────────────────────────── */}
      <section style={page}>
        <div style={{ ...sectionLabel, display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span>Phase 04</span>
          <span
            style={{
              background: 'var(--brand)',
              color: 'oklch(10% 0 0)',
              padding: '2px 8px',
              borderRadius: '4px',
              fontSize: '11px',
              fontWeight: 700,
            }}
          >
            04
          </span>
        </div>
        <h2 style={h2}>BigQuery + Analytics</h2>
        <div
          style={{
            fontFamily: 'var(--font-body), sans-serif',
            fontSize: '13px',
            color: 'var(--brand)',
            marginBottom: '14px',
          }}
        >
          Data Infrastructure
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>
          <div>
            <h3 style={h3}>GA4 → BigQuery</h3>
            <p style={{ ...p, fontSize: '10px' }}>
              Activated GA4&apos;s native BigQuery linking — no code required. Daily exports land in dataset
              analytics_534559293 as events_YYYYMMDD tables, partitioned by date. Export runs in the EU
              region (GDPR compliant). Streaming export was deliberately disabled to stay within the free
              tier.
            </p>
            <p style={{ ...p, fontSize: '10px' }}>
              Since GA4 receives data via RudderStack&apos;s server-side pipeline (no GA4 browser script),
              there are no GA4 cookies on the website — a privacy architecture advantage.
            </p>
            <p style={{ ...p, fontSize: '9.5px', color: 'var(--fg-3)' }}>
              Available tables (as of Phase 4 close): events_20260518 through events_20260521 ✓ —
              page_viewed fix deployed 20260522.
            </p>
          </div>

          <div>
            <h3 style={h3}>n8n → BigQuery</h3>
            <p style={{ ...p, fontSize: '10px' }}>Two blockers required creative workarounds.</p>

            <div
              style={{
                fontFamily: 'var(--font-display), sans-serif',
                fontSize: '10.5px',
                fontWeight: 600,
                color: 'var(--brand)',
                marginBottom: '4px',
                marginTop: '8px',
              }}
            >
              Blocker 1 — Service account keys
            </div>
            <p style={{ ...p, fontSize: '9.5px' }}>
              Google&apos;s default policy iam.disableServiceAccountKeyCreation was active — no JSON keys
              could be created on a personal Gmail account. Solution: OAuth2 Client ID instead of service
              account. Credentials stored in n8n, tokens refreshed automatically.
            </p>

            <div
              style={{
                fontFamily: 'var(--font-display), sans-serif',
                fontSize: '10.5px',
                fontWeight: 600,
                color: 'var(--brand)',
                marginBottom: '4px',
                marginTop: '8px',
              }}
            >
              Blocker 2 — Native BigQuery node bug
            </div>
            <p style={{ ...p, fontSize: '9.5px' }}>
              n8n BigQuery node v2.1 threw a validator error (&apos;timestamp is required&apos;) despite correct
              input. Solution: replaced with a direct HTTP Request node calling the BigQuery REST API
              insertAll endpoint with the same OAuth2 credential.
            </p>
          </div>
        </div>

        {/* Schema box */}
        <div
          style={{
            background: 'var(--bg-subtle)',
            borderLeft: '3px solid var(--brand)',
            borderRadius: '6px',
            padding: '14px 18px',
            marginTop: '16px',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: '9px',
              color: 'var(--brand)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '6px',
            }}
          >
            Schema · crm_data.contacts (europe-west3)
          </div>
          <div
            style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: '9px',
              color: 'var(--fg-2)',
              lineHeight: 1.6,
            }}
          >
            timestamp, source, email, first_name, last_name, company, job_title, linkedin_url, industry,
            company_size, funding_stage, tech_stack, hubspot_contact_id, enrichment_score
          </div>
          <div
            style={{
              fontFamily: 'var(--font-body), sans-serif',
              fontSize: '9.5px',
              color: 'var(--fg-3)',
              marginTop: '8px',
            }}
          >
            Verification: 3 test rows written, all with enrichment_score 4/6.
          </div>
        </div>

        <div style={{ marginTop: '14px' }}>
          {['BigQuery', 'GA4 Native Export', 'OAuth2', 'n8n HTTP Request', 'europe-west3', 'Looker Studio'].map(
            (t) => (
              <span key={t} style={pillTag}>{t}</span>
            ),
          )}
        </div>
      </section>

      {/* ── PAGE 7 — LEARNINGS ───────────────────────────────────── */}
      <section style={page}>
        <div style={sectionLabel}>Reflections</div>
        <h2 style={h2}>What I learned</h2>

        <ol style={{ listStyle: 'none', padding: 0, margin: '16px 0 0' }}>
          {learnings.map((l, i) => (
            <li key={i} style={{ display: 'flex', gap: '14px', marginBottom: '16px' }}>
              <span
                style={{
                  flexShrink: 0,
                  width: '26px',
                  height: '26px',
                  borderRadius: '50%',
                  background: 'var(--bg-subtle)',
                  border: '1px solid oklch(65% 0.17 78 / 0.35)',
                  color: 'var(--brand)',
                  fontFamily: 'var(--font-display), sans-serif',
                  fontSize: '12px',
                  fontWeight: 700,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {i + 1}
              </span>
              <div>
                <div style={{ ...h3, fontSize: '13px', marginBottom: '4px' }}>{l.title}</div>
                <p style={{ ...p, fontSize: '10.5px', marginBottom: 0 }}>{l.body}</p>
              </div>
            </li>
          ))}
        </ol>

        <div style={{ height: '1px', background: 'var(--brand)', margin: '20px 0' }} />

        <h3 style={{ ...h3, fontSize: '16px' }}>What I would do differently</h3>
        <ul style={{ listStyle: 'none', padding: 0, margin: '8px 0 0' }}>
          {wouldDoDifferently.map((w) => (
            <li key={w} style={{ ...p, paddingLeft: '18px', position: 'relative', marginBottom: '6px' }}>
              <span style={{ position: 'absolute', left: 0, color: 'var(--brand)', fontWeight: 700 }}>→</span>
              {w}
            </li>
          ))}
        </ul>
      </section>

      {/* ── PAGE 8 — TECH STACK ──────────────────────────────────── */}
      <section style={{ ...page, breakAfter: 'auto', pageBreakAfter: 'auto' }}>
        <div style={sectionLabel}>Tech Stack</div>
        <h2 style={h2}>Full tool reference</h2>

        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '10px',
            marginTop: '14px',
          }}
        >
          <thead>
            <tr>
              {['Tool', 'Category', 'Purpose', 'Hosting', 'Cost/mo'].map((h) => (
                <th
                  key={h}
                  style={{
                    textAlign: 'left',
                    padding: '8px 10px',
                    fontFamily: 'var(--font-mono), monospace',
                    fontSize: '9px',
                    fontWeight: 700,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    color: 'oklch(10% 0 0)',
                    background: 'var(--brand)',
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {stack.map((row, i) => (
              <tr key={row[0]} style={{ background: i % 2 === 0 ? 'var(--bg-subtle)' : 'transparent' }}>
                <td
                  style={{
                    padding: '8px 10px',
                    fontFamily: 'var(--font-mono), monospace',
                    color: 'var(--fg)',
                    fontSize: '10px',
                  }}
                >
                  {row[0]}
                </td>
                {row.slice(1).map((cell, j) => (
                  <td
                    key={j}
                    style={{
                      padding: '8px 10px',
                      fontFamily: 'var(--font-body), sans-serif',
                      color: 'var(--fg-2)',
                      fontSize: '10px',
                    }}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Summary box */}
        <div
          style={{
            background: 'var(--bg-subtle)',
            borderLeft: '3px solid var(--brand)',
            borderRadius: '6px',
            padding: '14px 18px',
            marginTop: '20px',
            display: 'flex',
            alignItems: 'baseline',
            gap: '14px',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: '10px',
              color: 'var(--brand)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            Total
          </div>
          <div
            style={{
              fontFamily: 'var(--font-display), sans-serif',
              fontSize: '18px',
              fontWeight: 700,
              color: 'var(--fg)',
              letterSpacing: '-0.02em',
            }}
          >
            ~€5–15 / month
          </div>
          <div style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '10px', color: 'var(--fg-3)' }}>
            depending on Claude API usage volume
          </div>
        </div>

        <div style={{ height: '1px', background: 'var(--border)', margin: '24px 0 12px' }} />
        <div
          style={{
            fontFamily: 'var(--font-body), sans-serif',
            fontSize: '10px',
            color: 'var(--fg-3)',
            textAlign: 'center',
          }}
        >
          Built by Julian Jais · julianjais.com · May 2026 — This document may be shared freely.
        </div>
      </section>

      <style>{`
        /* ── BRAND CSS VARS (mirrored from app/page.tsx :root for the print route) */
        .case-study-print {
          --bg:            oklch(8%  0 0);
          --bg-subtle:     oklch(12% 0 0);
          --bg-elevated:   oklch(17% 0 0);
          --border:        oklch(22% 0 0);
          --border-hover:  oklch(32% 0 0);
          --fg:            oklch(94% 0 0);
          --fg-2:          oklch(75% 0 0);
          --fg-3:          oklch(82% 0 0);
          --brand:         oklch(68% 0.17 78);
          --brand-h:       oklch(75% 0.15 78);
          --brand-s:       oklch(16% 0.05 78);
          --ease:          cubic-bezier(0.16, 1, 0.3, 1);
          background:      var(--bg);
          color:           var(--fg);
        }

        /* ── PRINT MODE ── */
        @page { size: A4; margin: 0; }

        @media print {
          html, body, .case-study-print {
            background: var(--bg) !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          /* Hide global widgets that would interfere with the print document */
          .cky-consent-container, .cky-modal, .cky-revisit-bottom-left,
          .cky-consent-bar, [class*="cookieyes"], iframe[src*="cookieyes"],
          script, noscript {
            display: none !important;
          }
          /* No hover styling in print */
          *, *:hover { transition: none !important; }
        }

        /* ── ARCH DIAGRAM scale-fit for the architecture page ── */
        .arch-print-scale {
          transform: scale(0.74);
          transform-origin: top left;
          width: 135%;
          margin-bottom: -200px;
        }
        /* Force desktop architecture view inside print page even at narrow viewport */
        .arch-print-scale .arch-desktop-wrap { display: block !important; }
        .arch-print-scale .arch-mobile { display: none !important; }
      `}</style>
    </main>
  )
}
