export const site = {
  name: 'ErAlDev',
  // TODO: replace with the real domain before deploying (used for canonical URLs, sitemap and social cards).
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://eraldev.example',
  email: 'eraldev7@gmail.com',
  instagram: 'https://www.instagram.com/eraldev7/',
  instagramHandle: '@eraldev7',
  tagline: 'Websites | Software | IT',
  description:
    'ErAlDev builds websites, mobile apps and the backends behind them. See the projects we have built and write to us.',
} as const;

export const mailto = (subject: string, body = '') =>
  `mailto:${site.email}?subject=${encodeURIComponent(subject)}${body ? `&body=${encodeURIComponent(body)}` : ''}`;
