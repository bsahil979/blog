import { Metadata } from 'next';
import { getAllComparisons } from '@/lib/db';
import { ComparisonCard } from '@/components/compare/ComparisonCard';
import { constructMetadata } from '@/lib/seo';
import { ScaleIcon } from '@/components/ui/Icons';

export const metadata: Metadata = constructMetadata({
  title: 'Compare AI Coding Assistants & Developer Tools — AIForDevs',
  description:
    'Detailed head-to-head comparisons of AI developer tools. Side-by-side feature matrices, editorial verdicts, and category scores for Cursor, GitHub Copilot, Claude, and more.',
  canonicalUrl: '/compare',
});

export default async function CompareIndexPage() {
  const comparisons = await getAllComparisons();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      {/* Header */}
      <div className="max-w-3xl mb-12">
        <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider mb-2">
          <ScaleIcon className="w-4 h-4" />
          <span>Head-to-Head Technical Evaluations</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
          Compare AI Developer Tools
        </h1>
        <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-normal">
          Unbiased, side-by-side comparisons of AI coding assistants, IDEs, and frontier reasoning models. Evaluate feature trade-offs, IDE integrations, and pricing before committing to a tool.
        </p>
      </div>

      {/* Comparisons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {comparisons.map((comp) => (
          <ComparisonCard key={comp.id} comparison={comp} />
        ))}
      </div>
    </div>
  );
}
