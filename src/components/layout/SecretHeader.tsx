'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Lock, KeyRound, Shield, HelpCircle, Menu, X, ArrowRight } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

export function SecretHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const handleNavClick = (name: string) => {
    trackEvent('how_it_works_clicked');
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { name: 'How It Works', href: '/#how-it-works' },
    { name: 'Trust Center', href: '/trust' },
    { name: 'Access Secret', href: '/secret' },
    { name: 'FAQ', href: '/faq' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/5 bg-zinc-950/80 backdrop-blur-xl transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 text-zinc-100 transition"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-amber-500/40 bg-zinc-900 shadow-md shadow-amber-500/10 group-hover:border-amber-400 group-hover:shadow-amber-500/25 transition">
            <Lock className="h-4 w-4 text-amber-400 group-hover:scale-105 transition-transform" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-sm font-black tracking-[0.25em] text-white group-hover:text-amber-300 transition">
              THE SECRET
            </span>
            <span className="text-[9px] font-mono tracking-widest text-zinc-500">
              EST. 2026
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-mono tracking-wider">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => handleNavClick(link.name)}
              className={`transition-colors hover:text-amber-400 ${
                pathname === link.href ? 'text-amber-400 font-semibold' : 'text-zinc-400'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right Action CTAs */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            href="/secret"
            className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-mono text-zinc-300 hover:bg-white/10 hover:text-white transition"
          >
            <KeyRound className="h-3.5 w-3.5 text-amber-400" />
            <span>Enter Secret ID</span>
          </Link>

          <Link
            href="/checkout"
            onClick={() => trackEvent('checkout_started')}
            className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-1.5 text-xs font-semibold text-zinc-950 uppercase tracking-wider hover:from-amber-400 hover:to-amber-500 hover:shadow-md hover:shadow-amber-500/20 active:scale-95 transition"
          >
            <span>Get Secret — $19.99</span>
            <ArrowRight className="h-3.5 w-3.5 text-zinc-950" />
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-zinc-400 hover:text-white hover:bg-white/5"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/10 bg-zinc-950/95 px-4 py-5 backdrop-blur-2xl">
          <nav className="flex flex-col gap-4 text-sm font-mono">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 text-zinc-300 hover:text-amber-400 transition"
              >
                {link.name}
              </Link>
            ))}

            <div className="pt-3 border-t border-white/10 flex flex-col gap-2.5">
              <Link
                href="/secret"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-2.5 text-xs font-mono text-zinc-200"
              >
                <KeyRound className="h-4 w-4 text-amber-400" />
                <span>Enter Secret ID</span>
              </Link>

              <Link
                href="/checkout"
                onClick={() => {
                  trackEvent('checkout_started');
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-2 rounded-xl bg-amber-500 py-2.5 text-xs font-bold text-zinc-950 uppercase tracking-wider"
              >
                <span>Get Your Secret — $19.99</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
