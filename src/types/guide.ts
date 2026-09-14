export interface RankedToolItem {
  rank: number;
  toolSlug: string;
  badge?: string; // e.g. "Best Overall", "Best for Terminal", "Best Context Window"
  whyChosen: string;
  pros: string[];
  cons: string[];
  idealFor: string;
  verdict: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface BestGuide {
  id: string;
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  headline: string;
  introduction: string;
  category: string;
  rankedTools: RankedToolItem[];
  evaluationCriteria: string[];
  faqs: FAQItem[];
  lastReviewed: string;
}
