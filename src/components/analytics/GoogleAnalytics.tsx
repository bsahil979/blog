import { GoogleAnalytics as NextGoogleAnalytics } from '@next/third-parties/google';
import { GA_MEASUREMENT_ID } from '@/lib/analytics';

/**
 * Google Analytics 4 tracking component
 * Leverages the official Next.js @next/third-parties/google integration to load gtag.js
 * asynchronously after page hydration. Compatible with Next.js App Router and handles
 * GA4 Enhanced Measurement (history change page views, outbound clicks, scroll depth).
 */
export function GoogleAnalytics() {
  if (!GA_MEASUREMENT_ID) {
    return null;
  }

  return <NextGoogleAnalytics gaId={GA_MEASUREMENT_ID} />;
}
