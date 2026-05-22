'use client'

import { useEffect } from 'react'
import { trackEvent } from '@/lib/analytics'

/**
 * Fires the demo_page_viewed event once on mount.
 * The generic page_viewed event still fires via AnalyticsProvider — this
 * adds an additional named event so the funnel dashboard can isolate
 * Demo-page traffic from the rest of the site.
 */
export function DemoTracker() {
  useEffect(() => {
    trackEvent('demo_page_viewed', { path: '/demo' })
  }, [])

  return null
}
