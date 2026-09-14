import React from 'react';
import { StarIcon } from '@/components/ui/Icons';
import { cn } from '@/lib/utils';

interface RatingScoreProps {
  score: number; // 0 - 10
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

export function RatingScore({
  score,
  size = 'md',
  showLabel = false,
  className,
}: RatingScoreProps) {
  const formattedScore = score.toFixed(1);

  const getScoreColor = (val: number) => {
    if (val >= 9.3) return 'text-emerald-300 bg-emerald-950/90 border-emerald-600/80';
    if (val >= 8.8) return 'text-cyan-300 bg-cyan-950/90 border-cyan-600/80';
    if (val >= 8.0) return 'text-amber-300 bg-amber-950/90 border-amber-600/80';
    return 'text-zinc-200 bg-zinc-900 border-zinc-700';
  };

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 font-bold',
    md: 'text-xs px-2.5 py-1 font-bold',
    lg: 'text-sm px-3 py-1.5 font-extrabold',
  };

  return (
    <div className={cn('inline-flex items-center gap-2', className)}>
      <div
        className={cn(
          'inline-flex items-center gap-1.5 font-mono rounded-md border shadow-sm',
          getScoreColor(score),
          sizeClasses[size]
        )}
        title="AIForDevs Editorial Score (Independent evaluation, not sponsored)"
      >
        <StarIcon className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
        <span className="text-white">{formattedScore}</span>
        <span className="text-[10px] text-zinc-400 font-sans font-normal">/10</span>
      </div>

      {showLabel && (
        <span className="text-xs text-zinc-300 font-medium hidden sm:inline">
          Editorial Score
        </span>
      )}
    </div>
  );
}
