# Your pocket guide to HAICIS 2026 🌺

A full day of ideas about artificial intelligence (AI), cloud technology, and Hawaiʻi’s future—without the PDF shuffle.

## 👉 [Open the conference guide](https://lpcode808.github.io/HAICIS-2026/)

**November 5, 2026 · Hilton Waikiki Beach Resort · Honolulu**  
The 5th annual **Hawaiʻi AI & Cloud Innovation Summit**. Open the link on your phone, find your next session, and keep your takeaways in one place. No account needed.

## Make it your day

- **Land where you are.** On the event day, the guide jumps to the current point in the schedule using Hawaiʻi Standard Time (HST, ten hours behind Coordinated Universal Time). Use **Jump to now** or press **t** to return later. In a gap it finds the next session; after the agenda ends it finds closing remarks. It won’t keep scrolling while you’re reading.
- **Find your next stop.** Search by topic, speaker, track, or room. Fuzzy search handles typos, rearranged words, and Hawaiian marks: try **petr schwart**, **data nadia**, or **hawaii**. Schedule matches stay in time order; speaker matches rank by relevance. Searches run locally.
- **Keep the original handy.** The **Brochure** button opens the [public conference PDF](https://drive.google.com/file/d/1U_589JYnYUIcB12ZcsWmJ_yZmEyEeVoW/view?usp=sharing).
- **Pick your afternoon.** There are three parallel tracks: **AI Playbooks**, **Practitioner Foundations**, and **People-Powered AI**. Choose one session at 1:15 PM and another at 2:05 PM.
- **Keep a shortlist.** Open a session and tap **Add to My Picks**. Star speakers you want to remember, too.
- **Catch the useful bits.** Write a session note, a person note, or a quick note for that idea you don’t want to lose before lunch.
- **Take your notes home.** **Export → Save backup file** saves your notes *and* stars in a file that **Import** can restore on any phone or browser. The Notes tab shows when you last backed up and reminds you after a few unsaved notes. A readable Markdown copy is there too, but it can’t be imported.
- **Share the guide.** Tap **Share** in the top-left corner to show a QR (Quick Response) code that opens this public page on someone else’s phone. It doesn’t share your notes.

Visit once while you’re online; the guide’s schedule, speaker list, and share code are then cached for offline use. External websites still need an internet connection.

## Keep your hands on the keyboard

Press **?** or click the **?** button for an in-app reference.

| Key | What it does |
| --- | --- |
| **1 / 2 / 3** | Schedule / speakers / notes |
| **/** | Focus the current tab’s search |
| **j / k** | Next / previous result |
| **↓ / ↑** | Move from search into results, then between result headings |
| **Enter / Space** | Open or close the focused item |
| **s** | Star or unstar the focused session or speaker |
| **n** | Start a quick note |
| **t** | Jump to the current point in the schedule |
| **Esc** | Close a dialog or clear the focused search |

Shortcuts pause while you type in a note or search field. Tab headings also support left/right arrows and Home/End. Dialogs keep keyboard focus inside and return it when closed.

## A few things worth knowing

**Your notes stay in your browser.** This app has no account system, analytics, or note-upload service. Notes and stars are saved on the device and browser where you create them, and every note editor says so. They don’t follow you to another phone, and they can disappear if you clear browser data, use a private window, open the link inside another app (Instagram, LinkedIn…), or don’t visit for about a week on iPhone. Save a backup file before you leave. If a browser blocks storage entirely, the guide shows a warning instead of silently losing notes. On a shared device, someone using the same browser profile may be able to read your notes.

**The brochure is the schedule source.** Its final session ends at **4:00 PM**; the organizer’s website lists the overall event through **4:30 PM**. The guide makes that difference visible. For event updates, check the [official summit website](https://www.truehawaii.org/ai-summit/).

**This is an independent attendee guide.** It’s adapted from the [KSEDTECH-26 conference app](https://github.com/lpcode808/KSEDTECH-26), with the old event content replaced. It isn’t an official registration site. Made with resources from the [TechZone](https://www.hawaiischoolforgirls.org/academics/techzone) at [Hawaiʻi School for Girls at La Pietra](https://www.hawaiischoolforgirls.org/).

## What’s inside

The guide includes **21 agenda entries**, **six breakout sessions across three tracks**, and **29 publicly listed speakers and contributors**, each with their headshot and full brochure biography. Twenty-four cards also link to a LinkedIn profile, added only where search results tied the profile to the speaker’s current role (checked November 5, 2026); the rest have no link rather than a guess. Speaker cards connect to their scheduled appearances; Hannah Ishida and Kira Diionno appear in the brochure biographies without a timed appearance, which their cards explain.

Content comes from the [public HAICIS 2026 Digital Brochure](https://drive.google.com/file/d/1U_589JYnYUIcB12ZcsWmJ_yZmEyEeVoW/view?usp=sharing) (agenda pp. 2–3, speaker roster p. 4, biographies pp. 9–16, session descriptions pp. 5–8). The [organizer’s page](https://www.truehawaii.org/ai-summit/) and [Hawaiʻi Technology Development Corporation listing](https://www.htdc.org/event/hawaii-ai-cloud-innovation-summit/) confirm the venue and overall event window. Sources were checked November 5, 2026.

Headshots in `headshots/` are the brochure’s embedded photos (pp. 9–16), center-cropped to squares at 320 px. Session descriptions and speaker biographies are quoted from the brochure, with only line-wrap hyphenation and two doubled periods cleaned up. Name variants use the fuller brochure names. Peter Schwartz’s title follows the detailed keynote listing; Donavan Kealoha’s two brochure affiliations are retained.

## For the next person updating this

It’s a small static site: **no dependencies and no build step**.

- `index.html` contains the app, agenda, and speaker data.
- `search.js` provides typo-tolerant search without a third-party service or dependency.
- `sw.js` handles offline caching. Bump its cache version whenever you change a cached asset.
- `share-qr.svg` is a local share code, so loading it makes no request to a third-party QR service.
- `favicon.svg` is an original cloud-and-microchip mark inspired by the brochure’s ocean blues and cyan circuit patterns, with a small island-like silhouette in the processor core.
- `scripts/check.mjs` checks script syntax, agenda and speaker references, parallel tracks, dates, local assets, and privacy safeguards. `scripts/behavior.mjs` covers fuzzy matching, Hawaiian marks, speaker aliases, time boundaries, parallel sessions, and backup-note round trips. Run both with `npm test`.

Serve the folder with any static web server to preview changes. **GitHub Pages publishes from `main`, at the repository root.** The live page is [lpcode808.github.io/HAICIS-2026](https://lpcode808.github.io/HAICIS-2026/).

Only reviewed public event content is included. The source repository’s raw scrapes, internal handoffs, history, personal notes, contact details, and credentials were left out. This event uses separate `haicis2026_` browser-storage keys, and its service worker only clears its own older caches. Fonts and the share code are local; speaker-search links send only public speaker details when you choose to open them.
