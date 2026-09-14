export type ToolCategory =
  | 'Coding'
  | 'Research'
  | 'Writing'
  | 'Productivity'
  | 'Design'
  | 'Video'
  | 'Audio'
  | 'Marketing';

export type PricingType = 'Free' | 'Freemium' | 'Paid';

export interface EditorialScores {
  capability: number; // 0-10 (Code synthesis, reasoning, multi-file intelligence)
  developerWorkflow: number; // 0-10 (Editor integration, terminal agility, speed)
  reliability: number; // 0-10 (Syntax accuracy, instruction adherence, low hallucinations)
  easeOfUse: number; // 0-10 (Setup simplicity, learning curve, documentation)
  value: number; // 0-10 (Feature availability, free tier utility, pricing predictability)
}

export interface PricingPlan {
  name: string;
  price: string;
  billingPeriod?: string;
  features: string[];
}

export interface ToolPricing {
  pricingType: PricingType;
  startingPrice: string; // e.g. "Check official site"
  freeTierAvailable: boolean;
  plans: PricingPlan[];
  verificationNote: string; // explicitly warns that pricing changes and should be verified on official site
}

export interface Tool {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  category: ToolCategory;
  website: string;
  affiliateUrl?: string;
  editorialRating: number; // 0-10 scale in 0.5 increments (e.g. 9.5, 9.0, 8.5)
  scores: EditorialScores;
  pricing: ToolPricing;
  features: string[];
  pros: string[];
  cons: string[];
  bestFor: string[];
  alternatives: string[]; // slugs of alternative tools
  overview: string;
  whoItIsFor: string;
  mainUseCases: string[];
  lastReviewed: string; // ISO date format e.g. "2026-09-01"
  isPopular?: boolean;
}
