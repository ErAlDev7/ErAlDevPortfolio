# ErAlDev portfolio: Phase 1 plan

Status: awaiting approval. No production code has been written.
Built with Next.js (React) and TypeScript. All frontend design decisions go through the Impeccable skill.

---

## 0. What I found in your files

| Project | Type | Status | Screenshots found | Link |
|---|---|---|---|---|
| E-Raporto | website + mobile app | website live, app "soon to deploy" | 5 website (1920×1080) + 12 mobile (1080×2340) | e-raporto.lovable.app |
| E&A Clean Service | website | live | 5 (2559×1599) | eacleanservice.com |
| KthemaGati | website (+ mobile app in development) | live | **0, no media folder** | kthemagati.al |
| NestAlbania | mobile app | not deployed | 16 mobile (1080×2340) | none |
| Qendra Kazus | website | live | 5 (2559×1599) | qendrakazus.com |
| SmartBus Albania | website | live | 5 (1920×1080) | v0-smart-bus-albania-website.vercel.app |

Carousel lengths follow these counts exactly (5 / 12 / 5 / 16 / 5 / 5). The count is read from the `screenshots[]` array, never hard-coded, so adding or removing a file changes the carousel automatically.

The logo is a **526×508 JPEG on a solid black background**. There is no vector or transparent version. See section 1.4.

---

## 1. Brand analysis from the logo

### 1.1 Sampled colors (real pixels, 526×508 image)

| Role | Value | Evidence |
|---|---|---|
| Brand blue | `#1E7FCD` | Mean of 22,855 blue pixels. The most common blue buckets cluster at `#0C7CDC` to `#2484CC`. |
| Logo white | `#FCFCFC` | Second most common bucket, used for "ErAl", "Dev" outline letters and the E / D shapes. |
| Logo ground | `#000000` | Corners and background are pure black. |

The logo uses exactly two colors: one saturated mid blue and white, on black. The palette is built around that restraint. Blue is the only chromatic color on the site apart from status colors.

### 1.2 Personality

Geometric and sharp. The mark is a monogram of E, A and D built from heavy straight strokes, 45° and 60° cuts and a hexagonal D. An arrow rises out of the A. The wordmark is a wide, bold geometric sans. Tagline "WEBSITES | SOFTWARE | IT" is set in thin all-caps with blue pipe dividers.

That reads as technical, precise, engineered, not friendly or organic. So:
- Typography: geometric-leaning grotesque, tight, with a mono for specifications.
- Shape language: mostly square corners, hairline rules, angled cuts used sparingly (echoing the A and D), no pill shapes.
- The rising arrow is the one motif I may echo (a single small angled mark as a bullet/marker), nowhere else.

### 1.3 Palette

Neutrals are tinted toward the logo blue (hue ≈ 210°), never pure black or white.

**Dark theme (default look of the brand)**

| Token | Hex | Use | Contrast |
|---|---|---|---|
| `--ink-0` | `#0B1118` | page background | |
| `--ink-1` | `#121A23` | raised surfaces | |
| `--ink-2` | `#1B2530` | borders, hairlines | |
| `--text` | `#E8EDF2` | body text | 16.1:1 on ink-0 (AAA) |
| `--text-muted` | `#9AA7B5` | secondary text | 7.7:1 (AAA) |
| `--blue` | `#1E7FCD` | brand fills, graphics | 4.5:1 (graphics and large text only) |
| `--blue-text` | `#4A9FE6` | links, small blue text | 6.7:1 (AA) |
| `--blue-btn` | `#176AB0` | button fill, white text | 5.6:1 (AA) |
| success | `#3FBF8A` | | 8.2:1 |
| warning | `#E5B84A` | | 10.2:1 |
| error | `#F07178` | | 6.6:1 |

**Light theme**

| Token | Hex | Use | Contrast |
|---|---|---|---|
| `--ink-0` | `#F4F6F8` | page background | |
| `--ink-1` | `#FFFFFF` is avoided; surfaces use `#EBEFF3` | raised surfaces | |
| `--text` | `#161E27` | body text | 15.5:1 (AAA) |
| `--text-muted` | `#4B5866` | secondary text | 6.7:1 (AA, near AAA) |
| `--blue-text` | `#115E9E` | links, small blue text | 6.2:1 (AA) |
| `--blue-btn` | `#176AB0` | button fill, white text | 5.6:1 |
| success | `#1F7A55` | | 4.9:1 |
| warning | `#8A5F00` | | 5.2:1 |
| error | `#B3303A` | | 5.7:1 |

The raw logo blue `#1E7FCD` fails AA as small text on light (3.9:1), so it is only used for fills and large elements in light theme; text uses `#115E9E`. All ratios above were computed, not estimated. Phase 2 re-verifies them with a script that fails the build if any token pair drops below its target.

Default theme follows `prefers-color-scheme`. A small inline script sets `data-theme` before first paint so there is no flash.

### 1.4 Logo usage

- **The supplied file cannot be used directly.** A black-background JPEG would show a black rectangle on the light theme and has compression noise on the edges.
- Plan: I redraw the mark and wordmark as a clean **SVG** (traced from your JPEG, with `currentColor` for the white parts and the brand blue for the arrow, A fill and "Dev"). That gives: dark-theme version, light-theme version (dark ink instead of white), and a one-color version for favicon/OG use. If you have the original vector or a transparent PNG, send it and I'll use that instead. It is better than my trace.
- Clear space: the height of the "E" bar on all sides. Minimum size: 24 px tall for the monogram alone, 120 px wide for monogram plus wordmark. Below that, show the monogram only.
- The tagline "WEBSITES | SOFTWARE | IT" is dropped in the header (too small to read) and kept only in the footer and OG image.

---

## 2. Design direction

**Concept: a specification sheet.** The site is organised like the front page of a technical document: numbered sections (`01`, `02`...), hairline rules, a tabular project register, metadata in a mono face. This fits an engineering company, suits the logo's geometry, and avoids the card-grid-with-icons template. It is explainable: every project has real specs (stack, role, year, status), and the layout shows them.

### Typography
- **Schibsted Grotesk** for headings and body: a sturdy grotesque with a slightly squared character that sits well beside the logo's wordmark. Weights 400, 500, 700.
- **IBM Plex Mono** (400, 500) only for specs: stack lists, years, status labels, section numbers.
- Self-hosted through `@fontsource` packages, bundled at build, `font-display: swap`, subset to Latin plus Latin-Extended (Albanian `ë`, `ç`; German `ä ö ü ß`).
- Scale (fluid, `clamp`): 13 / 15 / 17 (body) / 22 / 30 / 44 / 68 / 104 px. Body line-height 1.6, headings 1.05–1.15, headings letter-spacing −0.02em, mono labels +0.04em uppercase. Measure capped at 62ch.

### Layout
- 12-column grid, 1200 px content width, 1560 px for the project showcase, full-bleed rules.
- Spacing scale on 4 px base: 4, 8, 12, 16, 24, 32, 48, 64, 96, 144.
- Breakpoints: 480, 768, 1100, 1560. Designed from 320 px up.
- Section rhythm is deliberately uneven: hero is left-heavy with a large statement, services are an editorial two-column list, work is a wide register, process is horizontal steps, about is a narrow single column. No two consecutive sections share a layout.

### Shape language
- Radius: 0 on containers and buttons, 2 px on inputs, 6 px on screenshot frames (so frames feel like real devices). Not one radius everywhere.
- Borders: 1 px hairlines in `--ink-2`. Shadows only on device and browser frames and the lightbox; no shadows on text blocks.
- One angled cut (the 60° of the A) used as the clip shape on the primary button and the active filter marker.

### Imagery treatment
- **Websites:** minimal browser frame (three muted dots, a URL strip showing the real domain), screenshot at its true ratio (16:9 for 1920×1080, 2559:1599 for the others) with `aspect-ratio` set from the file's real dimensions so there is no layout shift.
- **Mobile:** CSS device frame at the real 1080:2340 ratio, thin bezel, rounded corners, notch-free. Never stretched. Carousel shows 1 phone centred on small screens and a row of 3 on wide screens.
- **Mixed (E-Raporto):** the detail page has a Website / Mobile switch; each has its own full carousel.

### Motion
- Durations: 120 ms (hover/focus), 240 ms (state change), 420 ms (page-level reveal, used once on the hero and the carousel slide). Easing `cubic-bezier(0.2, 0, 0, 1)`.
- No scroll-triggered fade-ups, no parallax. The hero text loads in place. Motion is only: hover/focus, carousel slide, lightbox open/close, filter reorder, theme switch.
- Everything is disabled under `prefers-reduced-motion`.

### Principles borrowed (not layouts)
Studio and engineering sites worth studying for principles: Stripe's documentation pages (type hierarchy carrying the design), Linear's marketing site (restraint, one accent), Pentagram's project index (the work as a list you can scan), Vercel's changelog (dense and honest). The takeaways: one accent, strong hierarchy, scannable register, no decoration without function.

### Anti-slop commitments
No gradients, orbs or glass. No icon-in-circle grids: services use numbers and short specific paragraphs. No emoji. Copy rules from your brief are enforced; I will run a banned-phrase grep on the built output.

---

## 3. Information architecture

Single page with anchor sections, plus one dedicated route per project.

1. **Header:** monogram+wordmark, anchors (Work, Services, Process, About, Contact), theme toggle, "Start a project" CTA (mailto).
2. **Hero:** a specific statement of what ErAlDev builds, primary CTA "See the work", secondary "Email us". Below it a thin strip of three real facts (founded 2026, projects shipped count taken from the data file, the stacks we ship in). No invented numbers.
3. **Selected work (moved up, right after hero):** the centerpiece. A register of projects: number, name, type, year, status, stack, with a large screenshot preview following the hovered or focused row. Filter by All / Web / Mobile. Desktop and Architecture filters do not appear until a project of that type exists (see open questions).
4. **What we build:** four short entries (Websites, Mobile apps, Backend and APIs, AI features), each tied to a real project as proof.
5. **How we work:** four steps. Draft copy needs your confirmation.
6. **Technology:** grouped by what we have actually shipped, derived from the projects data file (React, Next.js, React Native, TypeScript, C# Web API, PostgreSQL, plus the builders Lovable and V0 listed honestly where used).
7. **About:** short, first-person plural, human voice, founded 2026, Albania-focused work. Needs your input.
8. **Contact:** `mailto:eraldev7@gmail.com` with a form that composes the message (name, what you need, details) into a prefilled mailto, with real client-side validation, plus the direct email and Instagram.
9. **Footer:** logo with tagline, email, Instagram, year.
10. **404 page:** designed, in the same spec-sheet voice.

**Why section order differs from your sketch:** work comes before services because the screenshots are the strongest proof you have, and a CTO deciding in 60 seconds should reach them quickly.

### Project detail: dedicated routes, not a modal
Route `/work/[slug]`. Reasons: shareable URLs (you can send one project to a client), per-project SEO and OG tags, working back button, and the carousel can be code-split per page. Cost: one more page load, mitigated by static prefetch.

---

## 4. Project showcase spec

Single file `src/data/projects.ts` is the only file edited to add a project. Screenshots are discovered from folders at build time; the schema carries only what the filenames can't.

```ts
type ProjectType = 'website' | 'mobile' | 'desktop' | 'architecture' | 'other';

interface Screenshot { file: string; alt: string }          // alt is required

interface MediaSet {
  kind: 'website' | 'mobile' | 'desktop' | 'diagram';
  screenshots: Screenshot[];                                  // carousel length = array length
}

interface Project {
  slug: string;
  name: string;
  types: ProjectType[];                                       // e-raporto = ['website','mobile']
  status: 'deployed' | 'undeployed' | 'in-development';
  year: number;
  role: string;
  summary: string;                                            // one or two sentences for the card
  description: string;                                        // detail page
  stack: string[];
  media: MediaSet[];
  liveUrl?: string;
  appStoreUrl?: string;
  playStoreUrl?: string;
}
```

Display rules, enforced in code, not by convention:
- **Website:** live link plus browser-frame carousel.
- **Mobile, undeployed:** device-frame carousel only. No links, no store badges, no "coming soon" text. (NestAlbania; E-Raporto's mobile set.)
- **Mobile, deployed:** adds App Store and/or Google Play buttons, each rendered only if its URL exists.
- **Desktop / architecture / other:** screenshots or diagrams; a link only if `liveUrl` exists.

A build-time check (script) fails if: a project has no `alt`, a screenshot file is missing, a folder has files the data file doesn't list, or a store URL appears on an undeployed project.

### Carousel
Keyboard (←, →, Home, End, focus-visible), swipe via pointer events, arrow buttons, indicators (numbered counter `04 / 12` plus thumbnails for sets above 6), lazy loading with the first slide eager, fixed `aspect-ratio` to prevent layout shift, lightbox for full size (Esc closes, focus trapped and restored), correct behaviour at 1 slide (controls hidden) and 20 (thumbnail strip scrolls). Built by hand, no carousel library.

### Store badges
Official badge artwork requires downloading Apple/Google assets and following their usage terms. Plan: clean text buttons first ("Download on the App Store", "Get it on Google Play"). I can swap in the official artwork if you want it once a store URL exists. None exist yet.

---

## 5. Tech stack

- **Next.js (App Router), TypeScript, React 19**, static export (`output: 'export'`) deployable to Vercel, Netlify or Cloudflare.
- **Styling:** plain CSS with custom properties (one `tokens.css` holds colors, type, spacing, radii, shadows) plus CSS Modules per component. No Tailwind: the site has a deliberate token system, and a utility palette would invite the default-Tailwind look you want to avoid.
- **Images:** a `prebuild` script using `sharp` converts every screenshot to AVIF and WebP at several widths (e.g. 480 / 960 / 1600) and emits `<picture>` with `srcset`. This is needed because static export disables Next's image optimizer. Original files stay in `assets/`, not shipped.
- **Dependencies:** next, react, `@fontsource` fonts, sharp (dev). No animation, carousel, icon, or form libraries.
- **Contact:** client-side validated form that builds a `mailto:` link (as you chose). Caveat: it opens the visitor's mail app, so visitors without one configured see nothing happen. A visible copy-email button covers that.
- **SEO:** per-page title/description, canonical, Open Graph and Twitter cards, a generated OG image from the brand, `sitemap.xml`, `robots.txt`, Organization structured data.
- **Quality gates in Phase 2:** build, type check, lint, Lighthouse (target 95+ in all four), contrast-token check, banned-phrase check, screenshot-count check. Results reported honestly.

---

## 6. Risks and open questions (need your decision)

1. **KthemaGati has no screenshots.** The folder contains only `Info.md`. Options: (a) send screenshots, (b) I show it in the register with its live link and no carousel (a text-only detail page). Which?
2. **Qendra Kazus link is malformed:** `https://https://qendrakazus.com/`. I will use `https://qendrakazus.com/`. Confirm.
3. **SmartBus Albania is dated 2025** but ErAlDev "started in 2026". Was it done before ErAlDev existed, or is the year wrong? I will not state a founding year next to a 2025 project until you say.
4. **Builder tools:** E-Raporto's website is marked "Lovable" and SmartBus "V0". I will list that honestly as how those sites were produced, with your engineering (backend, mobile, AI) credited where it applies. Do you want the builders named on the page, or just "React"?
5. **Your role wording.** Each file says "Developer of the website / mobile app". I will use "Developer", and "ErAlDev team" where the file says so (KthemaGati mobile). Tell me if a different role title should appear.
6. **SmartBus scope:** the description mentions a mobile app, validation devices and a management system, but the file says you developed the website. I will say only "website". Correct?
7. **"Albania's #1 Vehicle Maintenance Platform" (KthemaGati)** is the client's marketing claim. I would quote it as theirs or leave it out. Which?
8. **No desktop or architecture project exists.** The brief mentions both. I will not show Desktop/Architecture filters or services claims for them until a project backs them. Do you want a "Backend and APIs" entry (C# Web API, PostgreSQL appear in three projects), and is the AI classification in E-Raporto yours to claim?
9. **Process and About copy** need facts only you have (team size, how a project starts, response time). I will draft plain text from what the project files imply and mark anything uncertain `TODO`.
10. **Logo vector:** do you have the original vector or transparent PNG? If not, I trace the JPEG into an SVG, and you should review it.
11. **Domain:** needed for canonical URL, sitemap and OG tags. Until then they use a placeholder host.
12. **Language:** the site is English only unless you say otherwise. Some projects serve Albanian and German audiences; project descriptions stay in English.
13. **Case sensitivity:** `SmartBusAl/website/` is lowercase while other projects use `Website/`. I will normalise on copy so it does not break on Linux hosting.
14. **Screenshot weight:** 55 total screenshots of 1–3 MB each. The image pipeline resizes them, so the shipped weight is much smaller, but the first build will take a minute.

---

## Phase 2 order (after approval)

1. Scaffold Next.js, tokens, fonts, theme with no-flash script.
2. Image pipeline and data validation scripts.
3. Logo SVGs, header, hero, footer.
4. Project register, detail route, carousel and lightbox.
5. Services, process, technology, about, contact, 404.
6. SEO, OG image, README, then build, type check, lint, Lighthouse, and fixes.
