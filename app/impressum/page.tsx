import type { Metadata } from 'next'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'

export const metadata: Metadata = {
  title: 'Legal Notice — Julian Jais',
  description: 'Mandatory information pursuant to § 5 TMG.',
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
        <h1 style={h1Style}>Legal Notice</h1>

        <section style={sectionWrap}>
          <h2 style={h2Style}>Information pursuant to § 5 TMG</h2>
          <p style={pStyle}>
            Julian Jais
            <br />
            Städtelner Straße 21
            <br />
            04416 Markkleeberg
            <br />
            Germany
          </p>
        </section>

        <section style={sectionWrap}>
          <h2 style={h2Style}>Contact</h2>
          <p style={pStyle}>Email: julian.u.jais@gmail.com</p>
        </section>

        <section style={sectionWrap}>
          <h2 style={h2Style}>About this Website</h2>
          <p style={pStyle}>
            This website serves exclusively as a personal portfolio in the
            context of job applications. It is not operated commercially and
            does not contain any paid offers.
          </p>
        </section>

        <section style={sectionWrap}>
          <h2 style={h2Style}>Liability for Content</h2>
          <p style={pStyle}>
            As a service provider, I am responsible for my own content on this
            website in accordance with § 7 (1) TMG under general laws. However,
            pursuant to §§ 8 to 10 TMG, I am not obligated as a service
            provider to monitor third-party information transmitted or stored,
            or to investigate circumstances that indicate illegal activity.
          </p>
          <p style={pStyle}>
            Obligations to remove or block the use of information under general
            laws remain unaffected by this. However, liability in this regard
            is only possible from the point at which a specific legal
            violation becomes known. Upon becoming aware of corresponding
            legal violations, I will remove this content immediately.
          </p>
        </section>

        <section style={sectionWrap}>
          <h2 style={h2Style}>Liability for Links</h2>
          <p style={pStyle}>
            This website contains links to external third-party websites whose
            content I have no influence over. Therefore, I cannot assume any
            liability for this external content. The respective provider or
            operator of the pages is always responsible for the content of the
            linked pages.
          </p>
        </section>
      </article>

      <Footer />
    </main>
  )
}
