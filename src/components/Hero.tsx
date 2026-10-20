import Link from 'next/link';
import { projects, getProject } from '@/data/projects';
import { resolveAll } from '@/lib/media';
import { mailto } from '@/lib/site';
import { BrowserFrame, PhoneFrame } from './Frame';
import { Shot } from './Shot';
import styles from './Hero.module.css';

export function Hero() {
  // The first viewport shows real work: E-Raporto's website and its mobile app.
  const p = getProject('e-raporto') ?? projects[0];
  const [web, mobile] = resolveAll(p);
  const webShot = web?.shots[0];
  const mobileShot = mobile?.shots[4];

  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={`${styles.inner} wrap-wide`}>
        <div className={styles.copy}>
          <h1 id="hero-title" className={styles.title}>
            We build websites, mobile apps and the backends behind them.
          </h1>
          <p className={styles.lede}>
            ErAlDev is a small software company. Recent work includes a reporting platform for Albanian municipalities, a
            real estate app, and sites for clients in Albania and Germany.
          </p>
          <div className={styles.cta}>
            <a className={styles.primary} href="#work">
              See the work
            </a>
            <a className={styles.secondary} href={mailto('New project')}>
              Write to us
            </a>
          </div>
          <p className={`${styles.stack} mono`}>
            <span>In use:</span> React · React Native · TypeScript · C# Web API · PostgreSQL
          </p>
        </div>

        {webShot && mobileShot ? (
          <figure className={styles.stage}>
            <Link href="/work/e-raporto/" className={styles.stageLink} aria-label="Open the E-Raporto project" />
            <BrowserFrame url="e-raporto.lovable.app" className={styles.browser}>
              <Shot shot={webShot} sizes="(min-width: 1100px) 46vw, 92vw" />
            </BrowserFrame>
            <PhoneFrame className={styles.phone}>
              <Shot shot={mobileShot} sizes="(min-width: 1100px) 14vw, 30vw" />
            </PhoneFrame>
            <figcaption className={`${styles.caption} mono`}>E-Raporto: citizen reports, website and mobile app</figcaption>
          </figure>
        ) : null}
      </div>
    </section>
  );
}
