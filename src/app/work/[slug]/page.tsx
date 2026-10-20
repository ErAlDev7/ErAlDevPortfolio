import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { projects, getProject } from '@/data/projects';
import type { ProjectStatus, ProjectType } from '@/data/types';
import { resolveAll } from '@/lib/media';
import { mailto } from '@/lib/site';
import { ProjectMedia } from '@/components/ProjectMedia';
import styles from './page.module.css';

interface Params {
  slug: string;
}

export function generateStaticParams(): Params[] {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return {
    title: p.name,
    description: p.summary,
    alternates: { canonical: `/work/${p.slug}/` },
    openGraph: { title: `${p.name} | ErAlDev`, description: p.summary, url: `/work/${p.slug}/` },
  };
}

const statusText: Record<ProjectStatus, string> = {
  deployed: 'Live',
  undeployed: 'Not released',
  'in-development': 'In development',
};
const typeText: Record<ProjectType, string> = {
  website: 'Website',
  mobile: 'Mobile app',
  desktop: 'Desktop app',
  architecture: 'Architecture',
  other: 'Other',
};

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const sets = resolveAll(p);
  const host = p.liveUrl ? new URL(p.liveUrl).host : undefined;
  const next = projects[(projects.findIndex((x) => x.slug === p.slug) + 1) % projects.length];
  const hasMedia = sets.some((s) => s.shots.length > 0);

  return (
    <article className={styles.page}>
      <div className={`${styles.top} wrap-wide`}>
        <div className={styles.intro}>
          <Link href="/#work" className={styles.back}>
            <span aria-hidden="true">←</span> All work
          </Link>
          <h1 className={styles.title}>{p.name}</h1>
          <p className={styles.summary}>{p.summary}</p>
          <div className={styles.links}>
            {p.liveUrl ? (
              <a className={styles.primary} href={p.liveUrl} target="_blank" rel="noopener noreferrer">
                Visit {host}
                <span className="visually-hidden"> (opens in a new tab)</span>
              </a>
            ) : null}
            {p.appStoreUrl ? (
              <a className={styles.store} href={p.appStoreUrl} target="_blank" rel="noopener noreferrer">
                Download on the App Store
              </a>
            ) : null}
            {p.playStoreUrl ? (
              <a className={styles.store} href={p.playStoreUrl} target="_blank" rel="noopener noreferrer">
                Get it on Google Play
              </a>
            ) : null}
          </div>
        </div>

        <dl className={styles.facts}>
          <div>
            <dt>Type</dt>
            <dd>{p.types.map((t) => typeText[t]).join(' + ')}</dd>
          </div>
          <div>
            <dt>Role</dt>
            <dd>{p.role}</dd>
          </div>
          <div>
            <dt>Year</dt>
            <dd className="mono">{p.year}</dd>
          </div>
          <div>
            <dt>Status</dt>
            <dd>
              {p.statusNote && p.status === 'deployed' ? 'Website live' : statusText[p.status]}
              {p.statusNote ? <span className={styles.note}>{p.statusNote}</span> : null}
            </dd>
          </div>
          <div>
            <dt>Stack</dt>
            <dd className="mono">{p.stack.join(' · ')}</dd>
          </div>
        </dl>
      </div>

      {hasMedia ? (
        <div className={`${styles.media} wrap-wide`}>
          <ProjectMedia name={p.name} sets={sets} host={host} />
        </div>
      ) : null}

      <div className={`${styles.body} wrap`}>
        <div className={styles.text}>
          {p.description.map((para) => (
            <p key={para}>{para}</p>
          ))}
        </div>
      </div>

      <div className={`${styles.footer} wrap`}>
        <Link href={`/work/${next.slug}/`} className={styles.next}>
          <span className={styles.nextName}>Next: {next.name} →</span>
        </Link>
        <a className={styles.ask} href={mailto(`About ${p.name}`)}>
          Want something like this? Write to us
        </a>
      </div>
    </article>
  );
}
