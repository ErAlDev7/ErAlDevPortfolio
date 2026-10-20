'use client';

import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import type { MediaKind } from '@/data/types';
import type { Shot } from '@/lib/media';
import styles from './Lightbox.module.css';

interface Props {
  shots: Shot[];
  kind: MediaKind;
  start: number;
  onClose: (lastIndex: number) => void;
}

/**
 * Full-size viewer on a native <dialog>: focus is trapped and restored, and Escape closes it.
 * The screenshot fills the screen; clicking it (or the Zoom button) shows it at 100% so small text can be read.
 */
export function Lightbox({ shots, kind, start, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const viewerRef = useRef<HTMLDivElement>(null);
  const [i, setI] = useState(start);
  const [zoomed, setZoomed] = useState(false);
  const total = shots.length;
  const shot = shots[i];

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (!d.open) d.showModal();
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    // Do not close the dialog here: React Strict Mode (dev) runs this cleanup right after mounting, and a
    // close event would tell the parent to unmount the viewer immediately. Unmounting removes the dialog anyway.
    return () => {
      document.documentElement.style.overflow = prevOverflow;
    };
  }, []);

  const go = (n: number) => {
    setZoomed(false);
    viewerRef.current?.scrollTo({ left: 0, top: 0 });
    setI((cur) => Math.max(0, Math.min(total - 1, cur + n)));
  };

  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault();
      go(e.key === 'ArrowRight' ? 1 : -1);
    } else if (e.key === 'z' || e.key === 'Z') {
      setZoomed((z) => !z);
    }
  };

  const sizes = zoomed ? `${shot.width}px` : '100vw';

  return (
    <dialog
      ref={ref}
      className={styles.dialog}
      aria-label={`Screenshot ${i + 1} of ${total}`}
      onKeyDown={onKey}
      onClose={() => onClose(i)}
    >
      <div className={styles.bar}>
        <p className="mono" aria-live="polite">
          {String(i + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </p>
        <div className={styles.barActions}>
          <button type="button" className={styles.btn} onClick={() => setZoomed((z) => !z)} aria-pressed={zoomed}>
            {zoomed ? 'Fit to screen' : 'Zoom to 100%'}
          </button>
          <button type="button" className={styles.btn} onClick={() => ref.current?.close()} autoFocus>
            Close
          </button>
        </div>
      </div>

      <div className={styles.stage} data-kind={kind}>
        <div ref={viewerRef} className={styles.viewer} data-zoomed={zoomed}>
          <picture>
            <source type="image/avif" srcSet={shot.srcset.avif} sizes={sizes} />
            <source type="image/webp" srcSet={shot.srcset.webp} sizes={sizes} />
            <img
              key={shot.n}
              src={shot.src}
              alt={shot.alt}
              width={shot.width}
              height={shot.height}
              className={styles.img}
              style={zoomed ? { width: shot.width, height: 'auto', maxWidth: 'none' } : undefined}
              onClick={() => setZoomed((z) => !z)}
              draggable={false}
            />
          </picture>
          <p className={styles.alt}>{shot.alt}</p>
        </div>

        {total > 1 ? (
          <>
            <button type="button" className={`${styles.nav} ${styles.prev}`} onClick={() => go(-1)} disabled={i === 0} aria-label="Previous screenshot">
              <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M15 5 8 12l7 7" />
              </svg>
            </button>
            <button type="button" className={`${styles.nav} ${styles.next}`} onClick={() => go(1)} disabled={i === total - 1} aria-label="Next screenshot">
              <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="m9 5 7 7-7 7" />
              </svg>
            </button>
          </>
        ) : null}
      </div>

    </dialog>
  );
}
