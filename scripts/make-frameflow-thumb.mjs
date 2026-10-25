import { chromium } from 'playwright'
import { fileURLToPath } from 'node:url'
import { join, dirname } from 'node:path'
import { existsSync } from 'node:fs'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const systemChrome = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const executablePath = process.env.CHROME_PATH || (process.platform === 'win32' && existsSync(systemChrome) ? systemChrome : undefined)
const browser = await chromium.launch({
  headless: true,
  executablePath,
})
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 })
  await page.goto(`file://${join(root, 'public', 'samples', 'frameflow.html').replaceAll('\\', '/')}`)
  await page.screenshot({ path: join(root, 'public', 'samples', 'frameflow.jpeg'), type: 'jpeg', quality: 86 })
} finally {
  await browser.close()
}
