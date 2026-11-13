import type { Metadata, Viewport } from 'next';
import './globals.css';
import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';

export const metadata: Metadata = {
  metadataBase: new URL('https://midiamap.studioalfamkt.online'),
  title: { default: 'MídiaMap | Outdoor, painel LED e mídia OOH em Brasília e Goiás', template: '%s | MídiaMap' },
  description: 'Marketplace de mídia OOH e DOOH. Encontre outdoor, painel LED e espaços publicitários em Brasília, Goiânia, Luziânia e entorno.',
  keywords: ['mídia OOH', 'DOOH', 'outdoor Brasília', 'painel LED Goiânia', 'mídia exterior', 'marketplace de mídia'],
  manifest: '/manifest.webmanifest',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'MídiaMap | Outdoor, painel LED e mídia OOH em Brasília e Goiás',
    description: 'Marketplace de mídia OOH e DOOH operado pela Studio Alfa MKT.',
    url: 'https://midiamap.studioalfamkt.online',
    siteName: 'MídiaMap',
    locale: 'pt_BR',
    type: 'website',
    images: [{ url: '/og-midiamap.svg', width: 1200, height: 630, alt: 'MídiaMap — marketplace de mídia OOH e DOOH' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MídiaMap | Outdoor, painel LED e mídia OOH em Brasília e Goiás',
    description: 'Marketplace de mídia OOH e DOOH operado pela Studio Alfa MKT.',
    images: ['/og-midiamap.svg'],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://midiamap.studioalfamkt.online/#organization",
  name: "MídiaMap",
  url: "https://midiamap.studioalfamkt.online/",
  description: "Marketplace de mídia OOH e DOOH para encontrar referências de outdoor, painéis LED, indoor, TV, rádio e mídia impressa.",
  parentOrganization: {
    "@type": "Organization",
    name: "Studio Alfa MKT",
    url: "https://www.studioalfamkt.online/"
  },
  areaServed: [
    { "@type": "AdministrativeArea", name: "Distrito Federal, Brasil" },
    { "@type": "AdministrativeArea", name: "Goiás, Brasil" },
    { "@type": "Country", name: "Brasil" }
  ],
  knowsAbout: ["Mídia OOH", "Mídia DOOH", "Outdoor", "Painel LED", "Mídia indoor", "Planejamento de mídia", "Publicidade exterior"]
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "MídiaMap",
  url: "https://midiamap.studioalfamkt.online/",
  inLanguage: "pt-BR",
  publisher: { "@id": "https://midiamap.studioalfamkt.online/#organization" }
};

export const viewport: Viewport = { themeColor: '#19c77a', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="pt-BR"><body><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([organizationSchema, websiteSchema]).replace(/</g, "\\u003c") }} /><SiteHeader />{children}<SiteFooter /></body></html>;
}
