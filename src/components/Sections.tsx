import Link from 'next/link';
import { projects } from '@/data/projects';
import styles from './Sections.module.css';

const link = (slug: string) => projects.find((p) => p.slug === slug);

function SeenIn({ slugs }: { slugs: string[] }) {
  const list = slugs.map(link).filter((p): p is NonNullable<ReturnType<typeof link>> => Boolean(p));
  return (
    <p className={`${styles.seen} mono`}>
      Built:{' '}
      {list.map((p, i) => (
        <span key={p.slug}>
          {i > 0 ? ', ' : ''}
          <Link href={`/work/${p.slug}/`}>{p.name}</Link>
        </span>
      ))}
    </p>
  );
}

export function Services() {
  return (
    <section id="services" className={`${styles.services} section`} aria-labelledby="services-title">
      <div className={`${styles.split} wrap`}>
        <h2 id="services-title" className="section-title">
          What we build
        </h2>
        <ul className={styles.rows}>
          <li>
            <h3>Websites</h3>
            <p>
              Company sites, one-pagers and organization sites in React, built to work from the smallest phone up. Our sites so far run in Albanian, English and German.
            </p>
            <SeenIn slugs={['ea-clean-service', 'qendra-kazus', 'smart-bus-al', 'kthema-gati']} />
          </li>
          <li>
            <h3>Mobile apps</h3>
            <p>
              Android and iOS apps in React Native and TypeScript. Our apps so far use accounts, maps, the camera, location and push notifications.
            </p>
            <SeenIn slugs={['e-raporto', 'nest-albania']} />
          </li>
          <li>
            <h3>Backends and APIs</h3>
            <p>
              The server side behind the apps: C# Web APIs on PostgreSQL that handle users, roles, reports and status
              changes, so the website, the app and the staff dashboard all read from the same source.
            </p>
            <SeenIn slugs={['e-raporto', 'nest-albania', 'kthema-gati']} />
          </li>
          <li>
            <h3>AI features inside products</h3>
            <p>
              Where a model earns its place, we build it in and keep a person in charge. In E-Raporto, AI classifies a
              report and spots duplicates, and municipal staff can override every suggestion.
            </p>
            <SeenIn slugs={['e-raporto']} />
          </li>
        </ul>
      </div>
    </section>
  );
}

export function Process() {
  // TODO(owner): confirm these four steps describe how ErAlDev actually works.
  const steps = [
    {
      title: 'Talk',
      body: 'We start with what the software has to do and who will use it, and write that down before anything is built.',
    },
    {
      title: 'Build in small releases',
      body: 'You see working software early, on a real device or a real URL, not a big reveal at the end.',
    },
    {
      title: 'Check on real devices',
      body: 'Phones, small screens, slow connections, a keyboard only. We test the way your users will use it.',
    },
    {
      title: 'Launch and stay',
      body: 'We deploy it and remain the people you call when something needs to change.',
    },
  ];
  return (
    <section id="process" className={`${styles.process} section`} aria-labelledby="process-title">
      <div className="wrap">
        <h2 id="process-title" className="section-title">
          How we work
        </h2>
        <ol className={styles.steps}>
          {steps.map((s, i) => (
            <li key={s.title}>
              <span className={`${styles.stepNo} mono`}>{i + 1}</span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Technology() {
  // Built from projects.ts, so it can only list what has actually shipped.
  const map = new Map<string, { name: string; slug: string }[]>();
  for (const p of projects) {
    for (const raw of p.stack) {
      const tech = raw.replace(/\s*\(.*\)$/, '');
      const list = map.get(tech) ?? [];
      list.push({ name: raw.includes('(website)') ? `${p.name} website` : p.name, slug: p.slug });
      map.set(tech, list);
    }
  }
  const rows = [...map.entries()].sort((a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0]));

  return (
    <section id="technology" className={`${styles.tech} section`} aria-labelledby="tech-title">
      <div className={`${styles.techGrid} wrap`}>
        <div>
          <h2 id="tech-title" className="section-title">
            Technology we have shipped with
          </h2>
          <p className={styles.note}>
            This list is generated from our project files. If it is not here, we have not used it in a delivered project.
            Lovable and v0 are AI site builders; two of the sites started there.
          </p>
        </div>
        <table className={styles.table}>
          <thead className="visually-hidden">
            <tr>
              <th scope="col">Technology</th>
              <th scope="col">Used in</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([tech, uses]) => (
              <tr key={tech}>
                <th scope="row">{tech}</th>
                <td className="mono">
                  {uses.map((u, i) => (
                    <span key={u.name}>
                      {i > 0 ? ', ' : ''}
                      <Link href={`/work/${u.slug}/`}>{u.name}</Link>
                    </span>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export function About() {
  // TODO(owner): add team size, location and anything else you want stated here.
  return (
    <section id="about" className={`${styles.about} section`} aria-labelledby="about-title">
      <div className={`${styles.aboutGrid} wrap`}>
        <h2 id="about-title" className="section-title">
          About
        </h2>
        <div className={styles.aboutText}>
          <p className={styles.lead}>
            ErAlDev is a small software company. We build the interface, the mobile app and the server behind them, so
            one team answers for the whole thing.
          </p>
          <p>
            Our projects so far serve people in Albania and Germany: a reporting platform for municipalities, a real
            estate app, a vehicle service platform, a ticketing site for buses and websites for a youth organization and
            a cleaning company.
          </p>
          <p>We would rather tell you what a project needs than sell you what is easy to build.</p>
        </div>
      </div>
    </section>
  );
}
