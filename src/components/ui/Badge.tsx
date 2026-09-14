import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'neutral' | 'primary' | 'success' | 'warning' | 'accent' | 'outline';
  size?: 'sm' | 'md';
  className?: string;
}

export function Badge({
  children,
  variant = 'neutral',
  size = 'sm',
  className,
}: BadgeProps) {
  const variantStyles = {
    neutral: 'bg-[#1c1f27] text-zinc-200 border-[#2d313c]',
    primary: 'bg-indigo-950 text-indigo-300 border-indigo-700/80 font-semibold',
    success: 'bg-emerald-950 text-emerald-300 border-emerald-700/80 font-semibold',
    warning: 'bg-amber-950 text-amber-300 border-amber-700/80 font-semibold',
    accent: 'bg-cyan-950 text-cyan-300 border-cyan-700/80 font-semibold',
    outline: 'bg-transparent text-zinc-300 border-[#2d313c]',
  };

  const sizeStyles = {
    sm: 'text-xs px-2.5 py-0.5 rounded-full',
    md: 'text-sm px-3 py-1 rounded-full',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 border transition-colors shadow-xs',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {children}
    </span>
  );
}
