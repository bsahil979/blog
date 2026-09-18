/**
 * Google Analytics 4 & Privacy-Conscious Event Tracking
 * Events: landing_page_view, how_it_works_clicked, checkout_started,
 * checkout_completed, secret_created, secret_accessed, secret_revealed,
 * faq_opened, trust_page_viewed
 */

export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-SECRET2026';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export type AnalyticsEventName =
  | 'landing_page_view'
  | 'how_it_works_clicked'
  | 'checkout_started'
  | 'checkout_completed'
  | 'secret_created'
  | 'secret_accessed'
  | 'secret_revealed'
  | 'faq_opened'
  | 'trust_page_viewed';

export function trackEvent(
  eventName: AnalyticsEventName,
  params?: Record<string, string | number | boolean>
) {
  if (typeof window !== 'undefined') {
    // 1. Send to Google Analytics 4 if available
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, params);
    }
    // 2. Safe local audit logger (useful for debugging & verification in browser console)
    if (process.env.NODE_ENV !== 'production') {
      console.log(`[Analytics Event] ${eventName}:`, params ?? {});
    }
  }
}

// Backward-compatible alias
export const sendAnalyticsEvent = trackEvent;
