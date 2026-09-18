'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { HelpCircle, ChevronDown, Lock, ShieldCheck, Mail, ArrowRight } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
    trackEvent('faq_opened', { faq_index: i });
  };

  const faqs = [
    {
      q: 'What exactly am I buying?',
      a: 'You are purchasing access to a single guaranteed digital mystery experience. For a one-time price of $19.99, you receive a cryptographically locked identifier. When the reveal date arrives, your Secret unlocks into an exclusive interactive narrative dossier, an original audio soundscape master recording, and a verified archival certificate.'
    },
    {
      q: 'When will my Secret be revealed?',
      a: 'The reveal is scheduled for September 30, 2026 at 8:00 PM UTC. All Secret holders will have their digital experience unlocked at that exact moment. You can monitor the real-time live countdown timer on our website.'
    },
    {
      q: 'Is this a lottery or gambling?',
      a: 'No. There is zero element of chance or random financial payoff. This is not a lottery, raffle, sweepstakes, or casino game. We do not offer or promise cash prizes, money, or speculative assets. Every customer receives the guaranteed, fully produced digital product.'
    },
    {
      q: 'Can I get a refund?',
      a: 'Yes. We offer a 100% money-back guarantee at any time prior to the official reveal time (September 30, 2026 — 8:00 PM UTC). Once the reveal occurs and digital artifacts are accessed, sales become final except in cases of technical non-delivery. See our Refund Policy for complete terms.'
    },
    {
      q: 'Is this a subscription or recurring charge?',
      a: 'No. This is strictly a single, one-time payment of $19.99 USD. There are no recurring memberships, automatic rebills, or hidden subscription fees.'
    },
    {
      q: 'Can I buy multiple Secrets?',
      a: 'Yes. Each purchase generates an independent, unique Secret ID. You can purchase Secrets as gifts or for multiple people. Each Secret ID can be accessed independently through our vault.'
    },
    {
      q: 'How do I access my Secret?',
      a: 'Immediately upon checkout, you receive a unique Secret ID (e.g., SECRET-7F3A92) on the screen and via email. You can enter this ID on the /secret portal at any time, or click the direct link provided in your confirmation email.'
    },
    {
      q: 'What happens if I lose my Secret ID?',
      a: 'Don’t worry. Your confirmation email contains your Secret ID and a direct access link. If you lose access to both, simply email help@thesecret.club with your purchase email address, and our support team will reissue your identifier.'
    },
    {
      q: 'What information do you collect?',
      a: 'We collect only your email address (to deliver your Secret ID, receipt, and reveal announcement) and basic payment metadata processed securely via Stripe. We do not sell your personal data or store raw credit card numbers.'
    },
    {
      q: 'Who operates The Secret?',
      a: 'The Secret is an independent digital media and narrative art studio dedicated to intentional entertainment and shared anticipation. Our team of storytellers, sound designers, and engineers creates high-craft digital experiences free from predatory monetization.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#070709] py-16 px-4 sm:px-6 lg:px-8 text-zinc-100">
      <div className="mx-auto max-w-4xl space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-mono tracking-widest text-amber-300">
            <HelpCircle className="h-4 w-4 text-amber-400" />
            <span>KNOWLEDGE BASE & FAQS</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
            Frequently Asked Questions
          </h1>
          <p className="text-base text-zinc-400 max-w-xl mx-auto font-sans leading-relaxed">
            Everything you need to know about purchasing, waiting for, and unlocking The Secret.
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-white/10 bg-zinc-900/50 backdrop-blur-xl overflow-hidden transition"
            >
              <button
                onClick={() => toggle(idx)}
                className="flex w-full items-center justify-between p-6 text-left hover:bg-white/5 transition"
              >
                <span className="font-semibold text-white text-base sm:text-lg">
                  {faq.q}
                </span>
                <ChevronDown
                  className={`h-5 w-5 text-zinc-400 shrink-0 transition-transform duration-300 ${
                    openIndex === idx ? 'rotate-180 text-amber-400' : ''
                  }`}
                />
              </button>

              {openIndex === idx && (
                <div className="px-6 pb-6 text-sm text-zinc-300 leading-relaxed border-t border-white/5 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Support Reassurance */}
        <div className="rounded-3xl border border-white/10 bg-zinc-900/30 p-8 text-center space-y-4">
          <h3 className="text-xl font-bold text-white">Still have a question?</h3>
          <p className="text-xs text-zinc-400 max-w-md mx-auto">
            Our team is happy to assist. Email us directly with any questions or inquiries.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <a
              href="mailto:help@thesecret.club"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-xs font-mono text-white hover:bg-white/10 transition"
            >
              <Mail className="h-4 w-4 text-amber-400" />
              <span>help@thesecret.club</span>
            </a>

            <Link
              href="/checkout"
              className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-2.5 text-xs font-bold text-zinc-950 uppercase tracking-wider hover:bg-amber-400 transition"
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
