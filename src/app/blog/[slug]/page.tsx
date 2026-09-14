import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { getAllArticles, getArticleBySlug } from '@/lib/db';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Badge } from '@/components/ui/Badge';
import { StructuredData } from '@/components/ui/StructuredData';
import { constructMetadata, generateArticleSchema } from '@/lib/seo';
import { CalendarIcon, ArrowLeftIcon, ArrowRightIcon, BookOpenIcon } from '@/components/ui/Icons';
import { formatDate } from '@/lib/utils';

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return constructMetadata({ title: 'Article Not Found — AIForDevs' });
  }

  return constructMetadata({
    title: `${article.title} — AIForDevs`,
    description: article.metaDescription,
    canonicalUrl: `/blog/${article.slug}`,
  });
}

function renderFormattedText(text: string) {
  const parts: React.ReactNode[] = [];
  let lastIdx = 0;
  const regex = /\[([^\]]+)\]\(([^)]+)\)|`([^`]+)`|\*\*([^*]+)\*\*/g;
  let match;
  let key = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIdx) {
      parts.push(text.slice(lastIdx, match.index));
    }
    if (match[1] && match[2]) {
      const href = match[2];
      const isInternal = href.startsWith('/');
      parts.push(
        isInternal ? (
          <Link
            key={key++}
            href={href}
            className="text-indigo-400 hover:text-indigo-300 underline font-medium"
          >
            {match[1]}
          </Link>
        ) : (
          <a
            key={key++}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-400 hover:text-indigo-300 underline font-medium"
          >
            {match[1]}
          </a>
        )
      );
    } else if (match[3]) {
      parts.push(
        <code
          key={key++}
          className="px-1.5 py-0.5 rounded bg-[#1c1f27] border border-[#2d313c] text-indigo-300 text-xs font-mono"
        >
          {match[3]}
        </code>
      );
    } else if (match[4]) {
      parts.push(
        <strong key={key++} className="font-bold text-white">
          {match[4]}
        </strong>
      );
    }
    lastIdx = regex.lastIndex;
  }
  if (lastIdx < text.length) {
    parts.push(text.slice(lastIdx));
  }
  return parts.length > 0 ? parts : text;
}

export default async function ArticleDetailPage({
  params,
}: ArticlePageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const allArticles = await getAllArticles();
  const relatedArticles = allArticles
    .filter((a) => a.slug !== article.slug)
    .slice(0, 3);

  const articleSchema = generateArticleSchema(article);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
      <StructuredData data={articleSchema} />

      <Breadcrumbs
        items={[
          { name: 'Home', url: '/' },
          { name: 'Blog', url: '/blog' },
          { name: article.title, url: `/blog/${article.slug}` },
        ]}
      />

      {/* Article Header */}
      <div className="space-y-4 mb-10 pb-8 border-b border-[#23262f]">
        <div className="flex items-center gap-3 flex-wrap">
          <Badge variant="primary">{article.category}</Badge>
          <span className="text-xs text-zinc-300 font-mono font-medium">
            {article.readTime}
          </span>
          <span className="text-xs text-zinc-400 font-mono flex items-center gap-1">
            <CalendarIcon className="w-3.5 h-3.5" />
            <span>Published: {formatDate(article.publishedAt)}</span>
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
          {article.title}
        </h1>

        <p className="text-base sm:text-lg text-zinc-200 leading-relaxed font-normal">
          {article.summary}
        </p>

        <div className="pt-2 flex items-center gap-3 text-xs text-zinc-300">
          <div className="w-8 h-8 rounded-full bg-[#1c1f27] border border-[#2d313c] flex items-center justify-center font-bold text-white">
            AD
          </div>
          <div>
            <p className="font-semibold text-white">{article.author.name}</p>
            <p className="text-zinc-400 text-xs font-mono">{article.author.role}</p>
          </div>
        </div>
      </div>

      {/* Article Body */}
      <article className="space-y-6 text-base text-zinc-200 leading-relaxed">
        {article.content.split('\n\n').map((block, idx) => {
          if (block.startsWith('## ')) {
            return (
              <h2
                key={idx}
                className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight pt-6 pb-2 border-b border-[#23262f]"
              >
                {block.replace('## ', '')}
              </h2>
            );
          }
          if (block.startsWith('### ')) {
            return (
              <h3
                key={idx}
                className="text-xl sm:text-2xl font-bold text-white pt-4 pb-1"
              >
                {block.replace('### ', '')}
              </h3>
            );
          }
          if (block.startsWith('```')) {
            const cleanCode = block.replace(/```[a-z]*\n?/g, '');
            return (
              <pre
                key={idx}
                className="p-5 rounded-xl bg-[#0b0c0e] border border-[#2b2e38] text-xs sm:text-sm font-mono text-zinc-100 overflow-x-auto my-5 shadow-sm"
              >
                <code>{cleanCode}</code>
              </pre>
            );
          }
          if (block.startsWith('|')) {
            const lines = block.trim().split('\n');
            return (
              <div key={idx} className="overflow-x-auto my-5">
                <table className="w-full text-xs sm:text-sm text-left border-collapse border border-[#262830] bg-[#13151a]">
                  <tbody>
                    {lines.map((row, rIdx) => {
                      if (row.includes('---')) return null;
                      const cells = row
                        .split('|')
                        .map((c) => c.trim())
                        .filter(Boolean);
                      return (
                        <tr
                          key={rIdx}
                          className={
                            rIdx === 0
                              ? 'bg-[#181a21] font-bold text-white border-b border-[#262830]'
                              : 'border-t border-[#23262f] text-zinc-200'
                          }
                        >
                          {cells.map((cell, cIdx) => (
                            <td key={cIdx} className="p-3.5">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            );
          }
          if (block.startsWith('- ')) {
            const items = block.split('\n').filter(Boolean);
            return (
              <ul key={idx} className="space-y-2 pl-5 list-disc marker:text-indigo-400">
                {items.map((item, iIdx) => (
                  <li key={iIdx} className="text-zinc-200 text-sm sm:text-base">
                    {renderFormattedText(item.replace(/^- /, ''))}
                  </li>
                ))}
              </ul>
            );
          }
          return (
            <p key={idx} className="text-zinc-200 leading-relaxed text-sm sm:text-base font-normal">
              {renderFormattedText(block)}
            </p>
          );
        })}
      </article>

      {/* Article Footer & Tags */}
      <div className="mt-14 pt-8 border-t border-[#23262f] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-zinc-400 font-mono font-medium">Tags:</span>
          {article.tags.map((t) => (
            <span
              key={t}
              className="text-xs font-medium px-3 py-1 rounded-full bg-[#1c1f27] text-zinc-200 border border-[#2d313c]"
            >
              #{t}
            </span>
          ))}
        </div>
        <Link
          href="/blog"
          className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1.5"
        >
          <ArrowLeftIcon className="w-3.5 h-3.5" />
          <span>Back to all guides</span>
        </Link>
      </div>

      {/* Recommended Next Reads */}
      {relatedArticles.length > 0 && (
        <div className="mt-16 pt-10 border-t border-[#23262f]">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider mb-2">
            <BookOpenIcon className="w-4 h-4" />
            <span>Recommended Reading</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mb-6">
            Continue Exploring AI Engineering
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {relatedArticles.map((rel) => (
              <Link
                key={rel.id}
                href={`/blog/${rel.slug}`}
                className="group flex flex-col justify-between p-5 rounded-xl bg-[#13151a] hover:bg-[#181a21] border border-[#262830] hover:border-amber-500/80 transition-all shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-zinc-400 mb-2 font-mono">
                    <span className="text-zinc-300 font-semibold">{rel.category}</span>
                    <span>{rel.readTime}</span>
                  </div>
                  <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors mb-2 leading-snug line-clamp-2">
                    {rel.title}
                  </h3>
                  <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed mb-4">
                    {rel.summary}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-xs font-semibold text-amber-400 group-hover:text-amber-300">
                  <span>Read article</span>
                  <ArrowRightIcon className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
