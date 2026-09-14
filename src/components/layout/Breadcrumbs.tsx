import React from 'react';
import Link from 'next/link';
import { ChevronRightIcon } from '@/components/ui/Icons';
import { StructuredData } from '@/components/ui/StructuredData';
import { generateBreadcrumbSchema } from '@/lib/seo';

export interface BreadcrumbStep {
  name: string;
  url: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbStep[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const allItems: BreadcrumbStep[] = [{ name: 'Home', url: '/' }, ...items];
  const schema = generateBreadcrumbSchema(allItems);

  return (
    <>
      <StructuredData data={schema} />
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex items-center flex-wrap gap-2 text-xs font-medium text-zinc-300">
          {allItems.map((item, index) => {
            const isLast = index === allItems.length - 1;
            return (
              <li key={item.url} className="flex items-center gap-2">
                {index > 0 && (
                  <ChevronRightIcon className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                )}
                {isLast ? (
                  <span className="text-white font-bold truncate max-w-[220px] sm:max-w-sm">
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={item.url}
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
