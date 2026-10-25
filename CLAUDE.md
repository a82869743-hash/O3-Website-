# O3 Car-Spa Website

Marketing site for **O3 Car-Spa**, a car detailing studio in Vitthal Udyognagar, Anand, Gujarat. Founder: Sharanpal Sodhi ("Sharanpal Sir"). **Founded 2013**, so "13+ years" is correct as of 2026 (update yearly, or derive from 2013). Deployed on Vercel as a static site.

## Stack and build

- Single-page React 18 app in **`app.jsx`** (~5,000 lines, every component and page in one file). React/ReactDOM, GSAP 3.12.5 + ScrollTrigger and Lenis 1.1.13 load from CDNs in `index.html`. three.js 0.160.0 is lazy-loaded only by the "Pick Your Car" section.
- **Always edit `app.jsx`, never `app.js`.** `app.js` and `tailwind.css` are build outputs but are **committed**, because Vercel serves the repo as-is with no build step.
- `npm run build` = Babel (`babel.config.json`, classic runtime) → `app.js`, then Tailwind CLI → `tailwind.css`. Run it after every change and commit both outputs.
- `npm run dev` builds and serves on :8080. The preview config is `.claude/launch.json` (falls back to :8081 if the user's server holds 8080).
- Tailwind is precompiled (`tailwind.config.js` scans `index.html` + `app.jsx`). Class names must appear literally; never build them with template strings like `bg-${x}`.
- Pages are hash routes (`#home`, `#services`, …) switched by `currentView` state in `App`. 13 views exist.

## Gotchas (each one has bitten us)

- `app.jsx` and `styles.css` use **CRLF** line endings. Git Bash `sed -i` silently converts the whole file to LF. Edit with the Edit tool or Node scripts that match `\r\n`.
- Lenis smooth scroll is on, so `window.scrollTo` in tests doesn't stick. Drive scroll with real wheel events. Modals scroll because Lenis `prevent` skips `position: fixed` ancestors.
- The Claude browser pane pauses `requestAnimationFrame` when hidden, so animations only advance during screenshots. Smoothness can't be measured there; ask the user to test on a real phone.
- Don't set inline `transform` on elements GSAP animates (GSAP adds its own offset on top). Let `fromTo` set the start state.
- Navigating to the same URL with only a hash change doesn't reload. Add a query string (`?v=2`) to force a fresh load.
- Videos: use `data-autoplay` + `preload="none"` (a global IntersectionObserver in `App` plays/pauses them on screen). Plain `autoPlay` downloads immediately; only the hero uses it.

## Performance rules (decided after lag complaints)

- No `backdrop-filter`/`backdrop-blur` on page content (allowed only on the nav pill). `.glass-surface` uses a solid tint.
- No CSS `filter` on videos. No full-screen canvas. Animate only `transform`/`opacity`, never `clip-path`, `left` or `width`.
- Pinned/scrubbed ScrollTriggers use `scrub: true` (Lenis already smooths; a numeric scrub doubles the lag).
- Pause anything animated when it's off screen. Respect `prefers-reduced-motion`.
- Images are WebP (originals kept beside them). Real reels have web versions in `assets/reels/*.mp4` (540p, 12s, ~1 MB) plus `.webp` posters. The hero is `assets/hero_web.mp4` (0.96 MB) with poster `hero_poster.webp`.

## Content honesty rules (client-facing)

- **Real footage** = the vertical 720×1280 reels in `assets/gallery/` and their derivatives (`assets/reels/`, `assets/process/`). These show O3's real staff, bay and Gujarat number plates.
- **AI-generated, treat as placeholders:** the landscape 8s/10s clips (`hero_section`, `bmw_m2_video`, `porsche_studio_bay_video`, `sikh_man_video`, `sports_car_video`, `worker_applying_video`) and most `assets/o3_*.webp` stills (Rolls-Royce, Mercedes AMG, swirl before/after, studio, on-wheels, product shots). `sharanpal_sodhi_founder` may be AI; it must be replaced with a real photo.
- Never label AI footage as O3 work. Never invent specs (gloss units, "10H", contact angles, live telemetry).
- Prices must come from the official tariff in `allServicesData` (look up by `id`), never hard-coded.
- The "Kia" reel is a **Kia Carens**, not a Seltos.

## Brand

- Official logo: `assets/brand/` (vector SVGs taken from "O3 Car Spa Logo 2024.pdf"). The site uses `o3-logo-white.svg`; the favicon is `o3-mark-blue.svg`. Show it unfiltered (no glow).
- Brand blue **#008DD2**. The site accent is currently cyan #00F0FF and doesn't match; switching it is an open question for the client.

## Home page (11 sections, in this order)

1. Hero (AI video, placeholder) + `VelocityMarquee` divider
2. `IndianGarageShowcase`, "Pick Your Car": 10 Indian models, three.js hex-LED backdrop, real reels, official prices
3. Google reviews (`realReviews`)
4. `ReelFilmStrip`: real reels drift on scroll, only the centre one plays
5. `PinnedProcessScroller`: 5 stages, pinned horizontal, stills from real reels
6. `CoatingCompare`: Ceramic vs Graphene vs PPF
7. `SwirlCorrectionReveal`: pinned scroll wipe, placeholder AI images, Before/After labels only
8. Founder / heritage
9. O3 On Wheels
10. FAQ (4 questions)
11. Map + contact links

Removed on purpose; don't bring back: brand pillars, stats strip, manifesto, services highlight, Rolls-Royce configurator, Rolls before/after slider, gallery-highlight widgets, studio telemetry HUD, gloss chart, starlight cabin, treatment/ROI calculator, old 4K cinema player. Franchise moved off home; it's linked from the footer and mobile menu.

The global scroll system lives in `App`: Lenis, the progress bar, hero parallax, masked title reveals (`.gsap-stagger-title`), and batched card reveals for `main .glass-surface`. Add `no-scroll-reveal` to a section to opt it out.

## Open work, in priority order

1. **Booking form doesn't send anything.** It shows `alert("Booking confirmed…")`, so customers think they're booked but nobody is notified. Fix first: send to WhatsApp 917225030303 or a form service.
2. The other 12 pages are untouched: about 70 AI image references and about 40 inflated claims ("4K", "10H", "HEPA cleanroom", "supercars"). Clean them like the home page, and merge overlapping pages (Story/About, Studio/Concierge).
3. Waiting on the client: a real landscape hero video, a real founder photo, a before/after pair of the same panel, and confirmation of the 2016/2020 timeline dates and the "5,000+ cars" claim.
4. SEO: LocalBusiness schema, link-preview (Open Graph) image, per-page titles. The site is a client-rendered single URL.
5. Test smoothness on a real phone. Decide on accent colour vs brand blue.
6. `videoGalleryData` and the old logo/AI files in `assets/` are unused leftovers; safe to delete once confirmed.

Last rating (2026-10-20): **6.5/10 overall**, home 8/10, inner pages 4/10, conversion 3/10 (booking form).
