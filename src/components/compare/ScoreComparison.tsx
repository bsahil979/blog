import React from 'react';
import { Comparison } from '@/types/comparison';
import { cn } from '@/lib/utils';

interface ScoreComparisonProps {
  scores: Comparison['scores'];
  toolAName: string;
  toolBName: string;
  className?: string;
}

export function ScoreComparison({
  scores,
  toolAName,
  toolBName,
  className,
}: ScoreComparisonProps) {
  const rows = [
    { label: 'Capability & Reasoning', key: 'capability' as const },
    { label: 'Developer Workflow', key: 'developerWorkflow' as const },
    { label: 'Reliability & Predictability', key: 'reliability' as const },
    { label: 'Ease of Use & Onboarding', key: 'easeOfUse' as const },
    { label: 'Value & Pricing Model', key: 'value' as const },
  ];

  return (
    <div
      className={cn(
        'rounded-xl border border-[#262830] bg-[#13151a] p-6 md:p-8 space-y-5 shadow-sm',
        className
      )}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#23262f]">
        <div>
          <h3 className="text-base font-bold text-white font-mono uppercase tracking-wider">
            Category Editorial Scores
          </h3>
          <p className="text-xs text-zinc-300 mt-1">
            Independent ratings on a 10-point scale.
          </p>
        </div>
        <span className="text-xs font-mono font-semibold text-zinc-200 bg-[#1c1f27] px-2.5 py-1 rounded border border-[#2d313c]">
          AIForDevs Editorial Scores
        </span>
      </div>

      <div className="space-y-5 pt-1">
        {rows.map((row) => {
          const valA = scores[row.key].toolA;
          const valB = scores[row.key].toolB;
          const isAWinner = valA > valB;
          const isBWinner = valB > valA;

          return (
            <div key={row.key} className="space-y-2">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="font-semibold text-zinc-200">{row.label}</span>
                <div className="flex items-center gap-4 font-mono">
                  <span
                    className={cn(
                      'text-xs font-bold',
                      isAWinner ? 'text-indigo-400 font-extrabold' : 'text-zinc-300'
                    )}
                  >
                    {toolAName}: {valA.toFixed(1)}
                  </span>
                  <span className="text-zinc-500">|</span>
                  <span
                    className={cn(
                      'text-xs font-bold',
                      isBWinner ? 'text-cyan-400 font-extrabold' : 'text-zinc-300'
                    )}
                  >
                    {toolBName}: {valB.toFixed(1)}
                  </span>
                </div>
              </div>

              {/* Comparative Dual Progress Bar */}
              <div className="grid grid-cols-2 gap-2 h-2.5">
                <div className="h-full bg-[#252833] rounded-l-full overflow-hidden flex justify-end">
                  <div
                    className={cn(
                      'h-full rounded-l-full transition-all duration-500',
                      isAWinner ? 'bg-indigo-500' : 'bg-indigo-700/80'
                    )}
                    style={{ width: `${(valA / 10) * 100}%` }}
                  />
                </div>
                <div className="h-full bg-[#252833] rounded-r-full overflow-hidden">
                  <div
                    className={cn(
                      'h-full rounded-r-full transition-all duration-500',
                      isBWinner ? 'bg-cyan-400' : 'bg-cyan-600/80'
                    )}
                    style={{ width: `${(valB / 10) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
