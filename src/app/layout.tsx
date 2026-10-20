import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import '@/styles/tokens.css';
import '@/styles/base.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PageFade } from '@/components/PageFade';
import { LogoSprite } from '@/components/brand/LogoSprite';
import { site } from '@/lib/site';


const sans = localFont({
  src: [
    { path: '../../node_modules/@fontsource/schibsted-grotesk/files/schibsted-grotesk-latin-400-normal.woff2', weight: '400', style: 'normal' },
    { path: '../../node_modules/@fontsource/schibsted-grotesk/files/schibsted-grotesk-latin-500-normal.woff2', weight: '500', style: 'normal' },
    { path: '../../node_modules/@fontsource/schibsted-grotesk/files/schibsted-grotesk-latin-700-normal.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-schibsted',
  display: 'optional',
});

const mono = localFont({
  src: [
    { path: '../../node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff2', weight: '400', style: 'normal' },
    { path: '../../node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-500-normal.woff2', weight: '500', style: 'normal' },
  ],
  variable: '--font-jetbrains',
  display: 'swap',
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: 'ErAlDev: websites, mobile apps and backends', template: '%s | ErAlDev' },
  description: site.description,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: site.name,
    title: 'ErAlDev: websites, mobile apps and backends',
    description: site.description,
    url: '/',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'ErAlDev logo' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ErAlDev: websites, mobile apps and backends',
    description: site.description,
    images: ['/og.png'],
  },
  icons: { icon: [{ url: '/icon.png', type: 'image/png', sizes: '192x192' }], apple: '/apple-touch-icon.png' },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f4f6f8' },
    { media: '(prefers-color-scheme: dark)', color: '#0b1118' },
  ],
};

// Runs before first paint so a saved theme never flashes the wrong one.
const themeScript = `try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t}catch(e){}`;

const organization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: site.name,
  url: site.url,
  email: site.email,
  sameAs: [site.instagram],
  description: site.description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />
      </head>
      <body>
        <LogoSprite />
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        <main id="main">
          <PageFade>{children}</PageFade>
        </main>
        <Footer />
      </body>
    </html>
  );
}
