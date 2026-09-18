import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;
const fromEmail = process.env.FROM_EMAIL || 'The Secret <vault@thesecret.club>';
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://thesecret.club';

interface SendConfirmationParams {
  to: string;
  secretId: string;
  customerName?: string;
  revealDate?: string;
}

/**
 * Dispatches Email 1: Confirmation after purchase
 */
export async function sendConfirmationEmail({
  to,
  secretId,
  customerName = 'Collector',
  revealDate = 'September 30, 2026 — 8:00 PM UTC'
}: SendConfirmationParams) {
  const accessLink = `${siteUrl}/secret/${secretId}`;

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #070709; color: #f4f4f7; padding: 40px 20px; }
          .container { max-width: 560px; margin: 0 auto; background: #0e1015; border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 32px; }
          .badge { display: inline-block; background: rgba(212,175,55,0.1); border: 1px solid rgba(212,175,55,0.3); color: #f59e0b; padding: 4px 12px; border-radius: 9999px; font-family: monospace; font-size: 11px; letter-spacing: 2px; }
          .secret-box { background: #000; border: 1px solid rgba(212,175,55,0.4); border-radius: 12px; padding: 20px; text-align: center; margin: 24px 0; font-family: monospace; font-size: 24px; font-weight: bold; color: #fef08a; letter-spacing: 3px; }
          .button { display: inline-block; background: #d4af37; color: #000; text-decoration: none; padding: 14px 28px; border-radius: 10px; font-weight: bold; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; }
          .footer { margin-top: 32px; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 20px; font-size: 11px; color: #71717a; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="badge">CIPHER ENCRYPTED</div>
          <h1 style="color: #ffffff; font-size: 22px; margin-top: 16px;">Your Secret has been secured.</h1>
          <p style="color: #a1a1aa; font-size: 14px; line-height: 1.6;">
            Hello ${customerName},<br><br>
            Thank you for securing your Secret. You have acquired one guaranteed digital mystery experience. No spoilers. No gambling. Guaranteed high-craft creative content.
          </p>
          <div class="secret-box">🔒 ${secretId}</div>
          <div style="background: rgba(255,255,255,0.03); border-radius: 8px; padding: 16px; font-size: 12px; color: #a1a1aa; line-height: 1.8;">
            <div><strong>Synchronous Reveal:</strong> ${revealDate}</div>
            <div><strong>Amount:</strong> $19.99 USD (One-time, no subscription)</div>
            <div><strong>Format:</strong> Interactive Decrypted Dossier & Audio Master</div>
          </div>
          <p style="color: #a1a1aa; font-size: 12px; margin-top: 20px;">
            Save your Secret ID. You will need it to unlock your experience once the reveal date arrives.
          </p>
          <div style="text-align: center; margin-top: 24px;">
            <a href="${accessLink}" class="button">Access Your Secret Vault</a>
          </div>
          <div class="footer">
            THE SECRET • “You paid to discover what happens next.”<br>
            Support: help@thesecret.club
          </div>
        </div>
      </body>
    </html>
  `;

  if (resend) {
    try {
      const response = await resend.emails.send({
        from: fromEmail,
        to,
        subject: 'Your Secret has been secured 🔒',
        html
      });
      return { success: true, id: response.data?.id };
    } catch (error) {
      console.error('[Resend Error]', error);
      return { success: false, error };
    }
  } else {
    // Development / fallback logger
    console.log(`[Email Dispatch Simulation -> ${to}] Subject: Your Secret has been secured 🔒 (ID: ${secretId})`);
    return { success: true, simulated: true };
  }
}

/**
 * Dispatches Email 2: Reveal notification when countdown hits zero
 */
export async function sendRevealEmail({
  to,
  secretId
}: {
  to: string;
  secretId: string;
}) {
  const accessLink = `${siteUrl}/secret/${secretId}`;

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #070709; color: #f4f4f7; padding: 40px 20px; }
          .container { max-width: 560px; margin: 0 auto; background: #0e1015; border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 32px; }
          .badge { display: inline-block; background: rgba(16,185,129,0.1); border: 1px solid rgba(16,185,129,0.3); color: #34d399; padding: 4px 12px; border-radius: 9999px; font-family: monospace; font-size: 11px; letter-spacing: 2px; }
          .secret-box { background: #000; border: 1px solid rgba(16,185,129,0.4); border-radius: 12px; padding: 20px; text-align: center; margin: 24px 0; font-family: monospace; font-size: 24px; font-weight: bold; color: #a7f3d0; letter-spacing: 3px; }
          .button { display: inline-block; background: #10b981; color: #000; text-decoration: none; padding: 14px 28px; border-radius: 10px; font-weight: bold; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; }
          .footer { margin-top: 32px; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 20px; font-size: 11px; color: #71717a; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="badge">SEAL DISSOLVED</div>
          <h1 style="color: #ffffff; font-size: 22px; margin-top: 16px;">Your Secret has been revealed.</h1>
          <p style="color: #a1a1aa; font-size: 14px; line-height: 1.6;">
            The synchronized countdown has concluded. The cryptographic seal on your Secret is unlocked.
          </p>
          <div class="secret-box">🔓 ${secretId}</div>
          <p style="color: #a1a1aa; font-size: 13px;">
            For security and archival preservation, your multimedia experience is rendered securely within your authenticated vault.
          </p>
          <div style="text-align: center; margin-top: 24px;">
            <a href="${accessLink}" class="button">Unlock & View Your Content</a>
          </div>
          <div class="footer">
            THE SECRET • “One secret. One reveal. No spoilers.”<br>
            Support: help@thesecret.club
          </div>
        </div>
      </body>
    </html>
  `;

  if (resend) {
    try {
      const response = await resend.emails.send({
        from: fromEmail,
        to,
        subject: 'Your Secret has been revealed 🔓',
        html
      });
      return { success: true, id: response.data?.id };
    } catch (error) {
      console.error('[Resend Error]', error);
      return { success: false, error };
    }
  } else {
    console.log(`[Email Dispatch Simulation -> ${to}] Subject: Your Secret has been revealed 🔓 (ID: ${secretId})`);
    return { success: true, simulated: true };
  }
}
