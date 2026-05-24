import type { Metadata } from 'next'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'

export const metadata: Metadata = {
  title: 'Impressum — Julian Jais',
  description: 'Pflichtangaben gemäß § 5 TMG.',
  robots: 'noindex, nofollow',
}

const sectionLabelStyle = {
  fontFamily: 'var(--font-mono), JetBrains Mono, monospace',
  fontSize: '11px',
  color: 'var(--brand)',
  letterSpacing: '0.1em',
  textTransform: 'uppercase' as const,
  marginBottom: '16px',
}

const h1Style = {
  fontFamily: 'var(--font-display), Space Grotesk, sans-serif',
  fontSize: 'clamp(32px, 4.5vw, 44px)',
  fontWeight: 700,
  letterSpacing: '-0.03em',
  lineHeight: 1.15,
  color: 'var(--fg)',
  marginBottom: '40px',
}

const h2Style = {
  fontFamily: 'var(--font-display), Space Grotesk, sans-serif',
  fontSize: '22px',
  fontWeight: 600,
  letterSpacing: '-0.02em',
  color: 'var(--fg)',
  marginBottom: '14px',
}

const pStyle = {
  fontFamily: 'var(--font-body)',
  fontSize: '15px',
  color: 'var(--fg-2)',
  lineHeight: 1.65,
  marginBottom: '14px',
}

const sectionWrap = {
  borderTop: '1px solid var(--border)',
  paddingTop: '40px',
  marginTop: '40px',
}

export default function ImpressumPage() {
  return (
    <main
      style={{
        background: 'var(--bg)',
        color: 'var(--fg)',
        minHeight: '100vh',
      }}
    >
      <Nav />

      <article
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '160px 40px 96px',
        }}
      >
        <div style={sectionLabelStyle}>Legal</div>
        <h1 style={h1Style}>Impressum</h1>

        <section style={sectionWrap}>
          <h2 style={h2Style}>Angaben gemäß § 5 TMG</h2>
          <p style={pStyle}>
            Julian Jais
            <br />
            Sädtelner Strasße 21
            <br />
            04416 Markkleeberg
            <br />
            Deutschland
          </p>
        </section>

        <section style={sectionWrap}>
          <h2 style={h2Style}>Kontakt</h2>
          <p style={pStyle}>E-Mail: julian.u.jais@gmail.com</p>
        </section>

        <section style={sectionWrap}>
          <h2 style={h2Style}>Hinweis zur Website</h2>
          <p style={pStyle}>
            Diese Website dient ausschließlich der persönlichen Präsentation im
            Rahmen einer Bewerbung. Sie wird nicht kommerziell betrieben und
            enthält keine entgeltlichen Angebote.
          </p>
        </section>

        <section style={sectionWrap}>
          <h2 style={h2Style}>Haftung für Inhalte</h2>
          <p style={pStyle}>
            Als Diensteanbieter bin ich gemäß § 7 Abs. 1 TMG für eigene Inhalte
            auf dieser Website nach den allgemeinen Gesetzen verantwortlich.
            Nach §§ 8 bis 10 TMG bin ich als Diensteanbieter jedoch nicht
            verpflichtet, übermittelte oder gespeicherte fremde Informationen
            zu überwachen oder nach Umständen zu forschen, die auf eine
            rechtswidrige Tätigkeit hinweisen.
          </p>
          <p style={pStyle}>
            Verpflichtungen zur Entfernung oder Sperrung der Nutzung von
            Informationen nach den allgemeinen Gesetzen bleiben hiervon
            unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem
            Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich.
            Bei Bekanntwerden von entsprechenden Rechtsverletzungen werde ich
            diese Inhalte umgehend entfernen.
          </p>
        </section>

        <section style={sectionWrap}>
          <h2 style={h2Style}>Haftung für Links</h2>
          <p style={pStyle}>
            Diese Website enthält Links zu externen Websites Dritter, auf deren
            Inhalte ich keinen Einfluss habe. Deshalb kann ich für diese
            fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der
            verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber
            der Seiten verantwortlich.
          </p>
        </section>

        {/* Placeholder warning box */}
        <aside
          style={{
            marginTop: '48px',
            background: 'var(--bg-subtle)',
            borderLeft: '3px solid var(--brand)',
            borderRadius: '8px',
            padding: '20px 24px',
            fontFamily: 'var(--font-body)',
            fontSize: '14px',
            color: 'var(--fg-2)',
            lineHeight: 1.6,
          }}
        >
          <span aria-hidden style={{ marginRight: '8px' }}>
            ⚠️
          </span>
          <strong style={{ color: 'var(--fg)' }}>Platzhalter:</strong> Bitte
          trage vor dem Go-Live deine vollständige Straße und Hausnummer ein.
          Das Impressum ist ohne vollständige Anschrift nicht rechtssicher.
        </aside>
      </article>

      <Footer />
    </main>
  )
}
