import React from 'react';
import { FeatureComparisonRow } from '@/types/comparison';
import { CheckIcon } from '@/components/ui/Icons';
import { cn } from '@/lib/utils';

interface ComparisonMatrixProps {
  features: FeatureComparisonRow[];
  toolAName: string;
  toolBName: string;
  className?: string;
}

export function ComparisonMatrix({
  features,
  toolAName,
  toolBName,
  className,
}: ComparisonMatrixProps) {
  const categories = Array.from(new Set(features.map((f) => f.category)));

  return (
    <div
      className={cn(
        'rounded-xl border border-[#262830] bg-[#13151a] overflow-hidden shadow-md',
        className
      )}
    >
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[680px]">
          <thead>
            <tr className="border-b border-[#262830] bg-[#181a21]">
              <th className="py-4 px-5 text-xs font-bold text-zinc-300 uppercase tracking-wider font-mono w-1/3">
                Feature / Capability
              </th>
              <th className="py-4 px-5 text-xs font-bold text-indigo-300 uppercase tracking-wider font-mono w-1/3">
                {toolAName}
              </th>
              <th className="py-4 px-5 text-xs font-bold text-cyan-300 uppercase tracking-wider font-mono w-1/3">
                {toolBName}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#23262f] text-sm">
            {categories.map((cat) => {
              const rows = features.filter((f) => f.category === cat);
              return (
                <React.Fragment key={cat}>
                  {/* Category Header Row */}
                  <tr className="bg-[#0b0c0e]">
                    <td
                      colSpan={3}
                      className="py-3 px-5 text-xs font-mono font-bold uppercase tracking-wider text-zinc-200"
                    >
                      {cat}
                    </td>
                  </tr>

                  {/* Feature Rows */}
                  {rows.map((row, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-[#181a21] transition-colors"
                    >
                      <td className="py-4 px-5 font-semibold text-white">
                        <div>{row.featureName}</div>
                        {row.notes && (
                          <div className="text-xs text-zinc-400 mt-1 font-normal">
                            {row.notes}
                          </div>
                        )}
                      </td>
                      <td
                        className={cn(
                          'py-4 px-5 leading-relaxed',
                          row.winner === 'toolA'
                            ? 'text-white font-semibold bg-indigo-950/30'
                            : 'text-zinc-300'
                        )}
                      >
                        <div className="flex items-start gap-2">
                          {row.winner === 'toolA' && (
                            <CheckIcon className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                          )}
                          <span>{row.toolAValue}</span>
                        </div>
                      </td>
                      <td
                        className={cn(
                          'py-4 px-5 leading-relaxed',
                          row.winner === 'toolB'
                            ? 'text-white font-semibold bg-cyan-950/30'
                            : 'text-zinc-300'
                        )}
                      >
                        <div className="flex items-start gap-2">
                          {row.winner === 'toolB' && (
                            <CheckIcon className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                          )}
                          <span>{row.toolBValue}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
