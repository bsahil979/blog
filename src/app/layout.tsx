import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { SecretHeader } from '@/components/layout/SecretHeader';
import { SecretFooter } from '@/components/layout/SecretFooter';
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'THE SECRET — You Paid to Discover What Happens Next',
  description:
    'A guaranteed digital mystery experience. $19.99 for one locked Secret. Revealed synchronously on September 30, 2026. No lottery, no gambling, guaranteed digital content.',
  keywords: [
    'The Secret',
    'digital mystery experience',
    'guaranteed digital content',
    'synchronous reveal',
    'narrative mystery',
    'cryptographic archive'
  ],
  openGraph: {
    title: 'THE SECRET — Something is waiting for you.',
    description: 'You paid to discover what happens next. One secret. One reveal. No spoilers.',
    type: 'website',
    url: 'https://thesecret.club',
    siteName: 'The Secret',
    locale: 'en_US'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'THE SECRET — Something is waiting for you.',
    description: 'One secret. One reveal. No spoilers. Guaranteed digital experience.'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#070709] text-zinc-100 font-sans selection:bg-amber-500/25 selection:text-white">
        <SecretHeader />
        <main className="flex-1 w-full">{children}</main>
        <SecretFooter />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
