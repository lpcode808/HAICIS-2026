# Your pocket guide to HAICIS 2026 🌺

A full day of ideas about artificial intelligence (AI), cloud technology, and Hawaiʻi’s future—without the PDF shuffle.

## 👉 [Open the conference guide](https://lpcode808.github.io/HAICIS-2026/)

**November 5, 2026 · Hilton Waikiki Beach Resort · Honolulu**  
The 5th annual **Hawaiʻi AI & Cloud Innovation Summit**. Open the link on your phone, find your next session, and keep your takeaways in one place. No account needed.

## Make it your day

- **Find your next stop.** Browse the full agenda or search by topic, speaker, track, or room. Live indicators follow Hawaiʻi Standard Time (HST, UTC−10).
- **Pick your afternoon.** There are three parallel tracks: **AI Playbooks**, **Practitioner Foundations**, and **People-Powered AI**. Choose one session at 1:15 PM and another at 2:05 PM.
- **Keep a shortlist.** Open a session and tap **Add to My Picks**. Star speakers you want to remember, too.
- **Catch the useful bits.** Write a session note, a person note, or a quick note for that idea you don’t want to lose before lunch.
- **Take your notes home.** Export a Markdown backup or a JSON (JavaScript Object Notation) file that you can import later.
- **Share the guide.** The built-in QR (Quick Response) code opens this public page for someone else. It doesn’t share your notes.

Visit once while you’re online; the guide’s schedule, speaker list, and share code are then cached for offline use. External websites still need an internet connection.

## A few things worth knowing

**Your notes stay in your browser.** This app has no account system, analytics, or note-upload service. Notes and stars are saved on the device and browser where you create them. They don’t follow you to another phone, and private browsing or clearing browser data can erase them. Export a backup before you leave. On a shared device, someone using the same browser profile may be able to read your notes.

**The brochure is the schedule source.** Its final session ends at **4:00 PM**; the organizer’s website lists the overall event through **4:30 PM**. The guide makes that difference visible. For event updates, check the [official summit website](https://www.truehawaii.org/ai-summit/).

**This is an independent attendee guide.** It’s adapted from the [KSEDTECH-26 conference app](https://github.com/lpcode808/KSEDTECH-26), with the old event content replaced. It isn’t an official registration site.

## What’s inside

The guide includes **21 agenda entries**, **six breakout sessions across three tracks**, and **28 publicly listed speakers and contributors**. Speaker cards connect to their scheduled appearances; Hannah Ishida is listed in the brochure biographies without a timed appearance, which her card explains.

Content comes from the supplied **HAICIS 2026 Digital Brochure** (agenda pp. 2–3, speaker roster p. 4 and pp. 9–16, session descriptions pp. 5–8). The [organizer’s page](https://www.truehawaii.org/ai-summit/) and [Hawaiʻi Technology Development Corporation listing](https://www.htdc.org/event/hawaii-ai-cloud-innovation-summit/) confirm the venue and overall event window. Sources were checked November 5, 2026.

Session descriptions are concise paraphrases of the brochure. Name variants use the fuller brochure names. Peter Schwartz’s title follows the detailed keynote listing; Donavan Kealoha’s two brochure affiliations are retained.

## For the next person updating this

It’s a small static site: **no dependencies and no build step**.

- `index.html` contains the app, agenda, and speaker data.
- `sw.js` handles offline caching. Bump its cache version whenever you change a cached asset.
- `share-qr.svg` is a local share code, so loading it makes no request to a third-party QR service.
- `favicon.svg` is an original cloud-and-microchip mark inspired by the brochure’s ocean blues and cyan circuit patterns, with a small island-like silhouette in the processor core.
- `scripts/check.mjs` checks script syntax, agenda and speaker references, parallel tracks, dates, local assets, and privacy safeguards. Run it with `npm test`.

Serve the folder with any static web server to preview changes. **GitHub Pages publishes from `main`, at the repository root.** The live page is [lpcode808.github.io/HAICIS-2026](https://lpcode808.github.io/HAICIS-2026/).

Only reviewed public event content is included. The source repository’s raw scrapes, internal handoffs, history, personal notes, contact details, and credentials were left out. This event uses separate `haicis2026_` browser-storage keys, and its service worker only clears its own older caches. Fonts and the share code are local; speaker-search links send only public speaker details when you choose to open them.
