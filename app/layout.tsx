import React from "react"
import type { Metadata } from 'next'
import Script from "next/script"
import { Instrument_Sans, Bricolage_Grotesque, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const instrumentSans = Instrument_Sans({ 
  subsets: ["latin"],
  variable: '--font-instrument'
});

const bricolageGrotesque = Bricolage_Grotesque({ 
  subsets: ["latin"],
  variable: '--font-bricolage'
});

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: '--font-jetbrains'
});

export const metadata: Metadata = {
  title: {
    default: 'Progrize — The Career Platform That Moves You Forward',
    template: '%s | Progrize',
  },
  description:
    'Progrize is the AI-powered career platform that helps you land your next role faster. Get personalised roadmaps, track your skills, and join a community that moves careers forward.',
  keywords: [
    'career platform',
    'job search',
    'career growth',
    'skill development',
    'AI career coach',
    'professional development',
    'career roadmap',
    'job placement',
  ],
  authors: [{ name: 'Progrize' }],
  creator: 'Progrize',
  metadataBase: new URL('https://progrize.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://progrize.com',
    siteName: 'Progrize',
    title: 'Progrize — The Career Platform That Moves You Forward',
    description:
      'AI-powered career platform with personalised roadmaps, skill tracking, and a community built to move your career forward — faster.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Progrize — The Career Platform That Moves You Forward',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Progrize — The Career Platform That Moves You Forward',
    description:
      'AI-powered career platform with personalised roadmaps, skill tracking, and a community built to move your career forward — faster.',
    images: ['/og-image.png'],
    creator: '@progrize',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${instrumentSans.variable} ${bricolageGrotesque.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        {children}
        <Analytics />
        <Script src="https://mcp.figma.com/mcp/html-to-design/capture.js" strategy="afterInteractive" />
      </body>
    </html>
  )
}
