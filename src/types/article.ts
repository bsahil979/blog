export interface Article {
  id: string;
  slug: string;
  title: string;
  metaDescription: string;
  category: string;
  readTime: string;
  publishedAt: string;
  updatedAt: string;
  author: {
    name: string;
    role: string;
  };
  summary: string;
  content: string; // Markdown / structured sections
  tags: string[];
}
