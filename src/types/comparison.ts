export interface FeatureComparisonRow {
  featureName: string;
  category: 'Core Capabilities' | 'IDE & Workflow' | 'Context & Architecture' | 'Pricing & Plans';
  toolAValue: string;
  toolBValue: string;
  winner?: 'toolA' | 'toolB' | 'tie';
  notes?: string;
}

export interface ComparisonVerdict {
  summary: string;
  chooseToolAIf: string[];
  chooseToolBIf: string[];
  finalThought: string;
}

export interface Comparison {
  id: string;
  slug: string;
  toolASlug: string;
  toolBSlug: string;
  title: string;
  subtitle: string;
  summary: string;
  verdict: ComparisonVerdict;
  featureComparisons: FeatureComparisonRow[];
  scores: {
    capability: { toolA: number; toolB: number };
    developerWorkflow: { toolA: number; toolB: number };
    reliability: { toolA: number; toolB: number };
    easeOfUse: { toolA: number; toolB: number };
    value: { toolA: number; toolB: number };
  };
  detailedSections: {
    title: string;
    content: string;
  }[];
  lastReviewed: string;
}
