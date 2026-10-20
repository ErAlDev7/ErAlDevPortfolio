'use client';

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from 'react';
import dynamic from 'next/dynamic';
import type { MediaKind } from '@/data/types';
import type { Shot as ShotData } from '@/lib/media';
import { BrowserFrame, PhoneFrame } from './Frame';
import { Shot } from './Shot';
import styles from './Carousel.module.css';

// The lightbox is only fetched the first time someone opens a screenshot.
const Lightbox = dynamic(() => import('./Lightbox').then((m) => m.Lightbox), { ssr: false });

interface Props {
  shots: ShotData[];
  kind: MediaKind;
  label: string;
  host?: string;
}

const pad = (n: number) => String(n).padStart(2, '0');

export function Carousel({ shots, kind, label, host }: Props) {
  const total = shots.length;
  const isPhone = kind === 'mobile';
  const trackRef = useRef<HTMLUListElement>(null);
  const slideRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [index, setIndex] = useState(0);
  const [atEnd, setAtEnd] = useState(total <= 1);
  const [last, setLast] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);

  // Follow swipes and scrolling: the current slide is the one nearest the track's left edge.
  const sync = useCallback(() => {
    const track = trackRef.current;
    if (!track || total <= 1) return;
    let nearest = 0;
    let best = Infinity;
    slideRefs.current.forEach((el, i) => {
      if (!el) return;
      const d = Math.abs(el.offsetLeft - track.scrollLeft);
      if (d < best) {
        best = d;
        nearest = i;
      }
    });
    let lastFull = nearest;
    slideRefs.current.forEach((el, i) => {
      if (el && el.offsetLeft + el.offsetWidth <= track.scrollLeft + track.clientWidth + 2) lastFull = Math.max(lastFull, i);
    });
    setIndex(nearest);
    setLast(lastFull);
    setAtEnd(track.scrollLeft + track.clientWidth >= track.scrollWidth - 2);
  }, [total]);

  useEffect(() => {
    sync();
    window.addEventListener('resize', sync);
    return () => window.removeEventListener('resize', sync);
  }, [sync]);

  const goTo = useCallback(
    (i: number) => {
      const track = trackRef.current;
      const slide = slideRefs.current[Math.max(0, Math.min(total - 1, i))];
      if (!track || !slide) return;
      const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      track.scrollTo({ left: slide.offsetLeft, behavior: calm ? 'auto' : 'smooth' });
    },
    [total],
  );

  const onKey = (e: KeyboardEvent<HTMLElement>) => {
    const target =
      e.key === 'ArrowRight' ? index + 1 : e.key === 'ArrowLeft' ? index - 1 : e.key === 'Home' ? 0 : e.key === 'End' ? total - 1 : null;
    if (target === null) return;
    e.preventDefault();
    goTo(target);
  };

  const sizes = isPhone ? '(min-width: 900px) 11rem, 52vw' : '(min-width: 900px) 46vw, 92vw';

  return (
    <section className={styles.root} aria-roledescription="carousel" aria-label={label} data-kind={kind}>
      <ul
        ref={trackRef}
        className={styles.track}
        tabIndex={total > 1 ? 0 : undefined}
        aria-label={`${label}, use arrow keys to move between screenshots`}
        onKeyDown={onKey}
        onScroll={sync}
      >
        {shots.map((shot, i) => (
          <li
            key={shot.n}
            ref={(el) => {
              slideRefs.current[i] = el;
            }}
            data-i={i}
            className={styles.slide}
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${total}`}
          >
            <button
              type="button"
              className={styles.open}
              onClick={() => setLightbox(i)}
              aria-label={`Enlarge screenshot ${i + 1} of ${total}: ${shot.alt}`}
            >
              {isPhone ? (
                <PhoneFrame>
                  <Shot shot={shot} sizes={sizes} priority={i === 0} />
                </PhoneFrame>
              ) : (
                <BrowserFrame url={host}>
                  <Shot shot={shot} sizes={sizes} priority={i === 0} />
                </BrowserFrame>
              )}
            </button>
          </li>
        ))}
      </ul>

      {total > 1 ? (
        <>
          <div className={styles.controls}>
            <button type="button" className={styles.arrow} onClick={() => goTo(index - 1)} disabled={index === 0} aria-label="Previous screenshot">
              <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M15 5 8 12l7 7" />
              </svg>
            </button>
            <p className={`${styles.count} mono`} aria-live="polite">
              {pad(index + 1)}{last > index ? `–${pad(last + 1)}` : ""} / {pad(total)}
            </p>
            <button type="button" className={styles.arrow} onClick={() => goTo(index + 1)} disabled={atEnd} aria-label="Next screenshot">
              <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="m9 5 7 7-7 7" />
              </svg>
            </button>
            <p className={`${styles.hint} mono`}>Click a screenshot to enlarge</p>
          </div>

          <ul className={styles.thumbs} data-kind={kind} aria-label="Choose a screenshot">
            {shots.map((shot, i) => (
              <li key={shot.n}>
                <button
                  type="button"
                  className={styles.thumb}
                  aria-current={i === index ? 'true' : undefined}
                  aria-label={`Go to screenshot ${i + 1}`}
                  onClick={() => goTo(i)}
                >
                  <Shot shot={shot} sizes="96px" />
                </button>
              </li>
            ))}
          </ul>
        </>
      ) : null}

      {lightbox !== null ? (
        <Lightbox
          shots={shots}
          kind={kind}
          start={lightbox}
          onClose={(last) => {
            setLightbox(null);
            goTo(last);
          }}
        />
      ) : null}
    </section>
  );
}
