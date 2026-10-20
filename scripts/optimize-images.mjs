// Reads assets/projects/<Folder>/<Website|Mobile>/<n>.(png|jpg), writes AVIF + WebP
// at several widths to public/media, and a manifest with real dimensions.
import { readdir, mkdir, writeFile, stat } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const SRC = 'assets/projects';
const OUT = 'public/media';
const MANIFEST = 'src/data/media.generated.json';

const WIDTHS = { website: [640, 1280, 1920], mobile: [320, 540, 720] };
const KIND = { website: 'website', mobile: 'mobile', desktop: 'desktop', diagram: 'diagram' };

const slugify = (s) =>
  s.replace(/([a-z0-9])([A-Z])/g, '$1-$2').replace(/[^a-zA-Z0-9]+/g, '-').toLowerCase();

const exists = async (p) => stat(p).then(() => true, () => false);
const manifest = {};

for (const projectDir of await readdir(SRC)) {
  const projectPath = path.join(SRC, projectDir);
  if (!(await stat(projectPath)).isDirectory()) continue;
  const slug = slugify(projectDir);
  for (const kindDir of await readdir(projectPath)) {
    const kindPath = path.join(projectPath, kindDir);
    if (!(await stat(kindPath)).isDirectory()) continue;
    const kind = KIND[kindDir.toLowerCase()];
    if (!kind) continue;
    const files = (await readdir(kindPath))
      .filter((f) => /\.(png|jpe?g|webp)$/i.test(f))
      .sort((a, b) => parseInt(a, 10) - parseInt(b, 10));
    const widths = WIDTHS[kind] ?? WIDTHS.website;
    const entries = [];
    for (const file of files) {
      const n = parseInt(file, 10);
      const input = path.join(kindPath, file);
      const meta = await sharp(input).metadata();
      const outDir = path.join(OUT, slug, kind);
      await mkdir(outDir, { recursive: true });
      const made = [];
      for (const w of widths) {
        const width = Math.min(w, meta.width);
        const base = path.join(outDir, `${n}-${width}`);
        if (!made.includes(width)) {
          for (const [ext, fn] of [['avif', (s) => s.avif({ quality: 55, effort: 4 })], ['webp', (s) => s.webp({ quality: 78 })]]) {
            if (!(await exists(`${base}.${ext}`))) {
              await fn(sharp(input).resize({ width, withoutEnlargement: true })).toFile(`${base}.${ext}`);
            }
          }
          made.push(width);
        }
      }
      entries.push({ n, width: meta.width, height: meta.height, widths: made });
    }
    (manifest[slug] ??= {})[kind] = entries;
    console.log(`${slug}/${kind}: ${entries.length} screenshots`);
  }
}
await mkdir(path.dirname(MANIFEST), { recursive: true });
await writeFile(MANIFEST, JSON.stringify(manifest, null, 2));
