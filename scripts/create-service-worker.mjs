import {readdir,readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import path from 'node:path';
async function walk(dir){const paths=[];for(const f of await readdir(dir,{withFileTypes:true})){const p=path.join(dir,f.name);if(f.isDirectory())paths.push(...await walk(p));else if(f.name!=='sw.js')paths.push(p);}return paths;}
const files=await walk('dist');const hash=createHash('sha256');for(const f of files)hash.update(await readFile(f));
const version=hash.digest('hex').slice(0,16),assets=['/',...files.map(f=>'/'+path.relative('dist',f).split(path.sep).join('/'))];
const script=`const CACHE='round-${version}';const ASSETS=${JSON.stringify(assets)};
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('round-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',event=>{const request=event.request;if(request.method!=='GET'||new URL(request.url).origin!==self.location.origin)return;
if(request.mode==='navigate'){event.respondWith(fetch(request).catch(()=>caches.match('/index.html')));return;}
if(ASSETS.includes(new URL(request.url).pathname)){event.respondWith(caches.match(request).then(cached=>cached||fetch(request)));}});
`;
await writeFile('dist/sw.js',script);console.log('Service worker generated with '+assets.length+' offline resources.');
