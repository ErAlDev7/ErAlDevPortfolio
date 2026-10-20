import type { Shot as ShotData } from '@/lib/media';

interface Props {
  shot: ShotData;
  /** Responsive `sizes` attribute for the srcset. */
  sizes: string;
  priority?: boolean;
  className?: string;
}

/** A screenshot at its real aspect ratio: reserves its space, so nothing shifts while it loads. */
export function Shot({ shot, sizes, priority = false, className }: Props) {
  return (
    <picture className={className}>
      <source type="image/avif" srcSet={shot.srcset.avif} sizes={sizes} />
      <source type="image/webp" srcSet={shot.srcset.webp} sizes={sizes} />
      <img
        src={shot.src}
        alt={shot.alt}
        width={shot.width}
        height={shot.height}
        sizes={sizes}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        draggable={false}
        style={{ width: '100%', height: 'auto' }}
      />
    </picture>
  );
}
