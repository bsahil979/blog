/**
 * Core utility functions for AIForDevs.tech
 */

export function cn(...classes: (string | boolean | undefined | null | { [key: string]: boolean })[]): string {
  const result: string[] = [];
  for (const item of classes) {
    if (!item) continue;
    if (typeof item === 'string') {
      result.push(item);
    } else if (typeof item === 'object') {
      for (const [key, val] of Object.entries(item)) {
        if (val) result.push(key);
      }
    }
  }
  return result.join(' ');
}

export function formatDate(dateString: string): string {
  try {
    const d = new Date(dateString);
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return dateString;
  }
}

/**
 * Formats an ISO date string (YYYY-MM-DD) as "Month YYYY" for editorial data labels.
 * Used for "Editorial data updated: September 2026" rather than implying
 * a specific day was manually reviewed.
 */
export function formatReviewPeriod(dateString: string): string {
  try {
    // Parse date as UTC to avoid timezone shifts changing the month
    const [year, month] = dateString.split('-').map(Number);
    const d = new Date(Date.UTC(year, month - 1, 1));
    return d.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
      timeZone: 'UTC',
    });
  } catch {
    return dateString;
  }
}
