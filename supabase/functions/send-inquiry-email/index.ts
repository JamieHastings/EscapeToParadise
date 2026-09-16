import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const MAILGUN_API_KEY = Deno.env.get('MAILGUN_API_KEY')!;
const MAILGUN_DOMAIN = Deno.env.get('MAILGUN_DOMAIN')!;
const MOM_EMAIL = Deno.env.get('MOM_EMAIL')!;
const WEBHOOK_SECRET = Deno.env.get('WEBHOOK_SECRET')!;

// ── Helpers ───────────────────────────────────────────────────

function currency(val: number | null | undefined) {
  if (!val) return 'Not specified';
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(val);
}

function date(val: string | null | undefined) {
  if (!val) return 'Not specified';
  return new Date(val).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function line(label: string, value: string | number | null | undefined) {
  return value ? `${label}: ${value}\n` : '';
}

// ── Email formatters ──────────────────────────────────────────

function formatFlightEmail(r: Record<string, unknown>) {
  return `NEW FLIGHT REQUEST
==================
Name:       ${r.name}
Email:      ${r.email}
Phone:      ${r.phone}

Route:      ${r.from_city} → ${r.to_city}
Departure:  ${date(r.departure_date as string)}
Return:     ${r.return_date ? date(r.return_date as string) : 'One-way'}
Travelers:  ${r.travelers}
Budget:     ${currency(r.budget as number)}
${line('Preferred time', r.preferred_time as string)}${line('Notes', r.notes as string)}
Submitted:  ${date(r.created_at as string)}
`;
}

function formatTripEmail(r: Record<string, unknown>) {
  return `NEW TRIP REQUEST
================
Name:         ${r.name}
Email:        ${r.email}
Phone:        ${r.phone}

Trip Type:    ${r.trip_type}
Destination:  ${r.destination}
Start Date:   ${r.travel_start_date ?? 'Not specified'}
End Date:     ${r.travel_end_date ?? 'Not specified'}
Travelers:    ${r.number_of_travelers}
Budget:       ${r.budget ?? 'Not specified'}
${line('Notes', r.additional_notes as string)}
Submitted:    ${date(r.created_at as string)}
`;
}

function formatContactEmail(r: Record<string, unknown>) {
  return `NEW CONTACT MESSAGE
===================
Name:     ${r.name}
Email:    ${r.email}
${line('Phone', r.phone as string)}
Message:
${r.message}

Submitted: ${date(r.created_at as string)}
`;
}

// ── Main handler ──────────────────────────────────────────────

serve(async (req) => {
  // Only accept POST
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  // Verify webhook secret so only Supabase can trigger this
  const authHeader = req.headers.get('authorization') ?? '';
  if (authHeader !== `Bearer ${WEBHOOK_SECRET}`) {
    return new Response('Unauthorized', { status: 401 });
  }

  let payload: { type: string; table: string; record: Record<string, unknown> };
  try {
    payload = await req.json();
  } catch {
    return new Response('Invalid JSON', { status: 400 });
  }

  // Only handle INSERT events
  if (payload.type !== 'INSERT') {
    return new Response('Ignored', { status: 200 });
  }

  const { table, record } = payload;

  let subject: string;
  let body: string;

  if (table === 'flight_requests') {
    subject = `Flight Request: ${record.from_city} → ${record.to_city} — ${record.name}`;
    body = formatFlightEmail(record);
  } else if (table === 'trip_requests') {
    subject = `Trip Request: ${record.destination} — ${record.name}`;
    body = formatTripEmail(record);
  } else if (table === 'contact_submissions') {
    subject = `Contact Message from ${record.name}`;
    body = formatContactEmail(record);
  } else {
    return new Response('Unknown table', { status: 400 });
  }

  // Send via Mailgun HTTP API
  const form = new FormData();
  form.append('from', `Escape to Paradise <noreply@${MAILGUN_DOMAIN}>`);
  form.append('to', MOM_EMAIL);
  form.append('subject', subject);
  form.append('text', body);

  const mailgunRes = await fetch(
    `https://api.mailgun.net/v3/${MAILGUN_DOMAIN}/messages`,
    {
      method: 'POST',
      headers: {
        Authorization: `Basic ${btoa(`api:${MAILGUN_API_KEY}`)}`,
      },
      body: form,
    }
  );

  if (!mailgunRes.ok) {
    const error = await mailgunRes.text();
    console.error('Mailgun error:', error);
    return new Response('Email send failed', { status: 500 });
  }

  console.log(`Email sent for ${table} insert — ${subject}`);
  return new Response('OK', { status: 200 });
});
