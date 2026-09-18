'use client';

import React, { useState } from 'react';
import { Mail, MessageSquare, Clock, CheckCircle2, Send, Lock } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('General Inquiry');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#070709] py-16 px-4 sm:px-6 lg:px-8 text-zinc-100">
      <div className="mx-auto max-w-3xl space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-mono tracking-widest text-amber-300">
            <Mail className="h-4 w-4 text-amber-400" />
            <span>DIRECT SUPPORT DESK</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Contact Support
          </h1>
          <p className="text-sm text-zinc-400 max-w-md mx-auto">
            Questions about your Secret ID, reveal schedule, or pre-reveal refund? Our team responds within 24 hours.
          </p>
        </div>

        {/* Contact Channels Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-6 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-mono text-xs">
              <Mail className="h-4 w-4" />
              <span>PRIMARY EMAIL DESK</span>
            </div>
            <div className="text-base font-bold text-white font-mono">
              help@thesecret.club
            </div>
            <p className="text-xs text-zinc-400">
              For general inquiries, lost Secret ID lookup, and technical questions.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-6 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs">
              <Clock className="h-4 w-4" />
              <span>SUPPORT HOURS & SLA</span>
            </div>
            <div className="text-base font-bold text-white font-mono">
              Mon — Fri / 24h Response
            </div>
            <p className="text-xs text-zinc-400">
              Inquiries submitted over the weekend are answered the following Monday.
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="rounded-3xl border border-white/10 bg-zinc-900/80 p-8 backdrop-blur-xl shadow-2xl space-y-6">
          {submitted ? (
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/30 p-8 text-center space-y-3">
              <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-400" />
              <h3 className="text-lg font-bold text-white">Message Dispatched</h3>
              <p className="text-xs text-zinc-300 max-w-sm mx-auto">
                Thank you. Your message has been received by our support team. We will respond to <strong>{email}</strong> shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 text-xs font-mono text-amber-400 underline underline-offset-4"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300">
                  Your Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@domain.com"
                  className="w-full rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-sm text-white placeholder-zinc-600 focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300">
                  Inquiry Topic
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-sm text-white focus:border-amber-400 focus:outline-none"
                >
                  <option value="General Inquiry">General Product Inquiry</option>
                  <option value="Lost Secret ID">Lost Secret ID Recovery</option>
                  <option value="Pre-reveal Refund">Pre-Reveal Refund Request</option>
                  <option value="Technical Issue">Technical / Access Question</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300">
                  Your Message
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your inquiry or include your Secret ID..."
                  className="w-full rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-sm text-white placeholder-zinc-600 focus:border-amber-400 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 py-3.5 text-xs font-bold uppercase tracking-wider text-zinc-950 hover:bg-amber-400 transition"
              >
                <Send className="h-4 w-4" />
                <span>Transmit Message to Support</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
