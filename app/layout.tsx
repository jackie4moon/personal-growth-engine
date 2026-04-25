import type { Metadata } from 'next'
import { Space_Grotesk, DM_Sans, JetBrains_Mono } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import { AnalyticsProvider } from '@/components/analytics-provider'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['300', '400', '500', '600', '700'],
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['300', '400', '500'],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500'],
})

export const metadata: Metadata = {
  title: 'Julian Jais — GTM Engineer & Growth Operations',
  description:
    'Senior Growth Marketing & Operations professional specialising in AI-powered GTM systems, performance marketing, server-side tracking, and revenue analytics. Available for senior growth & ops roles.',
  keywords: [
    'GTM Engineer',
    'Growth Marketing',
    'Growth Operations',
    'AI Marketing Automation',
    'Performance Marketing',
    'Senior Marketing Manager',
  ],
  authors: [{ name: 'Julian Jais' }],
  openGraph: {
    title: 'Julian Jais — GTM Engineer & Growth Ops',
    description:
      'I build the systems that make marketing measurable, automated & scalable.',
    type: 'website',
    url: 'https://julianjais.com',
  },
}

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${dmSans.variable} ${jetbrainsMono.variable} bg-[oklch(8%_0_0)]`}
    >
      <body className="antialiased" style={{ fontFamily: 'var(--font-body), DM Sans, system-ui, sans-serif' }}>
        {/*
          GTM noscript fallback — renders an invisible iframe for users who have
          JavaScript disabled. Must be the first element inside <body>.
          TODO: Connect to Cookie Consent Banner (Phase 2) — only render after consent.
        */}
        {GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}

        <AnalyticsProvider>
          {children}
        </AnalyticsProvider>

        {/*
          GTM container script — strategy="afterInteractive" injects the script
          after the page becomes interactive (non-blocking for Core Web Vitals).
          GTM itself sets no cookies; individual tags inside GTM are blocked by
          Consent Mode v2 until the user accepts via the cookie banner.
          TODO: Connect to Cookie Consent Banner (Phase 2) — call
                gtag('consent', 'update', { analytics_storage: 'granted' })
                after user accepts.
        */}
        {GTM_ID && (
          <Script id="gtm-script" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
          </Script>
        )}
      </body>
    </html>
  )
}
