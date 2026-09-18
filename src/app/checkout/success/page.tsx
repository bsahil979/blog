'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  Lock,
  Copy,
  Check,
  Mail,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Sparkles,
  Bitcoin,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { CountdownTimer } from '@/components/secret/CountdownTimer';
import { EmailModal } from '@/components/secret/EmailModal';

function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const secretId = searchParams.get('id') || 'SECRET-7F3A92';
  const customerEmail = searchParams.get('email') || 'collector@thesecret.club';
  const isBtc = searchParams.get('method') === 'btc';

  const [copied, setCopied] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(secretId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mx-auto max-w-2xl text-center space-y-8">
      {/* Top Badge */}
      <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-950/40 px-4 py-1.5 text-xs font-mono tracking-widest text-amber-300">
        <Bitcoin className="h-3.5 w-3.5 text-amber-400" />
        <span>BITCOIN PAYMENT SUBMITTED • EMAIL REGISTERED</span>
      </div>

      {/* Main Announcement */}
      <div className="space-y-3">
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
          Your Secret has been secured.
        </h1>
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/30 p-4 text-xs text-emerald-300 font-sans max-w-lg mx-auto leading-relaxed">
          <p>
            <strong>After successful payment</strong>, you will get an email regarding your Secret ID and access link in a short time.
          </p>
          <p className="mt-1 text-[11px] text-zinc-400">
            Registered to: <span className="text-white font-mono">{customerEmail}</span>
          </p>
        </div>
      </div>

      {/* Primary Secret ID Box */}
      <div className="relative rounded-3xl border border-amber-500/40 bg-gradient-to-b from-zinc-900 via-zinc-950 to-black p-8 sm:p-10 shadow-2xl shadow-amber-500/10">
        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-400">
          YOUR ALLOCATED SECRET IDENTIFIER
        </span>

        <div className="my-4 flex items-center justify-center gap-3">
          <span className="font-mono text-3xl sm:text-4xl font-black text-amber-300 tracking-wider">
            🔒 {secretId}
          </span>
          <button
            onClick={handleCopy}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10 hover:text-white transition"
            title="Copy Secret ID"
          >
            {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
          </button>
        </div>

        {/* Notice */}
        <div className="rounded-xl border border-white/5 bg-black/50 p-3.5 text-xs font-mono text-zinc-400">
          ⚠️ “Save your Secret ID. We will also send your confirmation email in a short time.”
        </div>

        {/* Reveal Target Date */}
        <div className="mt-8 border-t border-white/10 pt-6 space-y-4">
          <div className="flex items-center justify-center gap-2 text-xs font-mono text-zinc-300">
            <Calendar className="h-4 w-4 text-amber-400" />
            <span>Reveal date: <strong>September 30, 2026 — 8:00 PM UTC</strong></span>
          </div>

          <CountdownTimer
            targetDate="2026-09-30T20:00:00Z"
            size="md"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          href={`/secret/${secretId}`}
          className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-8 py-4 text-sm font-bold uppercase tracking-wider text-zinc-950 shadow-xl shadow-amber-500/20 hover:from-amber-400 hover:to-amber-500 hover:scale-[1.02] active:scale-[0.98] transition"
        >
          <Lock className="h-4 w-4 text-zinc-950" />
          <span>Open Secret Dashboard</span>
          <ArrowRight className="h-4 w-4 text-zinc-950" />
        </Link>

        <button
          onClick={() => setShowEmailModal(true)}
          className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-4 text-sm font-mono text-zinc-200 hover:bg-white/10 hover:text-white transition"
        >
          <Mail className="h-4 w-4 text-amber-400" />
          <span>Preview Email Notice</span>
        </button>
      </div>

      {/* Transactional Email Modal */}
      <EmailModal
        isOpen={showEmailModal}
        onClose={() => setShowEmailModal(false)}
        secretId={secretId}
        customerEmail={customerEmail}
        revealDate="September 30, 2026 — 8:00 PM UTC"
        defaultEmailType="confirmation"
      />
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen bg-[#070709] py-16 px-4 sm:px-6 lg:px-8 text-zinc-100 flex items-center justify-center">
      <Suspense fallback={<div className="text-zinc-500 font-mono text-xs">Securing Secret vault...</div>}>
        <CheckoutSuccessContent />
      </Suspense>
    </div>
  );
}
