import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  getAllComparisons,
  getComparisonBySlug,
  getToolBySlug,
  getAllGuides,
} from '@/lib/db';
import { VerdictBox } from '@/components/compare/VerdictBox';
import { ComparisonMatrix } from '@/components/compare/ComparisonMatrix';
import { ScoreComparison } from '@/components/compare/ScoreComparison';
import { ComparisonCard } from '@/components/compare/ComparisonCard';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Badge } from '@/components/ui/Badge';
import { RatingScore } from '@/components/ui/RatingScore';
import { VisitButton } from '@/components/ui/VisitButton';
import { constructMetadata } from '@/lib/seo';
import {
  CalendarIcon,
  CheckIcon,
  XIcon,
  ExternalLinkIcon,
  BookOpenIcon,
  SparklesIcon,
} from '@/components/ui/Icons';
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
    title:
      comparison.metaTitle ||
      `${comparison.title}: In-Depth Comparison & Verdict — AIForDevs`,
    description:
      comparison.metaDescription ||
      `${comparison.subtitle} Detailed feature matrix, editorial scores, and recommendation between ${comparison.title}.`,
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

  // Relevant curated guides featuring either tool
  const allGuides = await getAllGuides();
  const relatedGuides = allGuides.filter((g) =>
    g.rankedTools.some(
      (rt) => rt.toolSlug === toolA.slug || rt.toolSlug === toolB.slug
    )
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { name: 'Home', url: '/' },
          { name: 'Comparisons', url: '/compare' },
          { name: comparison.title, url: `/compare/${comparison.slug}` },
        ]}
      />

      {/* Comparison Header Banner */}
      <div className="text-center max-w-4xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-cyan-700/80 bg-cyan-950/80 text-cyan-300 text-xs font-mono font-semibold mb-4">
          <SparklesIcon className="w-3.5 h-3.5" />
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
          <span>
            Editorial data updated: {formatReviewPeriod(comparison.lastReviewed)}
          </span>
        </span>
      </div>

      {/* Quick Verdict Box */}
      <section className="mb-12">
        <VerdictBox
          verdict={comparison.verdict}
          toolAName={toolA.name}
          toolBName={toolB.name}
        />
      </section>

      {/* Side-by-Side Tool Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
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
                <p className="text-xs text-zinc-300 font-mono font-semibold mt-0.5">
                  {toolA.pricing.startingPrice}
                </p>
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
                <p className="text-xs text-zinc-300 font-mono font-semibold mt-0.5">
                  {toolB.pricing.startingPrice}
                </p>
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

      {/* Side-by-Side Pros & Cons Comparison */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold text-white tracking-tight mb-6">
          Pros & Cons: {toolA.name} vs {toolB.name}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Tool A Pros & Cons */}
          <div className="p-6 rounded-2xl bg-[#13151a] border border-[#262830] space-y-6">
            <h3 className="text-lg font-bold text-white border-b border-[#23262f] pb-3">
              {toolA.name} Evaluation
            </h3>
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
                Advantages
              </h4>
              <ul className="space-y-2">
                {toolA.pros.map((pro, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-zinc-200">
                    <CheckIcon className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-rose-400 font-bold">
                Drawbacks & Considerations
              </h4>
              <ul className="space-y-2">
                {toolA.cons.map((con, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-zinc-200">
                    <XIcon className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Tool B Pros & Cons */}
          <div className="p-6 rounded-2xl bg-[#13151a] border border-[#262830] space-y-6">
            <h3 className="text-lg font-bold text-white border-b border-[#23262f] pb-3">
              {toolB.name} Evaluation
            </h3>
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
                Advantages
              </h4>
              <ul className="space-y-2">
                {toolB.pros.map((pro, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-zinc-200">
                    <CheckIcon className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-rose-400 font-bold">
                Drawbacks & Considerations
              </h4>
              <ul className="space-y-2">
                {toolB.cons.map((con, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-zinc-200">
                    <XIcon className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
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

      {/* Real-World Use Case Scenarios */}
      {comparison.useCases && comparison.useCases.length > 0 && (
        <section className="mb-14 space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Best For: Scenario-Based Recommendations
            </h2>
            <p className="text-sm text-zinc-300 mt-1">
              How {toolA.name} and {toolB.name} compare across typical engineering tasks and workflows.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {comparison.useCases.map((uc, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-[#13151a] border border-[#262830] space-y-2.5 shadow-sm"
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-base font-bold text-white">{uc.title}</h3>
                  <span className="px-2.5 py-0.5 text-xs font-mono font-semibold rounded-full bg-indigo-950/80 text-indigo-300 border border-indigo-700/60">
                    Pick {uc.recommendation}
                  </span>
                </div>
                <p className="text-sm text-zinc-200 leading-relaxed font-normal">
                  {uc.reasoning}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Detailed Analysis Sections */}
      <section className="mb-14 space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            In-Depth Editorial Analysis
          </h2>
          <p className="text-sm text-zinc-300 mt-1">
            Detailed breakdown of developer ergonomics, context retrieval, and architectural trade-offs.
          </p>
        </div>
        <div className="space-y-6">
          {comparison.detailedSections.map((sec, idx) => (
            <div
              key={idx}
              className="p-6 md:p-8 rounded-xl bg-[#13151a] border border-[#262830] space-y-3 shadow-sm"
            >
              <h3 className="text-lg font-bold text-white">{sec.title}</h3>
              <p className="text-sm sm:text-base text-zinc-200 leading-relaxed font-normal">
                {sec.content}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Comparison & Official Verification */}
      <section className="mb-14 p-6 md:p-8 rounded-2xl bg-[#13151a] border border-[#262830] space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Pricing, Plans & Real-Time Verification
          </h2>
          <p className="text-sm text-zinc-300 mt-1">
            Subscription tiers, usage limits, and token pricing change frequently across frontier AI developer tools.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-[#171920] border border-[#23262f] space-y-2">
            <span className="text-xs font-mono uppercase text-zinc-400 font-semibold">
              {toolA.name} Starting Price
            </span>
            <div className="text-lg font-bold text-white font-mono">
              {toolA.pricing.startingPrice}
            </div>
            <p className="text-xs text-zinc-300">
              Free tier:{' '}
              {toolA.pricing.freeTierAvailable
                ? 'Available with usage quotas'
                : 'Limited trial / None'}
            </p>
            <div className="pt-2">
              <a
                href={toolA.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 font-semibold"
              >
                Verify on {toolA.name} official website
                <ExternalLinkIcon className="w-3 h-3" />
              </a>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#171920] border border-[#23262f] space-y-2">
            <span className="text-xs font-mono uppercase text-zinc-400 font-semibold">
              {toolB.name} Starting Price
            </span>
            <div className="text-lg font-bold text-white font-mono">
              {toolB.pricing.startingPrice}
            </div>
            <p className="text-xs text-zinc-300">
              Free tier:{' '}
              {toolB.pricing.freeTierAvailable
                ? 'Available with usage quotas'
                : 'Limited trial / None'}
            </p>
            <div className="pt-2">
              <a
                href={toolB.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 font-semibold"
              >
                Verify on {toolB.name} official website
                <ExternalLinkIcon className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        <div className="p-3.5 rounded-lg bg-[#0e1014] border border-zinc-800/80 text-xs text-zinc-300 leading-relaxed font-normal">
          <strong className="text-zinc-200">Editorial Disclaimer:</strong> AIForDevs does not sell software licenses or guarantee third-party pricing. Tier allowances, token rates, and commercial terms are set exclusively by provider organizations.
        </div>
      </section>

      {/* Frequently Asked Questions (FAQ Content ONLY, NO FAQ SCHEMA) */}
      {comparison.faqs && comparison.faqs.length > 0 && (
        <section className="mb-14 space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Frequently Asked Questions: {comparison.title}
            </h2>
            <p className="text-sm text-zinc-300 mt-1">
              Common questions developers ask when deciding between {toolA.name} and {toolB.name}.
            </p>
          </div>
          <div className="space-y-4">
            {comparison.faqs.map((faq, idx) => (
              <div
                key={idx}
                className="p-5 md:p-6 rounded-xl bg-[#13151a] border border-[#262830] space-y-2 shadow-sm"
              >
                <h3 className="text-base sm:text-lg font-bold text-white">
                  {faq.question}
                </h3>
                <p className="text-sm sm:text-base text-zinc-200 leading-relaxed font-normal">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Curated Guides Featuring These Tools */}
      {relatedGuides.length > 0 && (
        <section className="mb-14 pt-8 border-t border-[#20222a] space-y-4">
          <div className="flex items-center gap-2">
            <BookOpenIcon className="w-5 h-5 text-indigo-400" />
            <h2 className="text-xl font-bold text-white tracking-tight">
              Curated Buyer Guides Featuring {toolA.name} and {toolB.name}
            </h2>
          </div>
          <p className="text-sm text-zinc-300">
            Explore ranked editorial evaluations across specialized engineering domains.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
            {relatedGuides.slice(0, 3).map((guide) => (
              <Link
                key={guide.id}
                href={`/best/${guide.slug}`}
                className="p-4 rounded-xl bg-[#13151a] border border-[#23262f] hover:border-indigo-500/50 transition-colors group flex flex-col justify-between"
              >
                <div>
                  <Badge variant="outline" className="mb-2 text-xs">
                    {guide.category}
                  </Badge>
                  <h3 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">
                    {guide.title}
                  </h3>
                </div>
                <span className="text-xs text-indigo-400 font-semibold mt-3 inline-flex items-center gap-1">
                  View rankings &rarr;
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Related Head-to-Head Comparisons */}
      {relatedComparisons.length > 0 && (
        <section className="pt-8 border-t border-[#20222a] space-y-6">
          <h2 className="text-xl font-bold text-white tracking-tight">
            Related Head-to-Head Comparisons
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
