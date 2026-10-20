'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Logo } from './brand/Logo';
import { ThemeToggle } from './ThemeToggle';
import { mailto } from '@/lib/site';
import styles from './Header.module.css';

const links = [
  { href: '/#work', label: 'Work' },
  { href: '/#services', label: 'Services' },
  { href: '/#process', label: 'Process' },
  { href: '/#about', label: 'About' },
  { href: '/#contact', label: 'Contact' },
];

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className={styles.header}>
      <div className={`${styles.inner} wrap-wide`}>
        <Link href="/" className={styles.brand} aria-label="ErAlDev, home" onClick={() => setOpen(false)}>
          <Logo variant="mark" height={30} />
          <span className={styles.name}>
            ErAl<span>Dev</span>
          </span>
        </Link>

        <nav id="site-nav" className={`${styles.nav} ${open ? styles.navOpen : ''}`} aria-label="Main">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className={styles.actions}>
          <ThemeToggle />
          <a className={styles.cta} href={mailto('New project')}>
            Start a project
          </a>
          <button
            type="button"
            className={styles.menu}
            aria-expanded={open}
            aria-controls="site-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>
    </header>
  );
}
