// Fails the build when projects.ts and the screenshot folders disagree.
import { readFile } from 'node:fs/promises';

const { projects } = await import('../src/data/projects.ts');
const manifest = JSON.parse(await readFile('src/data/media.generated.json', 'utf8'));

const errors = [];
const seen = new Set();

for (const p of projects) {
  if (seen.has(p.slug)) errors.push(`${p.slug}: duplicate slug`);
  seen.add(p.slug);
  const kinds = new Set();
  for (const set of p.media) {
    kinds.add(set.kind);
    const files = manifest[p.slug]?.[set.kind] ?? [];
    if (files.length !== set.alts.length) {
      errors.push(`${p.slug}/${set.kind}: ${files.length} screenshot files but ${set.alts.length} alt texts`);
    }
    files.forEach((f, i) => {
      if (f.n !== i + 1) errors.push(`${p.slug}/${set.kind}: files must be numbered 1..N without gaps (found ${f.n} at position ${i + 1})`);
    });
    set.alts.forEach((alt, i) => {
      if (!alt || alt.trim().length < 12 || /TODO/i.test(alt)) errors.push(`${p.slug}/${set.kind} #${i + 1}: alt text missing or placeholder`);
    });
  }
  for (const kind of Object.keys(manifest[p.slug] ?? {})) {
    if (manifest[p.slug][kind].length > 0 && !kinds.has(kind)) errors.push(`${p.slug}: ${kind} screenshots exist but are not listed in projects.ts`);
  }
  if ((p.appStoreUrl || p.playStoreUrl) && p.status === 'undeployed') errors.push(`${p.slug}: store links on an undeployed project`);
  if (p.types.includes('mobile') && !p.types.includes('website') && p.liveUrl) errors.push(`${p.slug}: mobile-only project has a liveUrl`);
  for (const u of [p.liveUrl, p.appStoreUrl, p.playStoreUrl]) {
    if (u && !/^https:\/\/[^/]+\.[^/]+/.test(u)) errors.push(`${p.slug}: bad URL ${u}`);
    if (u && /https:\/\/https?:/.test(u)) errors.push(`${p.slug}: doubled protocol in ${u}`);
  }
}
for (const slug of Object.keys(manifest)) {
  const hasFiles = Object.values(manifest[slug]).some((l) => l.length > 0);
  if (hasFiles && !seen.has(slug)) errors.push(`${slug}: screenshots exist but no project entry`);
}

if (errors.length) {
  console.error('\nProject data check failed:\n - ' + errors.join('\n - ') + '\n');
  process.exit(1);
}
console.log(`Project data OK: ${projects.length} projects, ${projects.reduce((n, p) => n + p.media.reduce((m, s) => m + s.alts.length, 0), 0)} screenshots.`);
