import { Metadata } from 'next';
import { constructMetadata } from '@/lib/seo';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { ShieldCheckIcon, TerminalIcon, CheckIcon } from '@/components/ui/Icons';

export const metadata: Metadata = constructMetadata({
  title: 'About AIForDevs — Independent AI Developer Platform',
  description:
    'Learn about AIForDevs, our mission to help developers choose the right AI tools, and our strict editorial independence policy.',
  canonicalUrl: '/about',
});

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <Breadcrumbs items={[{ name: 'About', url: '/about' }]} />

      <div className="space-y-4 mb-12">
        <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-indigo-400 uppercase tracking-wider">
          <TerminalIcon className="w-4 h-4" />
          <span>Independent Platform</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          About AIForDevs
        </h1>
        <p className="text-base sm:text-lg text-zinc-200 leading-relaxed font-normal">
          Building the most trusted discovery, comparison, and evaluation resource for software engineers navigating artificial intelligence.
        </p>
      </div>

      <div className="space-y-10 text-base text-zinc-200 leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white tracking-tight">
            Our Purpose
          </h2>
          <p>
            The software industry is experiencing its most rapid transformation since the advent of open-source and cloud computing. Every week, new AI-powered code editors, terminal agents, and reasoning models launch with competing promises of 10x productivity.
          </p>
          <p>
            For engineering leaders and working developers, separating marketing hype from genuine developer velocity is exhausting. <strong className="text-white">AIForDevs</strong> was founded to provide transparent, technical evaluations based on real compiler tests, architectural refactoring, and day-to-day developer ergonomics.
          </p>
        </section>

        <section className="p-6 md:p-8 rounded-2xl bg-[#13151a] border border-[#262830] space-y-4 shadow-sm">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <ShieldCheckIcon className="w-5 h-5 text-emerald-400" />
            <span>Strict Editorial Independence</span>
          </h2>
          <p className="text-sm text-zinc-200 leading-relaxed font-normal">
            AIForDevs is an independent technology platform. We are <strong className="text-white">not owned by, partnered with, or sponsored by</strong> OpenAI, Anthropic, Google, Microsoft, GitHub, Cursor, Codeium, or any other vendor listed on this directory.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-medium text-zinc-300">
            <div className="flex items-start gap-2">
              <CheckIcon className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Editorial scores are never influenced by commercial deals</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckIcon className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>We do not publish fake user reviews or fabricated stats</span>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white tracking-tight">
            How We Evaluate Tools
          </h2>
          <p>
            Rather than relying on synthetic multi-choice benchmarks that can be memorized during training, our evaluations test assistants on actual repository migrations, complex type-narrowing bugs in TypeScript and Python, and multi-file context boundaries.
          </p>
          <p>
            For a complete breakdown of our evaluation criteria, read our{' '}
            <a href="/methodology" className="text-indigo-400 hover:text-indigo-300 font-semibold underline underline-offset-4">
              Editorial Scoring Methodology &rarr;
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
