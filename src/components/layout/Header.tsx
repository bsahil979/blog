'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SearchIcon, MenuIcon, XIcon, TerminalIcon } from '@/components/ui/Icons';
import { SearchModal } from '@/components/search/SearchModal';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { name: 'Tools', href: '/tools' },
  { name: 'Compare', href: '/compare' },
  { name: 'Best AI', href: '/best' },
  { name: 'Benchmarks', href: '/methodology' },
  { name: 'Blog', href: '/blog' },
];

export function Header() {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Global Cmd+K / Ctrl+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-[#20222a] bg-[#0b0c0e]/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Logo & Brand */}
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="flex items-center gap-2.5 font-semibold text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-md"
            >
              <div className="w-8 h-8 rounded-lg bg-indigo-600/30 border border-indigo-500/60 flex items-center justify-center text-indigo-400">
                <TerminalIcon className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold tracking-tight text-base leading-none text-white flex items-center">
                  AIForDevs<span className="text-indigo-400 text-xs ml-0.5 font-bold">.tech</span>
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                const isActive =
                  pathname === link.href ||
                  (link.href !== '/' && pathname.startsWith(link.href));

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'px-3 py-1.5 text-sm font-semibold rounded-md transition-colors',
                      isActive
                        ? 'text-white bg-[#1a1d24] border border-[#2b2e38]'
                        : 'text-zinc-300 hover:text-white hover:bg-[#16181f]'
                    )}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Header Controls (Search & Mobile Toggle) */}
          <div className="flex items-center gap-3">
            {/* Search Trigger Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg border border-[#262830] bg-[#13151a] hover:bg-[#181a21] hover:border-zinc-500 text-zinc-300 hover:text-white transition-all text-xs font-medium group shadow-sm"
              aria-label="Open search dialog"
            >
              <SearchIcon className="w-4 h-4 text-zinc-400 group-hover:text-zinc-200" />
              <span className="hidden sm:inline">Search AI tools...</span>
              <kbd className="hidden sm:inline-block text-[10px] font-mono text-zinc-400 bg-[#1c1f27] px-1.5 py-0.5 rounded border border-[#2d313c]">
                ⌘K
              </kbd>
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="md:hidden p-2 rounded-lg text-zinc-300 hover:text-white hover:bg-[#181a21] border border-[#262830]"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <XIcon className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-b border-[#20222a] bg-[#0b0c0e] px-4 pt-3 pb-5 space-y-2 animate-in slide-in-from-top-2 duration-150">
            {NAV_LINKS.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== '/' && pathname.startsWith(link.href));

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    'block px-3.5 py-2.5 rounded-lg text-base font-semibold transition-colors',
                    isActive
                      ? 'text-white bg-[#1a1d24] border border-[#2b2e38]'
                      : 'text-zinc-300 hover:text-white hover:bg-[#15171d]'
                  )}
                >
                  {link.name}
                </Link>
              );
            })}
            <div className="pt-2 border-t border-[#20222a]">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsSearchOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#13151a] hover:bg-[#181a21] text-zinc-200 text-sm font-semibold border border-[#262830]"
              >
                <SearchIcon className="w-4 h-4 text-zinc-400" />
                <span>Search tools, comparisons, and guides...</span>
              </button>
            </div>
          </div>
        )}
      </header>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
