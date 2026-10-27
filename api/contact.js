// Vercel serverless function. Gmail credentials must only be set as server-side
// environment variables; never use VITE_ prefixes for them.
const CONTACT_EMAIL = 'christianvaleestorba@gmail.com'
const MAX_NAME = 80
const MAX_EMAIL = 254
const MAX_MESSAGE = 5000
const MAX_BODY_BYTES = 12_000

const EMAIL_RE = /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?)+$/
const CONTROL_RE = /[\u0000-\u001f\u007f-\u009f\u200b-\u200f\u202a-\u202e\u2060\ufeff]/g
const MESSAGE_CONTROL_RE = /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f-\u009f\u200b-\u200f\u202a-\u202e\u2060\ufeff]/g

function reply(response, status, body) {
  response.setHeader('Cache-Control', 'no-store')
  return response.status(status).json(body)
}

function clean(value, max, multiline = false) {
  if (typeof value !== 'string') return ''
  return value.trim().replace(multiline ? MESSAGE_CONTROL_RE : CONTROL_RE, '').slice(0, max)
}

function validate(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) return null
  const firstName = clean(body.firstName, MAX_NAME)
  const lastName = clean(body.lastName, MAX_NAME)
  const email = clean(body.email, MAX_EMAIL)
  const message = clean(body.message, MAX_MESSAGE, true)
  if (!firstName || !lastName || !message || !EMAIL_RE.test(email)) return null
  if (body.firstName.length > MAX_NAME || body.lastName.length > MAX_NAME || body.email.length > MAX_EMAIL || body.message.length > MAX_MESSAGE) return null
  return { firstName, lastName, email, message }
}

function mimeFor(lead) {
  const name = `${lead.firstName} ${lead.lastName}`
  const body = `Name: ${name}\r\nEmail: ${lead.email}\r\n\r\n${lead.message}`
  const encodedBody = Buffer.from(body, 'utf8').toString('base64').match(/.{1,76}/g)?.join('\r\n') ?? ''
  return [
    `From: Christian Lord V. Estorba <${CONTACT_EMAIL}>`,
    `To: ${CONTACT_EMAIL}`,
    `Reply-To: ${lead.email}`,
    'Subject: Portfolio project inquiry',
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: base64',
    '',
    encodedBody,
  ].join('\r\n')
}

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST')
    return reply(response, 405, { error: 'Use the contact form to send a message.' })
  }

  if (!/^application\/json(?:\s*;|$)/i.test(request.headers['content-type'] ?? '')) {
    return reply(response, 415, { error: 'Please submit the contact form again.' })
  }

  if (Number(request.headers['content-length'] ?? 0) > MAX_BODY_BYTES) {
    return reply(response, 413, { error: 'Your message is too long.' })
  }

  let body = request.body
  if (typeof body === 'string') {
    try { body = JSON.parse(body) } catch { return reply(response, 400, { error: 'Please submit the contact form again.' }) }
  }
  if (Buffer.byteLength(JSON.stringify(body ?? null)) > MAX_BODY_BYTES) {
    return reply(response, 413, { error: 'Your message is too long.' })
  }

  // Spam bots often fill hidden fields. Return success without sending mail.
  if (body && typeof body === 'object' && body.website) return reply(response, 200, { ok: true })

  const lead = validate(body)
  if (!lead) return reply(response, 400, { error: 'Add your name, a valid email, and a message.' })

  const { GMAIL_CLIENT_ID, GMAIL_CLIENT_SECRET, GMAIL_REFRESH_TOKEN } = process.env
  if (!GMAIL_CLIENT_ID || !GMAIL_CLIENT_SECRET || !GMAIL_REFRESH_TOKEN) {
    console.error('Contact form Gmail configuration is missing')
    return reply(response, 503, { error: 'The contact form is unavailable. Please email me directly.' })
  }

  try {
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: GMAIL_CLIENT_ID,
        client_secret: GMAIL_CLIENT_SECRET,
        refresh_token: GMAIL_REFRESH_TOKEN,
        grant_type: 'refresh_token',
      }),
    })
    if (!tokenResponse.ok) {
      console.error('Gmail token refresh failed with status', tokenResponse.status)
      return reply(response, 502, { error: 'The message could not be sent right now. Please email me directly.' })
    }
    const token = await tokenResponse.json()
    if (typeof token.access_token !== 'string') throw new Error('Missing Gmail access token')

    const raw = Buffer.from(mimeFor(lead), 'utf8').toString('base64url')
    const sendResponse = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token.access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ raw }),
    })
    if (!sendResponse.ok) {
      console.error('Gmail message send failed with status', sendResponse.status)
      return reply(response, 502, { error: 'The message could not be sent right now. Please email me directly.' })
    }
    return reply(response, 200, { ok: true })
  } catch (error) {
    console.error('Contact form request failed', error instanceof Error ? error.message : 'Unknown error')
    return reply(response, 502, { error: 'The message could not be sent right now. Please email me directly.' })
  }
}
