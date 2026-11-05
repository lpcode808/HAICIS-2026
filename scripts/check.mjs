import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const html = fs.readFileSync('index.html', 'utf8');
const js = html.match(/<script>([\s\S]*?)<\/script>/)[1];
new vm.Script(js);
new vm.Script(fs.readFileSync('search.js', 'utf8'));
new vm.Script(fs.readFileSync('sw.js', 'utf8'));
const schedule = JSON.parse(js.match(/const SCHEDULE = (\[[\s\S]*?\n\]);/)[1]);
const speakers = JSON.parse(js.match(/const SPEAKERS = (\[[\s\S]*?\n\])\n\s*\.map/)[1]);
assert.equal(schedule.length, 21);
assert.equal(speakers.length, 29);
assert.equal(new Set(schedule.map(s => s.id)).size, 21);
assert.equal(new Set(speakers.map(s => s.name)).size, 29);
assert(speakers.every(s => Array.isArray(s.bio) && s.bio.length && s.bio.every(p => p.length > 40)), 'Every speaker needs a brochure bio');
for (const s of speakers) assert(/^headshots\/[a-z0-9-]+\.jpg$/.test(s.photo) && fs.statSync(s.photo).size > 2000, `Missing headshot: ${s.name}`);
const linked = speakers.filter(s => s.linkedin);
assert(linked.length >= 20 && linked.every(s => /^https:\/\/www\.linkedin\.com\/in\/[A-Za-z0-9-]+\/$/.test(s.linkedin)), 'LinkedIn links must be personal profile URLs');
assert.equal(new Set(linked.map(s => s.linkedin)).size, linked.length, 'LinkedIn links must be unique');
assert.equal(new Set(speakers.map(s => s.photo)).size, speakers.length, 'Each speaker needs their own headshot');
assert(schedule.filter(s => s.description.length > 300).length === 10, 'Ten sessions carry full brochure descriptions');
assert(schedule.every(s => s.date === '2026-11-05'));
const tracks = [...new Set(schedule.flatMap(s => s.strands || []))];
assert.equal(tracks.length, 3);
for (const time of ['1:15 PM', '2:05 PM']) {
  const block = schedule.filter(s => s.time === time);
  assert.equal(block.length, 3);
  assert.equal(new Set(block.map(s => s.location)).size, 3);
  assert.equal(new Set(block.map(s => s.strand)).size, 3);
}
for (const speaker of speakers) for (const id of speaker.sessions) assert(schedule.some(s => s.id === id), id);
assert.equal(schedule.find(s => s.id === 'closing').timeEnd, '4:00 PM');
assert(js.includes("const EVENT_DAY_KEYS = ['2026-11-05']"));
assert(!/CONNECT26|connect26|KSEDTECH-26|2026-06-|55-session|ksbe\.edu|api\.qrserver|fonts\.google|\/Users\//.test(html));
assert(!/\bfetch\(|sendBeacon|XMLHttpRequest/.test(js), 'Application must not transmit notes');
assert(!/AIza[\w-]{25,}|gh[pousr]_[\w]{20,}|BEGIN .*PRIVATE KEY|[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}/.test(html));
const storageKeys = [...js.matchAll(/const \w+_KEY = '([^']+)'/g)].map(m => m[1]);
assert(storageKeys.length >= 5 && storageKeys.every(k => k.startsWith('haicis2026_')));
for (const [, ref] of html.matchAll(/(?:src|href)="([^"#]+)"/g)) {
  if (!/^(https?:|data:)/.test(ref) && !ref.includes('${')) assert(fs.existsSync(ref.split('?')[0]), `Missing local asset: ${ref}`);
}
const sw = fs.readFileSync('sw.js','utf8');
assert(sw.includes("key.startsWith('haicis2026-guide-')"));
assert(sw.includes("'./share-qr.svg'"));
assert(sw.includes("'./wifi-qr.svg'") && fs.readFileSync('wifi-qr.svg', 'utf8').includes('<path'), 'Wi-Fi QR must be local and precached');
assert(sw.includes("'./search.js'"));
console.log('PASS: script syntax; 21 agenda entries; 29 speakers with bios and headshots; full session descriptions; parallel tracks; references; date/time; storage isolation; privacy and local assets.');
