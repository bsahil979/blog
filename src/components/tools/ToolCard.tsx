import React from 'react';
import Link from 'next/link';
import { Tool } from '@/types/tool';
import { Badge } from '@/components/ui/Badge';
import { RatingScore } from '@/components/ui/RatingScore';
import { ArrowRightIcon } from '@/components/ui/Icons';
import { cn } from '@/lib/utils';

interface ToolCardProps {
  tool: Tool;
  className?: string;
}

export function ToolCard({ tool, className }: ToolCardProps) {
  return (
    <div
      className={cn(
        'group relative flex flex-col justify-between p-6 rounded-xl bg-[#13151a] hover:bg-[#181a21] border border-[#262830] hover:border-zinc-500 transition-all duration-200 shadow-sm hover:shadow-lg',
        className
      )}
    >
      <div>
        {/* Top bar: Category + Score */}
        <div className="flex items-center justify-between gap-2 mb-3.5">
          <Badge
            variant={tool.category === 'Coding' ? 'primary' : 'neutral'}
            size="sm"
          >
            {tool.category}
          </Badge>
          <RatingScore score={tool.editorialRating} size="sm" />
        </div>

        {/* Tool Header: Icon Monogram + Name */}
        <div className="flex items-center gap-3.5 mb-3">
          <div className="w-11 h-11 rounded-lg bg-[#1c1f26] border border-[#2d313b] flex items-center justify-center text-zinc-100 font-mono font-bold text-base shrink-0 group-hover:border-zinc-500 transition-colors">
            {tool.name.slice(0, 2).toUpperCase()}
          </div>
          <div className="min-w-0">
            <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors truncate">
              <Link href={`/tools/${tool.slug}`} className="focus:outline-none">
                <span className="absolute inset-0 rounded-xl" />
                {tool.name}
              </Link>
            </h3>
            <p className="text-xs text-zinc-300 font-mono mt-0.5">
              {tool.pricing.startingPrice}
            </p>
          </div>
        </div>

        {/* Short Description */}
        <p className="text-sm text-zinc-300 line-clamp-2 leading-relaxed mb-4">
          {tool.tagline}
        </p>

        {/* Best For Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {tool.bestFor.slice(0, 2).map((item) => (
            <span
              key={item}
              className="text-xs text-zinc-200 bg-[#1c1f27] px-2.5 py-1 rounded-md border border-[#2d313c] font-medium"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Card Footer: Pricing pill + View tool */}
      <div className="pt-3.5 border-t border-[#23262f] flex items-center justify-between text-xs">
        <span className="font-mono text-xs font-semibold text-zinc-300 bg-[#1c1f27] px-2 py-0.5 rounded border border-[#2d313c]">
          {tool.pricing.pricingType}
        </span>
        <span className="inline-flex items-center gap-1 font-semibold text-indigo-400 group-hover:text-indigo-300 transition-colors">
          <span>View tool</span>
          <ArrowRightIcon className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </span>
      </div>
    </div>
  );
}
