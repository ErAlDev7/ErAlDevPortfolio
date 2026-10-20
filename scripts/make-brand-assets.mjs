// Builds the favicon, touch icon and social card from the traced logo paths.
import { readFile, mkdir } from 'node:fs/promises';
import sharp from 'sharp';

const src = await readFile('src/components/brand/logoPaths.ts', 'utf8');
const ink = src.match(/INK_PATH = '([^']*)'/)[1];
const blue = src.match(/BLUE_PATH = '([^']*)'/)[1];

const BG = '#0b1118';
const BLUE = '#1e7fcd';
const paths = (inkColor) =>
  `<path d="${ink}" fill="${inkColor}" fill-rule="evenodd"/><path d="${blue}" fill="${BLUE}" fill-rule="evenodd"/>`;

await mkdir('public', { recursive: true });

// Favicon: monogram only (cropped), light-on-dark so it reads in any tab color.
const markView = '70 0 436 336';
const icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect width="512" height="512" rx="96" fill="${BG}"/><svg x="56" y="108" width="400" height="308" viewBox="${markView}">${paths('#fcfcfc')}</svg></svg>`;
await sharp(Buffer.from(icon)).resize(192, 192).png({ compressionLevel: 9 }).toFile('public/icon.png');
await sharp(Buffer.from(icon)).resize(180, 180).png().toFile('public/apple-touch-icon.png');

// Social card 1200x630: the full lockup centred on the dark brand ground.
const h = 500;
const w = Math.round((h * 526) / 508);
const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630"><rect width="1200" height="630" fill="${BG}"/><svg x="${(1200 - w) / 2}" y="65" width="${w}" height="${h}" viewBox="0 0 526 508">${paths('#fcfcfc')}</svg></svg>`;
await sharp(Buffer.from(og)).png().toFile('public/og.png');
console.log('Brand assets written: icon.png, apple-touch-icon.png, og.png');
