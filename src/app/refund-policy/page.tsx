import React from 'react';
import { ShieldCheck, RotateCcw, ShieldAlert } from 'lucide-react';

export const metadata = {
  title: 'Refund Policy — THE SECRET',
  description: '100% pre-reveal refund guarantee for The Secret digital product.'
};

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-[#070709] py-16 px-4 sm:px-6 lg:px-8 text-zinc-100 font-sans">
      <div className="mx-auto max-w-3xl space-y-8">
        <div className="rounded-xl border border-amber-500/30 bg-amber-950/30 p-4 text-xs text-amber-200 flex items-start gap-2.5">
          <ShieldAlert className="h-4 w-4 shrink-0 text-amber-400 mt-0.5" />
          <span>
            <strong>Policy Review Notice:</strong> Standard consumer refund terms for scheduled digital releases. Subject to jurisdiction-specific consumer protection requirements.
          </span>
        </div>

        <div className="border-b border-white/10 pb-4">
          <h1 className="text-3xl font-bold text-white">Refund Policy</h1>
          <p className="text-xs font-mono text-zinc-500 mt-1">Last Updated: September 2026</p>
        </div>

        <div className="space-y-6 text-sm text-zinc-300 leading-relaxed">
          {/* Main Guarantee Highlight */}
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-6 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-base">
              <ShieldCheck className="h-5 w-5" />
              <span>100% Pre-Reveal Money-Back Guarantee</span>
            </div>
            <p className="text-zinc-300 text-xs leading-relaxed">
              If you change your mind for any reason before the official reveal timestamp (September 30, 2026 at 8:00 PM UTC), you are entitled to a full 100% refund of your $19.99 purchase.
            </p>
          </div>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">1. How to Request a Pre-Reveal Refund</h2>
            <p>
              To request a refund prior to reveal, simply email <strong className="font-mono text-amber-300">refunds@thesecret.club</strong> with:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-zinc-400">
              <li>Your order email address</li>
              <li>Your Secret ID (e.g. SECRET-7F3A92)</li>
            </ul>
            <p>
              Refunds are processed to the original payment method within 3 to 5 business days. Once refunded, your Secret ID is deactivated and will not decrypt on the reveal date.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">2. Post-Reveal Policy</h2>
            <p>
              Because The Secret delivers immediate, irrevocable access to high-resolution proprietary digital media, audio masters, and archival assets upon reveal, purchases are non-refundable once the reveal timestamp has passed and files are unlocked.
            </p>
            <p>
              Exceptions are granted in cases of verified technical non-delivery where our servers fail to grant access to the unlocked assets.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">3. Contact</h2>
            <p>
              For all refund-related questions, reach out to our dedicated support desk at <span className="font-mono text-amber-300">refunds@thesecret.club</span>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
