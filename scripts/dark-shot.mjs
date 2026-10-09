// Renders Storybook stories (from a static build) in the dark theme with headless Chromium.
// Usage: npx storybook build -o /tmp/sb-out && node scripts/dark-shot.mjs <outDir> <storyId> [<storyId> ...]
// Story ids: molecules-button--all-variants-dark (see /tmp/sb-out/index.json). Playwright comes from the global node-tools in the cloud container.
import http from 'http';
import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const PW = process.env.PLAYWRIGHT_PATH || '/opt/node-tools/node_modules/playwright';
const { chromium } = require(PW);
const CHROME = process.env.CHROME_PATH || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const ROOT = process.env.SB_OUT || '/tmp/sb-out';
const [outDir, ...ids] = process.argv.slice(2);
fs.mkdirSync(outDir, { recursive: true });

const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.png': 'image/png' };
const srv = http
  .createServer((q, r) => {
    const f = path.join(ROOT, decodeURIComponent(q.url.split('?')[0]));
    if (!fs.existsSync(f) || fs.statSync(f).isDirectory()) { r.statusCode = 404; return r.end(); }
    r.setHeader('content-type', types[path.extname(f)] || 'application/octet-stream');
    fs.createReadStream(f).pipe(r);
  })
  .listen(6107);

const browser = await chromium.launch({ executablePath: CHROME, args: ['--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 1600, height: 300 } });
for (const id of ids) {
  await page.goto(`http://127.0.0.1:6107/iframe.html?id=${id}&viewMode=story`);
  // The ?globals=theme:dark URL param is not picked up, so set the theme by hand.
  await page.evaluate(() => {
    document.documentElement.dataset.theme = 'dark';
    document.body.style.background = 'var(--color-white-dark)';
  });
  await page.waitForTimeout(700);
  await page.screenshot({ path: path.join(outDir, `${id}.png`), fullPage: true });
}
await browser.close();
srv.close();
