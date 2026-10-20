import { projects } from '@/data/projects';
import type { Project, ProjectType } from '@/data/types';
import { resolveAll, type Shot as ShotData } from '@/lib/media';
import { WorkRegister, type RegisterItem } from './WorkRegister';

const typeLabel: Record<ProjectType, string> = {
  website: 'Website',
  mobile: 'Mobile app',
  desktop: 'Desktop app',
  architecture: 'Architecture',
  other: 'Other',
};

function statusLabel(p: Project): string {
  if (p.status === 'undeployed') return 'Not released';
  if (p.status === 'in-development') return 'In development';
  return p.types.length > 1 || p.statusNote ? 'Website live' : 'Live';
}

export function Work() {
  const items: RegisterItem[] = projects.map((p) => {
    const sets = resolveAll(p);
    const first = sets[0];
    const shot: ShotData | undefined = first?.shots[0];
    return {
      slug: p.slug,
      name: p.name,
      summary: p.summary,
      types: p.types,
      typeLabels: p.types.map((t) => typeLabel[t]),
      year: p.year,
      status: statusLabel(p),
      stack: p.stack,
      host: p.liveUrl ? new URL(p.liveUrl).host : undefined,
      preview: shot && first ? { kind: first.kind, shot } : undefined,
      count: sets.reduce((n, s) => n + s.shots.length, 0),
    };
  });

  return (
    <section id="work" className="section" aria-labelledby="work-title">
      <div className="wrap-wide">
        <WorkRegister items={items} />
      </div>
    </section>
  );
}
