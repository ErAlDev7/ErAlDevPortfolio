import Link from 'next/link';
import { Logo } from './brand/Logo';
import { site } from '@/lib/site';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.inner} wrap`}>
        <Logo variant="full" height={132} title="ErAlDev: websites, software, IT" className={styles.logo} />
        <div className={styles.cols}>
          <div>
            <h2 className={styles.h}>Write to us</h2>
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <a href={site.instagram} rel="noopener noreferrer" target="_blank">
              Instagram {site.instagramHandle}
            </a>
          </div>
          <div>
            <h2 className={styles.h}>On this page</h2>
            <Link href="/#work">Work</Link>
            <Link href="/#services">Services</Link>
            <Link href="/#process">Process</Link>
            <Link href="/#contact">Contact</Link>
          </div>
        </div>
      </div>
      <div className={`${styles.legal} wrap`}>
        <span className="mono">© {new Date().getFullYear()} ErAlDev</span>
      </div>
    </footer>
  );
}
