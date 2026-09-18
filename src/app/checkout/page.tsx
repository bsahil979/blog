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
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Sparkles,
  Info
} from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

export default function CheckoutPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [understandNonLottery, setUnderstandNonLottery] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Auto-fill test helper
  const handleUseTestCard = () => {
    setEmail('collector@thesecret.club');
    setName('Julian Vance');
    setCardNumber('4242 •••• •••• 4242');
    setExpiry('12/28');
    setCvc('888');
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !email.includes('@')) {
      setError('Please provide a valid email address.');
      return;
    }
    if (!agreeTerms || !understandNonLottery) {
      setError('Please accept the transparent purchase terms and non-lottery confirmation.');
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Payment failed.');
      }

      trackEvent('checkout_completed', { secret_id: data.secretId });
      trackEvent('secret_created', { secret_id: data.secretId });

      // Direct to success page
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
            <span>THE SECRET / SECURE CHECKOUT</span>
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
                <h2 className="text-2xl font-bold text-white mt-1">THE SECRET</h2>
                <p className="text-xs text-zinc-400">
                  Single Digital Mystery Experience License
                </p>
              </div>

              {/* Price Row */}
              <div className="flex items-baseline justify-between border-b border-white/10 pb-4">
                <span className="text-sm text-zinc-400">Total Due Today</span>
                <div className="text-right">
                  <span className="text-3xl font-black text-white">$19.99</span>
                  <span className="text-xs text-zinc-500 ml-1">USD</span>
                  <div className="text-[10px] text-emerald-400 font-mono">
                    One-time payment • No subscriptions
                  </div>
                </div>
              </div>

              {/* Specifications List */}
              <div className="space-y-3.5 text-xs">
                <div className="flex items-start gap-2.5 text-zinc-300">
                  <Calendar className="h-4 w-4 shrink-0 text-amber-400 mt-0.5" />
                  <div>
                    <strong className="block text-white font-mono text-[11px]">REVEAL DATE & TIME</strong>
                    <span className="text-zinc-400">September 30, 2026 — 8:00 PM UTC</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 text-zinc-300">
                  <FileCheck className="h-4 w-4 shrink-0 text-amber-400 mt-0.5" />
                  <div>
                    <strong className="block text-white font-mono text-[11px]">DELIVERY FORMAT</strong>
                    <span className="text-zinc-400">Guaranteed interactive dossier, original soundscape & cryptographic certificate.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 text-zinc-300">
                  <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-400 mt-0.5" />
                  <div>
                    <strong className="block text-white font-mono text-[11px]">REFUND POLICY</strong>
                    <span className="text-zinc-400">100% refundable prior to the scheduled reveal date.</span>
                  </div>
                </div>
              </div>

              {/* Non-Gambling Absolute Reassurance Box */}
              <div className="rounded-2xl border border-amber-500/20 bg-amber-950/20 p-4 text-xs text-zinc-300 space-y-1.5 leading-relaxed">
                <div className="flex items-center gap-1.5 text-amber-400 font-mono text-[11px] font-bold">
                  <Info className="h-3.5 w-3.5" />
                  <span>TRANSPARENCY GUARANTEE</span>
                </div>
                <p className="text-[11px] text-zinc-300">
                  This purchase is strictly for an artistic, multimedia digital entertainment product. It is <strong>NOT</strong> a lottery, raffle, sweepstakes, or investment. No cash winnings can be won.
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

          {/* Right Column: Secure Payment Provider Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-white/10 bg-zinc-900/90 p-6 sm:p-10 backdrop-blur-xl shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">Payment Details</h3>
                  <p className="text-xs text-zinc-400 font-mono">
                    Powered by Stripe Checkout Simulator
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleUseTestCard}
                  className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 text-[11px] font-mono text-amber-300 hover:bg-amber-500/20 transition"
                >
                  ⚡ Auto-fill Test Data
                </button>
              </div>

              {error && (
                <div className="flex items-center gap-2 rounded-xl border border-rose-500/30 bg-rose-950/40 p-3.5 text-xs text-rose-300">
                  <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
                  <span>{error}</span>
                </div>
              )}

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
                    className="w-full rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-sm text-white placeholder-zinc-500 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                  <p className="text-[10px] text-zinc-500 font-mono">
                    Your unique Secret ID and confirmation will be sent here immediately.
                  </p>
                </div>

                {/* Name on Card */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Elena Rostova"
                    className="w-full rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-sm text-white placeholder-zinc-500 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                </div>

                {/* Card Number */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300">
                    Card Information <span className="text-amber-400">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="4242 4242 4242 4242"
                      className="w-full rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-sm font-mono text-white placeholder-zinc-500 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                    />
                    <CreditCard className="pointer-events-none absolute right-4 top-3.5 h-4 w-4 text-zinc-500" />
                  </div>
                </div>

                {/* Expiry & CVC */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300">
                      MM / YY
                    </label>
                    <input
                      type="text"
                      required
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      placeholder="12 / 28"
                      className="w-full rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-sm font-mono text-white placeholder-zinc-500 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300">
                      CVC / CVV
                    </label>
                    <input
                      type="text"
                      required
                      value={cvc}
                      onChange={(e) => setCvc(e.target.value)}
                      placeholder="888"
                      className="w-full rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-sm font-mono text-white placeholder-zinc-500 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                    />
                  </div>
                </div>

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
                      I understand this is a guaranteed digital mystery media product, <strong>not a lottery, prize draw, or gamble</strong>. No monetary winnings are promised.
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
                        Terms of Service
                      </Link>
                      ,{' '}
                      <Link href="/privacy" target="_blank" className="text-amber-400 underline">
                        Privacy Policy
                      </Link>
                      , and the pre-reveal{' '}
                      <Link href="/refund-policy" target="_blank" className="text-amber-400 underline">
                        Refund Policy
                      </Link>
                      .
                    </span>
                  </label>
                </div>

                {/* Submit button */}
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
                  🔒 Bank-Grade 256-Bit SSL Encryption • PCI-DSS Compliant Provider
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
