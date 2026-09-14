import { Metadata } from 'next';
import Link from 'next/link';
import { getAllArticles } from '@/lib/db';
import { constructMetadata } from '@/lib/seo';
import { BookOpenIcon, ArrowRightIcon } from '@/components/ui/Icons';

export const metadata: Metadata = constructMetadata({
  title: 'Engineering Blog & Developer Guides — AIForDevs',
  description:
    'Deep dives, practical tutorials, and architecture guides on AI coding tools, prompt engineering, and developer ergonomics.',
  canonicalUrl: '/blog',
});

export default async function BlogIndexPage() {
  const articles = await getAllArticles();
  const featuredArticle = articles[0];
  const gridArticles = articles.slice(1);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="max-w-3xl mb-10">
        <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider mb-2">
          <BookOpenIcon className="w-4 h-4" />
          <span>Technical Articles & News</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
          Engineering Blog & Frontier News
        </h1>
        <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-normal">
          In-depth architectural analysis, model release breakdowns, and practical configuration guides for developers building with modern AI tools.
        </p>
      </div>

      {/* Featured Breaking Analysis */}
      {featuredArticle && (
        <div className="mb-12">
          <Link
            href={`/blog/${featuredArticle.slug}`}
            className="group block p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#161822] via-[#12141a] to-[#0e1014] border border-amber-500/40 hover:border-amber-400 transition-all shadow-lg hover:shadow-amber-500/10"
          >
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono mb-4">
              <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold uppercase tracking-wide">
                Featured Deep Dive
              </span>
              <span className="text-zinc-300 font-semibold">{featuredArticle.category}</span>
              <span className="text-zinc-400">•</span>
              <span className="text-zinc-400">{featuredArticle.readTime}</span>
              <span className="text-zinc-400">•</span>
              <span className="text-zinc-400">{featuredArticle.publishedAt}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white group-hover:text-amber-300 transition-colors mb-3 leading-tight">
              {featuredArticle.title}
            </h2>

            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed mb-6 max-w-4xl">
              {featuredArticle.summary}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#23262f]">
              <div className="flex flex-wrap gap-2">
                {featuredArticle.tags.map((t) => (
                  <span
                    key={t}
                    className="text-xs text-zinc-300 bg-[#1c1f27] px-2.5 py-1 rounded-md border border-[#2d313c] font-medium"
                  >
                    #{t}
                  </span>
                ))}
              </div>

              <div className="text-sm font-semibold text-amber-400 group-hover:text-amber-300 flex items-center gap-1.5">
                <span>Read full deep dive</span>
                <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        </div>
      )}

      {/* Grid of All Other Articles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {gridArticles.map((article) => (
          <Link
            key={article.id}
            href={`/blog/${article.slug}`}
            className="group flex flex-col justify-between p-6 rounded-xl bg-[#13151a] hover:bg-[#181a21] border border-[#262830] hover:border-amber-500 transition-all shadow-sm"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-zinc-300 mb-3 font-mono">
                <span className="font-semibold text-zinc-200">{article.category}</span>
                <span className="text-zinc-400">{article.readTime}</span>
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors mb-3 leading-snug">
                {article.title}
              </h3>
              <p className="text-sm text-zinc-300 line-clamp-3 leading-relaxed mb-4">
                {article.summary}
              </p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {article.tags.map((t) => (
                  <span
                    key={t}
                    className="text-xs text-zinc-300 bg-[#1c1f27] px-2.5 py-0.5 rounded border border-[#2d313c] font-medium"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#23262f] flex items-center justify-between text-xs text-zinc-400 font-mono">
              <span>{article.publishedAt}</span>
              <span className="text-amber-400 font-semibold group-hover:text-amber-300 flex items-center gap-1">
                <span>Read article</span>
                <ArrowRightIcon className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
