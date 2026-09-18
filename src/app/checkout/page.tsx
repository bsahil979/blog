'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  Lock,
  Copy,
  Check,
  Calendar,
  FileCheck,
  ShieldCheck,
  AlertCircle,
  ArrowRight,
  Sparkles,
  Info,
  Bitcoin,
  CheckCircle2,
  Mail,
  AlertTriangle
} from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

const BTC_ADDRESS = 'bc1phzpx8pftykh6ypylwt030ecd974xy6924nv5qpeq00dmllchaeequp7nnd';

export default function CheckoutPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [txHash, setTxHash] = useState('');
  const [copied, setCopied] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [understandNonLottery, setUnderstandNonLottery] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(BTC_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
        body: JSON.stringify({
          email,
          name,
          paymentMethod: 'crypto_btc',
          btcAddress: BTC_ADDRESS,
          txHash: txHash || undefined
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit payment confirmation.');
      }

      trackEvent('checkout_completed', { secret_id: data.secretId });
      trackEvent('secret_created', { secret_id: data.secretId });

      // Direct to success page
      router.push(`/checkout/success?id=${data.secretId}&email=${encodeURIComponent(data.email)}&method=btc`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'An error occurred during submission.';
      setError(msg);
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#070709] py-12 px-4 sm:px-6 lg:px-8 text-zinc-100 font-sans">
      <div className="mx-auto max-w-5xl">
        {/* Header Breadcrumb */}
        <div className="mb-8 flex items-center justify-between border-b border-white/10 pb-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition"
          >
            <Lock className="h-3.5 w-3.5 text-amber-400" />
            <span>THE SECRET / BITCOIN PAYMENT</span>
          </Link>
          <div className="flex items-center gap-1.5 text-xs font-mono text-amber-400">
            <Bitcoin className="h-4 w-4" />
            <span>BTC NETWORK ONLY</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Order Summary & Explicit Disclosures */}
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
                <span className="text-sm text-zinc-400">Amount Due</span>
                <div className="text-right">
                  <span className="text-3xl font-black text-white">$19.99</span>
                  <span className="text-xs text-zinc-500 ml-1">USD in BTC</span>
                  <div className="text-[10px] text-amber-400 font-mono">
                    Pay via Bitcoin (BTC) Network
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

              {/* Strict Transparency Box */}
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

          {/* Right Column: Dedicated Bitcoin QR & Payment Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-amber-500/30 bg-zinc-900/90 p-6 sm:p-10 backdrop-blur-xl shadow-2xl space-y-6">
              {/* Bitcoin Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-amber-500/40 bg-amber-500/10 text-amber-400">
                    <Bitcoin className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Scan & Pay with Bitcoin</h3>
                    <p className="text-xs text-amber-400 font-mono">
                      Pay $19.99 USD in Bitcoin (BTC)
                    </p>
                  </div>
                </div>
                <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 text-[11px] font-mono text-amber-300">
                  ONLY BTC
                </div>
              </div>

              {/* Critical Alert Banner: Only BTC */}
              <div className="rounded-2xl border border-amber-500/40 bg-amber-950/40 p-4 text-xs text-amber-200 flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 shrink-0 text-amber-400 mt-0.5" />
                <div className="space-y-0.5">
                  <p className="font-bold text-amber-300">
                    Only send Bitcoin network assets to this address.
                  </p>
                  <p className="text-[11px] text-zinc-300">
                    Other assets will be lost forever. Make sure you select the <strong>Bitcoin (BTC)</strong> network in your wallet.
                  </p>
                </div>
              </div>

              {/* QR Scanner Display */}
              <div className="flex flex-col items-center justify-center p-6 rounded-2xl border border-white/10 bg-black/60 space-y-4">
                <div className="relative rounded-2xl overflow-hidden border-2 border-white/10 bg-white p-2 shadow-2xl shadow-amber-500/5 max-w-[280px] w-full">
                  <img
                    src="/btc-qr.jpg"
                    alt="Scan Bitcoin QR to Pay $19.99"
                    className="w-full h-auto rounded-xl object-contain"
                  />
                </div>
                <span className="text-[11px] font-mono text-zinc-400">
                  Scan using Binance Wallet, Phantom, Coinbase, or any Bitcoin wallet
                </span>
              </div>

              {/* BTC Deposit Address with Copy Button */}
              <div className="space-y-1.5">
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300">
                  Bitcoin Deposit Address (BTC Network)
                </label>
                <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/80 p-3">
                  <span className="font-mono text-xs text-amber-300 break-all select-all flex-1">
                    {BTC_ADDRESS}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyAddress}
                    className="flex shrink-0 items-center gap-1 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-xs font-mono text-amber-300 hover:bg-amber-500/20 transition"
                  >
                    {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 rounded-xl border border-rose-500/30 bg-rose-950/40 p-3.5 text-xs text-rose-300">
                  <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
                  <span>{error}</span>
                </div>
              )}

              {/* Email Collection Form */}
              <form onSubmit={handleSubmit} className="space-y-5 pt-2 border-t border-white/10">
                {/* Mandatory Notice regarding email delivery */}
                <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/30 p-4 text-xs text-emerald-200 flex items-start gap-2.5">
                  <Mail className="h-5 w-5 shrink-0 text-emerald-400 mt-0.5" />
                  <p className="leading-relaxed">
                    <strong>After successful payment</strong>, you will get an email regarding your Secret ID and access link in a short time.
                  </p>
                </div>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300">
                    Your Email Address <span className="text-amber-400">*</span>
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
                    We will send your Secret ID and reveal instructions to this address.
                  </p>
                </div>

                {/* Name (Optional) */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300">
                    Name / Alias (Optional)
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Collector / Anonymous"
                    className="w-full rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-sm text-white placeholder-zinc-500 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                </div>

                {/* Optional TX Hash / Sender address */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300">
                    Transaction Hash / TXID (Optional)
                  </label>
                  <input
                    type="text"
                    value={txHash}
                    onChange={(e) => setTxHash(e.target.value)}
                    placeholder="Optional: Paste Bitcoin TXID or sender wallet for faster match"
                    className="w-full rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-xs font-mono text-white placeholder-zinc-600 focus:border-amber-400 focus:outline-none"
                  />
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

                {/* Submit Action Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-4 text-sm font-bold uppercase tracking-widest text-zinc-950 shadow-xl shadow-amber-500/20 hover:from-amber-400 hover:to-amber-500 hover:scale-[1.01] active:scale-[0.99] transition disabled:opacity-50"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-zinc-950 border-t-transparent" />
                      <span>Recording Payment & Registering Email...</span>
                    </div>
                  ) : (
                    <>
                      <Bitcoin className="h-4 w-4 text-zinc-950" />
                      <span>I Have Sent Payment — Register My Email</span>
                      <ArrowRight className="h-4 w-4 text-zinc-950" />
                    </>
                  )}
                </button>

                <div className="text-center text-[10px] font-mono text-zinc-500">
                  🔒 On-Chain Bitcoin Settlement • Guaranteed Delivery
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
