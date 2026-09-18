import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Lock, ArrowLeft, ShieldCheck, KeyRound } from 'lucide-react';
import { secretDb, DEFAULT_REVEAL_DATE } from '@/lib/secret-db';
import { CountdownTimer } from '@/components/secret/CountdownTimer';
import { RevealSequence } from '@/components/secret/RevealSequence';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function SecretDashboardPage({ params }: PageProps) {
  const { id } = await params;
  const cleanId = id.toUpperCase().trim();

  // Query database
  let secret = secretDb.getSecretByPublicId(cleanId);

  // If newly generated or not found in seeded Map, create a standard secret instance for seamless preview
  if (!secret) {
    if (cleanId.startsWith('SECRET-')) {
      const { secret: newSec } = secretDb.createOrder({
        customer_email: 'collector@thesecret.club',
        customer_name: 'Verified Customer'
      });
      // Use requested ID
      newSec.public_secret_id = cleanId;
      secret = newSec;
    } else {
      notFound();
    }
  }

  const isPastReveal = new Date() >= new Date(secret.reveal_at);
  const isRevealed = secret.status === 'revealed' || isPastReveal;

  return (
    <div className="relative min-h-screen bg-[#070709] py-12 px-4 sm:px-6 lg:px-8 text-zinc-100">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 h-[450px] w-[700px] rounded-full bg-amber-500/5 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-4xl space-y-10">
        {/* Top bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4 text-xs font-mono">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>RETURN TO THE SECRET</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="text-zinc-500">VAULT CUSTODY:</span>
            <span className="font-bold text-amber-400">{secret.public_secret_id}</span>
          </div>
        </div>

        {/* Hero Header */}
        <div className="text-center space-y-3">
          <div className="text-xs font-mono uppercase tracking-[0.3em] text-zinc-500">
            THE SECRET
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-mono tracking-wider text-white">
            {secret.public_secret_id}
          </h1>
          <div className="flex items-center justify-center gap-3 pt-1">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-mono font-bold tracking-widest ${
                isRevealed
                  ? 'border border-emerald-500/40 bg-emerald-950/40 text-emerald-400'
                  : 'border border-amber-500/40 bg-amber-950/40 text-amber-300'
              }`}
            >
              {isRevealed ? '🔓 REVEALED' : '🔒 LOCKED'}
            </span>

            <span className="text-xs font-mono text-zinc-400">
              Reveal Target: {new Date(secret.reveal_at).toLocaleDateString()} — 8:00 PM UTC
            </span>
          </div>
        </div>

        {/* Synchronous Reveal Countdown if still locked */}
        {!isRevealed && (
          <div className="rounded-2xl border border-white/10 bg-zinc-950/60 p-6 text-center backdrop-blur-md">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-zinc-400 block mb-4">
              SYNCHRONOUS LOCK COUNTDOWN
            </span>
            <CountdownTimer
              targetDate={secret.reveal_at}
              size="md"
            />
          </div>
        )}

        {/* 5-Stage Cinematic Reveal Sequence & Content Renderer */}
        <RevealSequence
          secretId={secret.public_secret_id}
          isRevealed={isRevealed}
          revealAt={secret.reveal_at}
          content={secret.content}
          contentType={secret.content_type}
          title={secret.title}
        />
      </div>
    </div>
  );
}
