// Run locally once with a Google OAuth Desktop client. The refresh token is
// printed to the terminal for copying into Vercel; it is never written to disk.
import { createHash, randomBytes } from 'node:crypto'
import { createServer } from 'node:http'

const { GMAIL_CLIENT_ID, GMAIL_CLIENT_SECRET } = process.env
if (!GMAIL_CLIENT_ID || !GMAIL_CLIENT_SECRET) {
  console.error('Set GMAIL_CLIENT_ID and GMAIL_CLIENT_SECRET in this terminal first.')
  process.exit(1)
}

const state = randomBytes(24).toString('base64url')
const verifier = randomBytes(48).toString('base64url')
const challenge = createHash('sha256').update(verifier).digest('base64url')

let complete
const callback = new Promise((resolve, reject) => { complete = { resolve, reject } })
const server = createServer((request, response) => {
  const url = new URL(request.url ?? '/', 'http://127.0.0.1')
  if (url.pathname !== '/') {
    response.writeHead(404).end('Not found')
    return
  }
  const code = url.searchParams.get('code')
  const valid = url.searchParams.get('state') === state
  response.writeHead(valid && code ? 200 : 400, { 'Content-Type': 'text/plain; charset=utf-8' })
  response.end(valid && code ? 'Google authorization complete. Return to your terminal.' : 'Authorization failed. Return to your terminal.')
  server.close()
  if (!valid || !code) complete.reject(new Error(url.searchParams.get('error') ?? 'Missing code or invalid state'))
  else complete.resolve(code)
})

server.listen(0, '127.0.0.1')
await new Promise((resolve) => server.once('listening', resolve))
const address = server.address()
const redirectUri = `http://127.0.0.1:${address.port}/`
const authorization = new URL('https://accounts.google.com/o/oauth2/v2/auth')
for (const [key, value] of Object.entries({
  client_id: GMAIL_CLIENT_ID,
  redirect_uri: redirectUri,
  response_type: 'code',
  scope: 'https://www.googleapis.com/auth/gmail.send',
  access_type: 'offline',
  prompt: 'consent',
  code_challenge: challenge,
  code_challenge_method: 'S256',
  state,
})) authorization.searchParams.set(key, value)

console.log('Open this URL and sign in as christianvaleestorba@gmail.com:\n')
console.log(authorization.href)
console.log('\nWaiting for the Google callback on 127.0.0.1...')

const timeout = setTimeout(() => {
  server.close()
  complete.reject(new Error('Authorization timed out after 5 minutes'))
}, 5 * 60 * 1000)

try {
  const code = await callback
  clearTimeout(timeout)
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code,
      client_id: GMAIL_CLIENT_ID,
      client_secret: GMAIL_CLIENT_SECRET,
      redirect_uri: redirectUri,
      code_verifier: verifier,
      grant_type: 'authorization_code',
    }),
  })
  const result = await response.json()
  if (!response.ok || !result.refresh_token) throw new Error(result.error_description ?? result.error ?? 'No refresh token returned')
  console.log('\nCopy this value into GMAIL_REFRESH_TOKEN in Vercel. Keep it private:\n')
  console.log(result.refresh_token)
} catch (error) {
  clearTimeout(timeout)
  console.error(error instanceof Error ? error.message : 'Authorization failed')
  process.exitCode = 1
}
