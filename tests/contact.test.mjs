import test from 'node:test'
import assert from 'node:assert/strict'
import handler from '../api/contact.js'

function response() {
  return {
    headers: {},
    setHeader(name, value) { this.headers[name] = value },
    status(code) { this.code = code; return this },
    json(body) { this.body = body; return this },
  }
}

function request(body) {
  return { method: 'POST', headers: { 'content-type': 'application/json' }, body }
}

const validLead = {
  firstName: 'Ada',
  lastName: 'Lovelace',
  email: 'ada@example.com',
  message: 'Please build a site for me.\nThanks!',
  website: '',
}

test('a valid contact message is delivered through Gmail with a safe Reply-To', async () => {
  const previousFetch = globalThis.fetch
  const old = {
    GMAIL_CLIENT_ID: process.env.GMAIL_CLIENT_ID,
    GMAIL_CLIENT_SECRET: process.env.GMAIL_CLIENT_SECRET,
    GMAIL_REFRESH_TOKEN: process.env.GMAIL_REFRESH_TOKEN,
  }
  process.env.GMAIL_CLIENT_ID = 'test-client'
  process.env.GMAIL_CLIENT_SECRET = 'test-secret'
  process.env.GMAIL_REFRESH_TOKEN = 'test-refresh'
  let raw
  globalThis.fetch = async (url, options) => {
    if (url === 'https://oauth2.googleapis.com/token') {
      assert.equal(options.body.get('grant_type'), 'refresh_token')
      return { ok: true, json: async () => ({ access_token: 'test-access' }) }
    }
    assert.equal(url, 'https://gmail.googleapis.com/gmail/v1/users/me/messages/send')
    assert.equal(options.headers.Authorization, 'Bearer test-access')
    raw = JSON.parse(options.body).raw
    return { ok: true }
  }

  try {
    const res = response()
    await handler(request(validLead), res)
    assert.equal(res.code, 200)
    assert.deepEqual(res.body, { ok: true })
    const mime = Buffer.from(raw, 'base64url').toString('utf8')
    assert.match(mime, /To: christianvaleestorba@gmail\.com/)
    assert.match(mime, /Reply-To: ada@example\.com/)
    const encodedBody = mime.split('\r\n\r\n')[1].replace(/\r\n/g, '')
    assert.equal(Buffer.from(encodedBody, 'base64').toString('utf8'), 'Name: Ada Lovelace\r\nEmail: ada@example.com\r\n\r\nPlease build a site for me.\nThanks!')
  } finally {
    globalThis.fetch = previousFetch
    for (const [name, value] of Object.entries(old)) {
      if (value === undefined) delete process.env[name]
      else process.env[name] = value
    }
  }
})

test('header injection is rejected before Gmail is called', async () => {
  const res = response()
  await handler(request({ ...validLead, email: 'ada@example.com\r\nBcc: other@example.com' }), res)
  assert.equal(res.code, 400)
})

test('the honeypot does not send a message', async () => {
  const res = response()
  await handler(request({ ...validLead, website: 'spam.example' }), res)
  assert.equal(res.code, 200)
  assert.deepEqual(res.body, { ok: true })
})
