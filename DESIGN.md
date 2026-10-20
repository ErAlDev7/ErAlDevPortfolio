---
name: ErAlDev Portfolio
description: A specification sheet for a small software company: a ruled register of real projects, ink-blue neutrals, one logo blue.
colors:
  accent: "#1e7fcd"
  accent-btn: "#176ab0"
  accent-btn-hover: "#115e9e"
  accent-text-light: "#115e9e"
  accent-text-dark: "#4a9fe6"
  on-accent: "#ffffff"
  bg-light: "#f4f6f8"
  surface-light: "#ebeff3"
  surface-2-light: "#dfe5eb"
  line-light: "#d3dae2"
  line-strong-light: "#7a8796"
  text-light: "#161e27"
  text-2-light: "#4b5866"
  bg-dark: "#0b1118"
  surface-dark: "#121a23"
  surface-2-dark: "#1b2530"
  line-dark: "#243140"
  line-strong-dark: "#5f7186"
  text-dark: "#e8edf2"
  text-2-dark: "#9aa7b5"
  success-light: "#1f7a55"
  success-dark: "#3fbf8a"
  warning-light: "#8a5f00"
  warning-dark: "#e5b84a"
  error-light: "#b3303a"
  error-dark: "#f07178"
  device-black: "#05080c"
typography:
  display:
    fontFamily: "Schibsted Grotesk, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    fontSize: "clamp(2.5rem, 1.2rem + 4.8vw, 4.75rem)"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Schibsted Grotesk, system-ui, sans-serif"
    fontSize: "clamp(2rem, 1.4rem + 2.2vw, 3rem)"
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Schibsted Grotesk, system-ui, sans-serif"
    fontSize: "clamp(1.625rem, 1.3rem + 1.1vw, 2.125rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.025em"
  lede:
    fontFamily: "Schibsted Grotesk, system-ui, sans-serif"
    fontSize: "clamp(1.25rem, 1.1rem + 0.5vw, 1.5rem)"
    fontWeight: 400
    lineHeight: 1.5
  body:
    fontFamily: "Schibsted Grotesk, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  body-small:
    fontFamily: "Schibsted Grotesk, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: "0.02em"
    fontFeature: "tabular-nums"
rounded:
  input: "2px"
  frame: "6px"
  device: "22px"
spacing:
  s-1: "4px"
  s-2: "8px"
  s-3: "12px"
  s-4: "16px"
  s-5: "24px"
  s-6: "32px"
  s-7: "48px"
  s-8: "64px"
  s-9: "96px"
  s-10: "144px"
components:
  button-primary:
    backgroundColor: "{colors.accent-btn}"
    textColor: "{colors.on-accent}"
    typography: "{typography.body}"
    padding: "15px 32px 15px 26px"
  button-primary-hover:
    backgroundColor: "{colors.accent-btn-hover}"
  button-secondary:
    textColor: "{colors.text-light}"
    rounded: "{rounded.input}"
    padding: "14px 20px"
  filter-chip:
    textColor: "{colors.text-light}"
    rounded: "{rounded.input}"
    padding: "8px 16px"
  filter-chip-selected:
    backgroundColor: "{colors.accent-btn}"
    textColor: "{colors.on-accent}"
  field:
    backgroundColor: "{colors.surface-light}"
    textColor: "{colors.text-light}"
    rounded: "{rounded.input}"
    padding: "13px 16px"
  browser-frame:
    backgroundColor: "{colors.surface-2-light}"
    rounded: "{rounded.frame}"
  phone-frame:
    backgroundColor: "{colors.device-black}"
    rounded: "{rounded.device}"
    padding: "7px"
---

# Design System: ErAlDev Portfolio

## Overview

**Creative North Star: "The Specification Sheet"**

The site reads as a datasheet for a small software company, not a landing page. Work is a ruled register of real projects with specs (type, year, status, stack) and a sticky preview that follows the focused row. Real screenshots lead; the interface recedes behind hairline rules, square corners and one chromatic color taken from the logo.

Neutrals are ink-blue, tinted toward the logo hue, in both a light and a dark theme (system preference, with a user toggle). Blue appears only on actions, links, active states and a rule above each process step. Type is one grotesk for everything and a mono face reserved for data: stacks, years, measurements, counts. Motion is short and functional.

The build refuses the centered hero, card grid and icon-in-circle template. Containers are square; rounding is reserved for inputs, screenshot frames and phone devices, where it describes a real object.

**Key Characteristics:**
- Hairline rules (1px) divide sections, rows and table lines instead of boxes or cards.
- One chromatic color (logo blue) with a separate text-safe and button-safe variant per theme.
- A 60-degree slanted cut on primary buttons echoes the A in the logo.
- Screenshots sit in browser and phone frames; the frame is the only elevated element.
- Both themes meet WCAG AA; focus is always visible.

## Colors

Ink-blue neutrals with a single logo blue. Values are defined once per theme in `src/styles/tokens.css`; the frontmatter lists light and dark variants with `-light` and `-dark` suffixes.

### Primary
- **Logo Blue** (`accent`): the brand mark color, used for text selection, the caret, and the 2px rule above each process step. Never used for body text.
- **Button Blue** (`accent-btn`, hover `accent-btn-hover`): the fill of primary buttons and the selected filter chip, with white text. The hover value equals light-theme link blue; in dark theme it steps up to Logo Blue.
- **Link Blue** (`accent-text-light`, `accent-text-dark`): the text-safe blue for hover states, links, focus outlines, underlines and the "Dev" half of the wordmark. Darker in light theme, lighter in dark.

### Neutral
- **Page Ink / Page Paper** (`bg-dark` / `bg-light`): the page background.
- **Surface** (`surface-*`): the process band, form fields, preview panel, hovered register rows.
- **Surface 2** (`surface-2-*`, also `--frame`): the browser frame body; the frame bar is one step further (`--frame-bar`, #cfd7e0 light, #243140 dark).
- **Line** (`line-*`): hairline dividers between rows and sections.
- **Line Strong** (`line-strong-*`): the top rule of lists and tables, input and chip borders, scrollbar thumb.
- **Text / Text 2** (`text-*`, `text-2-*`): primary text and secondary text (summaries, meta, ledes, captions).
- **Device Black** (`device-black`): the bezel of phone frames, identical in both themes. The lightbox uses its own fixed dark overlay (rgb 5 8 12 at 96%).

### Status
- **Success, Warning, Error** (`success-*`, `warning-*`, `error-*`): defined per theme; only Error is currently used, on invalid form fields and their messages.

### Named Rules
**The One Voice Rule.** Logo blue is the only chromatic color. Status colors appear only for status.

**The Text-Safe Rule.** Blue used as text, outline or underline must be the `accent-text` variant; blue used as a fill behind white text must be `accent-btn`. The raw logo blue is for non-text marks.

## Typography

**Display and Body Font:** Schibsted Grotesk (400, 500, 700; self-hosted; falls back to system-ui)
**Label/Mono Font:** JetBrains Mono (400, 500; self-hosted)

**Character:** A friendly but exact grotesk set tight and bold for statements, plain and generous for reading, with a mono face that marks every piece of data.

### Hierarchy
- **Display** (700, `clamp(2.5rem, 1.2rem + 4.8vw, 4.75rem)`, 1.02, -0.025em): the hero statement only, 14ch measure. Project page titles use the 2xl step (`clamp(2.5rem, 1.5rem + 4vw, 4.75rem)`, line-height 1).
- **Headline** (700, `clamp(2rem, 1.4rem + 2.2vw, 3rem)`, 1.08, -0.025em): section titles, max 18ch (24 to 30ch in the Technology section).
- **Title** (700, `clamp(1.625rem, 1.3rem + 1.1vw, 2.125rem)`, 1.1): register project names, service names, About lead on mobile, next-project name.
- **Lede** (400, `clamp(1.25rem, 1.1rem + 0.5vw, 1.5rem)`, 1.5): hero lede and project summaries in Text 2; table row headings at 500; process step headings at 700.
- **Body** (400, 1.0625rem, 1.6): running text; line length kept near 34 to 52ch for ledes and descriptions, 38.5rem for long text.
- **Body Small** (400, 0.9375rem): nav links, filter chips, summaries, form labels (500), notes.
- **Label** (JetBrains Mono, 400, 0.8125rem, +0.02em, tabular numerals): stacks, years, status, counts, hosts, URLs in frames (0.6875rem). Not uppercased.

### Named Rules
**The Data Is Mono Rule.** Mono type carries only data: stacks, years, measurements, counts, hosts. Never headings, never decoration.

**The Three Weights Rule.** 400 reads, 500 acts (links, buttons, labels, lead lines), 700 announces. No other weights are loaded.

## Layout

A single wide container (`min(100% - 2 * gutter, 97.5rem)`) with a fluid gutter (`clamp(1rem, 0.4rem + 3vw, 2.5rem)`). Sections breathe with `clamp(4.5rem, 3rem + 7vw, 9rem)` of vertical padding. Spacing is a 4px-based scale (4, 8, 12, 16, 24, 32, 48, 64, 96, 144).

Layouts are asymmetric and vary by section: the hero is a 0.95fr / 1.05fr split whose image stage bleeds past the content edge below 1700px; the work register is a 1.05fr list plus a 0.95fr sticky preview at 1200px and up (inline previews below); Services and Contact use a 5fr / 7fr split with a sticky title (Services); Process is a four-column sequence with a tinted full-bleed band; Technology is a plain two-column table; About runs a large lead beside a narrow column of paragraphs; project pages split 7fr / 5fr into title and a fact list. Breakpoints in use: 640 (header CTA), 860 (nav), 900 (splits), 1000 (hero), 1200 (register preview), 1700 (hero bleed stops).

Rows and lists are separated by 1px rules; there are no card grids.

### Named Rules
**The Vary the Split Rule.** Adjacent sections must not repeat the same column composition.

## Elevation & Depth

Flat by default. Depth is carried by hairline rules and tonal steps between page, surface and surface-2. The only shadows belong to device and browser frames, so the screenshot reads as a physical object laid on the sheet.

### Shadow Vocabulary
- **Frame** (`--shadow-frame`: `0 1px 2px rgb(22 30 39 / 0.08), 0 18px 40px -18px rgb(22 30 39 / 0.32)`; dark: `0 1px 2px rgb(0 0 0 / 0.4), 0 22px 44px -18px rgb(0 0 0 / 0.7)`): browser and phone frames. Phones add an inset 1px white ring at 12%.
- **Pop** (`--shadow-pop`): defined with the same soft long-throw form for floating elements; not yet used in components.
- **Selected thumb** (`0 0 0 1px` in link blue): a 1px ring on the current carousel thumbnail, a state mark rather than elevation.

### Named Rules
**The Frames Only Rule.** Shadows are soft, long, low-opacity, and belong to screenshot frames. Containers, buttons, chips and fields never cast one.

## Shapes

Square by default. Corners: 0 on containers, buttons and rows; 2px on inputs, chips, carousel arrows and the Close/store buttons; 3px on thumbnails and the frame URL pill; 6px on screenshot, preview and browser frames; 22px on phone devices (screen inset radius is 22px minus the 7px bezel). Status dots in the browser bar are 8px circles.

The signature silhouette is the slanted cut: primary buttons clip their right edge at roughly 60 degrees (a polygon that pulls the bottom-right corner inward by 0.85rem; 0.55rem in the compact header button, 0.8rem on project pages). It is drawn on a pseudo-element so the label and focus outline stay rectangular.

## Components

### Buttons
- **Primary (slanted cut):** Button Blue fill, white 500 text, padding about 0.95rem 2rem 0.95rem 1.6rem (extra right padding makes room for the cut). Hover moves to `accent-btn-hover` over 120ms. Used for "See the work", the form submit, the header "Contact", project outbound links.
- **Secondary text link:** 500 weight, 2px Link Blue underline offset 0.35em; hover turns the text Link Blue. Pairs with the primary button in the hero, on the project footer ("Ask us...") and as the form's copy-email action.
- **Store/outline:** 1px Line Strong border, 2px radius, 500 text; hover turns border and text Link Blue.

### Register Rows (signature)
A project is a ruled row: Line Strong rule on top of the list, Line rule below each row. Row content: name (Title), summary (Body Small, Text 2, max 46ch), stack (mono, Text 2), and a meta column (type, year, status in mono) that sits right at 1200px and up and wraps below the summary otherwise. An arrow at the right end nudges 2px up and right on hover. Hover or focus sets the row to Surface and the name to Link Blue. The focused row drives the sticky preview panel, which cross-fades layers (opacity and 6px rise over 240ms). Filter chips above the list are 2px-radius outlined buttons with a mono count; the selected chip fills Button Blue.

### Browser and Phone Frames
The browser frame is Surface 2 with a 2rem bar (three 8px dots at 55% opacity, a mono URL pill at 0.6875rem) and a 6px radius with the Frame shadow. The phone frame is a Device Black bezel of 7px with a 22px radius and screenshots at their real 1080:2340 ratio. In the hero the phone overlaps the browser at bottom-left (27% width, 21% at 1000px and up).

### Carousel and Lightbox
A horizontal scroll-snap track (slides 100% wide; mobile slides 9.5 to 14rem), a control row of 2.75rem square outlined arrows (2px radius, 35% opacity when disabled) with a mono count, and a row of thumbnails (6rem; 2.75rem for mobile) at 60% opacity, 100% with a 1px Link Blue border and ring when current. Clicking a slide opens a full-screen dialog on a near-black overlay with outlined arrows and Close, the image in its frame radius, and the alt text centered below in Text 2.

### Form
Labels above (Body Small, 500). Fields sit on Surface with a 1px Line Strong border and 2px radius, 0.8rem 1rem padding; hover darkens the border to Text 2; focus shows a 2px Link Blue outline offset 2px plus a Link Blue border. Invalid fields take an Error border and an Error message that is prefixed with the literal word "Error:" so color is never the only signal. Textarea is vertically resizable, min 9rem. The form is mailto-only and ends with the slanted primary submit and a text-link copy action.

### Navigation
A sticky 4rem header on page background with a bottom hairline. Brand mark plus wordmark (700, "Dev" in Link Blue). Links at 0.9375rem in Text 2; hover gains Text color and a 1px Link Blue underline that scales in from the left over 240ms. Below 860px the links collapse into a menu button (outlined, 2px radius) that opens a full-width stacked list with divider lines. A compact slanted "Contact" button appears from 640px, and a theme toggle sits in the action group.

### Process, Services, Technology, About
- **Process:** full-bleed Surface band with top and bottom hairlines; each step has a 2px Logo Blue rule on top, a mono step marker in Link Blue, a 700 heading and Text 2 copy.
- **Services:** hairline-ruled list rows, title sticky on the left.
- **Technology:** a plain table, 1px rules, headings at 500 and values in Text 2.
- **About:** a large lead at 500 weight beside two narrow paragraphs.

### Motion
Durations: fast 120ms (color, border), base 240ms (underline scale, arrow nudge, preview cross-fade, dialog fade), slow 420ms (declared, unused). Easing: `cubic-bezier(0.2, 0, 0, 1)`. Only opacity, color and small transforms animate. Under `prefers-reduced-motion` all durations collapse to near zero.

## Do's and Don'ts

### Do:
- **Do** separate content with 1px rules (`line` for rows, `line-strong` for the top of a list or table) rather than boxes.
- **Do** use `accent-btn` behind white text and `accent-text` for blue text; check both themes.
- **Do** use the slanted-cut primary button for the single main action in a view; pair it with a text link, not a second button.
- **Do** set stacks, years, counts and hosts in JetBrains Mono at 0.8125rem with tabular numerals.
- **Do** keep container corners square; use 2px for inputs and chips, 6px for screenshot frames, 22px for phones.
- **Do** show real screenshots inside the browser or phone frame and keep the phone at its true aspect ratio.
- **Do** vary column composition between adjacent sections, and keep body measure to roughly 34 to 52ch.
- **Do** keep a visible 2px Link Blue focus outline on every interactive element, and pair error color with the word "Error:".

### Don't:
- **Don't** build a centered hero, a card grid or icon-in-circle feature blocks.
- **Don't** add a second chromatic color, gradients, or tinted decorative blobs.
- **Don't** cast shadows on anything but screenshot frames.
- **Don't** use mono type for headings or decoration, or set short uppercase labels above headings.
- **Don't** invent metrics, client logos or testimonials; content must trace to a real project.
- **Don't** use raw Logo Blue as text or as a button fill behind white text.
- **Don't** animate layout properties or add motion longer than 240ms to interface states.
