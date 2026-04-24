import type { Metadata } from 'next'
import { Space_Grotesk, DM_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'

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
        {children}
      </body>
    </html>
  )
}
