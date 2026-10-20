import Link from 'next/link';
import styles from './not-found.module.css';

export const metadata = { title: 'Page not found' };

export default function NotFound() {
  return (
    <section className={`${styles.wrap} wrap`}>
      <p className={styles.code} aria-hidden="true">
        404
      </p>
      <h1 className={styles.title}>This page does not exist.</h1>
      <p className={styles.text}>
        The address may be mistyped, or the project it pointed to has moved. Everything we have built is listed on the
        work page.
      </p>
      <div className={styles.links}>
        <Link href="/#work" className={styles.primary}>
          See the work
        </Link>
        <Link href="/" className={styles.secondary}>
          Back to the home page
        </Link>
      </div>
    </section>
  );
}
