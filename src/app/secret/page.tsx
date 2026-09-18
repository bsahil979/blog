'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, KeyRound, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';
import { isValidSecretId } from '@/lib/crypto';
import { trackEvent } from '@/lib/analytics';

export default function SecretLookupPage() {
  const router = useRouter();
  const [secretId, setSecretId] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const clean = secretId.trim().toUpperCase();
    if (!clean) {
      setError('Please enter your Secret ID.');
      return;
    }

    if (!isValidSecretId(clean)) {
      setError('Invalid format. Secret IDs follow the pattern SECRET-XXXXXX (e.g. SECRET-7F3A92).');
      return;
    }

    trackEvent('secret_accessed', { secret_id: clean });
    router.push(`/secret/${clean}`);
  };

  const handleUseDemo = (id: string) => {
    setSecretId(id);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#070709] py-16 px-4 sm:px-6 lg:px-8 text-zinc-100 flex items-center justify-center">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-500/40 bg-zinc-900 shadow-xl shadow-amber-500/10">
            <Lock className="h-6 w-6 text-amber-400" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Access Your Secret Vault
          </h1>
          <p className="text-xs text-zinc-400 font-sans">
            Enter the unique Secret ID assigned to your purchase.
          </p>
        </div>

        {/* Form Card */}
        <div className="rounded-3xl border border-white/10 bg-zinc-900/80 p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6">
          {error && (
            <div className="rounded-xl border border-rose-500/30 bg-rose-950/40 p-3 text-xs text-rose-300">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300">
                Secret Identifier
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={secretId}
                  onChange={(e) => setSecretId(e.target.value.toUpperCase())}
                  placeholder="SECRET-7F3A92"
                  className="w-full rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-base font-mono uppercase text-amber-300 placeholder-zinc-600 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                />
                <KeyRound className="pointer-events-none absolute right-4 top-3.5 h-4 w-4 text-zinc-500" />
              </div>
              <p className="text-[10px] text-zinc-500 font-mono">
                Found in your purchase confirmation email.
              </p>
            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-zinc-950 hover:from-amber-400 hover:to-amber-500 active:scale-[0.99] transition shadow-lg shadow-amber-500/20"
            >
              <span>Unlock Vault</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          {/* Quick Demo Previews */}
          <div className="border-t border-white/10 pt-4 space-y-2">
            <span className="block text-[10px] font-mono uppercase text-zinc-500 text-center">
              Quick Test IDs
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <button
                type="button"
                onClick={() => handleUseDemo('SECRET-7F3A92')}
                className="rounded-lg border border-white/10 bg-white/5 py-2 px-3 text-zinc-300 hover:text-amber-400 hover:border-amber-500/30 transition text-center"
              >
                🔒 Canonical Locked
              </button>
              <button
                type="button"
                onClick={() => handleUseDemo('SECRET-DEMO26')}
                className="rounded-lg border border-emerald-500/30 bg-emerald-950/20 py-2 px-3 text-emerald-300 hover:text-emerald-200 transition text-center"
              >
                🔓 Instant Revealed
              </button>
            </div>
          </div>
        </div>

        {/* Need Help Link */}
        <div className="text-center text-xs text-zinc-500">
          <span>Lost your ID? </span>
          <Link href="/contact" className="text-amber-400 hover:underline">
            Contact Secret Recovery
          </Link>
        </div>
      </div>
    </div>
  );
}
