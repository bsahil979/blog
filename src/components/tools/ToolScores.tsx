import React from 'react';
import { EditorialScores } from '@/types/tool';
import { cn } from '@/lib/utils';

interface ToolScoresProps {
  scores: EditorialScores;
  className?: string;
}

export function ToolScores({ scores, className }: ToolScoresProps) {
  const scoreDimensions = [
    { key: 'capability', label: 'Capability', value: scores.capability, desc: 'Code synthesis, complex problem solving, and multi-file editing' },
    { key: 'developerWorkflow', label: 'Developer Workflow', value: scores.developerWorkflow, desc: 'IDE integration, terminal speed, and everyday developer velocity' },
    { key: 'reliability', label: 'Reliability', value: scores.reliability, desc: 'Syntax accuracy, instruction adherence, and predictable output' },
    { key: 'easeOfUse', label: 'Ease of Use', value: scores.easeOfUse, desc: 'Setup simplicity, onboarding experience, and documentation' },
    { key: 'value', label: 'Value', value: scores.value, desc: 'Feature accessibility relative to cost and plan predictability' },
  ];

  return (
    <div className={cn('p-6 rounded-xl bg-[#13151a] border border-[#262830] space-y-4 shadow-sm', className)}>
      <div className="pb-3 border-b border-[#23262f]">
        <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
          AIForDevs Editorial Score Breakdown
        </h3>
        <p className="text-xs text-zinc-300 mt-1">
          Evaluated independently across five software engineering dimensions.
        </p>
      </div>

      <div className="space-y-4 pt-1">
        {scoreDimensions.map((dim) => {
          const percentage = (dim.value / 10) * 100;
          return (
            <div key={dim.key} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-zinc-200">{dim.label}</span>
                <span className="font-mono font-bold text-white">
                  {dim.value.toFixed(1)} <span className="text-zinc-400 font-normal text-[10px]">/ 10</span>
                </span>
              </div>
              <div className="h-2 w-full bg-[#252833] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <p className="text-xs text-zinc-400">{dim.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
