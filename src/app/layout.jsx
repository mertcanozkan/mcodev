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

export const viewport = {
  themeColor: '#0a0a0f',
}

export const metadata = {
  title: 'MCODev — Front End Developer | London',
  description: 'Front end developer building beautiful, high-performance web experiences. Specialising in React, Next.js, and modern UI development. Based in London.',
  openGraph: {
    title: 'MCODev — Front End Developer',
    description: 'Building beautiful, high-performance web experiences with React, Next.js, and modern front end technologies.',
    type: 'website',
    locale: 'en_GB',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MCODev — Front End Developer',
    description: 'Building beautiful, high-performance web experiences with React, Next.js, and modern front end technologies.',
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
      </head>
      <body>{children}</body>
    </html>
  )
}
