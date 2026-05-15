import { NextRequest, NextResponse } from 'next/server'

// Receives Calendly invitee.created webhooks.
// Transforms the payload into our standard format and forwards to Clay for enrichment.
// Clay then enriches and calls the n8n relay → Claude → Gmail Briefing to Julian.
export async function POST(request: NextRequest) {
  const clayUrl = process.env.CLAY_WEBHOOK_URL
  if (!clayUrl) {
    return NextResponse.json({ error: 'CLAY_WEBHOOK_URL not configured' }, { status: 500 })
  }

  try {
    const body = await request.json()

    // Only process new bookings (ignore cancellations / reschedules)
    if (body.event !== 'invitee.created') {
      return NextResponse.json({ ok: true, skipped: true })
    }

    const invitee  = body.payload?.invitee  ?? {}
    const event    = body.payload?.event    ?? {}
    const qa: { question: string; answer: string }[] =
      invitee.questions_and_answers ?? body.payload?.questions_and_answers ?? []

    // Helper: find answer by question label (case-insensitive, partial match)
    const answer = (label: string) =>
      qa.find(q => q.question.toLowerCase().includes(label.toLowerCase()))?.answer ?? ''

    const firstname = invitee.first_name ?? invitee.name?.split(' ')[0] ?? ''
    const lastname  = invitee.last_name  ?? invitee.name?.split(' ').slice(1).join(' ') ?? ''

    const payload = {
      email:            invitee.email ?? '',
      name:             invitee.name  ?? `${firstname} ${lastname}`.trim(),
      firstname,
      lastname,
      company:          answer('company'),
      role_type:        answer('role'),
      message:          answer('tell me') || answer('about'),
      event_start_time: event.start_time ?? '',
      source:           'calendly',
    }

    console.log('[calendly] forwarding to Clay:', JSON.stringify(payload))

    const res = await fetch(clayUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    console.log('[calendly] Clay response:', res.status)
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[calendly] error:', err)
    return NextResponse.json({ error: 'Webhook failed' }, { status: 500 })
  }
}
