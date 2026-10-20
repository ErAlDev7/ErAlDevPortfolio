'use client';

import styles from './ThemeToggle.module.css';

function effectiveTheme(): 'light' | 'dark' {
  const set = document.documentElement.dataset.theme;
  if (set === 'light' || set === 'dark') return set;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function ThemeToggle() {
  const toggle = () => {
    const next = effectiveTheme() === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem('theme', next);
    } catch {
      /* storage can be blocked; the choice then lasts for this visit only */
    }
  };

  return (
    <button type="button" className={styles.btn} onClick={toggle} aria-label="Switch between light and dark theme">
      <svg className={styles.moon} viewBox="0 0 20 20" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M16.5 11.5A7 7 0 0 1 8.5 3.5a7 7 0 1 0 8 8Z" />
      </svg>
      <svg className={styles.sun} viewBox="0 0 20 20" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="10" cy="10" r="3.5" />
        <path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.3 4.3l1.4 1.4M14.3 14.3l1.4 1.4M4.3 15.7l1.4-1.4M14.3 5.7l1.4-1.4" />
      </svg>
    </button>
  );
}
