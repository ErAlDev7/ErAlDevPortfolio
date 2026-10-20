// Fails if banned marketing phrases appear in site copy.
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const banned = [
  'elevate', 'unleash', 'seamless', 'cutting-edge', 'cutting edge', 'revolutionize', 'revolutionise', 'next-level',
  'empower', 'synergy', "fast-paced", 'passionate team', 'robust', 'scalable solutions', 'world-class', 'state-of-the-art',
  'game-changing', 'leverage', 'holistic', 'best-in-class', 'end-to-end solutions',
];
const files = [];
async function walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) await walk(p);
    else if (/\.(tsx?|css)$/.test(e.name) && !/logoPaths|media\.generated/.test(e.name)) files.push(p);
  }
}
await walk('src');
let bad = 0;
for (const f of files) {
  const text = (await readFile(f, 'utf8')).replace(/“[^”]*”/g, '').toLowerCase(); // quoted client text is exempt
  for (const w of banned) if (text.includes(w)) { console.error(`${f}: contains "${w}"`); bad++; }
  const dashes = (text.match(/—/g) ?? []).length;
  if (dashes > 0 && f.endsWith('.tsx')) { console.error(`${f}: contains ${dashes} em dash(es)`); bad++; }
}
if (bad) process.exit(1);
console.log(`Copy check OK (${files.length} files).`);
