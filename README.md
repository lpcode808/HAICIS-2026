# HAICIS 2026 Conference Guide

An independent, mobile-first attendee guide for the 5th annual Hawaiʻi Artificial Intelligence (AI) & Cloud Innovation Summit, November 5, 2026, at Hilton Waikiki Beach Resort in Honolulu.

Adapted from [KSEDTECH-26](https://github.com/lpcode808/KSEDTECH-26). This repository contains the adapted app, not the source repository's history, raw scrapes, internal handoffs, or personal notes.

## Features

- Complete brochure agenda: 21 entries, including six sessions across three parallel breakout tracks.
- Searchable roster of 28 publicly listed speakers and contributors, linked to scheduled appearances.
- Session picks, speaker stars, session notes, person notes, and quick notes.
- Markdown and JSON (JavaScript Object Notation) note exports and backup import.
- Local share QR (Quick Response) code and offline app shell after the first online visit.
- Live session indicators use Hawaiʻi Standard Time (HST, UTC−10).

## Content sources

- User-supplied **HAICIS 2026 Digital Brochure.pdf**, November 5, 2026: agenda pp. 2–3; speaker roster p. 4 and pp. 9–16; session descriptions pp. 5–8.
- [Official summit page](https://www.truehawaii.org/ai-summit/): venue and overall event window, checked November 5, 2026.
- [Hawaiʻi Technology Development Corporation event listing](https://www.htdc.org/event/hawaii-ai-cloud-innovation-summit/): venue corroboration.

The brochure controls session times and participation. Its agenda ends at **4:00 PM**; the public organizer page lists the event through **4:30 PM**. The guide states the difference rather than inventing an extra session. Speaker-name variants are normalized to the fuller brochure roster names. Peter Schwartz's title follows the detailed keynote listing (Chief Futurist). Donavan Kealoha's two brochure affiliations are retained. Hannah Ishida is included in the brochure biographies but has no scheduled appearance; the speaker card states that explicitly. Session descriptions are concise paraphrases of the brochure.

## Privacy

Only reviewed public event content is checked in. No attendee list, contact details, note backups, authentication credentials, or copied browser storage is included. New browsers start with empty notes and stars. Storage keys begin `haicis2026_`, distinct from the original guide. There is no analytics, backend, remote font, remote QR service, or automatic note upload. External links open only when chosen, and speaker searches contain public speaker details only. Notes on a shared device can be read by someone with access to that browser profile; export and clear them as needed.

The service worker caches only assets under this guide's path and removes only older HAICIS app caches, leaving other conference sites on the same domain alone.

## Run and check

No dependencies or build step are required. Serve this directory with any static web server. Run `npm test` for JavaScript syntax, event-data integrity, and privacy/asset checks.

GitHub Pages can serve the `main` branch at `/` (root). The intended URL is https://lpcode808.github.io/HAICIS-2026/. `.nojekyll` disables unnecessary processing.

Update the cache version in `sw.js` whenever cached assets change.
