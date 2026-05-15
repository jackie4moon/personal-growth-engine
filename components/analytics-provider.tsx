'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { trackPageView, trackSectionViewed, initConsentListeners } from '@/lib/analytics'

// Sections to observe — must match the `id` attributes in page.tsx
const TRACKED_SECTIONS = ['hero', 'about', 'stack', 'projects', 'experience', 'book', 'contact']

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const pageStartRef = useRef(Date.now())

  // Initialize CookieYes consent event listeners once on mount
  useEffect(() => {
    initConsentListeners()
  }, [])

  // Track page view on every route change
  useEffect(() => {
    pageStartRef.current = Date.now()
    trackPageView()
  }, [pathname])

  // Track section visibility using IntersectionObserver
  // Fires once per section when 30% of the section enters the viewport
  useEffect(() => {
    const observed = new Set<string>()
    const observers: IntersectionObserver[] = []

    TRACKED_SECTIONS.forEach((sectionId) => {
      const el = document.getElementById(sectionId)
      if (!el) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !observed.has(sectionId)) {
              observed.add(sectionId)
              const timeOnPage = Math.round((Date.now() - pageStartRef.current) / 1000)
              trackSectionViewed(sectionId, timeOnPage)
            }
          })
        },
        { threshold: 0.3 }
      )

      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [pathname])

  return <>{children}</>
}
