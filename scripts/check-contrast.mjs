// Reads src/styles/tokens.css and fails if a text or UI color pair drops below its target.
import { readFile } from 'node:fs/promises';

const css = await readFile('src/styles/tokens.css', 'utf8');

function block(startMarker) {
  const i = css.indexOf(startMarker);
  const open = css.indexOf('{', i);
  let depth = 0;
  for (let j = open; j < css.length; j++) {
    if (css[j] === '{') depth++;
    if (css[j] === '}' && --depth === 0) return css.slice(open + 1, j);
  }
  return '';
}
function vars(body) {
  const out = {};
  for (const m of body.matchAll(/--([a-z0-9-]+):\s*(#[0-9a-f]{6})\s*;/gi)) out[m[1]] = m[2];
  return out;
}

const themes = {
  light: vars(block(':root {\n  color-scheme: light')),
  dark: vars(block(":root[data-theme='dark']")),
};

const lum = (hex) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => {
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

// [foreground, background, minimum, label]
const pairs = [
  ['text', 'bg', 7, 'body text (AAA)'],
  ['text', 'surface', 7, 'body text on surface (AAA)'],
  ['text-2', 'bg', 4.5, 'secondary text (AA)'],
  ['text-2', 'surface', 4.5, 'secondary text on surface (AA)'],
  ['accent-text', 'bg', 4.5, 'links and blue text (AA)'],
  ['accent-text', 'surface', 4.5, 'blue text on surface (AA)'],
  ['on-accent', 'accent-btn', 4.5, 'button label (AA)'],
  ['on-accent', 'accent-btn-hover', 3, 'button label on hover (large/bold)'],
  ['line-strong', 'bg', 3, 'input and control borders (UI 3:1)'],
  ['success', 'bg', 4.5, 'success text'],
  ['warning', 'bg', 4.5, 'warning text'],
  ['error', 'bg', 4.5, 'error text'],
];

let failed = 0;
for (const [name, v] of Object.entries(themes)) {
  for (const [fg, bg, min, label] of pairs) {
    if (!v[fg] || !v[bg]) { console.error(`${name}: missing token ${fg} or ${bg}`); failed++; continue; }
    const r = ratio(v[fg], v[bg]);
    const ok = r >= min;
    if (!ok) failed++;
    console.log(`${ok ? 'ok  ' : 'FAIL'} ${name.padEnd(5)} ${fg} on ${bg}: ${r.toFixed(2)} (needs ${min}) ${label}`);
  }
}
if (failed) { console.error(`\n${failed} contrast check(s) failed.`); process.exit(1); }
console.log('\nAll contrast checks passed.');
