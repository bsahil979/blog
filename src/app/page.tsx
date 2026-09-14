import Link from 'next/link';
import { getAllTools, getAllComparisons, getAllGuides, getAllArticles } from '@/lib/db';
import { ToolCard } from '@/components/tools/ToolCard';
import { ComparisonCard } from '@/components/compare/ComparisonCard';
import { SearchBar } from '@/components/search/SearchBar';
import {
  CodeIcon,
  CompassIcon,
  LayersIcon,
  BookOpenIcon,
  SparklesIcon,
  ArrowRightIcon,
} from '@/components/ui/Icons';
import { ToolCategory } from '@/types/tool';

export default async function HomePage() {
  const allTools = await getAllTools();
  const allComparisons = await getAllComparisons();
  const allGuides = await getAllGuides();
  const allArticles = await getAllArticles();

  // 6 Popular AI Tools
  const popularToolSlugs = ['cursor', 'github-copilot', 'claude', 'chatgpt', 'gemini', 'windsurf'];
  const popularTools = popularToolSlugs
    .map((slug) => allTools.find((t) => t.slug === slug))
    .filter(Boolean);

  // 6 Popular Comparisons
  const popularComparisonSlugs = [
    'cursor-vs-github-copilot',
    'cursor-vs-windsurf',
    'claude-code-vs-cursor',
    'chatgpt-vs-claude',
    'chatgpt-vs-gemini',
    'claude-vs-gemini',
  ];
  const popularComparisons = popularComparisonSlugs
    .map((slug) => allComparisons.find((c) => c.slug === slug))
    .filter(Boolean);

  const categories: { name: ToolCategory; desc: string; isPrimary?: boolean }[] = [
    { name: 'Coding', desc: 'AI code editors, autocompleters, and CLI terminal agents', isPrimary: true },
    { name: 'Research', desc: 'Documentation search engines and 2M token context LLMs' },
    { name: 'Productivity', desc: 'Collaborative workspaces, Canvas editors, and reasoning models' },
    { name: 'Writing', desc: 'Technical documentation, README, and changelog generation' },
    { name: 'Design', desc: 'Interactive UI mockups and living component generators' },
    { name: 'Video', desc: 'Multimodal video bug analysis and walk-through demos' },
    { name: 'Audio', desc: 'Source-grounded podcast audio overview discussions' },
    { name: 'Marketing', desc: 'Developer marketing and technical product launch synthesis' },
  ];

  const featuredBestGuides = allGuides.slice(0, 7);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section — Compact, Crisp, High Contrast */}
      <section className="relative bg-[#0b0c0e] border-b border-[#20222a] pt-12 pb-12 md:pt-16 md:pb-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-700/80 bg-indigo-950/80 text-indigo-300 text-xs font-mono font-semibold mb-5">
            <SparklesIcon className="w-3.5 h-3.5 text-indigo-400" />
            <span>Independent Developer-First AI Platform</span>
          </div>

          {/* Main Headline — High contrast, zero washed-out gradient */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Find the right AI tool <br className="hidden sm:inline" />
            <span className="text-indigo-400">for your developer workflow.</span>
          </h1>

          {/* Subheading — WCAG AA compliant text */}
          <p className="text-base sm:text-lg text-zinc-300 max-w-3xl mx-auto leading-relaxed mb-6 font-normal">
            AIForDevs helps developers compare AI coding assistants, coding agents, debugging tools, and code review software. Explore independent, structured comparisons of Cursor, GitHub Copilot, Claude Code, Windsurf, ChatGPT, and more.
          </p>

          {/* Primary Action: Prominent Search Box */}
          <div className="max-w-xl mx-auto mb-4">
            <SearchBar size="large" />
          </div>

          {/* Example Search Chips */}
          <div className="flex items-center justify-center flex-wrap gap-2 text-xs">
            <span className="text-zinc-400 font-mono font-medium">Popular:</span>
            {[
              { label: 'Best AI coding assistant', url: '/best/ai-coding-assistants' },
              { label: 'Cursor vs GitHub Copilot', url: '/compare/cursor-vs-github-copilot' },
              { label: 'Best AI for Python', url: '/best/ai-for-python' },
              { label: 'AI for code review', url: '/best/ai-for-code-review' },
            ].map((chip) => (
              <Link
                key={chip.label}
                href={chip.url}
                className="px-3 py-1.5 rounded-md bg-[#15171d] text-zinc-200 border border-[#2b2e38] hover:border-indigo-500 hover:text-white font-medium transition-colors"
              >
                {chip.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Section 1: Popular AI Tools */}
      <section className="py-14 md:py-16 bg-[#0e1014] border-b border-[#20222a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-indigo-400 uppercase tracking-wider mb-1.5">
                <CodeIcon className="w-4 h-4" />
                <span>Featured Developer Software</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Popular AI Tools
              </h2>
              <p className="text-sm text-zinc-300 mt-1">
                Independently scored across coding, reasoning, workflow, and developer ergonomics.
              </p>
            </div>
            <Link
              href="/tools"
              className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              <span>View all tools</span>
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularTools.map((tool) => (
              <ToolCard key={tool!.id} tool={tool!} />
            ))}
          </div>
        </div>
      </section>

      {/* Section 2: Popular Comparisons */}
      <section className="py-14 md:py-16 bg-[#0b0c0e] border-b border-[#20222a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-cyan-400 uppercase tracking-wider mb-1.5">
                <CompassIcon className="w-4 h-4" />
                <span>In-Depth Head-to-Head</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Popular Comparisons
              </h2>
              <p className="text-sm text-zinc-300 mt-1">
                Side-by-side feature matrices, editorial verdicts, and category score trade-offs.
              </p>
            </div>
            <Link
              href="/compare"
              className="inline-flex items-center gap-1 text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <span>View all comparisons</span>
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularComparisons.map((comp) => (
              <ComparisonCard key={comp!.id} comparison={comp!} />
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Find AI tools by category */}
      <section className="py-14 md:py-16 bg-[#0e1014] border-b border-[#20222a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-indigo-400 uppercase tracking-wider mb-1.5">
              <LayersIcon className="w-4 h-4" />
              <span>Category Curation</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Find AI Tools by Category
            </h2>
            <p className="text-sm text-zinc-300 mt-1.5">
              Explore specialized tools tailored to each stage of software development and research.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((cat) => {
              const isPrimary = cat.isPrimary;
              return (
                <Link
                  key={cat.name}
                  href={`/tools?category=${cat.name}`}
                  className={`group p-5 rounded-xl border transition-all duration-200 ${
                    isPrimary
                      ? 'bg-[#151724] border-indigo-600 hover:border-indigo-400 shadow-md shadow-indigo-950/40'
                      : 'bg-[#13151a] border-[#262830] hover:border-zinc-500 hover:bg-[#181a21]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-base font-bold text-white group-hover:text-indigo-300 flex items-center gap-2">
                      <span>{cat.name}</span>
                      {isPrimary && (
                        <span className="text-[10px] font-mono uppercase bg-indigo-600 text-white px-2 py-0.5 rounded font-bold">
                          Core
                        </span>
                      )}
                    </h3>
                    <ArrowRightIcon className="w-4 h-4 text-zinc-400 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed font-normal">
                    {cat.desc}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 4: Best AI tools curated guides */}
      <section className="py-14 md:py-16 bg-[#0b0c0e] border-b border-[#20222a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-emerald-400 uppercase tracking-wider mb-1.5">
                <BookOpenIcon className="w-4 h-4" />
                <span>Ranked Guides</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Best AI Tools for Specific Tasks
              </h2>
              <p className="text-sm text-zinc-300 mt-1">
                Curated rankings based on developer workflows, documented capabilities, and structured editorial evaluation.
              </p>
            </div>
            <Link
              href="/best"
              className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <span>View all guides</span>
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredBestGuides.map((guide) => (
              <Link
                key={guide.id}
                href={`/best/${guide.slug}`}
                className="group flex flex-col justify-between p-6 rounded-xl bg-[#13151a] hover:bg-[#181a21] border border-[#262830] hover:border-emerald-500 transition-all shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-zinc-300 mb-2 font-mono">
                    <span className="font-semibold text-zinc-200">{guide.category}</span>
                    <span className="text-zinc-400">{guide.rankedTools.length} tools ranked</span>
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors mb-2.5">
                    {guide.title}
                  </h3>
                  <p className="text-xs text-zinc-300 line-clamp-2 leading-relaxed">
                    {guide.introduction}
                  </p>
                </div>
                <div className="pt-4 mt-5 border-t border-[#23262f] flex items-center justify-between text-xs font-semibold text-emerald-400 group-hover:text-emerald-300">
                  <span>Read ranked guide</span>
                  <ArrowRightIcon className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Latest Guides / Blog */}
      <section className="py-14 md:py-16 bg-[#0e1014]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-amber-400 uppercase tracking-wider mb-1.5">
                <BookOpenIcon className="w-4 h-4" />
                <span>Editorial & Tutorials</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Latest Engineering Guides
              </h2>
              <p className="text-sm text-zinc-300 mt-1">
                Practical analysis on configuring developer tools, system prompt rules, and agent architectures.
              </p>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1 text-sm font-semibold text-amber-400 hover:text-amber-300 transition-colors"
            >
              <span>View all {allArticles.length} articles</span>
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {allArticles.slice(0, 6).map((article) => (
              <Link
                key={article.id}
                href={`/blog/${article.slug}`}
                className="group flex flex-col justify-between p-6 rounded-xl bg-[#13151a] hover:bg-[#181a21] border border-[#262830] hover:border-amber-500 transition-all shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-zinc-300 mb-2.5 font-mono">
                    <span className="font-semibold text-zinc-200">{article.category}</span>
                    <span className="text-zinc-400">{article.readTime}</span>
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors mb-2.5 leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-xs text-zinc-300 line-clamp-3 leading-relaxed mb-4">
                    {article.summary}
                  </p>
                </div>
                <div className="pt-4 border-t border-[#23262f] flex items-center justify-between text-xs text-zinc-400 font-mono">
                  <span>{article.publishedAt}</span>
                  <span className="text-amber-400 font-semibold group-hover:text-amber-300 flex items-center gap-1">
                    <span>Read guide</span>
                    <ArrowRightIcon className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
