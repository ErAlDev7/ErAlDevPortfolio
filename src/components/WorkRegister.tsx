'use client';

import { useId, useState } from 'react';
import Link from 'next/link';
import type { ProjectType, MediaKind } from '@/data/types';
import type { Shot as ShotData } from '@/lib/media';
import { BrowserFrame, PhoneFrame } from './Frame';
import { Shot } from './Shot';
import styles from './WorkRegister.module.css';

export interface RegisterItem {
  slug: string;
  name: string;
  summary: string;
  types: ProjectType[];
  typeLabels: string[];
  year: number;
  status: string;
  stack: string[];
  host?: string;
  preview?: { kind: MediaKind; shot: ShotData };
  count: number;
}

type Filter = 'all' | 'website' | 'mobile';

function Preview({ item, priority }: { item: RegisterItem; priority?: boolean }) {
  if (!item.preview) {
    return (
      <div className={styles.textPreview}>
        <p className={styles.textName}>{item.name}</p>
        {item.host ? <p className={`${styles.textHost} mono`}>{item.host}</p> : null}
      </div>
    );
  }
  const { kind, shot } = item.preview;
  if (kind === 'mobile') {
    return (
      <PhoneFrame className={styles.phone}>
        <Shot shot={shot} sizes="(min-width: 1200px) 18vw, 40vw" priority={priority} />
      </PhoneFrame>
    );
  }
  return (
    <BrowserFrame url={item.host} className={styles.browser}>
      <Shot shot={shot} sizes="(min-width: 1200px) 42vw, 92vw" priority={priority} />
    </BrowserFrame>
  );
}

export function WorkRegister({ items }: { items: RegisterItem[] }) {
  const [filter, setFilter] = useState<Filter>('all');
  const [active, setActive] = useState(items[0]?.slug);
  const labelId = useId();

  const counts = {
    all: items.length,
    website: items.filter((i) => i.types.includes('website')).length,
    mobile: items.filter((i) => i.types.includes('mobile')).length,
  };
  const visible = items.filter((i) => filter === 'all' || i.types.includes(filter));
  const shown = visible.find((i) => i.slug === active) ?? visible[0];

  const filters: { id: Filter; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'website', label: 'Websites' },
    { id: 'mobile', label: 'Mobile apps' },
  ];

  return (
    <div className={styles.root}>
      <div className={styles.head}>
        <h2 id="work-title" className="section-title">
          Selected work
        </h2>
        <div className={styles.filters} role="group" aria-labelledby={labelId}>
          <span id={labelId} className="visually-hidden">
            Filter projects by type
          </span>
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              className={styles.filter}
              aria-pressed={filter === f.id}
              onClick={() => setFilter(f.id)}
            >
              {f.label} <span className="mono">{counts[f.id]}</span>
            </button>
          ))}
        </div>
      </div>

      <div className={styles.body}>
        <ol className={styles.list} aria-live="polite">
          {visible.map((item) => (
            <li key={item.slug} className={styles.item} data-active={shown?.slug === item.slug}>
              <Link
                href={`/work/${item.slug}/`}
                className={styles.row}
                onMouseEnter={() => setActive(item.slug)}
                onFocus={() => setActive(item.slug)}
              >
                <span className={styles.main}>
                  <span className={styles.name}>{item.name}</span>
                  <span className={styles.summary}>{item.summary}</span>
                  <span className={`${styles.stack} mono`}>{item.stack.join(' · ')}</span>
                </span>
                <span className={`${styles.meta} mono`}>
                  <span>{item.typeLabels.join(' + ')}</span>
                  <span>{item.year}</span>
                  <span className={styles.status}>{item.status}</span>
                </span>
                <svg className={styles.arrow} viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 19 19 5M8 5h11v11" pathLength="1" />
                </svg>
              </Link>
              {/* Phones and narrow screens have no side panel, so each row carries its own preview. */}
              <div className={styles.inline} aria-hidden="true">
                <Preview item={item} />
              </div>
            </li>
          ))}
        </ol>

        <div className={styles.panel} aria-hidden="true">
          <div className={styles.panelInner}>
            {items.map((item) => (
              <div key={item.slug} className={styles.layer} data-on={shown?.slug === item.slug}>
                <Preview item={item} />
              </div>
            ))}
          </div>
          <p className={`${styles.caption} mono`}>
            {shown ? `${shown.name}${shown.count ? `, ${shown.count} screenshots` : ''}` : ''}
          </p>
        </div>
      </div>
    </div>
  );
}
