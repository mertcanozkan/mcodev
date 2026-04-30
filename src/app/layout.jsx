import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-body',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
})

const BASE_URL = 'https://mcodev.uk'

export const viewport = {
  themeColor: '#0a0a0f',
  width: 'device-width',
  initialScale: 1,
}

export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'MCODev — Front End Developer | London',
    template: '%s | MCODev',
  },
  description: 'Front end developer building beautiful, high-performance web experiences. Specialising in React, Next.js, and modern UI development. Based in London, working with clients worldwide.',
  keywords: ['front end developer', 'React developer', 'Next.js', 'web development', 'London', 'UI developer', 'TypeScript'],
  authors: [{ name: 'Mert Ozkan', url: BASE_URL }],
  creator: 'Mert Ozkan',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: 'MCODev — Front End Developer | London',
    description: 'Building beautiful, high-performance web experiences with React, Next.js, and modern front end technologies.',
    url: BASE_URL,
    siteName: 'MCODev',
    type: 'website',
    locale: 'en_GB',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'MCODev — Front End Developer based in London' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@MCODevUK',
    creator: '@MCODevUK',
    title: 'MCODev — Front End Developer | London',
    description: 'Building beautiful, high-performance web experiences with React, Next.js, and modern front end technologies.',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>◆</text></svg>"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'Person',
                  '@id': `${BASE_URL}/#person`,
                  name: 'Mert Ozkan',
                  url: BASE_URL,
                  jobTitle: 'Front End Developer',
                  worksFor: { '@type': 'Organization', name: 'MCODev' },
                  address: { '@type': 'PostalAddress', addressLocality: 'London', addressCountry: 'GB' },
                  sameAs: [
                    'https://github.com/mertcanozkan',
                    'https://www.linkedin.com/in/mcodev/',
                    'https://x.com/MCODevUK',
                  ],
                  knowsAbout: ['React', 'Next.js', 'TypeScript', 'Front End Development', 'UI/UX', 'Tailwind CSS'],
                },
                {
                  '@type': 'WebSite',
                  '@id': `${BASE_URL}/#website`,
                  url: BASE_URL,
                  name: 'MCODev',
                  description: 'Front end developer portfolio — Mert Ozkan, London',
                  author: { '@id': `${BASE_URL}/#person` },
                },
              ],
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
