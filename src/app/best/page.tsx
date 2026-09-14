import { Metadata } from 'next';
import Link from 'next/link';
import { getAllGuides } from '@/lib/db';
import { constructMetadata } from '@/lib/seo';
import { BookOpenIcon, ArrowRightIcon } from '@/components/ui/Icons';

export const metadata: Metadata = constructMetadata({
  title: 'Best AI Tools for Developers: Guides & Curated Rankings — AIForDevs',
  description:
    'Curated and ranked AI tools for specific developer use cases: best AI for Python, debugging, code review, SQL, React, and test generation.',
  canonicalUrl: '/best',
});

export default async function BestGuidesIndexPage() {
  const guides = await getAllGuides();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      {/* Header */}
      <div className="max-w-3xl mb-12">
        <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider mb-2">
          <BookOpenIcon className="w-4 h-4" />
          <span>Curated Rankings</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
          Best AI Tools for Developers
        </h1>
        <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-normal">
          Comprehensive rankings tailored to specific developer workflows. We test AI assistants against real-world compiler errors, large repository indexing, and multi-file code generation.
        </p>
      </div>

      {/* Guides Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {guides.map((guide) => (
          <Link
            key={guide.id}
            href={`/best/${guide.slug}`}
            className="group flex flex-col justify-between p-6 rounded-xl bg-[#13151a] hover:bg-[#181a21] border border-[#262830] hover:border-emerald-500 transition-all shadow-sm"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-zinc-300 mb-2.5 font-mono">
                <span className="font-semibold text-zinc-200">{guide.category}</span>
                <span className="text-zinc-400">{guide.rankedTools.length} tools ranked</span>
              </div>
              <h2 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors mb-2.5">
                {guide.title}
              </h2>
              <p className="text-sm text-zinc-300 line-clamp-3 leading-relaxed mb-4">
                {guide.introduction}
              </p>
            </div>
            <div className="pt-4 border-t border-[#23262f] flex items-center justify-between text-xs text-emerald-400 group-hover:text-emerald-300 font-semibold">
              <span>Explore rankings</span>
              <ArrowRightIcon className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
