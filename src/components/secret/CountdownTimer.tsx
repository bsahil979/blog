'use client';

import React, { useEffect, useState } from 'react';

interface CountdownTimerProps {
  targetDate?: string;
  size?: 'sm' | 'md' | 'lg';
  showLabels?: boolean;
  className?: string;
  onRevealReached?: () => void;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalMs: number;
  isPast: boolean;
}

export function CountdownTimer({
  targetDate = '2026-09-30T20:00:00Z',
  size = 'md',
  showLabels = true,
  className = '',
  onRevealReached
}: CountdownTimerProps) {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalMs: 0,
    isPast: false
  });

  useEffect(() => {
    setMounted(true);

    const calculateTime = () => {
      const targetTime = new Date(targetDate).getTime();
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          totalMs: 0,
          isPast: true
        });
        if (onRevealReached) onRevealReached();
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
        totalMs: difference,
        isPast: false
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);

    return () => clearInterval(interval);
  }, [targetDate, onRevealReached]);

  const pad = (n: number) => String(n).padStart(2, '0');

  // Prevent SSR hydration mismatch for current timestamp
  if (!mounted) {
    return (
      <div className={`flex items-center justify-center gap-2 text-zinc-500 font-mono ${className}`}>
        <span className="text-xl">-- : -- : -- : --</span>
      </div>
    );
  }

  if (timeLeft.isPast) {
    return (
      <div className={`inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-4 py-1.5 text-xs font-mono font-semibold uppercase tracking-widest text-emerald-400 ${className}`}>
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
        </span>
        Reveal Scheduled Has Arrived
      </div>
    );
  }

  const sizeClasses = {
    sm: {
      number: 'text-lg sm:text-xl font-bold',
      label: 'text-[9px] uppercase tracking-wider text-zinc-400',
      box: 'px-2 py-1 min-w-[48px]',
      sep: 'text-sm text-zinc-600'
    },
    md: {
      number: 'text-2xl sm:text-3xl font-bold',
      label: 'text-[10px] uppercase tracking-widest text-zinc-400',
      box: 'px-3 py-2 min-w-[64px]',
      sep: 'text-xl text-zinc-600'
    },
    lg: {
      number: 'text-3xl sm:text-5xl font-black',
      label: 'text-xs uppercase tracking-widest text-zinc-400 font-medium',
      box: 'px-4 py-3 sm:px-6 sm:py-4 min-w-[76px] sm:min-w-[100px]',
      sep: 'text-2xl sm:text-3xl text-zinc-600 font-light'
    }
  }[size];

  return (
    <div
      role="timer"
      aria-label={`Countdown to reveal: ${timeLeft.days} days, ${timeLeft.hours} hours, ${timeLeft.minutes} minutes, ${timeLeft.seconds} seconds`}
      className={`flex items-center justify-center gap-1.5 sm:gap-3 ${className}`}
    >
      {/* Days */}
      <div className={`flex flex-col items-center justify-center rounded-xl border border-white/10 bg-zinc-900/70 backdrop-blur-md text-center shadow-lg ${sizeClasses.box}`}>
        <span className={`font-mono tabular-nums text-white ${sizeClasses.number}`}>
          {pad(timeLeft.days)}
        </span>
        {showLabels && <span className={sizeClasses.label}>Days</span>}
      </div>

      <span className={`select-none ${sizeClasses.sep}`}>:</span>

      {/* Hours */}
      <div className={`flex flex-col items-center justify-center rounded-xl border border-white/10 bg-zinc-900/70 backdrop-blur-md text-center shadow-lg ${sizeClasses.box}`}>
        <span className={`font-mono tabular-nums text-white ${sizeClasses.number}`}>
          {pad(timeLeft.hours)}
        </span>
        {showLabels && <span className={sizeClasses.label}>Hours</span>}
      </div>

      <span className={`select-none ${sizeClasses.sep}`}>:</span>

      {/* Minutes */}
      <div className={`flex flex-col items-center justify-center rounded-xl border border-white/10 bg-zinc-900/70 backdrop-blur-md text-center shadow-lg ${sizeClasses.box}`}>
        <span className={`font-mono tabular-nums text-white ${sizeClasses.number}`}>
          {pad(timeLeft.minutes)}
        </span>
        {showLabels && <span className={sizeClasses.label}>Mins</span>}
      </div>

      <span className={`select-none ${sizeClasses.sep}`}>:</span>

      {/* Seconds */}
      <div className={`flex flex-col items-center justify-center rounded-xl border border-amber-500/30 bg-amber-950/20 backdrop-blur-md text-center shadow-lg shadow-amber-500/5 ${sizeClasses.box}`}>
        <span className={`font-mono tabular-nums text-amber-300 ${sizeClasses.number}`}>
          {pad(timeLeft.seconds)}
        </span>
        {showLabels && <span className={sizeClasses.label}>Secs</span>}
      </div>
    </div>
  );
}
