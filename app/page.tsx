import { Nav } from '@/components/nav'
import { Hero } from '@/components/hero'
import { About } from '@/components/about'
import { Stack } from '@/components/stack'
import { Project } from '@/components/project'
import { Experience } from '@/components/experience'
import { BookSection } from '@/components/book-section'
import { Contact } from '@/components/contact'
import { Footer } from '@/components/footer'

export default function Page() {
  return (
    <main
      style={{
        background: 'var(--bg)',
        color: 'var(--fg)',
        minHeight: '100vh',
      }}
    >
      <Nav />
      <Hero />
      <About />
      <Stack />
      <Project />
      <Experience />
      <BookSection />
      <Contact />
      <Footer />

      {/* Global base styles — scoped here to avoid leaking into layout */}
      <style>{`
        :root {
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
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        html { scroll-behavior: smooth; }

        body {
          background: var(--bg);
          color: var(--fg);
          font-family: var(--font-body, 'DM Sans', system-ui, sans-serif);
          font-size: 15px;
          line-height: 1.6;
          -webkit-font-smoothing: antialiased;
        }

        input::placeholder,
        textarea::placeholder { color: oklch(40% 0 0); }

        select option { background: oklch(15% 0 0); }
      `}</style>
    </main>
  )
}
