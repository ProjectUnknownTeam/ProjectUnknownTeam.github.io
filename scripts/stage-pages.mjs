import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const out=path.join(root,'_site');
if(fs.existsSync(out)) fs.rmSync(out,{recursive:true}); // This script owns this exact generated directory.
fs.mkdirSync(out,{recursive:true});
const routes=JSON.parse(fs.readFileSync(path.join(root,'site/routes.json'),'utf8')).map(r=>r.file);
for(const file of [...routes,'privacy.html','privacy-ko.html','404.html','app-ads.txt','robots.txt','sitemap.xml','.nojekyll']) {
  const dest=path.join(out,file);fs.mkdirSync(path.dirname(dest),{recursive:true});fs.copyFileSync(path.join(root,file),dest);
}
fs.cpSync(path.join(root,'assets'),path.join(out,'assets'),{recursive:true});
console.log('Staged public files in _site; no deployment performed.');
