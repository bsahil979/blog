import React from 'react';
import { ExternalLinkIcon } from '@/components/ui/Icons';
import { cn } from '@/lib/utils';

interface VisitButtonProps {
  toolName: string;
  website: string;
  affiliateUrl?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'outline';
}

export function VisitButton({
  toolName,
  website,
  affiliateUrl,
  className,
  size = 'md',
  variant = 'primary',
}: VisitButtonProps) {
  // Use affiliateUrl if configured in data; otherwise fall back to official website
  const destinationUrl = affiliateUrl || website;

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  const variantClasses = {
    primary:
      'bg-indigo-600 hover:bg-indigo-500 text-white font-medium shadow-sm hover:shadow-indigo-500/20 active:scale-[0.99]',
    secondary:
      'bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-medium border border-zinc-700 active:scale-[0.99]',
    outline:
      'bg-transparent hover:bg-zinc-900 text-zinc-300 hover:text-white border border-zinc-700 active:scale-[0.99]',
  };

  return (
    <a
      href={destinationUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      aria-label={`Visit official website of ${toolName}`}
    >
      <span>Visit official website</span>
      <ExternalLinkIcon className="w-3.5 h-3.5 opacity-80" />
    </a>
  );
}
