import { profile } from '@/data/profile'

/**
 * Contact submission.
 *
 * On Vercel, the form posts to the same-origin /api/contact function, which
 * sends mail through Gmail. GitHub Pages is static, so that build keeps the
 * mailto fallback. VITE_CONTACT_ENDPOINT can override either destination.
 */

export const ENDPOINT: string = import.meta.env.VITE_CONTACT_ENDPOINT ?? (import.meta.env.BASE_URL === '/' ? '/api/contact' : '')
export const RECIPIENT = profile.email

export const MAX_NAME = 80
export const MAX_EMAIL = 254
export const MAX_MESSAGE = 5000

// Built from \u escapes so the source stays pure ASCII.
// Control chars U+0000-U+001F and U+007F; when newlines are allowed, tab,
// LF and CR survive. Zero-width and bidi marks always go.
// eslint-disable-next-line no-control-regex -- Control characters are intentionally removed.
const CTRL_NO_NL = new RegExp('[\\u0000-\\u001F\\u007F]', 'g')
// eslint-disable-next-line no-control-regex -- Control characters are intentionally removed while retaining line breaks.
const CTRL_KEEP_NL = new RegExp('[\\u0000-\\u0008\\u000B\\u000C\\u000E-\\u001F\\u007F]', 'g')
const ZERO_WIDTH = new RegExp('[\\u200B-\\u200F\\u202A-\\u202E\\u2060\\uFEFF]', 'g')

export function sanitize(input: string, allowNewlines = false): string {
  const controls = allowNewlines ? CTRL_KEEP_NL : CTRL_NO_NL
  return input.replace(controls, '').replace(ZERO_WIDTH, '')
}

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export type Lead = {
  firstName: string
  lastName: string
  email: string
  message: string
  /** Honeypot. Empty for a person; your backend should drop anything else. */
  website: string
}

export type SubmitResult = { via: 'webhook' } | { via: 'mailto' }

/** Read, trim, cap and sanitise the four fields. Returns null if a required
 *  field is missing or the email does not look like one. */
export function readLead(data: FormData): Lead | null {
  const firstName = sanitize(String(data.get('firstName') ?? '').trim()).slice(0, MAX_NAME)
  const lastName = sanitize(String(data.get('lastName') ?? '').trim()).slice(0, MAX_NAME)
  const email = sanitize(String(data.get('email') ?? '').trim()).slice(0, MAX_EMAIL)
  const message = sanitize(String(data.get('message') ?? '').trim(), true).slice(0, MAX_MESSAGE)
  if (!firstName || !lastName || !email || !message || !EMAIL_RE.test(email)) return null
  const website = String(data.get('website') ?? '')
  return { firstName, lastName, email, message, website }
}

export class SubmitError extends Error {}

export async function submitLead(lead: Lead): Promise<SubmitResult> {
  if (ENDPOINT) {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lead),
    })
    const body = await res.json().catch(() => null)
    if (!res.ok || body?.ok !== true) throw new SubmitError(body?.error || 'The message did not go through. Email me directly instead.')
    return { via: 'webhook' }
  }

  const subject = `Project inquiry from ${lead.firstName} ${lead.lastName}`
  const body = [`Name: ${lead.firstName} ${lead.lastName}`, `Email: ${lead.email}`, '', lead.message].join('\n')
  // encodeURIComponent on every value blocks header injection (CR/LF) and
  // parameter smuggling via & or ?.
  window.location.href = `mailto:${encodeURIComponent(RECIPIENT)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  return { via: 'mailto' }
}
