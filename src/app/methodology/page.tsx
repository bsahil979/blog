import { Metadata } from 'next';
import { constructMetadata } from '@/lib/seo';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import {
  ShieldCheckIcon,
  CheckIcon,
  SparklesIcon,
  InfoIcon,
} from '@/components/ui/Icons';

export const metadata: Metadata = constructMetadata({
  title: 'Editorial & Scoring Methodology — AIForDevs',
  description:
    'Learn how AIForDevs evaluates and assesses AI developer tools. Transparent scoring criteria, editorial framework, pricing policies, and affiliate disclosure.',
  canonicalUrl: '/methodology',
});

export default function MethodologyPage() {
  const dimensions = [
    {
      name: 'Capability',
      weight: '25%',
      focus: 'Code synthesis, complex problem solving, and multi-file editing',
      description:
        'Our editorial methodology evaluates how effectively the tool drafts syntactically accurate code, manages complex algorithmic requirements, adheres to modern framework idioms (e.g. Next.js App Router, TypeScript, React 19), and coordinates multi-file mutations without breaking existing project dependencies.',
    },
    {
      name: 'Developer Workflow',
      weight: '25%',
      focus: 'Editor integration, terminal agility, and everyday engineering velocity',
      description:
        'Developer ergonomics define whether a tool feels like a natural extension of your workflow or an intrusive distraction. We assess completion latency, keyboard shortcuts, diff inspection interfaces, terminal awareness, and compatibility with popular IDEs (VS Code, JetBrains, Neovim, terminal).',
    },
    {
      name: 'Reliability',
      weight: '20%',
      focus: 'Syntax accuracy, instruction adherence, and predictable output',
      description:
        'Software engineers require deterministic behavior over clever randomness. Our editorial methodology evaluates how reliably a tool adheres to custom project constraints (e.g. .cursorrules or system prompts), minimizes syntax hallucinations, and handles edge cases without inventing non-existent APIs or deprecated patterns.',
    },
    {
      name: 'Ease of Use',
      weight: '15%',
      focus: 'Setup simplicity, onboarding experience, and documentation',
      description:
        'We assess the initial onboarding curve: installation steps, configuration complexity, project indexing requirements, and how easily a new team member can begin leveraging the tool without disrupting existing local development environments.',
    },
    {
      name: 'Value',
      weight: '15%',
      focus: 'Feature accessibility relative to cost and plan predictability',
      description:
        'Our editorial methodology evaluates the clarity and fairness of the pricing model. This includes the utility of the free tier, quota predictability (avoiding opaque rate limits or hidden throttling), and whether the tool delivers adequate value for solo developers, startups, or enterprise teams.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <Breadcrumbs items={[{ name: 'Methodology', url: '/methodology' }]} />

      <div className="space-y-4 mb-12">
        <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-indigo-400 uppercase tracking-wider">
          <ShieldCheckIcon className="w-4 h-4" />
          <span>Editorial Trust & Evaluation Standards</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          AIForDevs Editorial Methodology
        </h1>
        <p className="text-base sm:text-lg text-zinc-200 leading-relaxed font-normal">
          AIForDevs is an independent technical guide built by and for software engineers. Here is exactly how our editorial team reviews tools, assigns structured editorial ratings, handles pricing data, and maintains editorial integrity.
        </p>
      </div>

      <div className="space-y-12 text-zinc-200">
        {/* Core Principles */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white tracking-tight">
            Our Editorial Standards
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-6 rounded-xl bg-[#13151a] border border-[#262830] space-y-2.5 shadow-sm">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <CheckIcon className="w-4 h-4 text-emerald-400" />
                <span>Editorial Independence</span>
              </h3>
              <p className="text-sm text-zinc-300 leading-relaxed">
                Scores and editorial rankings on AIForDevs are determined solely by our editorial team. We do not sell scores, rankings, or favorable reviews. No vendor can pay to alter their editorial rating.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-[#13151a] border border-[#262830] space-y-2.5 shadow-sm">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <CheckIcon className="w-4 h-4 text-emerald-400" />
                <span>Clear Editorial Opinion</span>
              </h3>
              <p className="text-sm text-zinc-300 leading-relaxed">
                All numerical scores are explicitly labeled as <strong className="text-white">AIForDevs Editorial Scores</strong>. They represent structured editorial assessments, not automated benchmark results or user-submitted star ratings.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-[#13151a] border border-[#262830] space-y-2.5 shadow-sm">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <CheckIcon className="w-4 h-4 text-emerald-400" />
                <span>Regular Data Updates</span>
              </h3>
              <p className="text-sm text-zinc-300 leading-relaxed">
                AI software changes rapidly. We maintain a visible &ldquo;Editorial data last updated&rdquo; date on all tool profiles, comparisons, and guides, aiming to refresh seed content on a regular recurring cycle.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-[#13151a] border border-[#262830] space-y-2.5 shadow-sm">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <CheckIcon className="w-4 h-4 text-emerald-400" />
                <span>Affiliate Transparency</span>
              </h3>
              <p className="text-sm text-zinc-300 leading-relaxed">
                Some outbound links to vendor websites may be affiliate links that support site maintenance. Affiliate partnerships never influence our evaluation scores, pros/cons, or comparative verdicts.
              </p>
            </div>
          </div>
        </section>

        {/* The Five Scoring Dimensions */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-white tracking-tight">
              The Five Scoring Dimensions
            </h2>
            <p className="text-sm text-zinc-300 leading-relaxed">
              To avoid false precision (such as arbitrary 9.3 or 9.6 ratings), our editorial assessments use structured 0.5-increment scales across five core engineering dimensions:
            </p>
          </div>

          <div className="space-y-4">
            {dimensions.map((dim, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl bg-[#13151a] border border-[#262830] space-y-2 shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h3 className="text-base font-bold text-white">
                    {idx + 1}. {dim.name}
                  </h3>
                  <span className="text-xs font-mono text-zinc-400">
                    Category Weight: {dim.weight}
                  </span>
                </div>
                <p className="text-xs font-mono text-indigo-400">{dim.focus}</p>
                <p className="text-sm text-zinc-300 leading-relaxed pt-1">
                  {dim.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* How Pricing is Handled */}
        <section className="p-6 rounded-xl bg-[#13151a] border border-[#262830] space-y-3 shadow-sm">
          <h2 className="text-lg font-bold text-white tracking-tight">
            How We Handle Pricing Data
          </h2>
          <p className="text-sm text-zinc-300 leading-relaxed">
            AI tool pricing is subject to frequent restructuring—including tier adjustments, seat thresholds, and token-based rate limits. Because hard-coded figures can quickly become obsolete, AIForDevs adopts a verified verification standard:
          </p>
          <ul className="space-y-2 text-sm text-zinc-300 pt-1">
            <li className="flex items-start gap-2.5">
              <span className="text-cyan-400 font-bold">&bull;</span>
              <span>Where pricing models are subject to frequent shifts, we display <strong className="text-white">&ldquo;Check official site&rdquo;</strong> alongside qualifying plan descriptions.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-cyan-400 font-bold">&bull;</span>
              <span>We provide direct links to the official vendor pricing pages so developers can inspect the most recent enterprise, student, or individual plans.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-cyan-400 font-bold">&bull;</span>
              <span>We note whether free tiers, free trials, or open-source maintainer allowances are provided.</span>
            </li>
          </ul>
        </section>

        {/* Empirical Benchmarks Notice */}
        <section className="p-6 md:p-8 rounded-xl bg-[#151724] border border-indigo-700/80 space-y-4 shadow-md">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-indigo-300 uppercase tracking-wider">
            <SparklesIcon className="w-4 h-4" />
            <span>Benchmark Testing Notice & Roadmap</span>
          </div>
          <h3 className="text-xl font-bold text-white">
            Regarding Empirical Benchmark Claims
          </h3>
          <p className="text-sm text-zinc-200 leading-relaxed">
            Many websites publish synthetic benchmark claims without transparent methodology or reproducible code. At AIForDevs, we hold ourselves to a strict standard: <strong className="text-white">we do not claim benchmark results exist until fully auditable, reproducible tests have been conducted.</strong>
          </p>
          <p className="text-sm text-zinc-200 leading-relaxed">
            Our engineering team is currently designing an open-source evaluation suite designed to test real-world developer workloads:
          </p>
          <ul className="space-y-2 text-sm text-zinc-200 pt-1">
            <li className="flex items-start gap-2.5">
              <span className="text-indigo-400 font-bold">&bull;</span>
              <span><strong className="text-white">Autocomplete Stream Latency:</strong> P95 and P99 millisecond time-to-first-token across international network regions.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-indigo-400 font-bold">&bull;</span>
              <span><strong className="text-white">TypeScript Strict-Mode Adherence:</strong> Code generation evaluated against TS 5+ strict type checking without synthetic `any` workarounds.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-indigo-400 font-bold">&bull;</span>
              <span><strong className="text-white">Multi-File Import Resolution:</strong> Iterative compiler loops required to fix broken dependency trees in full-stack monorepos.</span>
            </li>
          </ul>
          <div className="p-3.5 rounded-lg bg-[#111219] border border-indigo-900/60 text-xs font-mono text-zinc-300">
            Current status: No empirical benchmark results are published on AIForDevs. All published ratings represent structured editorial evaluations.
          </div>
        </section>

        {/* Correction and Update Requests */}
        <section className="p-5 rounded-xl bg-[#16181f] border border-[#2b2e38] text-xs text-zinc-300 flex items-start gap-3">
          <InfoIcon className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold text-white">Notice an Outdated Feature or Pricing Change?</p>
            <p className="leading-relaxed">
              We welcome corrections from developers and tool maintainers. If a feature has shipped, a model has evolved, or a pricing tier has adjusted, please reach out via our contact channels so we can verify and update the record.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
