import Link from 'next/link';
import { TerminalIcon, ArrowLeftIcon } from '@/components/ui/Icons';
import { SearchBar } from '@/components/search/SearchBar';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-14 h-14 rounded-2xl bg-[#13151a] border border-[#262830] text-indigo-400 mx-auto flex items-center justify-center shadow-md">
          <TerminalIcon className="w-7 h-7" />
        </div>

        <div>
          <span className="text-xs font-mono text-indigo-400 font-extrabold uppercase tracking-wider">
            Error 404
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1.5">
            Page Not Found
          </h1>
          <p className="text-sm text-zinc-300 mt-2 leading-relaxed font-normal">
            The AI tool, comparison, or guide you are looking for does not exist or may have been moved.
          </p>
        </div>

        {/* In-page search */}
        <div className="pt-2">
          <SearchBar placeholder="Search directory..." />
        </div>

        {/* Quick Links */}
        <div className="pt-4 flex items-center justify-center gap-2.5 flex-wrap text-xs">
          <Link
            href="/"
            className="px-4 py-2 rounded-lg bg-[#15171d] hover:bg-[#1f222b] text-white font-semibold border border-[#2b2e38] hover:border-indigo-500 transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <ArrowLeftIcon className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
          <Link
            href="/tools"
            className="px-4 py-2 rounded-lg bg-[#15171d] hover:bg-[#1f222b] text-white font-semibold border border-[#2b2e38] hover:border-indigo-500 transition-colors shadow-xs"
          >
            All Tools
          </Link>
          <Link
            href="/compare"
            className="px-4 py-2 rounded-lg bg-[#15171d] hover:bg-[#1f222b] text-white font-semibold border border-[#2b2e38] hover:border-indigo-500 transition-colors shadow-xs"
          >
            Comparisons
          </Link>
          <Link
            href="/best"
            className="px-4 py-2 rounded-lg bg-[#15171d] hover:bg-[#1f222b] text-white font-semibold border border-[#2b2e38] hover:border-indigo-500 transition-colors shadow-xs"
          >
            Best AI Guides
          </Link>
        </div>
      </div>
    </div>
  );
}
