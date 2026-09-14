import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { StructuredData } from '@/components/ui/StructuredData';
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';
import { generateWebsiteSchema, constructMetadata } from '@/lib/seo';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = constructMetadata({
  title: 'AIForDevs — Find & Compare the Best AI Tools for Developers',
  description:
    'Discover, compare, and find the best AI tools for coding, research, productivity, and developer workflows.',
  canonicalUrl: '/',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const websiteSchema = generateWebsiteSchema();

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <head>
        <StructuredData data={websiteSchema} />
      </head>
      <body className="min-h-full flex flex-col bg-zinc-950 text-zinc-100 font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
        <Header />
        <main className="flex-1 w-full">{children}</main>
        <Footer />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
