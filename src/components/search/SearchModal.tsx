'use client';

import React, { useState, useEffect, useRef, useTransition } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SearchIcon, XIcon, ArrowRightIcon } from '@/components/ui/Icons';
import { searchAll, SearchResultItem } from '@/lib/db';
import { cn } from '@/lib/utils';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isSearching, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleClose = () => {
    setQuery('');
    setResults([]);
    setSelectedIndex(0);
    onClose();
  };

  const handleQueryChange = (val: string) => {
    setQuery(val);
    if (!val.trim()) {
      setResults([]);
      setSelectedIndex(0);
      return;
    }

    startTransition(async () => {
      const res = await searchAll(val);
      setResults(res);
      setSelectedIndex(0);
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (results[selectedIndex]) {
        router.push(results[selectedIndex].url);
        handleClose();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 md:p-20 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-2xl bg-[#13151a] border border-[#2b2e38] rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh] animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search input header */}
        <div className="flex items-center px-4 py-3.5 border-b border-[#23262f] gap-3 bg-[#181a21]">
          <SearchIcon className="w-5 h-5 text-zinc-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            placeholder="Search AI tools, comparisons, or use cases..."
            className="w-full bg-transparent text-white placeholder-zinc-400 text-base focus:outline-none font-medium"
          />
          {query && (
            <button
              onClick={() => handleQueryChange('')}
              className="p-1 hover:bg-[#252833] rounded text-zinc-400 hover:text-white transition-colors"
              aria-label="Clear search"
            >
              <XIcon className="w-4 h-4" />
            </button>
          )}
          <span className="hidden sm:inline-block text-xs font-mono font-medium text-zinc-400 bg-[#252833] px-2 py-0.5 rounded border border-[#343846]">
            ESC
          </span>
        </div>

        {/* Results Container */}
        <div className="overflow-y-auto p-2 divide-y divide-[#23262f]/60">
          {query.trim().length === 0 ? (
            <div className="p-6 text-center text-zinc-400 text-sm">
              <p className="font-bold text-white mb-2">Popular Searches</p>
              <div className="flex flex-wrap justify-center gap-2 mt-3">
                {[
                  'Cursor',
                  'GitHub Copilot',
                  'Cursor vs GitHub Copilot',
                  'Claude',
                  'Best AI for Python',
                  'Windsurf',
                ].map((item) => (
                  <button
                    key={item}
                    onClick={() => handleQueryChange(item)}
                    className="text-xs font-medium bg-[#1c1f27] hover:bg-[#252833] text-zinc-200 hover:text-white px-3 py-1.5 rounded-md border border-[#2d313c] transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="p-8 text-center text-zinc-300 text-sm">
              {isSearching ? (
                <span className="font-medium text-zinc-300">Searching directory...</span>
              ) : (
                <>
                  <p className="font-bold text-white">No results found for &ldquo;{query}&rdquo;</p>
                  <p className="text-xs text-zinc-400 mt-1">
                    Try searching for &ldquo;Cursor&rdquo;, &ldquo;Copilot&rdquo;, &ldquo;Python&rdquo;, or &ldquo;Debugging&rdquo;.
                  </p>
                </>
              )}
            </div>
          ) : (
            <div className="py-1 space-y-1">
              {results.map((item, index) => {
                const isSelected = index === selectedIndex;
                const typeColors: Record<string, string> = {
                  tool: 'text-indigo-300 bg-indigo-950/80 border-indigo-700/80',
                  comparison: 'text-cyan-300 bg-cyan-950/80 border-cyan-700/80',
                  guide: 'text-emerald-300 bg-emerald-950/80 border-emerald-700/80',
                  article: 'text-amber-300 bg-amber-950/80 border-amber-700/80',
                };

                return (
                  <Link
                    key={item.id}
                    href={item.url}
                    onClick={handleClose}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={cn(
                      'flex items-center justify-between p-3.5 rounded-lg text-left transition-colors',
                      isSelected ? 'bg-[#1f232d] text-white' : 'text-zinc-200 hover:bg-[#181a21]'
                    )}
                  >
                    <div className="min-w-0 flex-1 pr-3">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={cn(
                            'text-[10px] uppercase font-mono font-bold tracking-wider px-2 py-0.5 rounded border',
                            typeColors[item.type] || 'text-zinc-400'
                          )}
                        >
                          {item.type}
                        </span>
                        <h4 className="font-bold text-sm text-white truncate">
                          {item.title}
                        </h4>
                      </div>
                      <p className="text-xs text-zinc-300 line-clamp-1">
                        {item.description}
                      </p>
                    </div>
                    <ArrowRightIcon
                      className={cn(
                        'w-4 h-4 shrink-0 transition-transform',
                        isSelected ? 'text-indigo-400 translate-x-1' : 'text-zinc-500'
                      )}
                    />
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer shortcuts info */}
        <div className="p-3 bg-[#0b0c0e] border-t border-[#23262f] text-xs text-zinc-400 flex items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <kbd className="bg-[#1c1f27] px-1.5 py-0.5 rounded text-zinc-300 font-mono text-[11px] border border-[#2d313c]">↑↓</kbd> navigate
            </span>
            <span className="flex items-center gap-1.5">
              <kbd className="bg-[#1c1f27] px-1.5 py-0.5 rounded text-zinc-300 font-mono text-[11px] border border-[#2d313c]">↵</kbd> select
            </span>
          </div>
          <span className="font-mono text-zinc-400 text-xs">AIForDevs Search</span>
        </div>
      </div>
    </div>
  );
}
