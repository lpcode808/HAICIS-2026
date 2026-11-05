import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';

const html = fs.readFileSync('index.html', 'utf8');
const js = html.match(/<script>([\s\S]*?)<\/script>/)[1];
const schedule = JSON.parse(js.match(/const SCHEDULE = (\[[\s\S]*?\n\]);/)[1]);
const speakers = JSON.parse(js.match(/const SPEAKERS = (\[[\s\S]*?\n\])\n\s*\.map/)[1]);
const context = vm.createContext({ SCHEDULE: schedule, SPEAKERS: speakers, Date, Intl, console,
  NOTE_TYPES: { SESSION:'session', SPEAKER:'speaker', GENERAL:'general' }, GENERAL_NOTE_ID:'quick-note' });
vm.runInContext(fs.readFileSync('search.js', 'utf8'), context);
for (const name of ['parseSessionMs','getScheduleMoment','normalizeTimestamp','noteKey','normalizeNoteRecord','slugify','normalizeSpeakerLookupName','speakerByName','buildExportText']) {
  const source = js.match(new RegExp(`  function ${name}\\([^]*?\\n  }`));
  assert(source, `Missing function ${name}`);
  vm.runInContext(source[0], context);
}
const search = context.GuideSearch;
assert.equal(search.normalize('Hawaiʻi • HAWAI‘I'), 'hawaii hawaii');
assert(Number.isFinite(search.score('petr schwart', 'Peter Schwartz')));
assert(Number.isFinite(search.score('schwartz peter', 'Peter Schwartz')));
assert(Number.isFinite(search.score('agenst', 'agents')));
assert(!Number.isFinite(search.score('zzzz', 'Peter Schwartz')));
assert(!Number.isFinite(search.score('x', 'Peter Schwartz')));
assert(search.score('Peter Schwartz', 'Peter Schwartz') < search.score('Peter Schwartz', 'Petr Schwartz'));
const matches = schedule.filter(s => Number.isFinite(search.score('data nadia', s.title, s.speaker, s.description)));
assert.deepEqual(matches.map(s => s.id), ['data-ready']);
for (const speaker of speakers) speaker.id = context.slugify(speaker.name);
assert.equal(context.speakerByName('Introduction by Lynelle Marble').name, 'Lynelle Marble');
assert.equal(context.speakerByName('Governor Josh Green').name, 'Josh Green');
assert.equal(context.speakerByName('Dr. Adam Jansen (Moderator)').name, 'Dr. Adam Jansen');

const hst = time => Date.parse(`2026-11-05T${time}:00-10:00`);
assert.equal(context.getScheduleMoment(hst('07:59')).sessions[0].id, 'check-in');
assert.equal(context.getScheduleMoment(hst('09:25')).sessions[0].id, 'keynote');
assert.equal(context.getScheduleMoment(hst('10:10')).sessions[0].id, 'morning-break');
assert.equal(context.getScheduleMoment(hst('11:12')).state, 'upcoming');
assert.equal(context.getScheduleMoment(hst('13:20')).sessions.length, 3);
assert.equal(context.getScheduleMoment(hst('13:55')).sessions[0].id, 'afternoon-break');
assert.equal(context.getScheduleMoment(hst('14:05')).sessions.length, 3);
assert.equal(context.getScheduleMoment(hst('16:00')).state, 'ended');
assert.equal(context.getScheduleMoment(Date.parse('2026-11-06T07:00:00Z')).state, 'ended');

// Exported records have entityId, not id. They must survive a JSON round trip.
const note = {key:'session:agents',type:'session',entityId:'agents',text:'Local automation',createdAt:1234,updatedAt:5678};
assert.equal(JSON.stringify(context.normalizeNoteRecord(note.key, JSON.parse(JSON.stringify(note)))), JSON.stringify(note));
assert.equal(context.normalizeNoteRecord('session:agents', {...note,type:'invalid'}), null);
assert.equal(context.normalizeNoteRecord('session:agents', {...note,entityId:'"><script>'}), null);
assert.equal(context.normalizeNoteRecord('session:agents', {...note,text:''}), null);
assert.equal(context.normalizeNoteRecord('agents', {id:'agents',text:'Legacy note',savedAt:1234}).key, 'session:agents');

context.getNotes = () => ({});
context.getStarredSessionList = () => [schedule.find(s => s.id === 'agents')];
assert(context.buildExportText().includes('MY PICKS'));
assert(context.buildExportText().includes('Building AI Automation'));
context.getStarredSessionList = () => [];
assert.equal(context.buildExportText(), 'No notes or starred sessions yet.');

assert(html.includes('1U_589JYnYUIcB12ZcsWmJ_yZmEyEeVoW'));
assert(html.includes('aria-controls="shortcutsModal"'));
assert(html.includes('Letter and number shortcuts pause while you’re typing.'));

// Opening an asset directly must never replace the cached app shell with SVG.
const events = {}, cacheData = new Map([['https://guide.test/HAICIS-2026/index.html', new Response('app shell')]]);
const removed = [], precached = [];
let offline = false;
const keyOf = key => typeof key === 'string' ? key : key.url;
const cache = {
  addAll: async urls => precached.push(...urls),
  match: async key => cacheData.get(keyOf(key))?.clone(),
  put: async (key, response) => cacheData.set(keyOf(key), response)
};
const worker = vm.createContext({ URL, Response, caches: {
  open: async () => cache,
  keys: async () => ['other-conference-v1', 'haicis2026-guide-v2', 'haicis2026-guide-v3', 'haicis2026-guide-v4', 'haicis2026-guide-v5'],
  delete: async key => removed.push(key)
}, fetch: async request => {
  if (offline) throw new Error('Offline');
  return new Response(request.url.includes('favicon') ? 'svg icon' : 'fresh shell');
}, self: {
  location:{href:'https://guide.test/HAICIS-2026/sw.js',origin:'https://guide.test'},
  addEventListener: (type, listener) => { events[type] = listener; },
  skipWaiting: async () => {}, clients:{claim: async () => {}}
}});
vm.runInContext(fs.readFileSync('sw.js', 'utf8'), worker);
let task;
events.install({waitUntil: promise => {task = promise;}}); await task;
assert(precached.includes('./search.js'));
events.activate({waitUntil: promise => {task = promise;}}); await task;
assert.deepEqual(removed, ['haicis2026-guide-v2', 'haicis2026-guide-v3', 'haicis2026-guide-v4']);
let response;
events.fetch({request:{url:'https://guide.test/HAICIS-2026/favicon.svg?v=2',method:'GET',mode:'navigate'},
  waitUntil:promise => {task=promise;},respondWith:promise => {response=promise;}});
assert.equal(await (await response).text(), 'svg icon'); await task;
assert.equal(await cacheData.get('https://guide.test/HAICIS-2026/index.html').clone().text(), 'app shell');
const navigate = () => events.fetch({request:{url:'https://guide.test/HAICIS-2026/?review=1',method:'GET',mode:'navigate'},
  waitUntil:promise => {task=promise;},respondWith:promise => {response=promise;}});
navigate(); assert.equal(await (await response).text(), 'fresh shell'); await task;
offline = true;
navigate(); assert.equal(await (await response).text(), 'fresh shell'); await task;
console.log('PASS: fuzzy typos/diacritics/multi-word queries; speaker aliases; Hawaii time boundaries and parallel sessions; exported-note round trips and invalid imports.');
console.log('PASS: offline search precache, unrelated-cache preservation, and asset navigation cannot overwrite the app shell.');
