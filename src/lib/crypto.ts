import crypto from 'crypto';

/**
 * Generates an unpredictable, cryptographically random Secret ID.
 * Format: SECRET-XXXXXX (e.g., SECRET-7F3A92)
 * High entropy alphanumeric characters, avoiding ambiguous glyphs like 0/O, 1/I.
 */
export function generateSecretId(): string {
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  const bytes = crypto.randomBytes(6);
  let id = '';
  for (let i = 0; i < 6; i++) {
    id += chars[bytes[i] % chars.length];
  }
  return `SECRET-${id}`;
}

/**
 * Validates whether a given string is a syntactically valid Secret ID.
 */
export function isValidSecretId(id: string): boolean {
  if (!id || typeof id !== 'string') return false;
  const clean = id.trim().toUpperCase();
  return /^SECRET-[23456789ABCDEFGHJKLMNPQRSTUVWXYZ]{6,10}$/.test(clean);
}

/**
 * Hashes a customer access token for tamper-proof verification.
 */
export function hashToken(token: string): string {
  return crypto.createHash('sha256').update(token).digest('hex');
}
