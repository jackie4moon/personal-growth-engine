'use client'

import { useState, type CSSProperties } from 'react'

type NodeData = {
  id: string
  label: string
  icon: string
  sub: string
  x: number
  y: number
  highlight: boolean
  tooltip: string
}

type EdgeData = { from: string; to: string }

const NODE_W = 170
const NODE_H = 76
const CANVAS_W = 880
const CANVAS_H = 720

const NODES: NodeData[] = [
  // Layer 1 — Entry Points
  {
    id: 'A',
    label: 'julianjais.com',
    icon: '🌐',
    sub: 'Next.js · Vercel',
    x: 200,
    y: 20,
    highlight: true,
    tooltip:
      'The portfolio website — every page view, CTA click and form submit is a trackable event.',
  },
  {
    id: 'B',
    label: 'Calendly',
    icon: '📅',
    sub: 'Meeting booked',
    x: 580,
    y: 20,
    highlight: false,
    tooltip:
      'When a recruiter books a call, Calendly fires a webhook that enters the automation pipeline.',
  },

  // Layer 2 — Capture Layer
  {
    id: 'C',
    label: 'GTM Container',
    icon: '🏷️',
    sub: 'Tag management · consent-aware',
    x: 200,
    y: 140,
    highlight: false,
    tooltip:
      'Google Tag Manager manages all tags with consent-mode defaults — no data without permission.',
  },
  {
    id: 'D',
    label: 'RudderStack CDP',
    icon: '🔀',
    sub: 'Event capture · Fan-out routing',
    x: 400,
    y: 140,
    highlight: true,
    tooltip:
      'RudderStack receives every event and fans it out to multiple destinations simultaneously.',
  },

  // Layer 3 — Parallel outputs
  {
    id: 'E',
    label: 'GA4',
    icon: '📊',
    sub: 'Event tracking',
    x: 60,
    y: 260,
    highlight: false,
    tooltip:
      'GA4 receives behavioral events for funnel analysis and native BigQuery export.',
  },
  {
    id: 'F',
    label: 'HubSpot CRM',
    icon: '🟠',
    sub: 'Contact identify',
    x: 320,
    y: 260,
    highlight: false,
    tooltip:
      "RudderStack's identify() call creates or updates the contact record in HubSpot CRM.",
  },
  {
    id: 'G',
    label: 'n8n Automation',
    icon: '⚙️',
    sub: 'Workflow engine · VPS',
    x: 580,
    y: 260,
    highlight: true,
    tooltip:
      'n8n is the automation backbone — running on a self-hosted VPS, orchestrating all workflows.',
  },

  // Layer 4 — Enrichment
  {
    id: 'H',
    label: 'Clay',
    icon: '🔬',
    sub: 'Lead enrichment · scoring',
    x: 580,
    y: 380,
    highlight: false,
    tooltip:
      'Clay enriches every lead with company data, job title, tech stack, and funding stage.',
  },

  // Layer 5 — AI + Data
  {
    id: 'I',
    label: 'Claude API',
    icon: '🤖',
    sub: 'AI-personalised outreach',
    x: 440,
    y: 500,
    highlight: true,
    tooltip:
      'Claude API writes a personalised outreach email based on enrichment data — no templates.',
  },
  {
    id: 'J',
    label: 'BigQuery',
    icon: '🗄️',
    sub: 'Data warehouse · EU region',
    x: 620,
    y: 500,
    highlight: false,
    tooltip:
      'BigQuery stores all website events (GA4 export) and CRM data (n8n HTTP insert) in EU region.',
  },

  // Layer 6 — Outputs
  {
    id: 'K',
    label: 'Gmail',
    icon: '✉️',
    sub: 'AI reply · auto-sent',
    x: 440,
    y: 620,
    highlight: false,
    tooltip:
      "The AI-written reply lands in the recruiter's inbox within minutes of their form submission.",
  },
  {
    id: 'L',
    label: 'Looker Studio',
    icon: '📈',
    sub: 'Revenue analytics dashboard',
    x: 620,
    y: 620,
    highlight: false,
    tooltip:
      'Looker Studio dashboards visualise the full funnel from first touch to pipeline opportunity.',
  },
]

const EDGES: EdgeData[] = [
  { from: 'A', to: 'C' },
  { from: 'A', to: 'D' },
  { from: 'B', to: 'G' },
  { from: 'C', to: 'D' },
  { from: 'D', to: 'E' },
  { from: 'D', to: 'F' },
  { from: 'D', to: 'G' },
  { from: 'G', to: 'H' },
  { from: 'H', to: 'I' },
  { from: 'H', to: 'J' },
  { from: 'I', to: 'K' },
  { from: 'J', to: 'L' },
]

// Endpoint helper: returns top/bottom/left/right midpoints of a node
function nodeAnchor(
  node: NodeData,
  side: 'top' | 'bottom' | 'left' | 'right'
): { x: number; y: number } {
  const cx = node.x + NODE_W / 2
  const cy = node.y + NODE_H / 2
  switch (side) {
    case 'top':
      return { x: cx, y: node.y }
    case 'bottom':
      return { x: cx, y: node.y + NODE_H }
    case 'left':
      return { x: node.x, y: cy }
    case 'right':
      return { x: node.x + NODE_W, y: cy }
  }
}

// Pick sensible anchors based on relative position
function pickEndpoints(
  from: NodeData,
  to: NodeData
): { p1: { x: number; y: number }; p2: { x: number; y: number } } {
  // Same row → horizontal connector
  if (from.y === to.y) {
    if (from.x < to.x) {
      return { p1: nodeAnchor(from, 'right'), p2: nodeAnchor(to, 'left') }
    }
    return { p1: nodeAnchor(from, 'left'), p2: nodeAnchor(to, 'right') }
  }
  // Otherwise: bottom of higher → top of lower
  return {
    p1: nodeAnchor(from, from.y < to.y ? 'bottom' : 'top'),
    p2: nodeAnchor(to, from.y < to.y ? 'top' : 'bottom'),
  }
}

export function ArchitectureFlow() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const nodeById = Object.fromEntries(NODES.map((n) => [n.id, n])) as Record<
    string,
    NodeData
  >

  const hoveredNode = hoveredId ? nodeById[hoveredId] : null

  const isEdgeActive = (e: EdgeData) =>
    hoveredId !== null && (e.from === hoveredId || e.to === hoveredId)

  return (
    <div style={{ width: '100%', overflowX: 'auto' }}>
      {/* DESKTOP VIEW — SVG-based flow */}
      <div
        className="arch-desktop"
        style={{
          position: 'relative',
          width: CANVAS_W,
          height: CANVAS_H,
          margin: '0 auto',
        }}
      >
        {/* SVG underlay: edges + arrows */}
        <svg
          width={CANVAS_W}
          height={CANVAS_H}
          style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}
          aria-hidden="true"
        >
          <defs>
            <marker
              id="arrow-default"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="oklch(40% 0 0)" />
            </marker>
            <marker
              id="arrow-active"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="oklch(68% 0.17 78)" />
            </marker>
          </defs>

          {EDGES.map((e) => {
            const from = nodeById[e.from]
            const to = nodeById[e.to]
            const { p1, p2 } = pickEndpoints(from, to)
            const active = isEdgeActive(e)
            return (
              <line
                key={`${e.from}-${e.to}`}
                x1={p1.x}
                y1={p1.y}
                x2={p2.x}
                y2={p2.y}
                stroke={active ? 'oklch(68% 0.17 78)' : 'oklch(28% 0 0)'}
                strokeWidth={active ? 2 : 1.5}
                strokeLinecap="round"
                markerEnd={active ? 'url(#arrow-active)' : 'url(#arrow-default)'}
                style={{ transition: 'stroke 180ms var(--ease), stroke-width 180ms var(--ease)' }}
              />
            )
          })}
        </svg>

        {/* Nodes */}
        {NODES.map((n) => {
          const isHovered = hoveredId === n.id
          const nodeStyle: CSSProperties = {
            position: 'absolute',
            left: n.x,
            top: n.y,
            width: NODE_W,
            height: NODE_H,
            background: n.highlight ? 'var(--brand-s)' : 'var(--bg-elevated)',
            border: `1px solid ${n.highlight ? 'oklch(65% 0.17 78 / 0.35)' : 'var(--border)'}`,
            borderRadius: 10,
            padding: '10px 12px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 4,
            cursor: 'pointer',
            transition: 'box-shadow 180ms var(--ease), border-color 180ms var(--ease), transform 180ms var(--ease)',
            boxShadow: isHovered
              ? '0 0 16px oklch(65% 0.17 78 / 0.3)'
              : 'none',
            borderColor: isHovered
              ? 'oklch(68% 0.17 78)'
              : n.highlight
              ? 'oklch(65% 0.17 78 / 0.35)'
              : 'var(--border)',
            transform: isHovered ? 'translateY(-1px)' : 'none',
          }
          return (
            <div
              key={n.id}
              role="button"
              tabIndex={0}
              aria-label={`${n.label} — ${n.sub}`}
              onMouseEnter={() => setHoveredId(n.id)}
              onMouseLeave={() => setHoveredId((prev) => (prev === n.id ? null : prev))}
              onFocus={() => setHoveredId(n.id)}
              onBlur={() => setHoveredId((prev) => (prev === n.id ? null : prev))}
              style={nodeStyle}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span aria-hidden style={{ fontSize: 18, lineHeight: 1 }}>
                  {n.icon}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-display), Space Grotesk, sans-serif',
                    fontSize: 13.5,
                    fontWeight: 600,
                    color: 'var(--fg)',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {n.label}
                </span>
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono), JetBrains Mono, monospace',
                  fontSize: 10.5,
                  color: 'var(--fg-2)',
                  letterSpacing: '0.01em',
                  lineHeight: 1.3,
                }}
              >
                {n.sub}
              </div>
            </div>
          )
        })}

        {/* Tooltip overlay (desktop only) */}
        {hoveredNode && (
          <div
            role="tooltip"
            style={{
              position: 'absolute',
              left: Math.min(hoveredNode.x + NODE_W + 14, CANVAS_W - 270),
              top: Math.max(hoveredNode.y - 4, 0),
              width: 260,
              background: 'oklch(10% 0 0 / 0.96)',
              border: '1px solid var(--border)',
              borderLeft: '2px solid var(--brand)',
              borderRadius: 8,
              padding: '12px 14px',
              fontSize: 12.5,
              color: 'var(--fg-2)',
              lineHeight: 1.55,
              pointerEvents: 'none',
              zIndex: 10,
              boxShadow: '0 6px 24px oklch(0% 0 0 / 0.4)',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-mono), JetBrains Mono, monospace',
                fontSize: 10,
                color: 'var(--brand)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: 6,
              }}
            >
              {hoveredNode.label}
            </div>
            <div>{hoveredNode.tooltip}</div>
          </div>
        )}
      </div>

      {/* MOBILE VIEW — vertical stack */}
      <div className="arch-mobile" style={{ display: 'none', flexDirection: 'column', gap: 12 }}>
        {NODES.map((n, i) => (
          <div key={n.id}>
            <div
              style={{
                background: n.highlight ? 'var(--brand-s)' : 'var(--bg-elevated)',
                border: `1px solid ${n.highlight ? 'oklch(65% 0.17 78 / 0.35)' : 'var(--border)'}`,
                borderRadius: 10,
                padding: '14px 16px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                <span aria-hidden style={{ fontSize: 22, lineHeight: 1 }}>
                  {n.icon}
                </span>
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-display), Space Grotesk, sans-serif',
                      fontSize: 15,
                      fontWeight: 600,
                      color: 'var(--fg)',
                    }}
                  >
                    {n.label}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono), JetBrains Mono, monospace',
                      fontSize: 10.5,
                      color: 'var(--fg-2)',
                    }}
                  >
                    {n.sub}
                  </div>
                </div>
              </div>
              <div style={{ fontSize: 12.5, color: 'var(--fg-2)', lineHeight: 1.55 }}>
                {n.tooltip}
              </div>
            </div>
            {i < NODES.length - 1 && (
              <div
                aria-hidden
                style={{
                  height: 18,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--brand)',
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: 18,
                  lineHeight: 1,
                }}
              >
                ↓
              </div>
            )}
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 880px) {
          .arch-desktop { display: none !important; }
          .arch-mobile { display: flex !important; }
        }
      `}</style>
    </div>
  )
}
