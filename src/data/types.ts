export type ProjectType = 'website' | 'mobile' | 'desktop' | 'architecture' | 'other';
export type MediaKind = 'website' | 'mobile' | 'desktop' | 'diagram';
export type ProjectStatus = 'deployed' | 'undeployed' | 'in-development';

/** One set of screenshots. Files live in assets/projects/<Folder>/<Kind>/1.png, 2.png ... */
export interface MediaSet {
  kind: MediaKind;
  /** One alt text per file, in file-number order. Carousel length = alts.length. */
  alts: string[];
}

export interface Project {
  /** URL slug and image folder name (kebab-case of the assets folder). */
  slug: string;
  name: string;
  types: ProjectType[];
  status: ProjectStatus;
  /** Shown next to the status when the project has more than one part. */
  statusNote?: string;
  year: number;
  role: string;
  /** One or two sentences for the register and the page header. */
  summary: string;
  /** Detail page paragraphs. */
  description: string[];
  stack: string[];
  media: MediaSet[];
  liveUrl?: string;
  appStoreUrl?: string;
  playStoreUrl?: string;
}
