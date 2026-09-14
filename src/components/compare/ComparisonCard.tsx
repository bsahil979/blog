import React from 'react';
import Link from 'next/link';
import { Comparison } from '@/types/comparison';
import { ArrowRightIcon, ScaleIcon } from '@/components/ui/Icons';
import { cn } from '@/lib/utils';

interface ComparisonCardProps {
  comparison: Comparison;
  className?: string;
}

export function ComparisonCard({ comparison, className }: ComparisonCardProps) {
  return (
    <div
      className={cn(
        'group relative flex flex-col justify-between p-6 rounded-xl bg-[#13151a] hover:bg-[#181a21] border border-[#262830] hover:border-zinc-500 transition-all duration-200 shadow-sm hover:shadow-lg',
        className
      )}
    >
      <div>
        <div className="flex items-center gap-2 text-xs text-cyan-400 font-mono font-medium mb-3">
          <ScaleIcon className="w-3.5 h-3.5" />
          <span>Head-to-Head Comparison</span>
        </div>

        <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors mb-2.5 leading-snug">
          <Link href={`/compare/${comparison.slug}`} className="focus:outline-none">
            <span className="absolute inset-0 rounded-xl" />
            {comparison.title}
          </Link>
        </h3>

        <p className="text-sm text-zinc-300 line-clamp-2 leading-relaxed mb-5">
          {comparison.summary}
        </p>
      </div>

      <div className="pt-3.5 border-t border-[#23262f] flex items-center justify-between text-xs">
        <span className="text-zinc-400 font-mono text-xs">
          Updated September 2026
        </span>
        <span className="inline-flex items-center gap-1 font-semibold text-cyan-400 group-hover:text-cyan-300 transition-colors">
          <span>Compare</span>
          <ArrowRightIcon className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </span>
      </div>
    </div>
  );
}
