import { Metadata } from 'next';
import { constructMetadata } from '@/lib/seo';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';

export const metadata: Metadata = constructMetadata({
  title: 'Terms of Service — AIForDevs',
  description:
    'Terms of service and editorial disclaimers for AIForDevs.tech.',
  canonicalUrl: '/terms',
});

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <Breadcrumbs items={[{ name: 'Terms', url: '/terms' }]} />

      <div className="space-y-4 mb-10 pb-6 border-b border-zinc-800">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Terms of Service
        </h1>
        <p className="text-xs font-mono text-zinc-400">
          Last Updated: September 1, 2026
        </p>
      </div>

      <div className="space-y-8 text-sm text-zinc-300 leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">1. Acceptance of Terms</h2>
          <p>
            By accessing or using AIForDevs.tech (&ldquo;the Site&rdquo;), you agree to be bound by these Terms of Service. If you do not agree, please do not use the Site.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">2. Editorial & Pricing Disclaimer</h2>
          <p>
            All content, scores, and comparisons on AIForDevs are provided for informational and editorial evaluation purposes only. While we endeavor to keep tool specifications and pricing tiers up to date, AI providers frequently change their models, rate limits, and pricing.
          </p>
          <p>
            We make no warranties regarding the accuracy or completeness of third-party pricing or capability claims. You should always verify terms on the official provider website before purchasing any subscription.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">3. Intellectual Property Rights</h2>
          <p>
            All original editorial evaluations, comparison frameworks, and site designs are copyright of AIForDevs. All third-party product names, logos, registered trademarks, and company names referenced on this site belong to their respective holders. Their inclusion does not imply affiliation or endorsement.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">4. Limitation of Liability</h2>
          <p>
            In no event shall AIForDevs or its creators be liable for any direct, indirect, incidental, or consequential damages arising from your use of, or inability to use, any third-party tool reviewed or linked on the Site.
          </p>
        </section>
      </div>
    </div>
  );
}
