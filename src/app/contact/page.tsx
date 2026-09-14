import { Metadata } from 'next';
import { constructMetadata } from '@/lib/seo';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { InfoIcon } from '@/components/ui/Icons';

export const metadata: Metadata = constructMetadata({
  title: 'Contact AIForDevs — Corrections & Submissions',
  description:
    'Submit corrections, request tool profile updates, or get in touch with the AIForDevs editorial team.',
  canonicalUrl: '/contact',
});

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <Breadcrumbs items={[{ name: 'Contact', url: '/contact' }]} />

      <div className="space-y-4 mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Contact & Corrections
        </h1>
        <p className="text-base sm:text-lg text-zinc-200 leading-relaxed font-normal">
          Have an updated pricing tier, a factual correction, or an AI developer tool you would like us to review? Let us know.
        </p>
      </div>

      <div className="space-y-8">
        <div className="p-6 md:p-8 rounded-2xl bg-[#13151a] border border-[#262830] space-y-6 shadow-sm">
          <form className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-xs font-mono font-bold text-zinc-200 mb-2">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Ada Lovelace"
                className="w-full px-4 py-2.5 bg-[#0b0c0e] border border-[#2b2e38] rounded-lg text-sm text-white placeholder-zinc-400 focus:outline-none focus:border-indigo-500 font-medium"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-xs font-mono font-bold text-zinc-200 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="developer@example.com"
                className="w-full px-4 py-2.5 bg-[#0b0c0e] border border-[#2b2e38] rounded-lg text-sm text-white placeholder-zinc-400 focus:outline-none focus:border-indigo-500 font-medium"
              />
            </div>

            <div>
              <label htmlFor="topic" className="block text-xs font-mono font-bold text-zinc-200 mb-2">
                Inquiry Topic
              </label>
              <select
                id="topic"
                name="topic"
                className="w-full px-4 py-2.5 bg-[#0b0c0e] border border-[#2b2e38] rounded-lg text-sm text-zinc-200 font-medium focus:outline-none focus:border-indigo-500"
              >
                <option value="correction">Pricing or Feature Correction</option>
                <option value="submission">Submit a New Developer Tool</option>
                <option value="editorial">Editorial Question</option>
                <option value="general">General Feedback</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-xs font-mono font-bold text-zinc-200 mb-2">
                Message / Details
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Include tool name, official documentation link, and specific details..."
                className="w-full px-4 py-2.5 bg-[#0b0c0e] border border-[#2b2e38] rounded-lg text-sm text-white placeholder-zinc-400 focus:outline-none focus:border-indigo-500 font-medium"
              />
            </div>

            <button
              type="button"
              className="w-full sm:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 shadow-sm"
            >
              Send Message
            </button>
          </form>
        </div>

        <div className="p-4 rounded-xl bg-[#16181f] border border-[#2b2e38] text-xs text-zinc-300 flex items-start gap-3">
          <InfoIcon className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            We review pricing change notifications promptly to ensure directory records remain accurate for the developer community.
          </p>
        </div>
      </div>
    </div>
  );
}
