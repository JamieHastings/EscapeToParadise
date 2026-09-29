import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const MAILGUN_API_KEY = Deno.env.get('MAILGUN_API_KEY')!;
const MAILGUN_DOMAIN = Deno.env.get('MAILGUN_DOMAIN')!;
const MOM_EMAIL      = Deno.env.get('MOM_EMAIL')!;       // Audrey's direct Gmail address
const WEBHOOK_SECRET = Deno.env.get('WEBHOOK_SECRET')!;

// ── Mailgun sender ────────────────────────────────────────────

async function sendMailgunEmail(params: {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}) {
  const form = new FormData();
  form.append('from',    `Escape to Paradise Travel <no-reply@${MAILGUN_DOMAIN}>`);
  form.append('to',      params.to);
  form.append('subject', params.subject);
  if (params.text) form.append('text', params.text);
  if (params.html) form.append('html', params.html);

  const res = await fetch(
    `https://api.mailgun.net/v3/${MAILGUN_DOMAIN}/messages`,
    {
      method: 'POST',
      headers: { Authorization: `Basic ${btoa(`api:${MAILGUN_API_KEY}`)}` },
      body: form,
    }
  );

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Mailgun send failed (${res.status}): ${errText}`);
  }

  return res.json();
}

// ── Audrey notification — generic field renderer ──────────────
// Turns whatever columns are on the submitted row into a clean HTML
// table automatically. Adding/removing columns on any form stays
// correct with no code changes here.

type FormType = 'flight_requests' | 'trip_requests' | 'contact_submissions';

function prettifyLabel(key: string): string {
  return key
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function renderFormDataTable(data: Record<string, unknown>): string {
  const skipFields = new Set(['id', 'created_at', 'user_id', 'updated_at', 'status']);

  const rows = Object.entries(data)
    .filter(([key, value]) => !skipFields.has(key) && value !== null && value !== '')
    .map(
      ([key, value]) => `
        <tr>
          <td style="padding:8px 12px;font-weight:bold;border-bottom:1px solid #eee;white-space:nowrap;color:#374151;">
            ${prettifyLabel(key)}
          </td>
          <td style="padding:8px 12px;border-bottom:1px solid #eee;color:#111827;">
            ${String(value)}
          </td>
        </tr>`
    )
    .join('');

  return `<table style="border-collapse:collapse;width:100%;max-width:520px;">${rows}</table>`;
}

function buildAudreyNotification(
  formType: FormType,
  data: Record<string, unknown>
): { subject: string; html: string } {
  const subjectMap: Record<FormType, string> = {
    flight_requests:      `New flight request — ${data.name}`,
    trip_requests:        `New trip request — ${data.name}`,
    contact_submissions:  `New contact message — ${data.name}`,
  };

  const introMap: Record<FormType, string> = {
    flight_requests:     'A new flight request came in through the site:',
    trip_requests:       'A new trip request came in through the site:',
    contact_submissions: 'A new contact message came in through the site:',
  };

  return {
    subject: subjectMap[formType],
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#333;">
        <div style="background:linear-gradient(135deg,#f97316,#14b8a6);padding:24px 32px;border-radius:8px 8px 0 0;">
          <h2 style="color:#fff;margin:0;font-size:20px;">Escape to Paradise — New Submission</h2>
        </div>
        <div style="padding:32px;background:#fff;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 8px 8px;">
          <p style="font-size:15px;margin-top:0;">${introMap[formType]}</p>
          ${renderFormDataTable(data)}
          <p style="font-size:13px;color:#6b7280;margin-top:24px;">
            Reply directly to <strong>${data.email}</strong> to follow up with the client.
          </p>
        </div>
      </div>
    `,
  };
}

// ── Client confirmation emails (HTML) ─────────────────────────

function clientFlightConfirmation(name: string): string {
  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#333;">
      <div style="background:linear-gradient(135deg,#f97316,#14b8a6);padding:32px;text-align:center;border-radius:8px 8px 0 0;">
        <h1 style="color:#fff;margin:0;font-size:24px;">Escape to Paradise Travel</h1>
      </div>
      <div style="padding:32px;background:#fff;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 8px 8px;">
        <p style="font-size:16px;">Hi ${name},</p>
        <p style="font-size:16px;line-height:1.6;">
          Thank you for submitting your flight request! We've received all your details and
          Audrey will be in touch shortly with the best flight options for you.
        </p>
        <p style="font-size:16px;line-height:1.6;">
          In the meantime, feel free to browse our
          <a href="https://${MAILGUN_DOMAIN}/deals" style="color:#f97316;">current travel deals</a>
          for inspiration.
        </p>
        <p style="font-size:14px;color:#6b7280;margin-top:32px;">
          Please do not reply to this email — this inbox is not monitored.
          To reach Audrey directly, visit the
          <a href="https://${MAILGUN_DOMAIN}/contact" style="color:#f97316;">contact page</a>.
        </p>
        <p style="font-size:16px;margin-top:24px;">— Escape to Paradise Travel</p>
      </div>
    </div>
  `;
}

function clientTripConfirmation(name: string): string {
  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#333;">
      <div style="background:linear-gradient(135deg,#f97316,#14b8a6);padding:32px;text-align:center;border-radius:8px 8px 0 0;">
        <h1 style="color:#fff;margin:0;font-size:24px;">Escape to Paradise Travel</h1>
      </div>
      <div style="padding:32px;background:#fff;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 8px 8px;">
        <p style="font-size:16px;">Hi ${name},</p>
        <p style="font-size:16px;line-height:1.6;">
          Thank you for reaching out to Escape to Paradise Travel! We've received your trip
          planning request and Audrey will be in touch shortly to start building your perfect itinerary.
        </p>
        <p style="font-size:16px;line-height:1.6;">
          We're excited to help you plan an unforgettable experience. While you wait, you're welcome
          to explore our
          <a href="https://${MAILGUN_DOMAIN}/deals" style="color:#f97316;">current travel deals</a>.
        </p>
        <p style="font-size:14px;color:#6b7280;margin-top:32px;">
          Please do not reply to this email — this inbox is not monitored.
          To reach Audrey directly, visit the
          <a href="https://${MAILGUN_DOMAIN}/contact" style="color:#f97316;">contact page</a>.
        </p>
        <p style="font-size:16px;margin-top:24px;">— Escape to Paradise Travel</p>
      </div>
    </div>
  `;
}

function clientContactConfirmation(name: string): string {
  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#333;">
      <div style="background:linear-gradient(135deg,#f97316,#14b8a6);padding:32px;text-align:center;border-radius:8px 8px 0 0;">
        <h1 style="color:#fff;margin:0;font-size:24px;">Escape to Paradise Travel</h1>
      </div>
      <div style="padding:32px;background:#fff;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 8px 8px;">
        <p style="font-size:16px;">Hi ${name},</p>
        <p style="font-size:16px;line-height:1.6;">
          Thanks for getting in touch! We've received your message and Audrey will
          get back to you as soon as possible.
        </p>
        <p style="font-size:14px;color:#6b7280;margin-top:32px;">
          Please do not reply to this email — this inbox is not monitored.
          To reach Audrey directly, visit the
          <a href="https://${MAILGUN_DOMAIN}/contact" style="color:#f97316;">contact page</a>.
        </p>
        <p style="font-size:16px;margin-top:24px;">— Escape to Paradise Travel</p>
      </div>
    </div>
  `;
}

// ── Main handler ──────────────────────────────────────────────

serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  if (!WEBHOOK_SECRET) {
    return new Response('Server misconfiguration: WEBHOOK_SECRET is not set', { status: 500 });
  }

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

  if (payload.type !== 'INSERT') {
    return new Response('Ignored', { status: 200 });
  }

  const { table, record } = payload;
  const clientName  = String(record.name  ?? '');
  const clientEmail = String(record.email ?? '');

  if (!['flight_requests', 'trip_requests', 'contact_submissions'].includes(table)) {
    return new Response('Unknown table', { status: 400 });
  }

  const formType = table as FormType;

  // Build Audrey's notification using the generic renderer
  const { subject: audreySubject, html: audreyHtml } = buildAudreyNotification(formType, record);

  // Pick the right client confirmation template
  const clientSubjectMap: Record<FormType, string> = {
    flight_requests:     "We've received your flight request — Escape to Paradise Travel",
    trip_requests:       "We've received your trip request — Escape to Paradise Travel",
    contact_submissions: "We've received your message — Escape to Paradise Travel",
  };
  const clientHtmlMap: Record<FormType, string> = {
    flight_requests:     clientFlightConfirmation(clientName),
    trip_requests:       clientTripConfirmation(clientName),
    contact_submissions: clientContactConfirmation(clientName),
  };

  // Fire both emails concurrently — one failure won't block the other
  const [audreyResult, clientResult] = await Promise.allSettled([
    sendMailgunEmail({ to: MOM_EMAIL, subject: audreySubject, html: audreyHtml }),
    sendMailgunEmail({ to: clientEmail, subject: clientSubjectMap[formType], html: clientHtmlMap[formType] }),
  ]);

  if (audreyResult.status === 'rejected') {
    console.error('Failed to send Audrey notification:', audreyResult.reason);
  }
  if (clientResult.status === 'rejected') {
    console.error('Failed to send client confirmation:', clientResult.reason);
  }

  // Only fail hard if Audrey's email didn't go through — client confirmation is best-effort
  if (audreyResult.status === 'rejected') {
    return new Response('Audrey notification failed', { status: 500 });
  }

  console.log(`Emails sent for ${table} — ${audreySubject}`);
  return new Response('OK', { status: 200 });
});
