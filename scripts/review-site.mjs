#!/usr/bin/env node
// Optional visual QA: npm install --no-save playwright-core; no game is launched.
import fs from 'node:fs/promises';
import path from 'node:path';
import http from 'node:http';
import { fileURLToPath, pathToFileURL } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const modulePath = process.env.PLAYWRIGHT_MODULE || 'playwright-core';
const { chromium } = await import(modulePath.startsWith('/') ? pathToFileURL(modulePath) : modulePath);
const output = path.join(root, 'verification/screenshots');
await fs.mkdir(output, { recursive: true });
const types = { '.html':'text/html; charset=utf-8', '.css':'text/css', '.png':'image/png', '.svg':'image/svg+xml', '.txt':'text/plain' };
const server = http.createServer(async (req,res) => {
  try {
    let name = decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    if (name.endsWith('/')) name += 'index.html';
    const file = path.resolve(root, `.${name}`);
    if (!file.startsWith(`${root}/`)) throw Error('outside site');
    const body = await fs.readFile(file);
    res.writeHead(200, { 'Content-Type':types[path.extname(file)] || 'application/octet-stream' }); res.end(body);
  } catch { res.writeHead(404); res.end('Not found'); }
});
await new Promise((resolve,reject) => { server.once('error',reject); server.listen(0,'127.0.0.1',resolve); });
const base = `http://127.0.0.1:${server.address().port}`;
let browser;
const failures = [], report = [];
try {
  browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
  const routes = JSON.parse(await fs.readFile(path.join(root,'site/routes.json'),'utf8'));
  for (const width of [320,390,768,1440]) {
    const context = await browser.newContext({viewport:{width,height:960}, deviceScaleFactor:1, reducedMotion:'reduce', javaScriptEnabled:false});
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('response', res => { if(res.status() >= 400) errors.push(`${res.status()} ${res.url()}`); });
    for (const route of routes) {
      await page.goto(`${base}/${route.file}`);
      const state = await page.evaluate(() => ({
        overflow: document.documentElement.scrollWidth > innerWidth + 1,
        brokenImages: [...document.images].filter(i=>!i.complete || i.naturalWidth === 0).length,
        h1: document.querySelector('h1')?.textContent,
        smallLinks: [...document.querySelectorAll('.site-header a, .button, summary')].filter(e=>e.getBoundingClientRect().height < 40).map(e=>e.textContent.trim()),
        outOfBounds: [...document.querySelectorAll('h1,h2,p,summary,.button')].filter(e=>{const b=e.getBoundingClientRect();return b.width && (b.left < -1 || b.right > innerWidth+1);}).map(e=>e.textContent.slice(0,60))
      }));
      const ok = !state.overflow && state.brokenImages === 0 && state.smallLinks.length === 0 && state.outOfBounds.length === 0;
      report.push({width, page:route.file, ok, ...state});
      if (!ok) failures.push({width,page:route.file,...state});
      if ((width === 390 || width === 1440) && ['ko/index.html','ko/waddle-rush/index.html','ko/push-burst/index.html','ko/waddle-rush/privacy/index.html','ko/terms/index.html','ko/push-burst/support/index.html'].includes(route.file)) {
        await page.screenshot({path:path.join(output,`${route.file.replace(/\/index\.html$/,'').replaceAll('/','-')}-${width}.png`),fullPage:true});
      }
    }
    // Native FAQ works with JavaScript disabled, including keyboard access.
    await page.goto(`${base}/ko/waddle-rush/support/`);
    const first = page.locator('summary').first();
    await first.focus(); await page.keyboard.press('Enter');
    if (!(await page.locator('details').first().getAttribute('open') === '')) failures.push({width,faq:'keyboard open failed'});
    await page.keyboard.press('Enter');
    if (await page.locator('details').first().getAttribute('open') !== null) failures.push({width,faq:'keyboard close failed'});
    await page.getByRole('link',{name:'EN',exact:true}).click();
    if (!page.url().endsWith('/waddle-rush/support/index.html')) failures.push({width,language:'did not preserve route'});
    if (errors.length) failures.push({width,errors});
    await context.close();
  }
  await fs.writeFile(path.join(root,'verification/browser-review.json'),JSON.stringify({report,failures},null,2)+'\n');
  console.log(`${failures.length ? 'FAIL' : 'PASS'}: ${report.length} responsive pages; JS-disabled navigation and FAQ keyboard checks. ${failures.length} failures.`);
  if(failures.length) { console.log(JSON.stringify(failures,null,2)); process.exitCode=1; }
} finally { await browser?.close(); await new Promise(resolve=>server.close(resolve)); }
