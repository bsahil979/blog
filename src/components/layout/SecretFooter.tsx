import React from 'react';
import Link from 'next/link';
import { Lock, ShieldCheck, CreditCard, Sparkles } from 'lucide-react';

export function SecretFooter() {
  return (
    <footer className="w-full border-t border-white/5 bg-black/95 text-zinc-400">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-amber-500/40 bg-zinc-900">
                <Lock className="h-3.5 w-3.5 text-amber-400" />
              </div>
              <span className="font-serif text-sm font-black tracking-[0.25em] text-white">
                THE SECRET
              </span>
            </div>

            <p className="font-serif italic text-zinc-300 text-sm">
              “You paid to discover what happens next.”
            </p>

            <p className="text-xs text-zinc-500 leading-relaxed max-w-md">
              A guaranteed digital mystery experience. Every purchase delivers authentic, high-craft digital content unlocked synchronously at the scheduled reveal time.
            </p>

            {/* Crucial Legal Reassurance */}
            <div className="flex items-start gap-2.5 rounded-xl border border-white/5 bg-zinc-950 p-3 text-xs text-zinc-400">
              <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-400 mt-0.5" />
              <span>
                <strong>100% Guaranteed Digital Experience.</strong> This is not a lottery, sweepstakes, prize draw, or gambling mechanism. No cash prizes are promised or implied.
              </span>
            </div>
          </div>

          {/* Experience Links */}
          <div className="space-y-3 text-xs font-mono">
            <div className="font-bold uppercase tracking-widest text-zinc-200">
              Experience
            </div>
            <ul className="space-y-2">
              <li>
                <Link href="/#how-it-works" className="hover:text-amber-400 transition">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/checkout" className="hover:text-amber-400 transition">
                  Get Your Secret ($19.99)
                </Link>
              </li>
              <li>
                <Link href="/secret" className="hover:text-amber-400 transition">
                  Access Your Vault
                </Link>
              </li>
              <li>
                <Link href="/trust" className="hover:text-amber-400 transition">
                  Trust Center
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-amber-400 transition">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Governance */}
          <div className="space-y-3 text-xs font-mono">
            <div className="font-bold uppercase tracking-widest text-zinc-200">
              Transparency & Legal
            </div>
            <ul className="space-y-2">
              <li>
                <Link href="/terms" className="hover:text-amber-400 transition">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-amber-400 transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="hover:text-amber-400 transition">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-amber-400 transition">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-zinc-600 hover:text-zinc-400 transition">
                  System Admin
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between border-t border-white/5 pt-8 text-[11px] font-mono text-zinc-600 gap-4">
          <div className="flex items-center gap-2">
            <CreditCard className="h-3.5 w-3.5 text-zinc-500" />
            <span>Secure 256-Bit SSL Checkout • Raw Card Details Are Never Stored</span>
          </div>
          <div>
            © {new Date().getFullYear()} The Secret. All rights reserved. “One secret. One reveal. No spoilers.”
          </div>
        </div>
      </div>
    </footer>
  );
}
