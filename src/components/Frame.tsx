import type { ReactNode } from 'react';
import styles from './Frame.module.css';

/** Minimal browser chrome. The URL strip shows the real domain when there is one. */
export function BrowserFrame({ url, children, className = '' }: { url?: string; children: ReactNode; className?: string }) {
  return (
    <div className={`${styles.browser} ${className}`}>
      <div className={styles.bar} aria-hidden="true">
        <span className={styles.dots}>
          <i />
          <i />
          <i />
        </span>
        {url ? <span className={`${styles.url} mono`}>{url}</span> : null}
      </div>
      <div className={styles.screen}>{children}</div>
    </div>
  );
}

/** Thin-bezel device frame for portrait phone screenshots (1080 x 2340). */
export function PhoneFrame({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`${styles.phone} ${className}`}>
      <div className={styles.phoneScreen}>{children}</div>
    </div>
  );
}
