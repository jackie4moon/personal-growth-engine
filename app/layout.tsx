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
  metadataBase: new URL('https://julianjais.com'),
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
  // Site is link-only — keep all routes out of search engines by default.
  // Child pages inherit this unless they explicitly override `robots`.
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
  openGraph: {
    title: 'Julian Jais — GTM Engineer & Growth Ops',
    description:
      'I build the systems that make marketing measurable, automated & scalable.',
    type: 'website',
    url: 'https://julianjais.com',
    siteName: 'Julian Jais',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Julian Jais — GTM Engineer & Growth Ops',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Julian Jais — GTM Engineer & Growth Ops',
    description:
      'I build the systems that make marketing measurable, automated & scalable.',
    images: ['/og-image.png'],
  },
}

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID
const COOKIEYES_SCRIPT_ID = process.env.NEXT_PUBLIC_COOKIEYES_SCRIPT_ID

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
      <body className="antialiased" style={{ fontFamily: 'var(--font-body), DM Sans, system-ui, sans-serif' }} suppressHydrationWarning>
        {/*
          SCRIPT LOADING ORDER (critical for DSGVO / Consent Mode v2):
          Note: next/script ignores JSX position — strategy controls actual injection point.
          1. beforeInteractive  → injected into <head> before any page JS
          2. afterInteractive   → injected after page becomes interactive
          All Script tags must live inside <body> to avoid invalid HTML nesting.
        */}

        {/* 1. GTM Consent Mode v2 defaults — beforeInteractive so it runs before GTM */}
        <Script id="consent-mode-defaults" strategy="beforeInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag() { dataLayer.push(arguments); }
          gtag('consent', 'default', {
            analytics_storage:     'denied',
            ad_storage:            'denied',
            ad_user_data:          'denied',
            ad_personalization:    'denied',
            functionality_storage: 'denied',
            security_storage:      'granted'
          });
        `}</Script>

        {/* 2. CookieYes — DSGVO cookie banner */}
        {COOKIEYES_SCRIPT_ID && (
          <Script
            id="cookieyes"
            src={`https://cdn-cookieyes.com/client_data/${COOKIEYES_SCRIPT_ID}/script.js`}
            strategy="afterInteractive"
          />
        )}

        {/* 3. GTM container — afterInteractive, all tags blocked until CookieYes grants consent */}
        {GTM_ID && (
          <Script id="gtm-script" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
          </Script>
        )}

        {/* GTM noscript fallback for users with JavaScript disabled */}
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
      </body>
    </html>
  )
}
