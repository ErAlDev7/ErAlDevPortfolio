'use client';

import { useState } from 'react';
import type { ResolvedSet } from '@/lib/media';
import { kindLabel } from '@/lib/media';
import { Carousel } from './Carousel';
import styles from './ProjectMedia.module.css';

interface Props {
  name: string;
  sets: ResolvedSet[];
  host?: string;
}

/** One carousel per screenshot set. Projects with two sets (website + app) get tabs. */
export function ProjectMedia({ name, sets, host }: Props) {
  const [active, setActive] = useState(0);
  const set = sets[active];
  if (!set) return null;

  return (
    <div className={styles.root}>
      {sets.length > 1 ? (
        <div className={styles.tabs} role="tablist" aria-label="Screenshot sets">
          {sets.map((s, i) => (
            <button
              key={s.kind}
              type="button"
              role="tab"
              id={`tab-${s.kind}`}
              aria-selected={i === active}
              aria-controls={`panel-${s.kind}`}
              tabIndex={i === active ? 0 : -1}
              className={styles.tab}
              onClick={() => setActive(i)}
              onKeyDown={(e) => {
                if (e.key === 'ArrowRight') setActive((active + 1) % sets.length);
                if (e.key === 'ArrowLeft') setActive((active - 1 + sets.length) % sets.length);
              }}
            >
              {kindLabel[s.kind]} <span className="mono">{s.shots.length}</span>
            </button>
          ))}
        </div>
      ) : null}

      <div role={sets.length > 1 ? 'tabpanel' : undefined} id={`panel-${set.kind}`} aria-labelledby={sets.length > 1 ? `tab-${set.kind}` : undefined}>
        <Carousel
          key={set.kind}
          shots={set.shots}
          kind={set.kind}
          label={`${name}, ${kindLabel[set.kind].toLowerCase()} screenshots`}
          host={set.kind === 'website' ? host : undefined}
        />
      </div>
    </div>
  );
}
