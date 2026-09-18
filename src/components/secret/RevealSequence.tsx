'use client';

import React, { useState, useEffect } from 'react';
import { Lock, Unlock, Sparkles, CheckCircle2, Volume2, VolumeX, ShieldAlert } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SecretContent } from './SecretContent';
import { trackEvent } from '@/lib/analytics';

interface RevealSequenceProps {
  secretId: string;
  isRevealed: boolean;
  revealAt: string;
  content?: string;
  contentType?: string;
  title?: string;
}

type RevealStage =
  | 'idle_locked'
  | 'stage_1_charge'
  | 'stage_2_unlocking'
  | 'stage_3_flipping'
  | 'stage_4_burst'
  | 'stage_5_completed';

export function RevealSequence({
  secretId,
  isRevealed: initialIsRevealed,
  revealAt,
  content,
  contentType = 'interactive',
  title
}: RevealSequenceProps) {
  const [stage, setStage] = useState<RevealStage>(
    initialIsRevealed ? 'stage_5_completed' : 'idle_locked'
  );
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [statusMessage, setStatusMessage] = useState(
    initialIsRevealed
      ? 'SECRET UNLOCKED'
      : 'Whatever is inside, you won’t be able to see it yet.'
  );

  // Web Audio synthetic cinematic chime (zero external network asset lag)
  const playCinematicChime = (type: 'charge' | 'unlock' | 'triumph') => {
    if (!soundEnabled || typeof window === 'undefined') return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();

      if (type === 'charge') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(110, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 1.2);
        gain.gain.setValueAtTime(0.01, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 1.0);
        gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 1.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 1.2);
      } else if (type === 'unlock') {
        // Metallic snap & release
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(880, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.3);
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      } else if (type === 'triumph') {
        // Rich harmonic chord
        const freqs = [523.25, 659.25, 783.99, 1046.5]; // C Major
        freqs.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);
          gain.gain.setValueAtTime(0.12, ctx.currentTime + idx * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.5);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + idx * 0.08);
          osc.stop(ctx.currentTime + 2.5);
        });
      }
    } catch {
      // Audio context may be restricted before user gesture
    }
  };

  const triggerCinematicReveal = () => {
    trackEvent('secret_revealed', { secret_id: secretId });

    // Step 1: Charge & Tension
    setStage('stage_1_charge');
    setStatusMessage('INITIALIZING QUANTUM DECRYPTION...');
    playCinematicChime('charge');

    // Step 2: Lock Opens
    setTimeout(() => {
      setStage('stage_2_unlocking');
      setStatusMessage('CRYPTOGRAPHIC SEAL DISSOLVING...');
      playCinematicChime('unlock');
    }, 1400);

    // Step 3: Card Flips
    setTimeout(() => {
      setStage('stage_3_flipping');
      setStatusMessage('TRANSLATING ARCHIVAL DATA...');
    }, 2400);

    // Step 4: Golden Particle Burst & Confetti
    setTimeout(() => {
      setStage('stage_4_burst');
      setStatusMessage('SECRET UNLOCKED');
      playCinematicChime('triumph');

      try {
        confetti({
          particleCount: 70,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#d4af37', '#f59e0b', '#ffffff', '#6366f1']
        });
      } catch {
        // fallback if canvas not available
      }
    }, 3400);

    // Step 5: Completed
    setTimeout(() => {
      setStage('stage_5_completed');
    }, 4200);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Audio & Status toolbar */}
      <div className="flex items-center justify-between px-2 pb-4 text-xs font-mono text-zinc-400">
        <div className="flex items-center gap-2">
          <span className={`inline-block h-2 w-2 rounded-full ${stage === 'stage_5_completed' ? 'bg-emerald-400' : 'bg-amber-400 animate-ping'}`} />
          <span>STATUS: {stage === 'stage_5_completed' ? 'UNLOCKED' : 'SEALED & VERIFIED'}</span>
        </div>
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-zinc-300 hover:text-white transition"
          title={soundEnabled ? 'Mute sound effects' : 'Enable sound effects'}
        >
          {soundEnabled ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5 text-zinc-500" />}
          <span>{soundEnabled ? 'Audio On' : 'Audio Muted'}</span>
        </button>
      </div>

      {/* Main Card Stage Area */}
      {stage !== 'stage_5_completed' ? (
        <div className="perspective-1000 w-full">
          <div
            className={`relative mx-auto w-full max-w-xl rounded-3xl border border-white/10 bg-gradient-to-b from-zinc-900 via-zinc-950 to-black p-8 sm:p-12 shadow-2xl transition-all duration-700 ${
              stage === 'stage_1_charge' ? 'animate-card-shake border-amber-500/60 shadow-amber-500/20' : ''
            } ${
              stage === 'stage_3_flipping' ? 'rotate-y-180 opacity-40 scale-95' : ''
            }`}
          >
            {/* Shimmer sweep */}
            <div className="pointer-events-none absolute -inset-full animate-shimmer opacity-20" />

            {/* Top Bar */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 font-mono text-xs text-zinc-400">
              <span className="text-amber-400/90 font-bold">{secretId}</span>
              <span className="text-zinc-500">SCHEDULED REVEAL</span>
            </div>

            {/* Central Vault Visual */}
            <div className="my-12 flex flex-col items-center justify-center">
              <div
                className={`relative flex h-32 w-32 items-center justify-center rounded-3xl border transition-all duration-500 ${
                  stage === 'stage_2_unlocking' || stage === 'stage_4_burst'
                    ? 'border-emerald-500/60 bg-emerald-950/40 text-emerald-400 shadow-2xl shadow-emerald-500/20'
                    : 'border-amber-500/40 bg-zinc-900/90 text-amber-400 shadow-2xl shadow-amber-500/10'
                }`}
              >
                {stage === 'stage_2_unlocking' || stage === 'stage_4_burst' ? (
                  <Unlock className="h-16 w-16 text-emerald-400 animate-bounce" />
                ) : (
                  <Lock className={`h-16 w-16 text-amber-400 ${stage === 'stage_1_charge' ? 'animate-spin' : 'animate-lock-glow'}`} />
                )}
              </div>

              {/* Status Message */}
              <div className="mt-8 text-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-mono tracking-widest text-zinc-300">
                  <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                  {statusMessage}
                </div>
              </div>
            </div>

            {/* Explanatory notice */}
            <div className="rounded-2xl border border-white/5 bg-zinc-950/60 p-5 text-center text-xs text-zinc-400 leading-relaxed">
              <p className="italic">
                “Whatever is inside, you won’t be able to see it yet.”
              </p>
              <p className="mt-2 text-[11px] text-zinc-400 font-mono">
                Official Reveal Target: {new Date(revealAt).toUTCString()}
              </p>
            </div>

            {/* Interactive Unlock Demo Trigger */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={triggerCinematicReveal}
                disabled={stage !== 'idle_locked'}
                className="flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-3 text-sm font-semibold tracking-wider text-zinc-950 uppercase shadow-lg shadow-amber-500/20 hover:from-amber-400 hover:to-amber-500 hover:scale-[1.02] active:scale-[0.98] transition disabled:opacity-50"
              >
                <Sparkles className="h-4 w-4 text-zinc-950" />
                <span>Simulate Reveal Sequence</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Stage 5: Unlocked State with Banner & Content */
        <div className="space-y-6">
          {/* Confirmed Reveal Banner */}
          <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-emerald-950/40 via-zinc-900 to-emerald-950/40 p-5 text-center shadow-2xl backdrop-blur-xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-950/80 px-3.5 py-1 text-xs font-mono font-bold tracking-widest text-emerald-300 uppercase">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              SECRET UNLOCKED
            </div>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-white">
              {title || 'The Guaranteed Digital Experience'}
            </h2>
            <p className="mt-1 text-xs font-mono text-zinc-400">
              Identifier: <span className="text-amber-400">{secretId}</span> • Cryptographic verification valid
            </p>
          </div>

          {/* Render Full Multi-format Content */}
          <SecretContent
            secretId={secretId}
            content={content}
            contentType={contentType}
            title={title}
          />

          {/* Reset button for review/testing */}
          <div className="flex justify-center pt-4">
            <button
              onClick={() => {
                setStage('idle_locked');
                setStatusMessage('Whatever is inside, you won’t be able to see it yet.');
              }}
              className="text-xs font-mono text-zinc-500 hover:text-zinc-300 underline underline-offset-4"
            >
              Relock Card (Demo Mode)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
