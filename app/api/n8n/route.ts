import { NextRequest, NextResponse } from 'next/server'

// Server-side proxy — avoids CORS when calling n8n from the browser.
// The client POSTs to /api/n8n; this function forwards it to n8n server-to-server.
export async function POST(request: NextRequest) {
  const webhookUrl = process.env.N8N_WEBHOOK_URL
  if (!webhookUrl) {
    return NextResponse.json({ error: 'N8N_WEBHOOK_URL not configured' }, { status: 500 })
  }

  try {
    const body = await request.json()
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Webhook failed' }, { status: 500 })
  }
}
