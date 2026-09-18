'use client';

import React, { useState, useRef } from 'react';
import { Lock, Sparkles, ShieldCheck, EyeOff } from 'lucide-react';
import Link from 'next/link';

export function HeroVault() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const maxDegree = 12;
    setRotateX((-y / (rect.height / 2)) * maxDegree);
    setRotateY((x / (rect.width / 2)) * maxDegree);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div className="relative mx-auto flex w-full max-w-md items-center justify-center p-4 sm:p-6">
      {/* Ambient background aura */}
      <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-amber-500/10 via-indigo-500/10 to-amber-500/10 opacity-50 blur-2xl transition duration-1000 group-hover:opacity-75" />

      {/* 3D Tilt Wrapper */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${isHovered ? 1.02 : 1}, ${isHovered ? 1.02 : 1}, 1)`,
          transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)'
        }}
        className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-zinc-900/90 via-zinc-950/95 to-black/95 p-6 sm:p-8 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:border-amber-500/40"
      >
        {/* Shimmer sweep line */}
        <div className="pointer-events-none absolute -inset-full animate-shimmer opacity-20" />

        {/* Top Meta Bar */}
        <div className="flex items-center justify-between border-b border-white/5 pb-4 text-[11px] font-mono tracking-widest text-zinc-400">
          <span className="flex items-center gap-1.5 text-amber-400/90">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-ping" />
            CIPHER ENCRYPTED
          </span>
          <span className="text-zinc-400">EDITION 2026.1</span>
        </div>

        {/* Central Vault Icon and Shackle */}
        <div className="relative my-8 sm:my-10 flex flex-col items-center justify-center">
          {/* Concentric glowing pulse circles */}
          <div className="absolute h-36 w-36 rounded-full border border-amber-500/20 animate-glow-pulse" />
          <div className="absolute h-48 w-48 rounded-full border border-white/5" />

          {/* Glowing Lock Box */}
          <div className="relative flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center rounded-2xl border border-amber-500/40 bg-gradient-to-b from-zinc-800 to-zinc-950 shadow-2xl shadow-amber-500/10 animate-lock-glow">
            <Lock className="h-10 w-10 sm:h-12 sm:w-12 text-amber-400 transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 rounded-2xl bg-amber-400/5 backdrop-blur-xs" />
          </div>

          <div className="mt-5 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1 text-xs font-mono tracking-wider text-zinc-300">
            <EyeOff className="h-3.5 w-3.5 text-zinc-400" />
            <span>CONTENTS SEALED UNTIL REVEAL</span>
          </div>
        </div>

        {/* Card Title & Mystery Tease */}
        <div className="text-center space-y-1.5">
          <div className="text-xs font-mono uppercase tracking-[0.25em] text-amber-400/80">
            One Secret • One Reveal
          </div>
          <h3 className="text-lg font-bold tracking-tight text-white">
            The Guaranteed Digital Experience
          </h3>
          <p className="text-xs text-zinc-400 leading-relaxed max-w-xs mx-auto">
            You won’t know what it is until the moment arrives. Guaranteed high-craft media. No spoilers.
          </p>
        </div>

        {/* Card Footer Features */}
        <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-zinc-400">
          <div className="flex items-center gap-1">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
            <span>Guaranteed Content</span>
          </div>
          <div className="flex items-center gap-1 text-zinc-300">
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            <span>$19.99 Fixed</span>
          </div>
        </div>

        {/* Subtle quick button into checkout */}
        <div className="mt-5">
          <Link
            href="/checkout"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-2.5 text-xs font-semibold tracking-wider text-zinc-950 uppercase transition-all duration-200 hover:from-amber-400 hover:to-amber-500 hover:shadow-lg hover:shadow-amber-500/20 active:scale-[0.98]"
          >
            <Lock className="h-3.5 w-3.5 text-zinc-950" />
            Secure This Secret
          </Link>
        </div>
      </div>
    </div>
  );
}
