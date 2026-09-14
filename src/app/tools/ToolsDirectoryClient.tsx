'use client';

import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { Tool, ToolCategory } from '@/types/tool';
import { ToolCard } from '@/components/tools/ToolCard';
import { SearchIcon, XIcon } from '@/components/ui/Icons';
import { cn } from '@/lib/utils';

interface ToolsDirectoryClientProps {
  initialTools: Tool[];
}

const CATEGORIES: ('All' | ToolCategory)[] = [
  'All',
  'Coding',
  'Research',
  'Writing',
  'Productivity',
  'Design',
  'Video',
  'Audio',
];

const PRICING_OPTIONS = ['All', 'Free', 'Freemium', 'Paid'];

const SORT_OPTIONS = [
  { label: 'Recommended', value: 'recommended' },
  { label: 'Highest Rating', value: 'rating' },
  { label: 'Alphabetical', value: 'name' },
];

export function ToolsDirectoryClient({ initialTools }: ToolsDirectoryClientProps) {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') as ToolCategory | null;
  const initialPricing = searchParams.get('pricing');

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(
    initialCategory || 'All'
  );
  const [selectedPricing, setSelectedPricing] = useState<string>(
    initialPricing || 'All'
  );
  const [sortBy, setSortBy] = useState<string>('recommended');

  const filteredTools = useMemo(() => {
    return initialTools
      .filter((tool) => {
        // Search filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchesName = tool.name.toLowerCase().includes(q);
          const matchesDesc = tool.description.toLowerCase().includes(q);
          const matchesBestFor = tool.bestFor.some((b) => b.toLowerCase().includes(q));
          if (!matchesName && !matchesDesc && !matchesBestFor) return false;
        }

        // Category filter
        if (selectedCategory !== 'All' && tool.category.toLowerCase() !== selectedCategory.toLowerCase()) {
          return false;
        }

        // Pricing filter
        if (selectedPricing !== 'All') {
          if (selectedPricing === 'Free' && tool.pricing.pricingType !== 'Free') {
            return false;
          }
          if (selectedPricing === 'Freemium' && tool.pricing.pricingType !== 'Freemium') {
            return false;
          }
          if (selectedPricing === 'Paid' && tool.pricing.pricingType !== 'Paid') {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'rating') {
          return b.editorialRating - a.editorialRating;
        }
        if (sortBy === 'name') {
          return a.name.localeCompare(b.name);
        }
        // Recommended default
        if (a.isPopular && !b.isPopular) return -1;
        if (!a.isPopular && b.isPopular) return 1;
        return b.editorialRating - a.editorialRating;
      });
  }, [initialTools, searchQuery, selectedCategory, selectedPricing, sortBy]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedPricing('All');
    setSortBy('recommended');
  };

  const hasActiveFilters =
    searchQuery !== '' || selectedCategory !== 'All' || selectedPricing !== 'All';

  return (
    <div className="space-y-8">
      {/* Controls Container */}
      <div className="space-y-4 p-6 rounded-xl bg-[#13151a] border border-[#262830] shadow-sm">
        {/* Search Bar */}
        <div className="relative">
          <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter tools by name, features, or keywords..."
            className="w-full pl-10 pr-10 py-2.5 bg-[#0b0c0e] border border-[#2b2e38] rounded-lg text-sm text-white placeholder-zinc-400 focus:outline-none focus:border-indigo-500 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-zinc-400 hover:text-white"
              aria-label="Clear filter search"
            >
              <XIcon className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter Rows */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-3 border-t border-[#23262f]">
          {/* Category Chips */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs text-zinc-400 mr-1 font-mono font-semibold">Category:</span>
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={cn(
                    'text-xs px-3 py-1 rounded-md transition-colors font-medium',
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-[#1c1f27] hover:bg-[#252833] text-zinc-300 hover:text-white border border-[#2d313c]'
                  )}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Pricing & Sort Row */}
          <div className="flex items-center gap-4 flex-wrap">
            {/* Pricing Pills */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-zinc-400 font-mono font-semibold">Pricing:</span>
              {PRICING_OPTIONS.map((pricing) => {
                const isSelected = selectedPricing === pricing;
                return (
                  <button
                    key={pricing}
                    onClick={() => setSelectedPricing(pricing)}
                    className={cn(
                      'text-xs px-2.5 py-1 rounded-md transition-colors font-medium',
                      isSelected
                        ? 'bg-white text-zinc-950 font-bold'
                        : 'bg-[#1c1f27] hover:bg-[#252833] text-zinc-300 hover:text-white border border-[#2d313c]'
                    )}
                  >
                    {pricing}
                  </button>
                );
              })}
            </div>

            {/* Sort Select */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-zinc-400 font-mono font-semibold">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-xs bg-[#0b0c0e] border border-[#2b2e38] text-zinc-200 font-medium rounded-md px-2.5 py-1 focus:outline-none focus:border-indigo-500"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Directory Count Bar */}
      <div className="flex items-center justify-between text-xs text-zinc-300 px-1 font-medium">
        <span>
          Showing <strong className="text-white font-bold">{filteredTools.length}</strong> of{' '}
          {initialTools.length} tools
        </span>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-indigo-400 hover:text-indigo-300 font-semibold underline underline-offset-4"
          >
            Reset all filters
          </button>
        )}
      </div>

      {/* Tools Grid */}
      {filteredTools.length === 0 ? (
        <div className="p-12 text-center rounded-xl bg-[#13151a] border border-[#262830]">
          <p className="text-base font-bold text-white mb-1">
            No AI tools match your current filters.
          </p>
          <p className="text-xs text-zinc-400 mb-4">
            Try adjusting your search keywords or switching category filters.
          </p>
          <button
            onClick={clearFilters}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-[#1c1f27] hover:bg-[#252833] text-white border border-[#2d313c] transition-colors"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      )}
    </div>
  );
}
