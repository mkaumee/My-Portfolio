import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Muhammad Kaumi - AI Engineer & Founder of Alert-Ai',
  description: 'Solo founder and AI engineer building Alert-Ai — an AI-powered emergency detection and guidance platform using computer vision, edge AI, and context-aware agents.',
  keywords: [
    'AI Engineer',
    'Alert-Ai',
    'Emergency Detection',
    'Computer Vision',
    'YOLO',
    'Edge AI',
    'Emergency Response',
    'CPR Monitor',
    'First Respondent',
    'Muhammad Kaumi'
  ],
  authors: [{ name: 'Muhammad Kaumi' }],
  creator: 'Muhammad Kaumi',
  publisher: 'Muhammad Kaumi',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://muhammad-kaumi.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://muhammad-kaumi.vercel.app',
    title: 'Muhammad Kaumi - AI Engineer & Founder of Alert-Ai',
    description: 'Solo founder and AI engineer building Alert-Ai — an AI-powered emergency detection and guidance platform using computer vision, edge AI, and context-aware agents.',
    siteName: 'Muhammad Kaumi Portfolio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Muhammad Kaumi - AI Engineer Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Muhammad Kaumi - AI Engineer & Founder of Alert-Ai',
    description: 'Solo founder and AI engineer building Alert-Ai — an AI-powered emergency detection and guidance platform using computer vision, edge AI, and context-aware agents.',
    images: ['/og-image.jpg'],
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
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}