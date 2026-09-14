import { TOOLS } from '@/data/tools';
import { COMPARISONS } from '@/data/comparisons';
import { BEST_GUIDES } from '@/data/best-guides';
import { ARTICLES } from '@/data/articles';
import { Tool, ToolCategory } from '@/types/tool';
import { Comparison } from '@/types/comparison';
import { BestGuide } from '@/types/guide';
import { Article } from '@/types/article';

export interface SearchResultItem {
  id: string;
  type: 'tool' | 'comparison' | 'guide' | 'article';
  title: string;
  description: string;
  url: string;
  badge?: string;
}

// Tools queries (Supabase/Postgres ready)
export async function getAllTools(): Promise<Tool[]> {
  return TOOLS;
}

export async function getToolBySlug(slug: string): Promise<Tool | null> {
  const tool = TOOLS.find((t) => t.slug === slug);
  return tool || null;
}

export async function getPopularTools(): Promise<Tool[]> {
  return TOOLS.filter((t) => t.isPopular);
}

export async function getToolsByCategory(category: ToolCategory): Promise<Tool[]> {
  return TOOLS.filter((t) => t.category.toLowerCase() === category.toLowerCase());
}

// Comparisons queries
export async function getAllComparisons(): Promise<Comparison[]> {
  return COMPARISONS;
}

export async function getComparisonBySlug(slug: string): Promise<Comparison | null> {
  const comparison = COMPARISONS.find((c) => c.slug === slug);
  return comparison || null;
}

export async function getComparisonsForTool(toolSlug: string): Promise<Comparison[]> {
  return COMPARISONS.filter(
    (c) => c.toolASlug === toolSlug || c.toolBSlug === toolSlug
  );
}

// Best AI Guides queries
export async function getAllGuides(): Promise<BestGuide[]> {
  return BEST_GUIDES;
}

export async function getGuideBySlug(slug: string): Promise<BestGuide | null> {
  const guide = BEST_GUIDES.find((g) => g.slug === slug);
  return guide || null;
}

// Articles queries
export async function getAllArticles(): Promise<Article[]> {
  return [...ARTICLES].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const article = ARTICLES.find((a) => a.slug === slug);
  return article || null;
}

// Global search across all entities
export async function searchAll(query: string): Promise<SearchResultItem[]> {
  if (!query || query.trim().length === 0) return [];

  const q = query.toLowerCase().trim();
  const results: SearchResultItem[] = [];

  // Match tools
  for (const tool of TOOLS) {
    if (
      tool.name.toLowerCase().includes(q) ||
      tool.description.toLowerCase().includes(q) ||
      tool.bestFor.some((b) => b.toLowerCase().includes(q)) ||
      tool.category.toLowerCase().includes(q)
    ) {
      results.push({
        id: `tool-${tool.id}`,
        type: 'tool',
        title: tool.name,
        description: tool.tagline,
        url: `/tools/${tool.slug}`,
        badge: tool.category,
      });
    }
  }

  // Match comparisons
  for (const comp of COMPARISONS) {
    if (
      comp.title.toLowerCase().includes(q) ||
      comp.summary.toLowerCase().includes(q) ||
      comp.toolASlug.toLowerCase().includes(q) ||
      comp.toolBSlug.toLowerCase().includes(q)
    ) {
      results.push({
        id: `comp-${comp.id}`,
        type: 'comparison',
        title: comp.title,
        description: comp.subtitle,
        url: `/compare/${comp.slug}`,
        badge: 'Comparison',
      });
    }
  }

  // Match Best AI guides
  for (const guide of BEST_GUIDES) {
    if (
      guide.title.toLowerCase().includes(q) ||
      guide.introduction.toLowerCase().includes(q) ||
      guide.slug.toLowerCase().includes(q)
    ) {
      results.push({
        id: `guide-${guide.id}`,
        type: 'guide',
        title: guide.title,
        description: guide.headline,
        url: `/best/${guide.slug}`,
        badge: 'Best Of Guide',
      });
    }
  }

  // Match articles
  for (const article of ARTICLES) {
    if (
      article.title.toLowerCase().includes(q) ||
      article.summary.toLowerCase().includes(q) ||
      article.tags.some((t) => t.toLowerCase().includes(q))
    ) {
      results.push({
        id: `art-${article.id}`,
        type: 'article',
        title: article.title,
        description: article.summary,
        url: `/blog/${article.slug}`,
        badge: 'Editorial Guide',
      });
    }
  }

  return results;
}
