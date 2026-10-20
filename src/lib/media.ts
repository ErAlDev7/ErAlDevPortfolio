import manifest from '@/data/media.generated.json';
import type { MediaKind, MediaSet, Project } from '@/data/types';

interface ManifestEntry {
  n: number;
  width: number;
  height: number;
  widths: number[];
}

export interface Shot {
  n: number;
  alt: string;
  width: number;
  height: number;
  srcset: { avif: string; webp: string };
  /** Largest webp, used as the img fallback. */
  src: string;
}

export interface ResolvedSet {
  kind: MediaKind;
  shots: Shot[];
}

const data = manifest as unknown as Record<string, Record<string, ManifestEntry[]>>;

const url = (slug: string, kind: string, n: number, w: number, ext: string) => `/media/${slug}/${kind}/${n}-${w}.${ext}`;

export function resolveSet(project: Pick<Project, 'slug'>, set: MediaSet): ResolvedSet {
  const files = data[project.slug]?.[set.kind] ?? [];
  const shots = files.map((f, i): Shot => {
    const set_ = (ext: string) => f.widths.map((w) => `${url(project.slug, set.kind, f.n, w, ext)} ${w}w`).join(', ');
    return {
      n: f.n,
      alt: set.alts[i] ?? '',
      width: f.width,
      height: f.height,
      srcset: { avif: set_('avif'), webp: set_('webp') },
      src: url(project.slug, set.kind, f.n, f.widths[f.widths.length - 1], 'webp'),
    };
  });
  return { kind: set.kind, shots };
}

export const resolveAll = (project: Project) => project.media.map((m) => resolveSet(project, m));

export const kindLabel: Record<MediaKind, string> = {
  website: 'Website',
  mobile: 'Mobile app',
  desktop: 'Desktop app',
  diagram: 'Diagram',
};
