import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

/**
 * Favicon: "JJ." — JJ in white, dot in amber brand colour.
 * Rendered via next/og ImageResponse so it stays in sync with the
 * design system without any external tooling.
 */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#141414',
          borderRadius: '6px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          fontWeight: 700,
          fontSize: 17,
          letterSpacing: '-0.04em',
          gap: 0,
        }}
      >
        <span style={{ color: '#f5f5f5' }}>JJ</span>
        <span style={{ color: '#D4930C' }}>.</span>
      </div>
    ),
    { ...size },
  )
}
