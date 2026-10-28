#!/usr/bin/env python3
"""Validate static routes, local links, anchors, disclosure separation and ads host data."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote
import json

ROOT = Path(__file__).resolve().parent.parent
CONFIG = json.loads((ROOT / 'site/config.json').read_text())
ROUTES = json.loads((ROOT / 'site/routes.json').read_text())

class Document(HTMLParser):
    def __init__(self, text):
        super().__init__(convert_charrefs=True)
        self.links, self.ids, self.images, self.headings = [], [], [], []
        self.lang, self.scripts, self.forms, self.external_assets = None, 0, 0, []
        self.feed(text)
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == 'html': self.lang = a.get('lang')
        if tag == 'h1': self.headings.append(tag)
        if 'id' in a: self.ids.append(a['id'])
        if tag == 'script': self.scripts += 1
        if tag == 'form': self.forms += 1
        if tag == 'a': self.links.append(a.get('href', ''))
        if tag == 'img': self.images.append(a)
        if tag in ('img','script') and a.get('src'): self.links.append(a['src'])
        if tag == 'link' and a.get('rel') in ('stylesheet','icon'): self.links.append(a['href'])

files = [x['file'] for x in ROUTES] + ['privacy.html','privacy-ko.html','404.html']
docs = {name: Document((ROOT/name).read_text()) for name in files}
checks = 0
def check(ok, message):
    global checks
    checks += 1
    if not ok: raise AssertionError(message)

for name, doc in docs.items():
    check(doc.lang in ('en','ko'), f'{name}: missing language')
    check(len(doc.headings) == 1, f'{name}: expected one H1')
    check(len(doc.ids) == len(set(doc.ids)), f'{name}: duplicate anchors')
    check(doc.scripts == 0 and doc.forms == 0, f'{name}: unexpected tracking/form/script surface')
    for img in doc.images:
        check('alt' in img and 'width' in img and 'height' in img, f'{name}: incomplete image metadata')
    for href in doc.links:
        check(bool(href) and href != '#', f'{name}: empty or inert link')
        part = urlsplit(href)
        if part.scheme in ('mailto','https'): continue
        check(not part.scheme and not href.startswith('/'), f'{name}: nonportable link {href}')
        target = ((ROOT/name).parent / unquote(part.path)).resolve() if part.path else ROOT/name
        if target.is_dir(): target /= 'index.html'
        check(target.is_relative_to(ROOT) and target.exists(), f'{name}: missing target {href}')
        if part.fragment:
            relative = target.relative_to(ROOT).as_posix()
            check(relative in docs and unquote(part.fragment) in docs[relative].ids, f'{name}: missing anchor {href}')

legacy = (ROOT/'privacy.html').read_text()
check('Push Burst · Privacy policy' in legacy, 'Legacy privacy.html must remain Push Burst')
check('https://projectunknownteam.github.io/push-burst/privacy/' in legacy, 'Legacy canonical URL')
for lang in ('','ko/'):
    w = (ROOT/f'{lang}waddle-rush/privacy/index.html').read_text()
    p = (ROOT/f'{lang}push-burst/privacy/index.html').read_text()
    check(CONFIG['games']['waddle-rush']['packageName'] in w, 'Waddle app identity')
    check(CONFIG['games']['push-burst']['packageName'] in p, 'Push app identity')
    for body in (p,w):
        check('Game Center' in body and 'Google Play Games' in body, 'Platform disclosures')
        check('Unity IAP' in body or 'Unity In-App Purchasing' in body, 'Purchase SDK disclosure')
ads = f"google.com, {CONFIG['publisherId']}, DIRECT, f08c47fec0942fa0\n"
check((ROOT/'app-ads.txt').read_text() == ads, 'Root app-ads.txt exact publisher')
check((ROOT/'.nojekyll').exists(), 'Static Pages marker')
print(f'PASS: {checks} assertions across {len(files)} HTML pages; links, anchors, identities and app-ads.txt.')
