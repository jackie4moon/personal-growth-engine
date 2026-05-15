import { NextRequest, NextResponse } from 'next/server'

// Server-side proxy — avoids CORS when calling Clay from the browser.
// Posts form data directly to Clay webhook; Clay enriches and calls n8n relay.
export async function POST(request: NextRequest) {
  const clayUrl = process.env.CLAY_WEBHOOK_URL
  if (!clayUrl) {
    return NextResponse.json({ error: 'CLAY_WEBHOOK_URL not configured' }, { status: 500 })
  }

  try {
    const body = await request.json()
    await fetch(clayUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email:     body.email,
        name:      `${body.firstname} ${body.lastname}`,
        firstname: body.firstname,
        lastname:  body.lastname,
        company:   body.company,
        role_type: body.role_type,
        message:   body.message,
        source:    'contact_form',
      }),
    })
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Webhook failed' }, { status: 500 })
  }
}
