import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  HelpCircle,
  CreditCard,
  Lock,
  Mail,
  FileCheck,
  RefreshCw
} from 'lucide-react';

export const metadata = {
  title: 'Trust Center — THE SECRET',
  description:
    'Our radical commitment to honesty, guaranteed digital delivery, non-gambling operations, and customer data privacy.'
};

export default function TrustPage() {
  return (
    <div className="min-h-screen bg-[#070709] py-16 px-4 sm:px-6 lg:px-8 text-zinc-100">
      <div className="mx-auto max-w-4xl space-y-16">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-4 py-1.5 text-xs font-mono tracking-widest text-emerald-300">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>RADICAL TRANSPARENCY GUARANTEE</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
            The Trust Center
          </h1>
          <p className="text-base text-zinc-400 max-w-2xl mx-auto font-sans leading-relaxed">
            Anticipation is exciting only when built upon rock-solid truth. Here is our complete, transparent operational standard.
          </p>
        </div>

        {/* Core Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Section 1: What are you buying? */}
          <div className="rounded-3xl border border-white/10 bg-zinc-900/60 p-8 space-y-4 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
                <FileCheck className="h-5 w-5" />
              </div>
              <h2 className="text-lg font-bold text-white">What are you buying?</h2>
            </div>
            <p className="text-sm text-zinc-300 leading-relaxed">
              When you pay $19.99, you are purchasing a single guaranteed digital mystery entertainment product. At the synchronized reveal date (September 30, 2026 — 8:00 PM UTC), you unlock access to an exclusive multimedia digital package: an interactive lore dossier, original high-definition audio soundscapes, and a cryptographically verified archival custody certificate.
            </p>
          </div>

          {/* Section 2: Is this gambling? */}
          <div className="rounded-3xl border border-white/10 bg-zinc-900/60 p-8 space-y-4 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h2 className="text-lg font-bold text-white">Is this gambling?</h2>
            </div>
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-emerald-400">No.</strong> The Secret is strictly a paid digital creative experience. It is not a lottery, raffle, prize draw, or sweepstakes. We never promise or offer cash prizes, investment returns, or financial payouts. Every customer receives the exact same guaranteed, premium digital content.
            </p>
          </div>

          {/* Section 3: Is there a subscription? */}
          <div className="rounded-3xl border border-white/10 bg-zinc-900/60 p-8 space-y-4 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
                <RefreshCw className="h-5 w-5" />
              </div>
              <h2 className="text-lg font-bold text-white">Is there a subscription?</h2>
            </div>
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-white">“No. This is a one-time purchase unless explicitly stated otherwise.”</strong> There are no recurring fees, no surprise monthly deductions, and no hidden subscriptions. You pay $19.99 once and retain permanent access to your unlocked Secret.
            </p>
          </div>

          {/* Section 4: What happens after payment? */}
          <div className="rounded-3xl border border-white/10 bg-zinc-900/60 p-8 space-y-4 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
                <Lock className="h-5 w-5" />
              </div>
              <h2 className="text-lg font-bold text-white">What happens after payment?</h2>
            </div>
            <p className="text-sm text-zinc-300 leading-relaxed">
              Upon successful payment, our cryptographic engine generates your unique Secret ID (e.g., <span className="font-mono text-amber-300">SECRET-7F3A92</span>). A confirmation receipt is immediately sent to your email with a direct link to your personal Vault. You can visit anytime to track the live countdown until reveal.
            </p>
          </div>

          {/* Section 5: Refunds */}
          <div className="rounded-3xl border border-white/10 bg-zinc-900/60 p-8 space-y-4 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/10 text-rose-400">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h2 className="text-lg font-bold text-white">Refunds Policy</h2>
            </div>
            <p className="text-sm text-zinc-300 leading-relaxed">
              We offer a 100% no-questions-asked refund at any time prior to the scheduled reveal date and time. Simply contact us with your purchase email or Secret ID. Once the Secret is unlocked and the digital files are accessed, sales are generally non-refundable except for technical non-delivery.
            </p>
          </div>

          {/* Section 6: Privacy */}
          <div className="rounded-3xl border border-white/10 bg-zinc-900/60 p-8 space-y-4 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
                <Lock className="h-5 w-5" />
              </div>
              <h2 className="text-lg font-bold text-white">Data Privacy</h2>
            </div>
            <p className="text-sm text-zinc-300 leading-relaxed">
              We collect only the bare minimum information necessary: your email address (for delivering your Secret ID and reveal notice) and basic purchase transaction records. We never sell, rent, or trade your personal data to advertisers or third parties.
            </p>
          </div>

          {/* Section 7: Payments */}
          <div className="rounded-3xl border border-white/10 bg-zinc-900/60 p-8 space-y-4 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                <CreditCard className="h-5 w-5" />
              </div>
              <h2 className="text-lg font-bold text-white">Payment Security</h2>
            </div>
            <p className="text-sm text-zinc-300 leading-relaxed">
              All transactions are encrypted with 256-bit SSL and processed through industry-standard PCI-DSS Level 1 certified payment providers (such as Stripe). We do not receive or store your raw credit card numbers on our servers.
            </p>
          </div>

          {/* Section 8: Real Support Contact */}
          <div className="rounded-3xl border border-white/10 bg-zinc-900/60 p-8 space-y-4 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
                <Mail className="h-5 w-5" />
              </div>
              <h2 className="text-lg font-bold text-white">Direct Support Contact</h2>
            </div>
            <p className="text-sm text-zinc-300 leading-relaxed">
              Have questions, lost your Secret ID, or need a pre-reveal refund? Reach out to our human support desk anytime at <strong className="text-amber-300 font-mono">help@thesecret.club</strong>. We respond to all inquiries within 24 business hours.
            </p>
          </div>
        </div>

        {/* CTA to get Secret */}
        <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-zinc-900 via-zinc-950 to-zinc-900 p-8 sm:p-12 text-center space-y-4">
          <h3 className="text-2xl font-bold text-white">
            Experience the mystery with confidence.
          </h3>
          <p className="text-xs text-zinc-400 max-w-md mx-auto">
            Guaranteed digital craftsmanship. Full pre-reveal refund protection.
          </p>
          <div className="pt-2">
            <Link
              href="/checkout"
              className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-3 text-xs font-bold uppercase tracking-wider text-zinc-950 hover:bg-amber-400 transition shadow-lg shadow-amber-500/20"
            >
              <Lock className="h-3.5 w-3.5" />
              <span>Get Your Secret — $19.99</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
