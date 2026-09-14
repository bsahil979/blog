import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { getAllGuides, getGuideBySlug, getAllTools, getAllComparisons } from '@/lib/db';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Badge } from '@/components/ui/Badge';
import { RatingScore } from '@/components/ui/RatingScore';
import { VisitButton } from '@/components/ui/VisitButton';
import { StructuredData } from '@/components/ui/StructuredData';
import { ComparisonCard } from '@/components/compare/ComparisonCard';
import { constructMetadata, generateItemListSchema } from '@/lib/seo';
import { formatReviewPeriod } from '@/lib/utils';
import {
  CheckIcon,
  CalendarIcon,
  ArrowRightIcon,
  SparklesIcon,
  ScaleIcon,
} from '@/components/ui/Icons';

interface BestGuidePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const guides = await getAllGuides();
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: BestGuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = await getGuideBySlug(slug);

  if (!guide) {
    return constructMetadata({ title: 'Guide Not Found — AIForDevs' });
  }

  return constructMetadata({
    title: guide.metaTitle,
    description: guide.metaDescription,
    canonicalUrl: `/best/${guide.slug}`,
  });
}

export default async function BestGuideDetailPage({
  params,
}: BestGuidePageProps) {
  const { slug } = await params;
  const guide = await getGuideBySlug(slug);

  if (!guide) {
    notFound();
  }

  const allTools = await getAllTools();
  const allComparisons = await getAllComparisons();

  const rankedSlugs = new Set(guide.rankedTools.map((t) => t.toolSlug));
  const relevantComparisons = allComparisons
    .filter((c) => rankedSlugs.has(c.toolASlug) || rankedSlugs.has(c.toolBSlug))
    .slice(0, 3);

  const itemListSchema = generateItemListSchema(
    guide.headline,
    guide.rankedTools.map((rt) => {
      const toolObj = allTools.find((t) => t.slug === rt.toolSlug);
      return {
        name: toolObj ? toolObj.name : rt.toolSlug,
        url: `/tools/${rt.toolSlug}`,
        position: rt.rank,
        description: rt.whyChosen,
      };
    })
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
      <StructuredData data={itemListSchema} />

      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { name: 'Best AI Guides', url: '/best' },
          { name: guide.title, url: `/best/${guide.slug}` },
        ]}
      />

      {/* Guide Header Banner */}
      <div className="max-w-4xl mb-12">
        <div className="flex items-center gap-3 flex-wrap mb-4">
          <Badge variant="primary">{guide.category}</Badge>
          <span className="text-xs text-zinc-400 font-mono font-medium flex items-center gap-1">
            <CalendarIcon className="w-3.5 h-3.5" />
            <span>Editorial data updated: {formatReviewPeriod(guide.lastReviewed)}</span>
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4 leading-tight">
          {guide.headline}
        </h1>

        <p className="text-base sm:text-lg text-zinc-200 leading-relaxed font-normal">
          {guide.introduction}
        </p>
      </div>

      {/* Evaluation Criteria Callout */}
      <div className="p-6 rounded-xl bg-[#13151a] border border-[#262830] mb-14 space-y-3 shadow-sm">
        <h2 className="text-xs font-mono font-bold uppercase text-zinc-200 flex items-center gap-2 tracking-wider">
          <SparklesIcon className="w-4 h-4 text-emerald-400" />
          <span>Evaluation & Ranking Methodology</span>
        </h2>
        <p className="text-sm text-zinc-300">
          Tools are evaluated for practical software development workflows and ranked across:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
          {guide.evaluationCriteria.map((crit, idx) => (
            <div
              key={idx}
              className="flex items-start gap-2.5 text-xs text-zinc-200 font-medium"
            >
              <CheckIcon className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{crit}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Summary Comparison Table */}
      <section className="mb-14 space-y-4">
        <h2 className="text-xl font-bold text-white tracking-tight">
          Quick Comparison
        </h2>
        <div className="rounded-xl border border-[#262830] bg-[#13151a] overflow-x-auto shadow-md">
          <table className="w-full text-left border-collapse min-w-[650px] text-sm">
            <thead>
              <tr className="border-b border-[#262830] bg-[#181a21] text-zinc-300 uppercase font-mono text-xs font-bold">
                <th className="py-3.5 px-4 w-14 text-center">Rank</th>
                <th className="py-3.5 px-4">Tool</th>
                <th className="py-3.5 px-4">Best For</th>
                <th className="py-3.5 px-4">Editorial Rating</th>
                <th className="py-3.5 px-4">Starting Price</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#23262f]">
              {guide.rankedTools.map((item) => {
                const tool = allTools.find((t) => t.slug === item.toolSlug);
                if (!tool) return null;

                return (
                  <tr key={item.toolSlug} className="hover:bg-[#181a21] transition-colors">
                    <td className="py-3.5 px-4 text-center font-extrabold font-mono text-white">
                      #{item.rank}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-white">
                      <Link
                        href={`/tools/${tool.slug}`}
                        className="hover:text-indigo-400 transition-colors"
                      >
                        {tool.name}
                      </Link>
                      {item.badge && (
                        <div className="text-xs text-emerald-400 font-mono font-semibold">
                          {item.badge}
                        </div>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-zinc-200 font-medium">
                      {item.idealFor}
                    </td>
                    <td className="py-3.5 px-4">
                      <RatingScore score={tool.editorialRating} size="sm" />
                    </td>
                    <td className="py-3.5 px-4 font-mono font-semibold text-zinc-200 text-xs">
                      {tool.pricing.startingPrice}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <VisitButton
                        toolName={tool.name}
                        website={tool.website}
                        affiliateUrl={tool.affiliateUrl}
                        size="sm"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Detailed Ranked List */}
      <section className="space-y-10 mb-16">
        <h2 className="text-2xl font-bold text-white tracking-tight">
          Detailed Reviews & Rankings
        </h2>

        {guide.rankedTools.map((item) => {
          const tool = allTools.find((t) => t.slug === item.toolSlug);
          if (!tool) return null;

          return (
            <div
              key={item.toolSlug}
              className="p-6 sm:p-8 rounded-2xl bg-[#13151a] border border-[#262830] space-y-6 shadow-md"
            >
              {/* Header: Rank + Badge + Tool Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#23262f]">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-indigo-600 text-white font-mono font-extrabold flex items-center justify-center text-base shrink-0 shadow-sm">
                    #{item.rank}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-2xl font-bold text-white">
                        <Link
                          href={`/tools/${tool.slug}`}
                          className="hover:text-indigo-400 transition-colors"
                        >
                          {tool.name}
                        </Link>
                      </h3>
                      {item.badge && (
                        <Badge variant="success" size="sm">
                          {item.badge}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-zinc-300 font-mono font-semibold mt-0.5">
                      {tool.pricing.startingPrice} &bull; {tool.pricing.pricingType}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <RatingScore score={tool.editorialRating} showLabel size="md" />
                  <VisitButton
                    toolName={tool.name}
                    website={tool.website}
                    affiliateUrl={tool.affiliateUrl}
                    size="sm"
                  />
                </div>
              </div>

              {/* Why Chosen */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono font-bold uppercase text-zinc-300 tracking-wider">
                  Why We Chose It
                </h4>
                <p className="text-base text-zinc-200 leading-relaxed font-normal">
                  {item.whyChosen}
                </p>
              </div>

              {/* Pros & Cons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                <div className="p-5 rounded-xl bg-[#0e1913] border border-emerald-800/80 space-y-2.5">
                  <h5 className="text-xs font-mono font-bold uppercase text-emerald-300 tracking-wider">
                    Strengths
                  </h5>
                  <ul className="space-y-2 text-sm text-zinc-200">
                    {item.pros.map((pro, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="text-emerald-400 font-bold mt-0.5">+</span>
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-5 rounded-xl bg-[#1c0f12] border border-rose-800/80 space-y-2.5">
                  <h5 className="text-xs font-mono font-bold uppercase text-rose-300 tracking-wider">
                    Limitations
                  </h5>
                  <ul className="space-y-2 text-sm text-zinc-200">
                    {item.cons.map((con, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="text-rose-400 font-bold mt-0.5">&minus;</span>
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Line Verdict */}
              <div className="p-4 rounded-xl bg-[#181a21] border border-[#2b2e38] text-sm text-zinc-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="font-bold text-white">Our Verdict: </span>
                  {item.verdict}
                </div>
                <Link
                  href={`/tools/${tool.slug}`}
                  className="text-indigo-400 hover:text-indigo-300 font-semibold whitespace-nowrap flex items-center gap-1 text-xs"
                >
                  <span>Full {tool.name} profile</span>
                  <ArrowRightIcon className="w-3 h-3" />
                </Link>
              </div>
            </div>
          );
        })}
      </section>

      {/* Frequently Asked Questions */}
      {guide.faqs && guide.faqs.length > 0 && (
        <section className="mb-16 space-y-6">
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {guide.faqs.map((faq, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl bg-[#13151a] border border-[#262830] space-y-2 shadow-sm"
              >
                <h3 className="text-base font-bold text-white">
                  {faq.question}
                </h3>
                <p className="text-sm text-zinc-300 leading-relaxed font-normal">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Head-to-Head Comparisons for Ranked Tools */}
      {relevantComparisons.length > 0 && (
        <section className="pt-8 border-t border-[#20222a] space-y-6">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
            <ScaleIcon className="w-4 h-4" />
            <span>Direct Comparisons</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Compare Top Tools Head-to-Head
          </h2>
          <p className="text-sm text-zinc-300">
            Explore deep side-by-side feature matrices and workflow trade-offs between tools featured in this guide.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relevantComparisons.map((comp) => (
              <ComparisonCard key={comp.id} comparison={comp} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
