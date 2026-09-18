'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Lock,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Clock,
  KeyRound,
  FileCheck,
  ChevronDown,
  HelpCircle,
  EyeOff,
  CheckCircle2,
  XCircle,
  ExternalLink
} from 'lucide-react';
import { HeroVault } from '@/components/secret/HeroVault';
import { CountdownTimer } from '@/components/secret/CountdownTimer';
import { ParticleCanvas } from '@/components/ui/ParticleCanvas';
import { trackEvent } from '@/lib/analytics';

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
    trackEvent('faq_opened', { faq_index: idx });
  };

  const faqs = [
    {
      q: 'What exactly am I buying?',
      a: 'You are purchasing one guaranteed mystery digital experience for a one-time payment of $19.99. When the synchronized reveal date arrives on September 30, 2026, you unlock a meticulously crafted multimedia digital dossier, including interactive lore, an original atmospheric soundscape, and a verified custodial certificate.'
    },
    {
      q: 'When will my Secret be revealed?',
      a: 'The official synchronized reveal date is September 30, 2026 at 8:00 PM UTC. Every Secret holder gains access simultaneously at this moment. You can track the exact remaining time on the live countdown clock.'
    },
    {
      q: 'Is this a lottery, sweepstakes, or gamble?',
      a: 'Absolutely not. There is no element of chance, gambling, or random prize distribution. We do not promise money, cash prizes, or speculative returns. Every customer receives the exact same guaranteed, high-craft digital product.'
    },
    {
      q: 'Can I get a refund?',
      a: 'Yes. You can request a 100% refund at any point before the scheduled reveal date/time. Once the Secret is unlocked and revealed, digital content has been consumed and refunds are handled on a case-by-case basis as detailed in our Refund Policy.'
    },
    {
      q: 'Is this a subscription or recurring fee?',
      a: 'No. This is strictly a single, one-time payment of $19.99. There are no recurring fees, hidden charges, or auto-renewals.'
    },
    {
      q: 'What happens if I lose my Secret ID?',
      a: 'Your Secret ID is emailed to you immediately upon successful checkout. If you ever lose it, our support desk (help@thesecret.club) can look up and reissue your identifier using your verified purchase email.'
    }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#070709] text-zinc-100">
      {/* Particle Canvas & Ambient Lighting */}
      <ParticleCanvas count={35} />
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-amber-500/5 blur-[120px]" />
      <div className="pointer-events-none absolute top-1/3 -right-40 h-[400px] w-[500px] rounded-full bg-indigo-500/5 blur-[140px]" />

      {/* 1. HERO SECTION */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 pt-12 pb-20 sm:px-6 lg:px-8 lg:pt-20">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            {/* Tagline Pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-mono tracking-widest text-amber-300">
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              <span>THE REVEAL IS REAL. THE PRODUCT IS GUARANTEED.</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h2 className="font-mono text-xs uppercase tracking-[0.35em] text-zinc-400">
                THE SECRET
              </h2>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08]">
                Something is <br />
                <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 bg-clip-text text-transparent">
                  waiting for you.
                </span>
              </h1>
              <p className="font-serif italic text-xl sm:text-2xl text-zinc-300">
                “You won’t know what it is until the reveal.”
              </p>
            </div>

            {/* Supporting Copy */}
            <p className="max-w-xl mx-auto lg:mx-0 text-sm sm:text-base text-zinc-400 leading-relaxed">
              You paid to discover what happens next. A guaranteed digital mystery experience built for people who appreciate pure curiosity, quiet suspense, and high-craft storytelling.
            </p>

            {/* Pricing & Reveal Date Badge */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-mono">
              <div className="rounded-xl border border-white/10 bg-zinc-900/80 px-4 py-2.5">
                <span className="text-zinc-500 block text-[10px] uppercase">Fixed Price</span>
                <span className="text-2xl font-bold text-white">$19.99</span>
                <span className="text-zinc-400 text-[11px] ml-1">USD</span>
              </div>

              <div className="rounded-xl border border-white/10 bg-zinc-900/80 px-4 py-2.5">
                <span className="text-zinc-500 block text-[10px] uppercase">Synchronous Reveal</span>
                <span className="text-sm font-semibold text-amber-300">
                  Sept 30, 2026 — 8:00 PM UTC
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                href="/checkout"
                onClick={() => trackEvent('checkout_started')}
                className="flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-8 py-4 text-sm font-bold uppercase tracking-widest text-zinc-950 shadow-xl shadow-amber-500/20 hover:from-amber-400 hover:to-amber-500 hover:scale-[1.02] active:scale-[0.98] transition"
              >
                <Lock className="h-4 w-4 text-zinc-950" />
                <span>GET YOUR SECRET</span>
                <ArrowRight className="h-4 w-4 text-zinc-950" />
              </Link>

              <a
                href="#how-it-works"
                onClick={() => trackEvent('how_it_works_clicked')}
                className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-4 text-sm font-mono text-zinc-200 hover:bg-white/10 hover:text-white transition"
              >
                <span>HOW IT WORKS</span>
                <ChevronDown className="h-4 w-4 text-zinc-400" />
              </a>
            </div>

            {/* Mandatory Non-Lottery Disclosure */}
            <div className="rounded-xl border border-white/5 bg-zinc-950/80 p-4 text-xs text-zinc-400 leading-relaxed max-w-xl mx-auto lg:mx-0">
              <p className="flex items-start gap-2">
                <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-400 mt-0.5" />
                <span>
                  <strong>Guaranteed Digital Product:</strong> Every purchase includes a guaranteed digital Secret experience. This is not a lottery, sweepstakes, or prize draw. No cash winnings are offered.
                </span>
              </p>
            </div>
          </div>

          {/* Right Column: Hero Locked Vault Card */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <HeroVault />
          </div>
        </div>

        {/* Global Live Reveal Countdown Banner */}
        <div className="mt-16 rounded-3xl border border-white/10 bg-gradient-to-b from-zinc-900/70 to-black/80 p-6 sm:p-8 text-center backdrop-blur-xl shadow-2xl">
          <div className="space-y-2 mb-6">
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-amber-400/90 font-semibold">
              OFFICIAL COUNTDOWN TO SYNCHRONOUS REVEAL
            </span>
            <p className="text-xs text-zinc-400 font-mono">
              September 30, 2026 — 8:00 PM UTC • All Secrets Unlock at This Exact Second
            </p>
          </div>

          <CountdownTimer
            targetDate="2026-09-30T20:00:00Z"
            size="lg"
            className="my-2"
          />

          <p className="mt-6 text-xs text-zinc-400 font-mono">
            One Secret. One reveal. No spoilers.
          </p>
        </div>
      </section>

      {/* 2. HOW IT WORKS SECTION */}
      <section id="how-it-works" className="relative z-10 border-t border-white/5 bg-black/40 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-amber-400">
              The Journey
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              How It Works
            </h2>
            <p className="text-sm text-zinc-400">
              Three clear stages designed around anticipation, transparency, and high-fidelity digital craftsmanship.
            </p>
          </div>

          {/* 3 Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="relative rounded-2xl border border-white/10 bg-gradient-to-b from-zinc-900/90 to-zinc-950/90 p-8 transition duration-300 hover:border-amber-500/40">
              <div className="font-mono text-3xl font-black text-amber-400/30 mb-4">
                01
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Get a Secret
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Purchase your Secret for a flat <strong className="text-zinc-200">$19.99</strong>. You instantly receive a unique cryptographically random Secret ID (e.g., <span className="font-mono text-amber-300">SECRET-7F3A92</span>) sent directly to your email.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative rounded-2xl border border-white/10 bg-gradient-to-b from-zinc-900/90 to-zinc-950/90 p-8 transition duration-300 hover:border-amber-500/40">
              <div className="font-mono text-3xl font-black text-amber-400/30 mb-4">
                02
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Wait
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Your Secret remains sealed under cryptographic lock until the scheduled reveal time. Watch the verifiable countdown timer alongside other Secret holders.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative rounded-2xl border border-white/10 bg-gradient-to-b from-zinc-900/90 to-zinc-950/90 p-8 transition duration-300 hover:border-amber-500/40">
              <div className="font-mono text-3xl font-black text-amber-400/30 mb-4">
                03
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Reveal
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Return to your Secret Vault at zero hour. The locked seal dissolves into a cinematic 5-stage reveal, delivering your complete guaranteed digital experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FOURTH SECTION: NO TRICKS */}
      <section className="relative z-10 border-t border-white/5 py-24 bg-gradient-to-b from-black via-zinc-950 to-black">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-emerald-400 font-semibold">
              Radical Transparency
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              No tricks.
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              We believe anticipation is thrilling when built on absolute honesty. Here is our unwavering promise to every buyer:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="rounded-2xl border border-white/5 bg-zinc-900/50 p-6 space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <h4 className="font-bold text-white text-base">No Gambling</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Not a sweepstakes, lottery, or casino game. Nothing is won or lost by chance.
              </p>
            </div>

            <div className="rounded-2xl border border-white/5 bg-zinc-900/50 p-6 space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <h4 className="font-bold text-white text-base">Guaranteed Content</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Every purchase receives the full, premium multimedia mystery product upon reveal.
              </p>
            </div>

            <div className="rounded-2xl border border-white/5 bg-zinc-900/50 p-6 space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <h4 className="font-bold text-white text-base">No Subscriptions</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                One-time purchase of $19.99. No recurring charges, hidden fees, or surprise rebills.
              </p>
            </div>

            <div className="rounded-2xl border border-white/5 bg-zinc-900/50 p-6 space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <h4 className="font-bold text-white text-base">Secure 256-Bit SSL</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Stripe encrypted payments. Raw card credentials are never touched or stored by us.
              </p>
            </div>
          </div>

          {/* Explicit Prohibitions Banner */}
          <div className="mt-10 max-w-4xl mx-auto rounded-2xl border border-white/10 bg-black/60 p-6 text-xs text-zinc-400 leading-relaxed">
            <div className="flex flex-wrap items-center justify-center gap-6 text-center">
              <span className="inline-flex items-center gap-1.5 text-zinc-400">
                <XCircle className="h-4 w-4 text-rose-400" /> No Fake Urgency
              </span>
              <span className="inline-flex items-center gap-1.5 text-zinc-400">
                <XCircle className="h-4 w-4 text-rose-400" /> No Fake User Counts
              </span>
              <span className="inline-flex items-center gap-1.5 text-zinc-400">
                <XCircle className="h-4 w-4 text-rose-400" /> No Fabricated Testimonials
              </span>
              <span className="inline-flex items-center gap-1.5 text-zinc-400">
                <XCircle className="h-4 w-4 text-rose-400" /> No Cash Prizes
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CONTENT FORM FACTOR SHOWCASE */}
      <section className="relative z-10 border-t border-white/5 py-24 bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-amber-400">
              Inside The Vault
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              There’s something inside.
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              “You already know the price. You just don’t know the Secret.” Here is what is engineered into the guaranteed digital release:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-6 space-y-3">
              <div className="font-mono text-xs text-amber-400 uppercase tracking-wider">
                01 // Narrative Lore
              </div>
              <h3 className="text-lg font-bold text-white">Interactive Decrypted Dossier</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                An engrossing, curated storyline and classified telemetry reports, formatted as an investigative terminal.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-6 space-y-3">
              <div className="font-mono text-xs text-amber-400 uppercase tracking-wider">
                02 // Soundscape
              </div>
              <h3 className="text-lg font-bold text-white">Original Audio Ambience</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Exclusive high-fidelity master recording and atmospheric transmissions produced specifically for this edition.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-6 space-y-3">
              <div className="font-mono text-xs text-amber-400 uppercase tracking-wider">
                03 // Proof of Custody
              </div>
              <h3 className="text-lg font-bold text-white">Cryptographic Certificate</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                A downloadable, verified certificate confirming your archival ownership and timestamped identifier.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FAQ ACCORDION SECTION */}
      <section className="relative z-10 border-t border-white/5 py-24 bg-black">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-16">
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-amber-400">
              Clear Answers
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-zinc-400">
              Have questions before securing your Secret? Explore our transparent answers below.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-white/10 bg-zinc-900/40 backdrop-blur-md overflow-hidden transition"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="flex w-full items-center justify-between p-6 text-left hover:bg-white/5 transition"
                >
                  <span className="font-semibold text-white text-sm sm:text-base">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 text-zinc-400 shrink-0 transition-transform duration-300 ${
                      openFaq === idx ? 'rotate-180 text-amber-400' : ''
                    }`}
                  />
                </button>

                {openFaq === idx && (
                  <div className="px-6 pb-6 text-sm text-zinc-300 leading-relaxed border-t border-white/5 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/faq"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-amber-400 hover:text-amber-300 underline underline-offset-4"
            >
              <span>View complete FAQ library</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. FINAL CTA BANNER */}
      <section className="relative z-10 border-t border-white/10 bg-gradient-to-b from-zinc-950 to-[#070709] py-24">
        <div className="mx-auto max-w-4xl px-4 text-center space-y-6 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-mono tracking-widest text-amber-300">
            <Lock className="h-3.5 w-3.5 text-amber-400" />
            <span>ONE SECRET • ONE REVEAL • NO SPOILERS</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Ready to discover what happens next?
          </h2>

          <p className="text-sm text-zinc-400 max-w-lg mx-auto leading-relaxed">
            Secure your unique Secret ID today for $19.99. Backed by guaranteed digital content and a 100% pre-reveal refund guarantee.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/checkout"
              onClick={() => trackEvent('checkout_started')}
              className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-8 py-4 text-sm font-bold uppercase tracking-widest text-zinc-950 shadow-xl shadow-amber-500/20 hover:from-amber-400 hover:to-amber-500 hover:scale-105 active:scale-95 transition"
            >
              <Lock className="h-4 w-4 text-zinc-950" />
              <span>GET YOUR SECRET — $19.99</span>
            </Link>

            <Link
              href="/trust"
              onClick={() => trackEvent('trust_page_viewed')}
              className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-4 text-sm font-mono text-zinc-300 hover:bg-white/10 hover:text-white transition"
            >
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>Read Our Trust Guarantee</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
