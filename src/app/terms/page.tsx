import React from 'react';
import Link from 'next/link';
import { ShieldAlert, FileText } from 'lucide-react';

export const metadata = {
  title: 'Terms of Service — THE SECRET',
  description: 'Terms of Service for The Secret digital product and mystery experience platform.'
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#070709] py-16 px-4 sm:px-6 lg:px-8 text-zinc-100 font-sans">
      <div className="mx-auto max-w-3xl space-y-8">
        {/* Review Notice */}
        <div className="rounded-xl border border-amber-500/30 bg-amber-950/30 p-4 text-xs text-amber-200 flex items-start gap-2.5">
          <ShieldAlert className="h-4 w-4 shrink-0 text-amber-400 mt-0.5" />
          <span>
            <strong>Legal Notice:</strong> This document represents our operational terms. Formal legal counsel review is recommended prior to international commercial expansion.
          </span>
        </div>

        <div className="border-b border-white/10 pb-4">
          <h1 className="text-3xl font-bold text-white">Terms of Service</h1>
          <p className="text-xs font-mono text-zinc-500 mt-1">Last Updated: September 2026</p>
        </div>

        <div className="space-y-6 text-sm text-zinc-300 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">1. Nature of the Product</h2>
            <p>
              “The Secret” is a proprietary digital creative entertainment product. A purchase of The Secret for $19.99 USD grants the purchaser a personal, non-exclusive license to access the guaranteed digital content (including multimedia narrative, audio master, and archival certificate) revealed at the scheduled date and time.
            </p>
            <p className="font-semibold text-amber-300">
              The Secret is strictly NOT a lottery, raffle, prize draw, casino game, or financial security. No cash prizes, physical assets, or speculative financial returns are promised, offered, or obtainable.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">2. Reveal Date & Delivery</h2>
            <p>
              The scheduled synchronized reveal target is September 30, 2026 at 8:00 PM UTC. Access to unlocked content is delivered via the customer’s verified Secret ID through our web portal. Delivery is guaranteed upon arrival of the scheduled reveal timestamp.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">3. Pricing & Payments</h2>
            <p>
              The price of one Secret is a one-time charge of $19.99 USD. There are no recurring subscriptions or auto-renewals. All payment processing is conducted securely via reputable third-party payment gateways (e.g. Stripe).
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">4. Intellectual Property</h2>
            <p>
              All creative narrative materials, audio tracks, digital artworks, and design trademarks are the exclusive intellectual property of The Secret. Purchasers may retain personal digital copies of their archival certificates and dossiers for non-commercial enjoyment.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">5. Governing Law & Contact</h2>
            <p>
              For legal inquiries or clarifications regarding these terms, contact our support team at <span className="font-mono text-amber-300">legal@thesecret.club</span>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
