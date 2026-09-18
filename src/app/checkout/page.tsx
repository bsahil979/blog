'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Lock,
  ShieldCheck,
  CreditCard,
  Calendar,
  FileCheck,
  AlertCircle,
  ArrowRight,
  Sparkles,
  Info,
  CheckCircle2,
  Bitcoin
} from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

export default function CheckoutPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'crypto_btc'>('card');
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [understandNonLottery, setUnderstandNonLottery] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !email.includes('@')) {
      setError('Please provide a valid email address.');
      return;
    }
    if (!agreeTerms || !understandNonLottery) {
      setError('Please accept the purchase terms and non-lottery confirmation.');
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, paymentMethod })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Payment failed.');
      }

      // If Stripe returns a hosted checkout URL, redirect to Stripe
      if (data.url) {
        window.location.href = data.url;
        return;
      }

      trackEvent('checkout_completed', { secret_id: data.secretId });
      trackEvent('secret_created', { secret_id: data.secretId });

      // Direct to confirmation page
      router.push(`/checkout/success?id=${data.secretId}&email=${encodeURIComponent(data.email)}`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'An error occurred during checkout.';
      setError(msg);
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#070709] py-12 px-4 sm:px-6 lg:px-8 text-zinc-100">
      <div className="mx-auto max-w-5xl">
        {/* Header Breadcrumb */}
        <div className="mb-8 flex items-center justify-between border-b border-white/10 pb-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition"
          >
            <Lock className="h-3.5 w-3.5 text-amber-400" />
            <span>THE SECRET / SECURE PAYMENT</span>
          </Link>
          <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400">
            <ShieldCheck className="h-4 w-4" />
            <span>256-BIT ENCRYPTED</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Order Summary & Mandatory Disclosures */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl border border-white/10 bg-zinc-900/80 p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6">
              <div className="border-b border-white/10 pb-4">
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-amber-400 font-semibold">
                  ORDER SUMMARY
                </span>
                <h2 className="text-2xl font-bold text-white mt-1">
                  The Secret — Digital Mystery Experience
                </h2>
                <p className="text-xs text-amber-400/90 font-mono mt-0.5">
                  One-time purchase • $19.99 • No subscription
                </p>
              </div>

              {/* Price Row */}
              <div className="flex items-baseline justify-between border-b border-white/10 pb-4">
                <span className="text-sm text-zinc-400">Total Due</span>
                <div className="text-right">
                  <span className="text-3xl font-black text-white">$19.99</span>
                  <span className="text-xs text-zinc-500 ml-1">USD</span>
                  <div className="text-[10px] text-emerald-400 font-mono">
                    Guaranteed digital delivery • No recurring fees
                  </div>
                </div>
              </div>

              {/* Specifications List */}
              <div className="space-y-3.5 text-xs">
                <div className="flex items-start gap-2.5 text-zinc-300">
                  <Calendar className="h-4 w-4 shrink-0 text-amber-400 mt-0.5" />
                  <div>
                    <strong className="block text-white font-mono text-[11px]">SYNCHRONOUS REVEAL</strong>
                    <span className="text-zinc-400">September 30, 2026 — 8:00 PM UTC</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 text-zinc-300">
                  <FileCheck className="h-4 w-4 shrink-0 text-amber-400 mt-0.5" />
                  <div>
                    <strong className="block text-white font-mono text-[11px]">DELIVERY FORMAT</strong>
                    <span className="text-zinc-400">Interactive Decrypted Dossier, Original Audio Soundscape & Archival Certificate.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 text-zinc-300">
                  <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-400 mt-0.5" />
                  <div>
                    <strong className="block text-white font-mono text-[11px]">REFUND POLICY</strong>
                    <span className="text-zinc-400">100% money-back guarantee prior to the scheduled reveal date.</span>
                  </div>
                </div>
              </div>

              {/* Transparency Guarantee Box */}
              <div className="rounded-2xl border border-amber-500/20 bg-amber-950/20 p-4 text-xs text-zinc-300 space-y-1.5 leading-relaxed">
                <div className="flex items-center gap-1.5 text-amber-400 font-mono text-[11px] font-bold">
                  <Info className="h-3.5 w-3.5" />
                  <span>TRANSPARENCY GUARANTEE</span>
                </div>
                <p className="text-[11px] text-zinc-300">
                  This purchase is strictly for an authentic, multimedia creative digital experience. It is <strong>NOT</strong> a lottery, raffle, prize draw, or gamble. No cash winnings are offered.
                </p>
              </div>
            </div>

            {/* Quick links to policies */}
            <div className="flex justify-between text-[11px] font-mono text-zinc-500 px-2">
              <Link href="/terms" target="_blank" className="hover:text-zinc-300 underline">
                Terms of Service
              </Link>
              <Link href="/privacy" target="_blank" className="hover:text-zinc-300 underline">
                Privacy Policy
              </Link>
              <Link href="/refund-policy" target="_blank" className="hover:text-zinc-300 underline">
                Refund Policy
              </Link>
            </div>
          </div>

          {/* Right Column: Production Payment Provider Section */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-white/10 bg-zinc-900/90 p-6 sm:p-10 backdrop-blur-xl shadow-2xl space-y-6">
              <div className="border-b border-white/10 pb-4">
                <h3 className="text-xl font-bold text-white">Payment Method</h3>
                <p className="text-xs text-zinc-400 font-sans">
                  Choose your preferred secure payment method.
                </p>
              </div>

              {error && (
                <div className="flex items-center gap-2 rounded-xl border border-rose-500/30 bg-rose-950/40 p-3.5 text-xs text-rose-300">
                  <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
                  <span>{error}</span>
                </div>
              )}

              {/* Payment Method Selector */}
              <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`flex items-center justify-center gap-2 rounded-xl border p-3.5 transition ${
                    paymentMethod === 'card'
                      ? 'border-amber-400 bg-amber-500/10 text-white font-bold'
                      : 'border-white/10 bg-black/40 text-zinc-400 hover:text-white'
                  }`}
                >
                  <CreditCard className="h-4 w-4 text-amber-400" />
                  <span>Credit / Debit Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('crypto_btc')}
                  className={`flex items-center justify-center gap-2 rounded-xl border p-3.5 transition ${
                    paymentMethod === 'crypto_btc'
                      ? 'border-amber-400 bg-amber-500/10 text-white font-bold'
                      : 'border-white/10 bg-black/40 text-zinc-400 hover:text-white'
                  }`}
                >
                  <Bitcoin className="h-4 w-4 text-amber-400" />
                  <span>BTC / Crypto</span>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email Address */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300">
                    Email Address <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@domain.com"
                    className="w-full rounded-xl border border-white/10 bg-black/60 px-4 py-3.5 text-sm text-white placeholder-zinc-500 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                  <p className="text-[10px] text-zinc-500 font-mono">
                    Your unique Secret ID and reveal instructions will be dispatched here.
                  </p>
                </div>

                {/* Name */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300">
                    Your Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Collector / Anonymous"
                    className="w-full rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-sm text-white placeholder-zinc-500 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                </div>

                {/* Method Specific Details */}
                {paymentMethod === 'card' ? (
                  <div className="rounded-2xl border border-white/10 bg-black/40 p-4 space-y-2 text-xs">
                    <div className="flex items-center justify-between text-zinc-300 font-mono text-[11px]">
                      <span className="flex items-center gap-1.5">
                        <Lock className="h-3.5 w-3.5 text-emerald-400" />
                        <span>Encrypted Card Gateway</span>
                      </span>
                      <span className="text-zinc-500">PCI-DSS Compliant</span>
                    </div>
                    <p className="text-zinc-400 text-[11px] leading-relaxed">
                      Payments are processed securely via 256-bit SSL encryption. We never touch or store raw card information on our servers.
                    </p>
                  </div>
                ) : (
                  <div className="rounded-2xl border border-amber-500/20 bg-amber-950/20 p-4 space-y-2 text-xs">
                    <div className="flex items-center gap-2 text-amber-300 font-mono text-[11px] font-bold">
                      <Bitcoin className="h-4 w-4 text-amber-400" />
                      <span>Direct Crypto Settlement Layer</span>
                    </div>
                    <p className="text-zinc-400 text-[11px] leading-relaxed">
                      Instant on-chain confirmation. Your Secret ID will be bound immediately upon network confirmation.
                    </p>
                  </div>
                )}

                {/* Mandated Disclosures & Checkboxes */}
                <div className="space-y-3 pt-2">
                  <label className="flex items-start gap-2.5 text-xs text-zinc-400 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={understandNonLottery}
                      onChange={(e) => setUnderstandNonLottery(e.target.checked)}
                      className="mt-0.5 rounded border-zinc-700 text-amber-500 focus:ring-amber-400"
                    />
                    <span>
                      I understand this is a guaranteed digital mystery media experience, <strong>not a lottery, sweepstakes, or prize draw</strong>.
                    </span>
                  </label>

                  <label className="flex items-start gap-2.5 text-xs text-zinc-400 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      className="mt-0.5 rounded border-zinc-700 text-amber-500 focus:ring-amber-400"
                    />
                    <span>
                      I agree to the{' '}
                      <Link href="/terms" target="_blank" className="text-amber-400 underline">
                        Terms
                      </Link>
                      ,{' '}
                      <Link href="/privacy" target="_blank" className="text-amber-400 underline">
                        Privacy
                      </Link>
                      , and the 100% pre-reveal{' '}
                      <Link href="/refund-policy" target="_blank" className="text-amber-400 underline">
                        Refund Policy
                      </Link>
                      .
                    </span>
                  </label>
                </div>

                {/* Primary Action Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-4 text-sm font-bold uppercase tracking-widest text-zinc-950 shadow-xl shadow-amber-500/20 hover:from-amber-400 hover:to-amber-500 hover:scale-[1.01] active:scale-[0.99] transition disabled:opacity-50"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-zinc-950 border-t-transparent" />
                      <span>Securing Your Secret...</span>
                    </div>
                  ) : (
                    <>
                      <Lock className="h-4 w-4 text-zinc-950" />
                      <span>Pay $19.99 & Secure Secret</span>
                      <ArrowRight className="h-4 w-4 text-zinc-950" />
                    </>
                  )}
                </button>

                <div className="text-center text-[10px] font-mono text-zinc-500">
                  🔒 Bank-Grade 256-Bit SSL Encryption • Instant Secret Delivery
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
