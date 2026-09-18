'use client';

import React, { useState } from 'react';
import { Mail, X, Lock, Unlock, ArrowUpRight, Copy, Check } from 'lucide-react';

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  secretId: string;
  customerEmail: string;
  revealDate?: string;
  defaultEmailType?: 'confirmation' | 'reveal';
}

export function EmailModal({
  isOpen,
  onClose,
  secretId,
  customerEmail,
  revealDate = 'September 30, 2026 — 8:00 PM UTC',
  defaultEmailType = 'confirmation'
}: EmailModalProps) {
  const [activeTab, setActiveTab] = useState<'confirmation' | 'reveal'>(defaultEmailType);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const accessUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/secret/${secretId}`
    : `https://thesecret.club/secret/${secretId}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(accessUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <div className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-zinc-950 p-6 shadow-2xl space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
            <Mail className="h-4 w-4 text-amber-400" />
            <span>TRANSACTIONAL EMAIL SYSTEM PREVIEW</span>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-zinc-400 hover:text-white hover:bg-white/10 transition"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="grid grid-cols-2 rounded-xl bg-zinc-900 p-1 text-xs font-mono">
          <button
            onClick={() => setActiveTab('confirmation')}
            className={`flex items-center justify-center gap-1.5 rounded-lg py-2 transition ${
              activeTab === 'confirmation'
                ? 'bg-amber-500 text-zinc-950 font-bold'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Lock className="h-3.5 w-3.5" />
            <span>Email 1: Secured</span>
          </button>

          <button
            onClick={() => setActiveTab('reveal')}
            className={`flex items-center justify-center gap-1.5 rounded-lg py-2 transition ${
              activeTab === 'reveal'
                ? 'bg-amber-500 text-zinc-950 font-bold'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Unlock className="h-3.5 w-3.5" />
            <span>Email 2: Reveal</span>
          </button>
        </div>

        {/* Email Envelope Container */}
        <div className="rounded-xl border border-white/5 bg-zinc-900/60 p-5 space-y-4 font-sans text-xs">
          <div className="border-b border-white/5 pb-3 space-y-1 font-mono text-[11px] text-zinc-400">
            <div><strong className="text-zinc-300">To:</strong> {customerEmail}</div>
            <div><strong className="text-zinc-300">From:</strong> The Secret &lt;vault@thesecret.club&gt;</div>
            <div>
              <strong className="text-zinc-300">Subject:</strong>{' '}
              {activeTab === 'confirmation' ? (
                <span className="text-amber-400 font-semibold">Your Secret has been secured 🔒</span>
              ) : (
                <span className="text-emerald-400 font-semibold">Your Secret has been revealed 🔓</span>
              )}
            </div>
          </div>

          {/* Email Body */}
          {activeTab === 'confirmation' ? (
            <div className="space-y-3 text-zinc-300 leading-relaxed">
              <p className="font-bold text-white text-sm">
                Your Secret has been secured.
              </p>
              <p>
                Thank you for your purchase. You have acquired one guaranteed mystery digital experience. No spoilers, no gambling, no lottery.
              </p>

              <div className="my-3 rounded-lg border border-amber-500/30 bg-amber-950/20 p-3.5 text-center font-mono">
                <span className="block text-[10px] uppercase text-zinc-400">Your Secret Identifier</span>
                <span className="text-lg font-bold text-amber-300 tracking-wider">🔒 {secretId}</span>
              </div>

              <div className="space-y-1 text-[11px] font-mono text-zinc-400 bg-black/40 p-3 rounded-lg">
                <div><strong>Reveal Date:</strong> {revealDate}</div>
                <div><strong>Amount Paid:</strong> $19.99 USD (One-time, no subscription)</div>
                <div><strong>Delivery Format:</strong> Guaranteed Digital Archive & Dossier</div>
              </div>

              <p className="text-[11px] text-zinc-400">
                Please save your Secret ID. You will need it to unlock your experience once the reveal date arrives.
              </p>

              <div className="pt-2">
                <a
                  href={accessUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 rounded-lg bg-white px-4 py-2.5 font-bold text-zinc-950 hover:bg-zinc-200 transition text-xs"
                >
                  <span>View Your Secret Vault</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          ) : (
            <div className="space-y-3 text-zinc-300 leading-relaxed">
              <p className="font-bold text-white text-sm">
                The reveal has arrived. 🔓
              </p>
              <p>
                The cryptographic seal on your Secret is now unlocked. The full interactive digital experience is ready for you.
              </p>

              <div className="my-3 rounded-lg border border-emerald-500/30 bg-emerald-950/20 p-3.5 text-center font-mono">
                <span className="block text-[10px] uppercase text-zinc-400">Unlocked Secret ID</span>
                <span className="text-lg font-bold text-emerald-300 tracking-wider">🔓 {secretId}</span>
              </div>

              <p className="text-[11px] text-zinc-400">
                For security and privacy, the sensitive digital artifacts are accessed securely through your dedicated portal.
              </p>

              <div className="pt-2">
                <a
                  href={accessUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 rounded-lg bg-emerald-500 px-4 py-2.5 font-bold text-zinc-950 hover:bg-emerald-400 transition text-xs"
                >
                  <span>Unlock & View Your Content</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Footer info & link copy */}
        <div className="flex items-center justify-between pt-1 text-[11px] font-mono text-zinc-400">
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-1 text-zinc-400 hover:text-white transition"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copied ? 'Direct URL Copied' : 'Copy Access Link'}</span>
          </button>
          <span>Support: help@thesecret.club</span>
        </div>
      </div>
    </div>
  );
}
