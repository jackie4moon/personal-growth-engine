import type { Metadata } from 'next'
import type { CSSProperties } from 'react'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'

export const metadata: Metadata = {
  title: 'Datenschutzerklärung — Julian Jais',
  description:
    'Informationen zur Verarbeitung personenbezogener Daten auf julianjais.com.',
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
  title: string
  body: string[]
  legal?: string
}[] = [
  {
    title: '1. Weiterleitung an n8n',
    body: [
      'Deine Formulardaten werden an einen selbst gehosteten n8n-Server weitergeleitet, der als Automatisierungs-Orchestrator fungiert.',
    ],
  },
  {
    title: '2. Datenanreicherung via Clay',
    body: [
      'Auf Basis deiner E-Mail-Adresse und deines Unternehmens reichert Clay (Clay Labs Inc., USA) die Anfrage mit öffentlich verfügbaren Informationen an — etwa Unternehmensbranche, Unternehmensgröße, Finanzierungsphase und technologischem Stack.',
      'Diese Anreicherung erfolgt auf Basis öffentlich zugänglicher Quellen (z. B. LinkedIn, Unternehmenswebsites, Datenbanken). Du wirst gemäß Art. 14 DSGVO hiermit über diese Verarbeitung informiert.',
    ],
    legal:
      'Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Qualifizierung eingehender Kontaktanfragen). Drittlandtransfer in die USA auf Basis von SCCs.',
  },
  {
    title: '3. KI-gestützte Antwort via Claude API',
    body: [
      'Die angereicherten Daten werden an die Claude API von Anthropic, PBC (548 Market St, San Francisco, CA 94104, USA) übermittelt. Ein KI-Sprachmodell verfasst daraufhin eine personalisierte Antwort-E-Mail.',
      'Es findet keine automatisierte Entscheidungsfindung im Sinne des Art. 22 DSGVO statt — die KI erstellt ausschließlich den Text der Antwort. Der Enrichment Score (eine intern berechnete Kennzahl 0–6 auf Basis der Vollständigkeit der Anreicherungsdaten) dient lediglich der Priorisierung eingehender Anfragen und hat keine rechtlichen oder vergleichbar erheblichen Auswirkungen auf dich.',
    ],
    legal: 'Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO. Drittlandtransfer in die USA auf Basis von SCCs.',
  },
  {
    title: '4. Speicherung in HubSpot CRM',
    body: [
      'Deine Kontaktdaten werden in HubSpot (HubSpot, Inc., 25 First Street, Cambridge, MA 02141, USA) gespeichert, um die Kommunikation zu verwalten.',
    ],
    legal: 'Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO. Drittlandtransfer in die USA auf Basis von SCCs.',
  },
  {
    title: '5. Speicherung in BigQuery',
    body: [
      'Strukturierte Kontaktdaten werden in Google BigQuery (Google Ireland Ltd., Gordon House, Barrow Street, Dublin 4, Irland) im EU-Rechenzentrum europe-west3 (Frankfurt) gespeichert.',
    ],
    legal: 'Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO.',
  },
]

const rights: { head: string; body: string }[] = [
  { head: 'Auskunft (Art. 15)', body: 'Du kannst Auskunft über die von mir verarbeiteten personenbezogenen Daten verlangen.' },
  { head: 'Berichtigung (Art. 16)', body: 'Du hast das Recht, unrichtige Daten berichtigen zu lassen.' },
  { head: 'Löschung (Art. 17)', body: 'Du kannst die Löschung deiner Daten verlangen, soweit keine gesetzlichen Aufbewahrungspflichten entgegenstehen.' },
  { head: 'Einschränkung der Verarbeitung (Art. 18)', body: 'Du kannst die Einschränkung der Verarbeitung verlangen.' },
  { head: 'Datenübertragbarkeit (Art. 20)', body: 'Du hast das Recht, deine Daten in einem gängigen Format zu erhalten.' },
  { head: 'Widerspruch (Art. 21)', body: 'Du kannst der Verarbeitung auf Basis berechtigter Interessen jederzeit widersprechen.' },
  { head: 'Widerruf der Einwilligung (Art. 7 Abs. 3)', body: 'Einwilligungen (z. B. für Cookies) kannst du jederzeit über den Cookie-Banner widerrufen.' },
]

const storageRows: { kind: string; tool: string; duration: string; deletion: string }[] = [
  { kind: 'Website-Events (anonymisiert)', tool: 'GA4',       duration: '14 Monate',         deletion: 'Automatisch' },
  { kind: 'CRM-Kontaktdaten',              tool: 'HubSpot',   duration: 'Bis Löschanfrage',  deletion: 'Auf Anfrage' },
  { kind: 'Strukturierte Kontaktdaten',    tool: 'BigQuery',  duration: '24 Monate',         deletion: 'Auf Anfrage' },
  { kind: 'Cookie-Einwilligung',           tool: 'CookieYes', duration: '12 Monate',         deletion: 'Bei Widerruf' },
  { kind: 'Server-Logs',                   tool: 'Vercel',    duration: '30 Tage',           deletion: 'Automatisch' },
]

const sccProviders: string[] = [
  'Vercel Inc. (Hosting)',
  'RudderStack Inc. (Event Tracking)',
  'HubSpot, Inc. (CRM)',
  'Clay Labs Inc. (Datenanreicherung)',
  'Calendly Inc. (Terminbuchung)',
  'Anthropic, PBC (KI-Sprachmodell)',
  'Google Analytics 4 / Google LLC (Analytics)',
]

export default function DatenschutzPage() {
  return (
    <main style={{ background: 'var(--bg)', color: 'var(--fg)', minHeight: '100vh' }}>
      <Nav />

      <article style={{ maxWidth: '800px', margin: '0 auto', padding: '160px 40px 96px' }}>
        <div style={sectionLabel}>Legal</div>
        <h1 style={h1}>Datenschutzerklärung</h1>
        <div style={subTitle}>Zuletzt aktualisiert: Mai 2026</div>

        <section style={sectionWrap}>
          <h2 style={h2}>1. Verantwortlicher</h2>
          <p style={p}>
            Julian Jais
            <br />
            [STRASSE UND HAUSNUMMER]
            <br />
            04416 Markkleeberg
            <br />
            Deutschland
            <br />
            E-Mail: julian.u.jais@gmail.com
          </p>
        </section>

        <section style={sectionWrap}>
          <h2 style={h2}>2. Überblick der Datenverarbeitung</h2>
          <p style={p}>
            Auf dieser Website werden personenbezogene Daten verarbeitet, wenn du das Kontaktformular ausfüllst, einen Termin über den Kalender buchst oder die Website besuchst. Im Folgenden informiere ich dich darüber, welche Daten zu welchem Zweck verarbeitet werden und welche Rechte du hast.
          </p>
        </section>

        <section style={sectionWrap}>
          <h2 style={h2}>3. Hosting &amp; technischer Betrieb</h2>

          <h3 style={h3}>Vercel (Hosting)</h3>
          <p style={p}>
            Diese Website wird über Vercel Inc., 340 Pine Street, Suite 900, San Francisco, CA 94104, USA gehostet. Beim Aufruf der Website werden automatisch technische Daten (IP-Adresse, Browser, Zeitstempel) in Vercel-Zugriffsprotokollen verarbeitet. Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse am sicheren Betrieb der Website). Drittlandtransfer in die USA auf Basis von Standardvertragsklauseln (SCCs) gemäß Art. 46 Abs. 2 lit. c DSGVO.
          </p>

          <h3 style={h3}>n8n (Automatisierung)</h3>
          <p style={p}>
            Die Automatisierungsworkflows laufen auf einem selbst gehosteten Server bei Hostinger UAB, Schwedenkai 1, 24103 Kiel, Deutschland (EU-Rechenzentrum). Eingehende Formulardaten werden hier verarbeitet und weitergeleitet.
          </p>
        </section>

        <section style={sectionWrap}>
          <h2 style={h2}>4. Kontaktformular</h2>
          <p style={p}>Wenn du das Kontaktformular ausfüllst, verarbeite ich folgende Daten:</p>
          <ul style={ul}>
            {['Vorname, Nachname', 'E-Mail-Adresse (beruflich)', 'Unternehmen', 'Gesuchte Rolle', 'Nachricht (optional)'].map((item) => (
              <li key={item} style={li}>
                <span style={liDot} aria-hidden>›</span>
                {item}
              </li>
            ))}
          </ul>
          <p style={{ ...p, marginTop: '14px' }}>
            Zweck: Bearbeitung deiner Anfrage und Kontaktaufnahme. Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen) sowie Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Beantwortung von Anfragen).
          </p>

          <h3 style={h3}>Automatisierte Weiterverarbeitung nach Formularabgabe</h3>
          <p style={p}>Nach Abgabe des Formulars durchläuft deine Anfrage automatisiert folgende Schritte:</p>

          <ol style={stepList}>
            {automationSteps.map((step) => (
              <li key={step.title} style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                <span aria-hidden style={stepNumber}>
                  {step.title.slice(0, 1)}
                </span>
                <div style={stepBody}>
                  <div style={stepTitle}>{step.title.replace(/^\d+\.\s*/, '')}</div>
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
          <h2 style={h2}>5. Terminbuchung via Calendly</h2>
          <p style={p}>
            Wenn du über das eingebettete Kalender-Widget einen Termin buchst, verarbeitest du deine Daten direkt bei Calendly Inc., 271 17th St NW, Atlanta, GA 30363, USA.
          </p>
          <p style={p}>
            Verarbeitete Daten: Name, E-Mail-Adresse, gewählter Termin. Zweck: Koordination und Bestätigung des Gesprächstermins. Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO. Drittlandtransfer in die USA auf Basis von SCCs.
          </p>
          <p style={p}>
            Nach einer Buchung wird dein Termin über n8n abgerufen und eine Briefing-E-Mail automatisch vorbereitet (siehe Abschnitt 4, Schritte 1–3).
          </p>
          <p style={p}>
            Datenschutzerklärung von Calendly:{' '}
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
          <h2 style={h2}>6. Website-Tracking &amp; Cookies</h2>

          <h3 style={h3}>Cookie-Einwilligung (CookieYes)</h3>
          <p style={p}>
            Das Cookie-Consent-Management erfolgt über CookieYes (Digital Compliance House Ltd., 483 Green Lanes, London, N13 4BS, UK). Deine Einwilligungsentscheidung wird in einem Cookie gespeichert. Rechtsgrundlage: Art. 6 Abs. 1 lit. c DSGVO (rechtliche Verpflichtung zur Einholung von Einwilligungen).
          </p>

          <h3 style={h3}>Google Tag Manager</h3>
          <p style={p}>
            Google Tag Manager (Google Ireland Ltd.) wird ausschließlich zur Verwaltung von Tags verwendet. GTM setzt selbst keine Analytics-Cookies und überträgt keine personenbezogenen Daten. Es wird nur bei vorliegender Einwilligung aktiviert.
          </p>

          <h3 style={h3}>RudderStack (Event Tracking) — nur mit Einwilligung</h3>
          <p style={p}>
            Mit deiner Einwilligung (Analytics-Kategorie) wird das RudderStack JavaScript SDK geladen. Es erfasst Nutzerinteraktionen wie Seitenaufrufe, Button-Klicks und Formularabgaben als anonymisierte Events.
          </p>
          <p style={p}>RudderStack leitet diese Events serverseitig weiter an:</p>
          <ul style={ul}>
            {['Google Analytics 4 (zur Funnel-Analyse)', 'HubSpot (zur Kontakt-Identifikation)', 'Google BigQuery (zur Datenspeicherung)'].map((item) => (
              <li key={item} style={li}>
                <span style={liDot} aria-hidden>›</span>
                {item}
              </li>
            ))}
          </ul>
          <p style={{ ...p, marginTop: '14px' }}>
            Da RudderStack die GA4-Daten serverseitig übermittelt, werden keine Google Analytics-Cookies im Browser gesetzt.
          </p>
          <p style={p}>
            Anbieter: RudderStack Inc., 685 Market Street, Suite 500, San Francisco, CA 94105, USA. Drittlandtransfer in die USA auf Basis von SCCs. Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO (Einwilligung).
          </p>

          <h3 style={h3}>HubSpot Tracking Pixel — nur mit Einwilligung</h3>
          <p style={p}>
            Mit deiner Einwilligung (Marketing-Kategorie) wird das HubSpot-Tracking-Pixel geladen. Es erkennt wiederkehrende Besucher und verknüpft Website-Aktivitäten mit CRM-Kontaktdatensätzen. Anbieter: HubSpot, Inc., 25 First Street, Cambridge, MA 02141, USA. Drittlandtransfer in die USA auf Basis von SCCs. Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO (Einwilligung).
          </p>
        </section>

        <section style={sectionWrap}>
          <h2 style={h2}>7. Google Analytics 4 &amp; BigQuery</h2>
          <p style={p}>
            Website-Events werden serverseitig über RudderStack an Google Analytics 4 übermittelt. Dabei werden keine personenbezogenen Daten direkt an Google übertragen — RudderStack sendet anonymisierte Event-Daten.
          </p>
          <p style={p}>
            Tägliche Event-Exporte aus GA4 werden in Google BigQuery im EU-Rechenzentrum europe-west3 (Frankfurt) gespeichert und dienen der Analyse des Website-Funnels.
          </p>
          <p style={p}>
            Google Ireland Ltd., Gordon House, Barrow Street, Dublin 4, Irland. Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO (Einwilligung).
          </p>
        </section>

        <section style={sectionWrap}>
          <h2 style={h2}>8. Speicherdauer</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={table}>
              <thead>
                <tr>
                  <th style={th}>Datenkategorie</th>
                  <th style={th}>Tool</th>
                  <th style={th}>Speicherdauer</th>
                  <th style={th}>Löschung</th>
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
          <h2 style={h2}>9. Deine Rechte</h2>
          <p style={p}>Gemäß DSGVO stehen dir folgende Rechte zu:</p>
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
            Zur Ausübung deiner Rechte wende dich an:{' '}
            <a
              href="mailto:julian.u.jais@gmail.com"
              style={{ color: 'var(--brand)', textDecoration: 'underline', textUnderlineOffset: '3px' }}
            >
              julian.u.jais@gmail.com
            </a>
          </p>
        </section>

        <section style={sectionWrap}>
          <h2 style={h2}>10. Beschwerderecht</h2>
          <p style={p}>
            Du hast das Recht, dich bei einer Aufsichtsbehörde zu beschweren. Die zuständige Behörde für Sachsen ist:
          </p>
          <p style={p}>
            Der Sächsische Datenschutz- und Transparenzbeauftragte
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
          <h2 style={h2}>11. Drittlandtransfers</h2>
          <p style={p}>
            Mehrere eingesetzte Tools übermitteln Daten in die USA. Diese Transfers erfolgen auf Basis von Standardvertragsklauseln (SCCs) gemäß Art. 46 Abs. 2 lit. c DSGVO, die die Europäische Kommission als angemessene Schutzgarantie anerkannt hat.
          </p>
          <p style={p}>Betroffene Anbieter:</p>
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
          <h2 style={h2}>12. Änderungen dieser Erklärung</h2>
          <p style={p}>
            Diese Datenschutzerklärung kann bei technischen Änderungen der Website oder bei Änderungen der Rechtslage angepasst werden. Die jeweils aktuelle Version ist auf dieser Seite abrufbar. Das Datum der letzten Aktualisierung ist oben angegeben.
          </p>
        </section>
      </article>

      <Footer />
    </main>
  )
}
