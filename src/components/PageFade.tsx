'use client';

import { useState, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import styles from './PageFade.module.css';

/** Fades the page in when you navigate between routes. The first load is untouched, so it never delays what you see. */
export function PageFade({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [seen, setSeen] = useState({ path: pathname, navigated: false });
  if (seen.path !== pathname) setSeen({ path: pathname, navigated: true });
  return (
    <div key={pathname} className={seen.navigated ? styles.in : undefined}>
      {children}
    </div>
  );
}
