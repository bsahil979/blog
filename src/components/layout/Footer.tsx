import React from 'react';
import Link from 'next/link';
import { TerminalIcon, ShieldCheckIcon } from '@/components/ui/Icons';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-[#20222a] bg-[#0b0c0e] text-zinc-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand Column */}
          <div className="col-span-2 space-y-4">
            <Link
              href="/"
              className="flex items-center gap-2.5 font-semibold text-white"
            >
              <div className="w-7 h-7 rounded-lg bg-indigo-600/30 border border-indigo-500/60 flex items-center justify-center text-indigo-400">
                <TerminalIcon className="w-4 h-4" />
              </div>
              <span className="font-extrabold tracking-tight text-base text-white">
                AIForDevs<span className="text-indigo-400 text-xs ml-0.5 font-bold">.tech</span>
              </span>
            </Link>
            <p className="text-sm text-zinc-300 max-w-sm leading-relaxed font-normal">
              Find the right AI tool for your workflow. Independent, developer-first discovery, head-to-head comparisons, and practical engineering guides.
            </p>
            <div className="flex items-center gap-2 text-xs text-zinc-300 pt-1 font-medium">
              <ShieldCheckIcon className="w-4 h-4 text-emerald-400" />
              <span>100% Independent Editorial Evaluations</span>
            </div>
          </div>

          {/* Column 1: Discover */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-zinc-100 uppercase tracking-wider font-mono">
              Discover
            </h3>
            <ul className="space-y-2.5 text-sm font-medium">
              <li>
                <Link href="/tools" className="text-zinc-300 hover:text-white transition-colors">
                  All Tools
                </Link>
              </li>
              <li>
                <Link href="/tools?category=Coding" className="text-zinc-300 hover:text-white transition-colors">
                  AI for Coding
                </Link>
              </li>
              <li>
                <Link href="/tools?category=Research" className="text-zinc-300 hover:text-white transition-colors">
                  AI for Research
                </Link>
              </li>
              <li>
                <Link href="/tools?pricing=Free" className="text-zinc-300 hover:text-white transition-colors">
                  Free AI Tools
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Compare & Best */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-zinc-100 uppercase tracking-wider font-mono">
              Comparisons
            </h3>
            <ul className="space-y-2.5 text-sm font-medium">
              <li>
                <Link href="/compare" className="text-zinc-300 hover:text-white transition-colors">
                  All Comparisons
                </Link>
              </li>
              <li>
                <Link href="/compare/cursor-vs-github-copilot" className="text-zinc-300 hover:text-white transition-colors">
                  Cursor vs Copilot
                </Link>
              </li>
              <li>
                <Link href="/compare/cursor-vs-windsurf" className="text-zinc-300 hover:text-white transition-colors">
                  Cursor vs Windsurf
                </Link>
              </li>
              <li>
                <Link href="/best" className="text-zinc-300 hover:text-white transition-colors">
                  Best AI Guides
                </Link>
              </li>
              <li>
                <Link href="/best/ai-coding-assistants" className="text-zinc-300 hover:text-white transition-colors">
                  Best Coding Assistants
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Platform */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-zinc-100 uppercase tracking-wider font-mono">
              Platform
            </h3>
            <ul className="space-y-2.5 text-sm font-medium">
              <li>
                <Link href="/methodology" className="text-zinc-300 hover:text-white transition-colors">
                  Scoring Methodology
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-zinc-300 hover:text-white transition-colors">
                  Engineering Blog
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-zinc-300 hover:text-white transition-colors">
                  About AIForDevs
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-zinc-300 hover:text-white transition-colors">
                  Contact & Corrections
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-zinc-300 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-zinc-300 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#20222a] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <p>
            &copy; {currentYear} AIForDevs.tech. Built for developers worldwide.
          </p>
          <p className="text-zinc-400 text-xs text-center sm:text-right max-w-md font-mono">
            Product names, logos, and brands are property of their respective owners. Scores reflect AIForDevs editorial evaluations.
          </p>
        </div>
      </div>
    </footer>
  );
}
