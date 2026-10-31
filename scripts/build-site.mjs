#!/usr/bin/env node
// Build static HTML only; never runs a game or publishes the site.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { makeContent } from '../site/content.mjs';
import { structuredData } from '../site/seo.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const config = JSON.parse(fs.readFileSync(path.join(root, 'site/config.json'), 'utf8'));
const { common, games } = makeContent(config);
const esc = value => String(value).replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));
const languages = ['en', 'ko'];
const routes = [];
function route(lang, slug = '') { return `${lang === 'ko' ? 'ko/' : ''}${slug}${slug && !slug.endsWith('/') ? '/' : ''}index.html`; }
function relative(file, target) { return path.posix.relative(path.posix.dirname(file), target) || 'index.html'; }
function url(file) { return new URL(file.replace(/index\.html$/, ''), config.baseUrl).href; }
function write(file, value) { const target = path.join(root, file); fs.mkdirSync(path.dirname(target), { recursive: true }); fs.writeFileSync(target, value.trimEnd().split('\n').map(line=>line.trimEnd()).join('\n')+'\n'); }
function anchor(file, target, text, extra = '') { return `<a href="${esc(relative(file, target))}"${extra}>${text}</a>`; }
const gameAsset = id => id === 'waddle-rush' ? 'waddle' : 'push-burst';

function downloads(lang, game) {
  const info = config.games[game];
  const labels = games[game][lang].home;
  const stores = [['googlePlay','Google Play',lang === 'ko' ? 'Android 다운로드' : 'Get it on',labels.playStore],['appStore','App Store',lang === 'ko' ? 'iPhone · iPad 다운로드' : 'Download on the',labels.appStore]];
  return `<div class="store-buttons" role="group" aria-label="${esc(info.name)} ${lang === 'ko' ? '다운로드' : 'downloads'}">${stores.filter(([key])=>info[key]).map(([key,name,hint,label])=>`<a class="store-button" href="${esc(info[key])}" aria-label="${esc(info.name+' — '+label)}"><span>${esc(hint)}</span><strong>${name}</strong></a>`).join('')}</div>`;
}

function page({ lang, file, kind, game, title, description, body, canonicalFile = file, noindex = false }) {
  const c = common[lang];
  if (!title.includes('ProjectUnknown')) title += ' | ProjectUnknown';
  const other = lang === 'en' ? 'ko' : 'en';
  const slug = canonicalFile.replace(/^ko\//, '').replace(/\/?index\.html$/, '');
  const breadcrumbs = [{name:lang === 'ko' ? '게임 소개' : 'Games',file:route(lang),url:url(route(lang))}];
  if (game) breadcrumbs.push({name:config.games[game].name,file:route(lang,game),url:url(route(lang,game))});
  if (kind !== 'home' && kind !== 'notFound') breadcrumbs.push({name:c.nav[kind],file:canonicalFile,url:url(canonicalFile)});
  const crumbHtml = kind === 'notFound' || breadcrumbs.length < 2 ? '' : `<nav class="breadcrumbs" aria-label="${lang === 'ko' ? '현재 위치' : 'Breadcrumb'}"><ol>${breadcrumbs.map((b,i)=>`<li>${i === breadcrumbs.length-1 ? `<span aria-current="page">${esc(b.name)}</span>` : anchor(file,b.file,esc(b.name))}</li>`).join('')}</ol></nav>`;
  const graph = structuredData({config,lang,kind,game,title,description,canonical:url(canonicalFile),breadcrumbs});
  const jsonLd = graph ? JSON.stringify(graph).replace(/</g,'\\u003c') : '';
  const scriptPolicy = jsonLd ? `; script-src 'sha256-${createHash('sha256').update(jsonLd).digest('base64')}'` : '';
  const languageLink = language => anchor(file, route(language, slug), language === 'en' ? 'EN' : '한국어', ` lang="${language}" hreflang="${language}"${language === lang ? ' aria-current="true"' : ''}`);
  const nav = (key, target) => anchor(file, target, esc(c.nav[key]), kind === key && !game ? ' aria-current="page"' : '');
  const brand = anchor(file, route(lang), '<span class="brand-mark" aria-hidden="true">p.</span><span>ProjectUnknown</span>', ' class="brand"');
  const localGameNav = game ? `<nav class="game-nav" aria-label="${lang === 'ko' ? '게임 메뉴' : 'Game navigation'}">${anchor(file, route(lang, game), `<img src="${relative(file, `assets/${gameAsset(game)}-icon.png`)}" width="40" height="40" alt="">${esc(config.games[game].name)}`, ' class="game-name"')}${anchor(file, route(lang, `${game}/support`), esc(c.nav.support), kind === 'support' ? ' aria-current="page"' : '')}${anchor(file, route(lang, `${game}/privacy`), esc(c.nav.privacy), kind === 'privacy' ? ' aria-current="page"' : '')}</nav>` : '';
  const asset = game ? `${gameAsset(game)}-feature.png` : 'waddle-feature.png';
  const html = `<!doctype html>
<html lang="${lang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="color-scheme" content="light">
  <meta name="theme-color" content="#fffaf1">
  <meta name="referrer" content="strict-origin-when-cross-origin">
  <meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src 'self' data:; style-src 'self'; base-uri 'none'; form-action 'none'${scriptPolicy}">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <meta name="robots" content="${noindex ? 'noindex,follow' : 'index,follow,max-image-preview:large'}">
  <link rel="canonical" href="${url(canonicalFile)}">
  ${kind === 'notFound' ? '' : `<link rel="alternate" hreflang="${other}" href="${url(route(other, slug))}">
  <link rel="alternate" hreflang="${lang}" href="${url(canonicalFile)}">
  <link rel="alternate" hreflang="x-default" href="${url(route('en', slug))}">`}
  <link rel="stylesheet" href="${relative(file, 'assets/site.css')}">
  <link rel="icon" type="image/svg+xml" href="${relative(file, 'assets/favicon.svg')}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="ProjectUnknown">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:url" content="${url(canonicalFile)}">
  <meta property="og:image" content="${new URL(`assets/${asset}`, config.baseUrl)}">
  <meta property="og:image:alt" content="${esc(game ? config.games[game].name : 'ProjectUnknown mobile games')}">
  <meta property="og:image:width" content="1024">
  <meta property="og:image:height" content="500">
  <meta property="og:locale" content="${lang === 'ko' ? 'ko_KR' : 'en_US'}">
  <meta property="og:locale:alternate" content="${lang === 'ko' ? 'en_US' : 'ko_KR'}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(title)}">
  <meta name="twitter:description" content="${esc(description)}">
  <meta name="twitter:image" content="${new URL(`assets/${asset}`, config.baseUrl)}">
  <meta name="twitter:image:alt" content="${esc(game ? config.games[game].name : 'ProjectUnknown mobile games')}">
  ${jsonLd ? `<script type="application/ld+json">${jsonLd}</script>` : ''}
</head>
<body id="top">
  <a class="skip" href="#main">${esc(c.skip)}</a>
  <header class="site-header wrap">${brand}<nav class="site-nav" aria-label="${lang === 'ko' ? '주 메뉴' : 'Main navigation'}">${nav('home', route(lang))}${nav('support', route(lang, 'support'))}<span class="languages" role="group" aria-label="${esc(c.language)}">${languageLink('en')}${languageLink('ko')}</span></nav></header>
  <div class="wrap">${localGameNav}</div>
  <main id="main" class="wrap">${crumbHtml}${body}</main>
  <footer class="site-footer wrap"><div class="footer-top"><div>${brand}<p class="footer-tag">${esc(c.footer)}</p></div><nav class="footer-links" aria-label="${lang === 'ko' ? '사이트 안내' : 'Site information'}">${anchor(file, route(lang, 'support'), esc(c.nav.support))}${anchor(file, route(lang, 'privacy'), esc(c.nav.privacy))}${anchor(file, route(lang, 'terms'), esc(c.nav.terms))}</nav></div><p class="copyright">© ${config.updated.slice(0,4)} ${esc(config.operator)} · <a href="mailto:${esc(config.email)}">${esc(config.email)}</a></p></footer>
</body>
</html>`;
  write(file, html);
  if (canonicalFile === file && file !== '404.html') routes.push({ file, lang, kind, game: game || null, noindex });
}

function gameCards(lang, file, type = 'home') {
  const c = common[lang];
  return `<div class="${type === 'home' ? 'game-grid' : 'policy-links'}">${Object.keys(config.games).map(id => {
    const asset = gameAsset(id);
    const name = config.games[id].name;
    if (type !== 'home') return `<article class="policy-card"><img src="${relative(file, `assets/${asset}-icon.png`)}" width="64" height="64" alt=""><h2>${esc(name)}</h2><p>${esc(c.privacy[id === 'push-burst' ? 'push' : 'waddle'])}</p>${anchor(file, route(lang, `${id}/${type}`), esc(type === 'privacy' ? c.privacy.link : c.home.support), ' class="button secondary"')}</article>`;
    return `<article class="game-card">${anchor(file, route(lang, id), `<img src="${relative(file, `assets/${asset}-feature.png`)}" alt="${esc(name)}" width="1024" height="500">`)}<div class="game-card-copy"><p class="card-type">${esc(c.home[id === 'push-burst' ? 'pushType' : 'waddleType'])}</p><h2>${esc(name)}</h2><p>${esc(c.home[id === 'push-burst' ? 'pushBody' : 'waddleBody'])}</p>${downloads(lang,id)}<div class="button-row">${anchor(file, route(lang, id), esc(c.home.view), ' class="button"')}${anchor(file, route(lang, `${id}/support`), esc(c.home.support), ' class="text-link"')}</div></div></article>`;
  }).join('')}</div>`;
}
function heading(data) { return `<header class="page-heading"><p class="eyebrow">${esc(data.eyebrow)}</p><h1>${esc(data.title)}</h1><div class="intro">${data.intro}</div></header>`; }
function contact(lang, data) { return `<section class="contact"><div><h2>${esc(data.contact)}</h2><a class="email" href="mailto:${esc(config.email)}">${esc(config.email)}</a></div><div><p>${esc(data.contactBody)}</p>${data.safety ? `<p class="small">${esc(data.safety)}</p>` : ''}</div></section>`; }
function legal(lang, file, data) {
  const c = common[lang];
  const dated = new Intl.DateTimeFormat(lang === 'en' ? 'en-GB' : 'ko-KR', { dateStyle:'long', timeZone:'UTC' }).format(new Date(`${config.updated}T00:00:00Z`));
  const notice = config.legalReviewComplete ? '' : `<aside class="review-note" role="note">${esc(c.review)}</aside>`;
  return `${heading(data)}<p class="small">${esc(c.updated)}: <time datetime="${config.updated}">${dated}</time>${config.legalReviewComplete ? '' : ` · ${esc(c.effective)}`}</p>${notice}<div class="document-layout"><nav class="contents" aria-label="${esc(c.contents)}"><p>${esc(c.contents)}</p><ol>${data.sections.map(([id,title]) => `<li><a href="#${id}">${esc(title)}</a></li>`).join('')}</ol></nav><article class="article">${data.summary ? `<aside class="policy-summary"><h2>${esc(data.summaryTitle)}</h2><p>${esc(data.summary)}</p></aside>` : ''}${data.sections.map(([id,title,body], i) => `<section id="${id}" aria-labelledby="heading-${id}"><h2 id="heading-${id}">${i + 1}. ${esc(title)}</h2>${body}</section>`).join('')}<p class="back-top"><a href="#top">${esc(c.backTop)}</a></p></article></div>`;
}

for (const lang of languages) {
  const c = common[lang];
  let file = route(lang);
  page({ lang, file, kind:'home', ...c.home, body:`<section class="studio-intro"><p class="eyebrow">${esc(c.home.eyebrow)}</p><h1>${c.home.headline}</h1><p class="intro">${esc(c.home.intro)}</p></section>${gameCards(lang, file)}` });
  file = route(lang, 'support');
  page({ lang, file, kind:'support', ...c.support, body:`${heading(c.support)}${gameCards(lang,file,'support')}${contact(lang,c.support)}` });
  file = route(lang, 'privacy');
  page({ lang, file, kind:'privacy', ...c.privacy, body:`${heading(c.privacy)}${gameCards(lang,file,'privacy')}<section class="contact"><div><h2>${esc(c.privacy.webTitle)}</h2></div><div><p>${esc(c.privacy.webBody)}</p><p><a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement">${esc(c.privacy.website)}</a></p><p>${esc(c.privacy.contact)} <a href="mailto:${esc(config.email)}">${esc(config.email)}</a>.</p></div></section>` });
  file = route(lang, 'terms');
  page({ lang, file, kind:'terms', ...c.terms, noindex:!config.legalReviewComplete, body:legal(lang,file,c.terms) });
  for (const game of Object.keys(config.games)) {
    const g = games[game][lang];
    const h = g.home;
    const info = config.games[game];
    file = route(lang, game);
    page({ lang, file, kind:'home', game, ...h, body:`<section class="hero"><div><p class="eyebrow">${esc(h.eyebrow)}</p><h1>${h.headline}</h1><p class="intro">${esc(h.intro)}</p>${downloads(lang,game)}<div class="button-row"><a class="button" href="#discover">${esc(h.discover)}</a>${anchor(file,route(lang,`${game}/support`),esc(h.help),' class="text-link"')}</div></div><figure class="hero-art${game === 'push-burst' ? ' push' : ''}"><img src="${relative(file,game === 'waddle-rush' ? 'assets/waddle-penguin.png' : 'assets/push-burst-icon.png')}" width="${game === 'waddle-rush' ? '1280' : '512'}" height="${game === 'waddle-rush' ? '1280' : '512'}" alt="${esc(h.artAlt)}" fetchpriority="high">${h.sticker ? `<span class="sticker" aria-hidden="true">${h.sticker}</span>` : ''}</figure></section><section id="discover" class="features"><div><p class="eyebrow">${esc(h.sectionLabel)}</p><h2>${h.sectionTitle}</h2><p>${esc(h.sectionIntro)}</p><p class="feature-note">${esc(h.note)}</p></div><div>${h.features.map(([n,title,body])=>`<article class="feature"><span class="feature-number" aria-hidden="true">${n}</span><div><h3>${esc(title)}</h3><p>${esc(body)}</p></div></article>`).join('')}</div></section><section class="help-banner"><div><h2>${esc(h.supportTitle)}</h2><p>${esc(h.supportBody)}</p></div>${anchor(file,route(lang,`${game}/support`),esc(h.supportLink),' class="button"')}</section>` });
    file = route(lang, `${game}/support`);
    page({ lang, file, kind:'support', game, title:`${config.games[game].name} · ${c.nav.support}`, description:g.support.description, body:`${heading(g.support)}${contact(lang,g.support)}<section class="faq"><h2>${esc(g.support.faqTitle)}</h2>${g.support.questions.map(([q,a])=>`<details><summary>${esc(q)}</summary><p>${a}</p></details>`).join('')}</section>` });
    file = route(lang, `${game}/privacy`);
    page({ lang, file, kind:'privacy', game, title:`${config.games[game].name} · ${g.privacy.title}`, description:g.privacy.description, noindex:!config.legalReviewComplete, body:legal(lang,file,g.privacy) });
  }
}
// The old live URL has always meant Push Burst. Keep a full readable policy at it,
// even without JavaScript; do not silently redirect it to the new game's policy.
for (const [file, lang] of [['privacy.html','en'], ['privacy-ko.html','ko']]) {
  const d = games['push-burst'][lang].privacy;
  page({ lang, file, canonicalFile:route(lang,'push-burst/privacy'), kind:'privacy', game:'push-burst', title:`Push Burst · ${d.title}`, description:d.description, noindex:true, body:legal(lang,file,d) });
}
const error = common.en.notFound;
page({ lang:'en', file:'404.html', kind:'notFound', ...error, noindex:true, body:`<section class="empty-state"><p class="eyebrow">404</p><h1>${esc(error.title)}</h1><p>${esc(error.body)}</p><a class="button" href="${config.baseUrl}">${esc(error.link)}</a></section>` });
// GitHub serves a root 404 at arbitrary path depths. Use fixed production asset
// URLs for that one file only; normal pages retain portable relative paths.
let notFound = fs.readFileSync(path.join(root,'404.html'),'utf8');
notFound = notFound.replace(/(href|src)="(?!https?:|mailto:|#)([^"]+)"/g, (_,key,value)=>`${key}="${new URL(value, config.baseUrl).href}"`);
write('404.html', notFound);
fs.copyFileSync(path.join(root,'site/site.css'),path.join(root,'assets/site.css'));
write('assets/favicon.svg','<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect x="2" y="2" width="60" height="60" rx="20" fill="#263b51"/><path d="M20 48V20h10c18 0 18 22 0 22h-3v6zm7-13h3c8 0 8-8 0-8h-3z" fill="#fffaf1"/><circle cx="47" cy="45" r="4" fill="#ffc6a7"/></svg>');
write('app-ads.txt', `google.com, ${config.publisherId}, DIRECT, f08c47fec0942fa0`);
write('.nojekyll','');
write('robots.txt', `User-agent: *\nAllow: /\nSitemap: ${new URL('sitemap.xml',config.baseUrl)}`);
write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.filter(r=>!r.noindex).map(r=>`\n  <url><loc>${url(r.file)}</loc><lastmod>${r.kind === 'home' ? config.marketingUpdated || config.updated : config.updated}</lastmod></url>`).join('')}\n</urlset>`);
write('site/routes.json',JSON.stringify(routes,null,2));
console.log(`Generated ${routes.length} static pages, 2 legacy policies and a 404 page. Nothing published.`);
