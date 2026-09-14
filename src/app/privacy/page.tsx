import { Metadata } from 'next';
import { constructMetadata } from '@/lib/seo';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';

export const metadata: Metadata = constructMetadata({
  title: 'Privacy Policy — AIForDevs',
  description:
    'Privacy policy for AIForDevs.tech. Learn how we handle technical analytics and respect developer privacy.',
  canonicalUrl: '/privacy',
});

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <Breadcrumbs items={[{ name: 'Privacy', url: '/privacy' }]} />

      <div className="space-y-4 mb-10 pb-6 border-b border-zinc-800">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-xs font-mono text-zinc-400">
          Last Updated: September 1, 2026
        </p>
      </div>

      <div className="space-y-8 text-sm text-zinc-300 leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">1. Overview</h2>
          <p>
            AIForDevs (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) operates aifordevs.tech. We believe in privacy-conscious web design. We do not sell your personal data, track your keystrokes, or sell email lists to third-party advertisers.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">2. Information We Collect</h2>
          <p>
            When you visit AIForDevs, we may collect standard anonymous web telemetry (such as browser type, referring URL, pages visited, and general geographic country) to monitor server health, performance, and popular content.
          </p>
          <p>
            If you voluntarily submit inquiries or corrections through our contact form, we collect the name and email address provided to respond to your request.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">3. Cookies and Analytics</h2>
          <p>
            We may use privacy-preserving analytics solutions and cookies to understand aggregated visitor trends. You can configure your browser to reject cookies without impacting your ability to browse the directory or read comparisons.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">4. Third-Party Outbound Links</h2>
          <p>
            Our website links to official third-party software websites (such as OpenAI, Anthropic, Cursor, GitHub, etc.). When clicking external links, you leave AIForDevs and are subject to the privacy practices and terms of those third-party services.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">5. Contact</h2>
          <p>
            If you have questions regarding this Privacy Policy, contact us via our contact form at{' '}
            <a href="/contact" className="text-indigo-400 hover:underline">
              /contact
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
