import React from 'react';
import { ComparisonVerdict } from '@/types/comparison';
import { CheckIcon, SparklesIcon } from '@/components/ui/Icons';
import { cn } from '@/lib/utils';

interface VerdictBoxProps {
  verdict: ComparisonVerdict;
  toolAName: string;
  toolBName: string;
  className?: string;
}

export function VerdictBox({
  verdict,
  toolAName,
  toolBName,
  className,
}: VerdictBoxProps) {
  return (
    <div
      className={cn(
        'rounded-xl border border-[#262830] bg-[#13151a] overflow-hidden shadow-md',
        className
      )}
    >
      {/* Header Banner */}
      <div className="p-6 md:p-8 border-b border-[#262830] bg-[#181a21]">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-indigo-400 uppercase tracking-wider mb-2.5">
          <SparklesIcon className="w-4 h-4" />
          <span>Our Editorial Verdict</span>
        </div>
        <p className="text-base sm:text-lg text-white leading-relaxed font-normal">
          {verdict.summary}
        </p>
      </div>

      {/* Side by side selection conditions */}
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#262830]">
        {/* Choose Tool A */}
        <div className="p-6 md:p-8 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
            <span>Choose {toolAName} if...</span>
          </h3>
          <ul className="space-y-3">
            {verdict.chooseToolAIf.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm text-zinc-200">
                <CheckIcon className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Choose Tool B */}
        <div className="p-6 md:p-8 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" />
            <span>Choose {toolBName} if...</span>
          </h3>
          <ul className="space-y-3">
            {verdict.chooseToolBIf.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm text-zinc-200">
                <CheckIcon className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Final Thought */}
      {verdict.finalThought && (
        <div className="p-5 bg-[#0e1014] border-t border-[#262830] text-sm text-zinc-300">
          <span className="font-bold text-white">Bottom line: </span>
          {verdict.finalThought}
        </div>
      )}
    </div>
  );
}
