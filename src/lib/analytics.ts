/**
 * Google Analytics 4 Configuration & Utilities
 * Single source of truth for the Google Analytics Measurement ID across the application.
 */

export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-21KMY4G84S';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Dispatch custom GA4 events (e.g. outbound link clicks, tool comparisons, category filters)
 */
export function sendAnalyticsEvent(
  action: string,
  params?: Record<string, string | number | boolean>
) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', action, params);
  }
}
