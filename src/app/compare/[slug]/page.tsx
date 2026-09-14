import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  getAllComparisons,
  getComparisonBySlug,
  getToolBySlug,
} from '@/lib/db';
import { VerdictBox } from '@/components/compare/VerdictBox';
import { ComparisonMatrix } from '@/components/compare/ComparisonMatrix';
import { ScoreComparison } from '@/components/compare/ScoreComparison';
import { ComparisonCard } from '@/components/compare/ComparisonCard';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Badge } from '@/components/ui/Badge';
import { RatingScore } from '@/components/ui/RatingScore';
import { VisitButton } from '@/components/ui/VisitButton';
import {
  constructMetadata,
} from '@/lib/seo';
import { CalendarIcon } from '@/components/ui/Icons';
import { formatReviewPeriod } from '@/lib/utils';

interface ComparisonPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const comparisons = await getAllComparisons();
  return comparisons.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: ComparisonPageProps): Promise<Metadata> {
  const { slug } = await params;
  const comparison = await getComparisonBySlug(slug);

  if (!comparison) {
    return constructMetadata({ title: 'Comparison Not Found — AIForDevs' });
  }

  return constructMetadata({
    title: `${comparison.title}: In-Depth Comparison & Verdict — AIForDevs`,
    description: `${comparison.subtitle} Detailed feature matrix, editorial scores, and recommendation between ${comparison.title}.`,
    canonicalUrl: `/compare/${comparison.slug}`,
  });
}

export default async function ComparisonDetailPage({
  params,
}: ComparisonPageProps) {
  const { slug } = await params;
  const comparison = await getComparisonBySlug(slug);

  if (!comparison) {
    notFound();
  }

  const toolA = await getToolBySlug(comparison.toolASlug);
  const toolB = await getToolBySlug(comparison.toolBSlug);

  if (!toolA || !toolB) {
    notFound();
  }

  // Related comparisons involving either tool
  const allComparisons = await getAllComparisons();
  const relatedComparisons = allComparisons.filter(
    (c) =>
      c.id !== comparison.id &&
      (c.toolASlug === toolA.slug ||
        c.toolBSlug === toolA.slug ||
        c.toolASlug === toolB.slug ||
        c.toolBSlug === toolB.slug)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { name: 'Comparisons', url: '/compare' },
          { name: comparison.title, url: `/compare/${comparison.slug}` },
        ]}
      />

      {/* Comparison Header Banner */}
      <div className="text-center max-w-4xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-cyan-700/80 bg-cyan-950/80 text-cyan-300 text-xs font-mono font-semibold mb-4">
          <span>Head-to-Head Comparison</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4 leading-tight">
          {comparison.title}
        </h1>
        <p className="text-lg sm:text-xl text-zinc-200 leading-relaxed mb-4 font-normal">
          {comparison.subtitle}
        </p>
        <span className="inline-flex items-center gap-1.5 text-xs text-zinc-400 font-mono font-medium">
          <CalendarIcon className="w-3.5 h-3.5" />
          <span>Editorial data updated: {formatReviewPeriod(comparison.lastReviewed)}</span>
        </span>
      </div>

      {/* Side-by-Side Tool Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {/* Tool A Summary */}
        <div className="p-6 md:p-8 rounded-2xl bg-[#13151a] border border-[#262830] shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3.5">
              <Badge variant="primary">{toolA.category}</Badge>
              <RatingScore score={toolA.editorialRating} showLabel size="sm" />
            </div>
            <div className="flex items-center gap-3.5 mb-3.5">
              <div className="w-12 h-12 rounded-xl bg-[#1c1f26] border border-[#2d313b] flex items-center justify-center text-lg font-mono font-bold text-white shadow-inner shrink-0">
                {toolA.name.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">{toolA.name}</h2>
                <p className="text-xs text-zinc-300 font-mono font-semibold mt-0.5">{toolA.pricing.startingPrice}</p>
              </div>
            </div>
            <p className="text-sm sm:text-base text-zinc-200 leading-relaxed mb-5 font-normal">
              {toolA.tagline}
            </p>
          </div>
          <div className="pt-4 border-t border-[#23262f] flex items-center justify-between gap-3">
            <Link
              href={`/tools/${toolA.slug}`}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold"
            >
              Read full {toolA.name} review &rarr;
            </Link>
            <VisitButton
              toolName={toolA.name}
              website={toolA.website}
              affiliateUrl={toolA.affiliateUrl}
              size="sm"
            />
          </div>
        </div>

        {/* Tool B Summary */}
        <div className="p-6 md:p-8 rounded-2xl bg-[#13151a] border border-[#262830] shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3.5">
              <Badge variant="accent">{toolB.category}</Badge>
              <RatingScore score={toolB.editorialRating} showLabel size="sm" />
            </div>
            <div className="flex items-center gap-3.5 mb-3.5">
              <div className="w-12 h-12 rounded-xl bg-[#1c1f26] border border-[#2d313b] flex items-center justify-center text-lg font-mono font-bold text-white shadow-inner shrink-0">
                {toolB.name.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">{toolB.name}</h2>
                <p className="text-xs text-zinc-300 font-mono font-semibold mt-0.5">{toolB.pricing.startingPrice}</p>
              </div>
            </div>
            <p className="text-sm sm:text-base text-zinc-200 leading-relaxed mb-5 font-normal">
              {toolB.tagline}
            </p>
          </div>
          <div className="pt-4 border-t border-[#23262f] flex items-center justify-between gap-3">
            <Link
              href={`/tools/${toolB.slug}`}
              className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold"
            >
              Read full {toolB.name} review &rarr;
            </Link>
            <VisitButton
              toolName={toolB.name}
              website={toolB.website}
              affiliateUrl={toolB.affiliateUrl}
              size="sm"
            />
          </div>
        </div>
      </div>

      {/* Quick Verdict Box */}
      <section className="mb-14">
        <VerdictBox
          verdict={comparison.verdict}
          toolAName={toolA.name}
          toolBName={toolB.name}
        />
      </section>

      {/* Comparison Feature Matrix */}
      <section className="mb-14 space-y-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Feature Comparison Matrix
          </h2>
          <p className="text-sm text-zinc-300 mt-1">
            Direct comparison across IDE integration, codebase awareness, agent capabilities, and pricing.
          </p>
        </div>
        <ComparisonMatrix
          features={comparison.featureComparisons}
          toolAName={toolA.name}
          toolBName={toolB.name}
        />
      </section>

      {/* Category Scores Breakdown */}
      <section className="mb-14">
        <ScoreComparison
          scores={comparison.scores}
          toolAName={toolA.name}
          toolBName={toolB.name}
        />
      </section>

      {/* Detailed Analysis Sections */}
      <section className="mb-16 space-y-8">
        <h2 className="text-2xl font-bold text-white tracking-tight">
          In-Depth Editorial Analysis
        </h2>
        <div className="space-y-6">
          {comparison.detailedSections.map((sec, idx) => (
            <div
              key={idx}
              className="p-6 md:p-8 rounded-xl bg-[#13151a] border border-[#262830] space-y-3 shadow-sm"
            >
              <h3 className="text-lg font-bold text-white">
                {sec.title}
              </h3>
              <p className="text-sm sm:text-base text-zinc-200 leading-relaxed font-normal">
                {sec.content}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Related Comparisons */}
      {relatedComparisons.length > 0 && (
        <section className="pt-8 border-t border-[#20222a] space-y-6">
          <h2 className="text-xl font-bold text-white tracking-tight">
            Related Comparisons
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedComparisons.slice(0, 3).map((comp) => (
              <ComparisonCard key={comp.id} comparison={comp} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
