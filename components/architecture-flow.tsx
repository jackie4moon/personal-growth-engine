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

type EdgeData = {
  from: string
  to: string
  /** Short descriptor of what travels along this edge — used for mobile chip text. */
  flow?: string
}

const NODE_W = 170
const NODE_H = 76
const CANVAS_W = 820
const CANVAS_H = 720

const NODES: NodeData[] = [
  // Layer 1 — Entry Points
  {
    id: 'A',
    label: 'julianjais.com',
    icon: '🌐',
    sub: 'Next.js · Vercel',
    x: 180,
    y: 20,
    highlight: true,
    tooltip:
      'The portfolio website. Page views, CTA clicks and form submissions are all instrumented as first-party events.',
  },
  {
    id: 'B',
    label: 'Calendly',
    icon: '📅',
    sub: 'Booking source',
    x: 580,
    y: 20,
    highlight: false,
    tooltip:
      'New meetings are not pushed via webhook — n8n polls the Calendly API every 60 minutes and processes any new booking it finds.',
  },

  // Layer 2 — Capture
  {
    id: 'C',
    label: 'GTM Container',
    icon: '🏷️',
    sub: 'Tag manager · consent-aware',
    x: 80,
    y: 140,
    highlight: false,
    tooltip:
      "Loads the HubSpot Pixel and any future tags. All tags are gated by Google Consent Mode v2 defaults — nothing fires before the user accepts.",
  },
  {
    id: 'D',
    label: 'RudderStack CDP',
    icon: '🔀',
    sub: 'Event capture · fan-out routing',
    x: 340,
    y: 140,
    highlight: true,
    tooltip:
      'The actual CDP — RudderStack JS SDK lazy-loads after CookieYes consent. Every track() call fans out server-side to GA4, HubSpot and any future destination in one place.',
  },

  // Layer 3 — Direct destinations from capture
  {
    id: 'E',
    label: 'GA4',
    icon: '📊',
    sub: 'Event analytics',
    x: 80,
    y: 260,
    highlight: false,
    tooltip:
      'Receives every track() event from RudderStack. GA4 has a native Daily BigQuery Export (EU region) — no service account key required.',
  },
  {
    id: 'F',
    label: 'HubSpot CRM',
    icon: '🟠',
    sub: 'Contact record · two inputs',
    x: 440,
    y: 260,
    highlight: false,
    tooltip:
      'Three upstream sources hit the same contact record: GTM HubSpot Pixel, RudderStack identify() on form submission, and n8n batch upsert after Clay enrichment.',
  },

  // Layer 4 — Pipeline
  {
    id: 'G',
    label: 'Clay',
    icon: '🔬',
    sub: 'Lead enrichment',
    x: 200,
    y: 380,
    highlight: false,
    tooltip:
      'Receives form data via the Next.js /api/n8n proxy and Calendly invitees via the n8n Poller. Enriches each lead with company, industry, size, funding stage and tech stack.',
  },
  {
    id: 'H',
    label: 'n8n Automation',
    icon: '⚙️',
    sub: 'Poller + Relay · self-hosted VPS',
    x: 580,
    y: 380,
    highlight: true,
    tooltip:
      'Two workflows on the same VPS: the Poller hits Calendly hourly, and the Relay receives Clay-enriched payloads and fans them out to HubSpot, BigQuery and Claude.',
  },

  // Layer 5 — AI + Data
  {
    id: 'I',
    label: 'Claude API',
    icon: '🤖',
    sub: 'AI outreach generation',
    x: 440,
    y: 500,
    highlight: true,
    tooltip:
      'n8n sends an enriched prompt to Claude. For contact forms: a personalised reply. For Calendly bookings: a German pre-call briefing for Julian. No templates.',
  },
  {
    id: 'J',
    label: 'BigQuery',
    icon: '🗄️',
    sub: 'Warehouse · EU region',
    x: 80,
    y: 500,
    highlight: false,
    tooltip:
      'Two writers: GA4 Daily Export populates analytics tables, and n8n HTTP REST API (OAuth2) writes the crm_data.contacts table — both in europe-west3 for GDPR.',
  },

  // Layer 6 — Outputs
  {
    id: 'K',
    label: 'Gmail',
    icon: '✉️',
    sub: 'Auto-sent outreach',
    x: 440,
    y: 620,
    highlight: false,
    tooltip:
      "The Claude reply lands in the recruiter's inbox within minutes of the form submission. For Calendly: the briefing arrives in Julian's inbox before the call.",
  },
  {
    id: 'L',
    label: 'Looker Studio',
    icon: '📈',
    sub: 'Funnel + CRM dashboards',
    x: 80,
    y: 620,
    highlight: false,
    tooltip:
      'Two pages: Website Funnel (page_viewed → cta_clicked → form_submitted → meeting_booked) reads from GA4 export. CRM & Lead Quality reads from crm_data.contacts.',
  },
]

const EDGES: EdgeData[] = [
  { from: 'A', to: 'C', flow: 'tag manager load' },
  { from: 'A', to: 'D', flow: 'CDP SDK load' },
  { from: 'A', to: 'G', flow: 'form data via /api/n8n' },
  { from: 'B', to: 'H', flow: 'polled hourly' },
  { from: 'C', to: 'F', flow: 'HubSpot Pixel' },
  { from: 'D', to: 'E', flow: 'track events' },
  { from: 'D', to: 'F', flow: 'identify()' },
  { from: 'E', to: 'J', flow: 'GA4 Daily Export' },
  { from: 'G', to: 'H', flow: 'enriched payload' },
  { from: 'H', to: 'F', flow: 'batch upsert' },
  { from: 'H', to: 'I', flow: 'AI prompt' },
  { from: 'H', to: 'J', flow: 'HTTP REST insert' },
  { from: 'I', to: 'K', flow: 'send reply' },
  { from: 'J', to: 'L', flow: 'BI dashboard' },
]

// Mobile: 2-column grid pairs (mirrors desktop layer rows)
const MOBILE_PAIRS: [string, string][] = [
  ['A', 'B'],
  ['C', 'D'],
  ['E', 'F'],
  ['G', 'H'],
  ['I', 'J'],
  ['K', 'L'],
]

// Layer labels used on mobile in place of misleading `↓` arrows
const LAYER_LABELS = [
  '01 · Entry',
  '02 · Capture',
  '03 · Realtime fan-out',
  '04 · Async pipeline',
  '05 · AI + Warehouse',
  '06 · Output',
]

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

function pickEndpoints(
  from: NodeData,
  to: NodeData
): { p1: { x: number; y: number }; p2: { x: number; y: number } } {
  if (from.y === to.y) {
    if (from.x < to.x) {
      return { p1: nodeAnchor(from, 'right'), p2: nodeAnchor(to, 'left') }
    }
    return { p1: nodeAnchor(from, 'left'), p2: nodeAnchor(to, 'right') }
  }
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

  // Per-node outgoing/incoming edge lookup, computed once per render
  const outgoingByNode: Record<string, EdgeData[]> = {}
  const incomingByNode: Record<string, EdgeData[]> = {}
  for (const n of NODES) {
    outgoingByNode[n.id] = []
    incomingByNode[n.id] = []
  }
  for (const e of EDGES) {
    outgoingByNode[e.from]?.push(e)
    incomingByNode[e.to]?.push(e)
  }

  const tooltipPos = hoveredNode
    ? (() => {
        const tooltipW = 260
        const fitsRight = hoveredNode.x + NODE_W + 14 + tooltipW <= CANVAS_W
        return {
          left: fitsRight
            ? hoveredNode.x + NODE_W + 14
            : Math.max(hoveredNode.x - tooltipW - 14, 8),
          top: Math.min(Math.max(hoveredNode.y - 6, 8), CANVAS_H - 140),
        }
      })()
    : null

  return (
    <div style={{ width: '100%' }}>
      {/* DESKTOP — SVG flow */}
      <div className="arch-desktop-wrap" style={{ overflowX: 'auto' }}>
        <div
          className="arch-desktop"
          style={{
            position: 'relative',
            width: CANVAS_W,
            height: CANVAS_H,
            margin: '0 auto',
          }}
        >
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
                  style={{
                    transition: 'stroke 180ms var(--ease), stroke-width 180ms var(--ease)',
                  }}
                />
              )
            })}
          </svg>

          {NODES.map((n) => {
            const isHovered = hoveredId === n.id
            const nodeStyle: CSSProperties = {
              position: 'absolute',
              left: n.x,
              top: n.y,
              width: NODE_W,
              height: NODE_H,
              background: n.highlight ? 'var(--brand-s)' : 'var(--bg-elevated)',
              border: `1px solid ${
                isHovered
                  ? 'oklch(68% 0.17 78)'
                  : n.highlight
                  ? 'oklch(65% 0.17 78 / 0.35)'
                  : 'var(--border)'
              }`,
              borderRadius: 10,
              padding: '10px 12px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: 4,
              cursor: 'pointer',
              transition:
                'box-shadow 180ms var(--ease), border-color 180ms var(--ease), transform 180ms var(--ease)',
              boxShadow: isHovered ? '0 0 16px oklch(65% 0.17 78 / 0.3)' : 'none',
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

          {hoveredNode && tooltipPos && (
            <div
              role="tooltip"
              style={{
                position: 'absolute',
                left: tooltipPos.left,
                top: tooltipPos.top,
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
      </div>

      {/* MOBILE — labelled layers + per-card flow chips */}
      <div className="arch-mobile" style={{ display: 'none' }}>
        {MOBILE_PAIRS.map((pair, rowIdx) => (
          <section
            key={`layer-${rowIdx}`}
            style={{ marginBottom: rowIdx === MOBILE_PAIRS.length - 1 ? 0 : 22 }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                fontFamily: 'var(--font-mono), JetBrains Mono, monospace',
                fontSize: 10.5,
                color: 'var(--brand)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: 10,
              }}
            >
              <span
                aria-hidden
                style={{
                  width: 4,
                  height: 4,
                  borderRadius: '50%',
                  background: 'var(--brand)',
                  boxShadow: '0 0 6px var(--brand)',
                  flexShrink: 0,
                }}
              />
              {LAYER_LABELS[rowIdx]}
              <span
                aria-hidden
                style={{
                  flex: 1,
                  height: 1,
                  background: 'var(--border)',
                  marginLeft: 4,
                }}
              />
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 10,
              }}
            >
              {pair.map((id) => {
                const n = nodeById[id]
                const outgoing = outgoingByNode[id] || []
                const incoming = incomingByNode[id] || []
                const hasOutgoing = outgoing.length > 0
                const chips = hasOutgoing ? outgoing : incoming
                const direction: 'out' | 'in' = hasOutgoing ? 'out' : 'in'

                return (
                  <div
                    key={id}
                    style={{
                      background: n.highlight ? 'var(--brand-s)' : 'var(--bg-elevated)',
                      border: `1px solid ${
                        n.highlight ? 'oklch(65% 0.17 78 / 0.35)' : 'var(--border)'
                      }`,
                      borderRadius: 10,
                      padding: '12px 12px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 8,
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span aria-hidden style={{ fontSize: 18, lineHeight: 1 }}>
                        {n.icon}
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-display), Space Grotesk, sans-serif',
                          fontSize: 13,
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
                        fontSize: 9.5,
                        color: 'var(--fg-2)',
                        letterSpacing: '0.01em',
                        lineHeight: 1.35,
                      }}
                    >
                      {n.sub}
                    </div>
                    <div
                      style={{
                        fontSize: 11.5,
                        color: 'var(--fg-2)',
                        lineHeight: 1.5,
                      }}
                    >
                      {n.tooltip}
                    </div>

                    {chips.length > 0 && (
                      <div
                        style={{
                          marginTop: 4,
                          paddingTop: 8,
                          borderTop: '1px dashed var(--border)',
                        }}
                      >
                        <div
                          style={{
                            fontFamily: 'var(--font-mono), JetBrains Mono, monospace',
                            fontSize: 9.5,
                            color: 'var(--fg-3)',
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                            marginBottom: 6,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 4,
                          }}
                        >
                          {direction === 'out' ? (
                            <>
                              Flows to <span aria-hidden style={{ color: 'var(--brand)' }}>→</span>
                            </>
                          ) : (
                            <>
                              <span aria-hidden style={{ color: 'var(--brand)' }}>←</span> Receives from
                            </>
                          )}
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                          {chips.map((e) => {
                            const otherId = direction === 'out' ? e.to : e.from
                            const other = nodeById[otherId]
                            return (
                              <span
                                key={`${e.from}-${e.to}`}
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: 4,
                                  background: 'var(--bg-subtle)',
                                  border: '1px solid var(--border)',
                                  borderRadius: 99,
                                  padding: '3px 8px',
                                  fontSize: 10.5,
                                  color: 'var(--fg-2)',
                                  fontFamily:
                                    'var(--font-mono), JetBrains Mono, monospace',
                                  letterSpacing: '0.01em',
                                  lineHeight: 1.2,
                                  whiteSpace: 'nowrap',
                                }}
                                title={e.flow ?? other.label}
                              >
                                <span aria-hidden style={{ fontSize: 11 }}>
                                  {other.icon}
                                </span>
                                <span>
                                  <span style={{ color: 'var(--fg)' }}>{other.label}</span>
                                  {e.flow && (
                                    <span style={{ color: 'var(--fg-3)' }}>
                                      {' · '}
                                      {e.flow}
                                    </span>
                                  )}
                                </span>
                              </span>
                            )
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </section>
        ))}
      </div>

      <style>{`
        @media (max-width: 820px) {
          .arch-desktop-wrap { display: none !important; }
          .arch-mobile { display: block !important; }
        }
      `}</style>
    </div>
  )
}
