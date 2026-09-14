'use client';

import React, { useState } from 'react';
import { SearchIcon } from '@/components/ui/Icons';
import { SearchModal } from '@/components/search/SearchModal';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  placeholder?: string;
  className?: string;
  size?: 'default' | 'large';
}

export function SearchBar({
  placeholder = 'Search AI tools, comparisons, or use cases...',
  className,
  size = 'default',
}: SearchBarProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        onClick={() => setIsModalOpen(true)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsModalOpen(true);
          }
        }}
        className={cn(
          'group relative flex items-center w-full rounded-xl border border-[#2b2e38] bg-[#13151a] hover:bg-[#181a21] hover:border-indigo-500 transition-all cursor-pointer text-left shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500',
          size === 'large' ? 'px-4 py-3.5 text-base' : 'px-3.5 py-2 text-sm',
          className
        )}
      >
        <SearchIcon
          className={cn(
            'text-zinc-400 group-hover:text-indigo-400 transition-colors shrink-0 mr-3',
            size === 'large' ? 'w-5 h-5' : 'w-4 h-4'
          )}
        />
        <span className="text-zinc-300 font-medium select-none truncate flex-1">
          {placeholder}
        </span>
        <div className="hidden sm:flex items-center gap-1 text-xs font-mono text-zinc-300 bg-[#1c1f27] px-2 py-0.5 rounded border border-[#2d313c]">
          <span>⌘K</span>
        </div>
      </div>

      <SearchModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
