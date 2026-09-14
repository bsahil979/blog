import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { getAllTools, getToolBySlug, getComparisonsForTool, getAllGuides } from '@/lib/db';
import { ToolScores } from '@/components/tools/ToolScores';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Badge } from '@/components/ui/Badge';
import { RatingScore } from '@/components/ui/RatingScore';
import { VisitButton } from '@/components/ui/VisitButton';
import { StructuredData } from '@/components/ui/StructuredData';
import {
  CheckIcon,
  XIcon,
  ScaleIcon,
  InfoIcon,
  CalendarIcon,
  BookOpenIcon,
} from '@/components/ui/Icons';
import {
  constructMetadata,
  generateSoftwareApplicationSchema,
} from '@/lib/seo';
import { formatReviewPeriod } from '@/lib/utils';

interface ToolPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const tools = await getAllTools();
  return tools.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: ToolPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = await getToolBySlug(slug);

  if (!tool) {
    return constructMetadata({ title: 'Tool Not Found — AIForDevs' });
  }

  return constructMetadata({
    title: `${tool.name} Review: Features, Pricing & Developer Evaluation — AIForDevs`,
    description: `${tool.name} editorial review for software engineers: ${tool.tagline} Compare scores, capabilities, pros & cons, and verified features.`,
    canonicalUrl: `/tools/${tool.slug}`,
  });
}

export default async function ToolDetailPage({ params }: ToolPageProps) {
  const { slug } = await params;
  const tool = await getToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  const allTools = await getAllTools();
  const relatedComparisons = await getComparisonsForTool(tool.slug);
  const alternativeTools = tool.alternatives
    .map((altSlug) => allTools.find((t) => t.slug === altSlug))
    .filter(Boolean);

  const allGuides = await getAllGuides();
  const featuredGuides = allGuides.filter((g) =>
    g.rankedTools.some((rt) => rt.toolSlug === tool.slug)
  );

  const softwareSchema = generateSoftwareApplicationSchema(tool);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
      <StructuredData data={softwareSchema} />

      {/* Breadcrumb Navigation */}
      <Breadcrumbs
        items={[
          { name: 'Home', url: '/' },
          { name: 'Tools', url: '/tools' },
          { name: tool.name, url: `/tools/${tool.slug}` },
        ]}
      />

      {/* Hero Header */}
      <div className="p-6 sm:p-8 md:p-10 rounded-2xl bg-[#13151a] border border-[#262830] mb-12 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-4 max-w-3xl">
            <div className="flex items-center gap-3 flex-wrap">
              <Badge variant="primary">{tool.category}</Badge>
              <RatingScore score={tool.editorialRating} showLabel size="md" />
              <span className="text-xs text-zinc-400 font-mono font-medium flex items-center gap-1">
                <CalendarIcon className="w-3.5 h-3.5" />
                <span>Editorial data updated: {formatReviewPeriod(tool.lastReviewed)}</span>
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-[#1c1f26] border border-[#2d313b] flex items-center justify-center text-xl font-mono font-bold text-white shadow-inner shrink-0">
                {tool.name.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                  {tool.name}
                </h1>
                <p className="text-sm text-zinc-300 font-mono font-semibold mt-0.5">
                  {tool.pricing.startingPrice} &bull; {tool.pricing.pricingType}
                </p>
              </div>
            </div>

            <p className="text-base sm:text-lg text-zinc-200 leading-relaxed font-normal">
              {tool.tagline}
            </p>
          </div>

          {/* Action Card */}
          <div className="p-5 rounded-xl bg-[#181a21] border border-[#2b2e38] flex flex-col gap-3.5 min-w-[250px] shrink-0 shadow-md">
            <div className="text-xs text-zinc-300 space-y-1.5">
              <div className="flex justify-between">
                <span className="text-zinc-400 font-medium">Free Plan:</span>
                <span className="text-white font-mono font-semibold">
                  {tool.pricing.freeTierAvailable ? 'Available' : 'None'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400 font-medium">Starting at:</span>
                <span className="text-white font-mono font-bold">
                  {tool.pricing.startingPrice}
                </span>
              </div>
            </div>

            <VisitButton
              toolName={tool.name}
              website={tool.website}
              affiliateUrl={tool.affiliateUrl}
              size="md"
            />

            <p className="text-[11px] text-zinc-400 text-center font-mono">
              Direct destination: {new URL(tool.website).hostname}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left 2 Columns: Overview, Features, Pros/Cons, Pricing */}
        <div className="lg:col-span-2 space-y-12">
          {/* Overview */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <span className="w-1.5 h-5 bg-indigo-500 rounded-full" />
              <span>Overview</span>
            </h2>
            <p className="text-base text-zinc-200 leading-relaxed font-normal">
              {tool.overview}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-5 rounded-xl bg-[#13151a] border border-[#262830]">
                <h3 className="text-xs font-mono font-bold uppercase text-zinc-300 mb-2">
                  Who It Is For
                </h3>
                <p className="text-sm text-zinc-200 leading-relaxed font-normal">
                  {tool.whoItIsFor}
                </p>
              </div>
              <div className="p-5 rounded-xl bg-[#13151a] border border-[#262830]">
                <h3 className="text-xs font-mono font-bold uppercase text-zinc-300 mb-2">
                  Main Use Cases
                </h3>
                <ul className="space-y-2 text-sm text-zinc-200">
                  {tool.mainUseCases.map((useCase, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-indigo-400 font-bold mt-0.5">&bull;</span>
                      <span>{useCase}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Key Features */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <span className="w-1.5 h-5 bg-indigo-500 rounded-full" />
              <span>Key Features</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {tool.features.map((feat, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-4 rounded-xl bg-[#13151a] border border-[#262830] text-sm text-zinc-200 leading-relaxed font-medium"
                >
                  <CheckIcon className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Pros and Cons */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <span className="w-1.5 h-5 bg-indigo-500 rounded-full" />
              <span>Pros & Cons</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Pros */}
              <div className="p-6 rounded-xl bg-[#0e1913] border border-emerald-800/80 space-y-3 shadow-xs">
                <h3 className="text-sm font-bold text-emerald-300 flex items-center gap-2 font-mono uppercase">
                  <CheckIcon className="w-4 h-4 text-emerald-400" />
                  <span>Strengths</span>
                </h3>
                <ul className="space-y-3">
                  {tool.pros.map((pro, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-zinc-200 leading-relaxed font-normal">
                      <span className="text-emerald-400 font-bold mt-0.5">+</span>
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Cons */}
              <div className="p-6 rounded-xl bg-[#1c0f12] border border-rose-800/80 space-y-3 shadow-xs">
                <h3 className="text-sm font-bold text-rose-300 flex items-center gap-2 font-mono uppercase">
                  <XIcon className="w-4 h-4 text-rose-400" />
                  <span>Limitations</span>
                </h3>
                <ul className="space-y-3">
                  {tool.cons.map((con, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-zinc-200 leading-relaxed font-normal">
                      <span className="text-rose-400 font-bold mt-0.5">&minus;</span>
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Verified Pricing */}
          <section className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                <span className="w-1.5 h-5 bg-indigo-500 rounded-full" />
                <span>Pricing Plans</span>
              </h2>
              <span className="text-xs text-amber-300 flex items-center gap-1 font-mono font-semibold">
                <InfoIcon className="w-3.5 h-3.5" />
                <span>Check official site before purchasing</span>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {tool.pricing.plans.map((plan) => (
                <div
                  key={plan.name}
                  className="p-5 rounded-xl bg-[#13151a] border border-[#262830] flex flex-col justify-between"
                >
                  <div>
                    <h3 className="font-bold text-sm text-white mb-1">
                      {plan.name}
                    </h3>
                    <p className="text-xl font-extrabold text-white font-mono mb-4">
                      {plan.price}
                    </p>
                    <ul className="space-y-2 text-xs text-zinc-300">
                      {plan.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckIcon className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            {/* Pricing Disclaimer Note */}
            <div className="p-4 rounded-xl bg-[#16181f] border border-[#2b2e38] text-xs text-zinc-300 flex items-start gap-3">
              <InfoIcon className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                {tool.pricing.verificationNote} Pricing models, quota limits, and token multipliers change frequently. Verify active rates on {tool.name}&rsquo;s official website.
              </p>
            </div>
          </section>
        </div>

        {/* Right Sidebar: Scores, Best For, Compare, Alternatives */}
        <div className="space-y-8">
          {/* Detailed Editorial Scores Breakdown */}
          <ToolScores scores={tool.scores} />

          {/* Best For Tags */}
          <div className="p-6 rounded-xl bg-[#13151a] border border-[#262830] space-y-3.5">
            <h3 className="text-xs font-mono font-bold uppercase text-zinc-200 tracking-wider">
              Best For Workflows
            </h3>
            <div className="flex flex-wrap gap-2">
              {tool.bestFor.map((item) => (
                <span
                  key={item}
                  className="text-xs font-semibold px-3 py-1 rounded-md bg-[#1c1f27] text-zinc-100 border border-[#2d313c]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Compare With Other Tools */}
          {relatedComparisons.length > 0 && (
            <div className="p-6 rounded-xl bg-[#13151a] border border-[#262830] space-y-3.5">
              <h3 className="text-xs font-mono font-bold uppercase text-zinc-200 tracking-wider flex items-center gap-1.5">
                <ScaleIcon className="w-4 h-4 text-indigo-400" />
                <span>Compare {tool.name} with...</span>
              </h3>
              <div className="space-y-2">
                {relatedComparisons.map((comp) => (
                  <Link
                    key={comp.id}
                    href={`/compare/${comp.slug}`}
                    className="block p-3 rounded-lg bg-[#0b0c0e] hover:bg-[#181a21] border border-[#262830] hover:border-indigo-500 transition-colors text-xs font-semibold text-zinc-200 hover:text-white"
                  >
                    {comp.title} &rarr;
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Alternative Recommendations */}
          {alternativeTools.length > 0 && (
            <div className="p-6 rounded-xl bg-[#13151a] border border-[#262830] space-y-3.5">
              <h3 className="text-xs font-mono font-bold uppercase text-zinc-200 tracking-wider">
                Alternative Tools
              </h3>
              <div className="space-y-3">
                {alternativeTools.map((alt) => (
                  <Link
                    key={alt!.id}
                    href={`/tools/${alt!.slug}`}
                    className="flex items-center justify-between p-3 rounded-lg bg-[#0b0c0e] hover:bg-[#181a21] border border-[#262830] hover:border-zinc-500 transition-colors group"
                  >
                    <div>
                      <h4 className="text-xs font-bold text-white group-hover:text-indigo-400">
                        {alt!.name}
                      </h4>
                      <p className="text-[11px] text-zinc-400 line-clamp-1">
                        {alt!.tagline}
                      </p>
                    </div>
                    <RatingScore score={alt!.editorialRating} size="sm" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Featured in Curated Guides */}
          {featuredGuides.length > 0 && (
            <div className="p-6 rounded-xl bg-[#13151a] border border-[#262830] space-y-3.5">
              <h3 className="text-xs font-mono font-bold uppercase text-zinc-200 tracking-wider flex items-center gap-1.5">
                <BookOpenIcon className="w-4 h-4 text-cyan-400" />
                <span>Featured in Curated Guides</span>
              </h3>
              <div className="space-y-2">
                {featuredGuides.slice(0, 4).map((guide) => (
                  <Link
                    key={guide.id}
                    href={`/best/${guide.slug}`}
                    className="block p-3 rounded-lg bg-[#0b0c0e] hover:bg-[#181a21] border border-[#262830] hover:border-cyan-500/60 transition-colors text-xs font-semibold text-zinc-200 hover:text-white"
                  >
                    {guide.title} &rarr;
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
