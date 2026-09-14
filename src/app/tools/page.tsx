import { Suspense } from 'react';
import { Metadata } from 'next';
import { getAllTools } from '@/lib/db';
import { ToolsDirectoryClient } from './ToolsDirectoryClient';
import { constructMetadata } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: 'AI Tools for Developers Directory — AIForDevs',
  description:
    'Explore and compare AI tools for coding, research, productivity, and more. Filter by category, pricing model, and AIForDevs editorial score.',
  canonicalUrl: '/tools',
});

export default async function ToolsPage() {
  const tools = await getAllTools();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      {/* Header */}
      <div className="max-w-3xl mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
          AI Tools for Developers
        </h1>
        <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
          Explore and compare AI tools for coding, research, productivity, and more. Independently reviewed and rated across real software engineering workflows.
        </p>
      </div>

      {/* Interactive Directory with Search, Filter & Sort */}
      <Suspense
        fallback={
          <div className="p-12 text-center text-zinc-500 font-mono text-sm">
            Loading developer tools directory...
          </div>
        }
      >
        <ToolsDirectoryClient initialTools={tools} />
      </Suspense>
    </div>
  );
}
