# ErAlDev portfolio

Next.js (React 19) and TypeScript, exported as a static site. No CSS framework, no carousel or animation libraries.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # checks, image optimization, static export to ./out
npm run typecheck
npm run lint
```

To check it on a phone on the same Wi-Fi, run `npm run build` then `npm start` and open `http://<your-laptop-ip>:3000` on the phone. `npm run dev` also works from a phone now (see `allowedDevOrigins` in `next.config.ts`), but restart it after changing that file.

`npm run build` runs these first and fails if any of them does:

| Step | What it checks |
|---|---|
| `optimize-images` | Converts every screenshot in `assets/projects` to AVIF and WebP at three widths and records real dimensions |
| `make-brand-assets` | Builds `icon.png`, `apple-touch-icon.png` and the social card `og.png` from the logo |
| `check-data` | Screenshot files and alt texts match one to one, files are numbered 1..N, no store links on unreleased apps, no malformed URLs |
| `check-contrast` | Every text and control color pair in `tokens.css` meets WCAG AA (body text AAA), in both themes |
| `check-copy` | No banned marketing phrases or em dashes in site copy |

## Add a project

1. Put screenshots in `assets/projects/<Folder>/Website/` or `.../Mobile/`, named `1.png`, `2.png`, ... (`.jpg` is fine). Folder names turn into slugs: `NestAlbania` becomes `nest-albania`.
2. Open `src/data/projects.ts` and add an entry. It is the only file you edit.
3. Write one `alts` line per screenshot, in order. The carousel length is the number of alt lines, and the build fails if it differs from the number of files.
4. Run `npm run build`.

Display rules are enforced in code:

- **Website:** live link plus a browser-frame carousel.
- **Mobile app, not released:** screenshots only. No links, no store badges.
- **Mobile app, released:** set `status: 'deployed'` and add `appStoreUrl` and/or `playStoreUrl`. Only the buttons whose URL exists are shown.
- **Desktop app, architecture, other:** use `types: ['desktop']` (or `architecture`, `other`) with `kind: 'desktop'` or `'diagram'` media. A link shows only if `liveUrl` exists.
- **No screenshots yet:** use `media: []`. The project still gets a page and a register row.

## Change colors, type and spacing

Everything lives in `src/styles/tokens.css`. There are three palette blocks: light, dark by system preference, dark by user choice. Change the values in all dark blocks together. Then run `npm run check:contrast`.

The brand blue `#1e7fcd` was sampled from the logo. Text that needs to be blue uses `--accent-text` (darker on light, lighter on dark) because the raw logo blue is below 4.5:1 as small text on light backgrounds.

## The logo

`src/components/brand/logoPaths.ts` holds the artwork as SVG paths. It was traced from `assets/logo/Logo.jpeg` because no vector file existed. If you have the original vector, replace the two path strings; everything else (header, footer, icon, social card) follows.

Usage: keep clear space equal to the height of the E's top bar. Minimum size: monogram 24 px tall, monogram with wordmark 120 px wide. The tagline appears only in the footer and social card.

## Contact form

There is no backend. The form validates, then opens the visitor's email app with the message filled in (`mailto:`). A "copy address" button covers visitors without a mail app. To use a form service later, replace `onSubmit` in `src/components/ContactForm.tsx`.

## Before you deploy

- Set `NEXT_PUBLIC_SITE_URL` (or edit `src/lib/site.ts`) to the real domain. It feeds the canonical URL, sitemap, robots and social cards.
- Search the code for `TODO(owner)`: the Process and About copy are drafts that need your confirmation.
- Deploy the `out` folder on Vercel, Netlify or Cloudflare Pages. Build command `npm run build`, output directory `out`. Caching headers are in `public/_headers` (Netlify, Cloudflare) and `vercel.json`.
