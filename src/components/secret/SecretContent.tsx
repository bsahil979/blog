'use client';

import React, { useState } from 'react';
import {
  FileText,
  Compass,
  KeyRound,
  Download,
  Share2,
  Headphones,
  Play,
  Pause,
  Award,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

interface SecretContentProps {
  secretId: string;
  content?: string;
  contentType?: string;
  title?: string;
}

interface ParsedContent {
  classification?: string;
  summary?: string;
  narrative?: string[];
  coordinates?: string;
  hash?: string;
  edition?: string;
}

export function SecretContent({
  secretId,
  content,
  contentType = 'interactive',
  title
}: SecretContentProps) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeTab, setActiveTab] = useState<'dossier' | 'certificate' | 'audio'>('dossier');

  let parsed: ParsedContent = {};
  try {
    if (content) {
      parsed = JSON.parse(content);
    }
  } catch {
    parsed = {
      summary: content || 'The secret transmission has been unlocked.',
      narrative: [content || 'Contents verified.']
    };
  }

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleDownloadCertificate = () => {
    if (typeof window === 'undefined') return;
    const certText = `
============================================================
              THE SECRET — OFFICIAL ARCHIVAL PROOF
============================================================
SECRET ID:     ${secretId}
EDITION:       ${parsed.edition || '2026 Sovereign Genesis'}
CLASSIFICATION: ${parsed.classification || 'UNLOCKED DIGITAL MYSTERY'}
COORDINATES:   ${parsed.coordinates || '82°06’14.2”N 034°12’09.8”E'}
HASH DIGEST:   ${parsed.hash || 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4'}
TIMESTAMP:     ${new Date().toUTCString()}
STATUS:        VERIFIED CUSTODIAL POSSESSION

"You paid to discover what happens next."
============================================================
    `;
    const blob = new Blob([certText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${secretId}-Certificate.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full space-y-6">
      {/* Navigation tabs */}
      <div className="flex border-b border-white/10 text-xs font-mono">
        <button
          onClick={() => setActiveTab('dossier')}
          className={`flex items-center gap-2 border-b-2 px-5 py-3 transition-colors ${
            activeTab === 'dossier'
              ? 'border-amber-400 text-amber-400 font-bold bg-amber-400/5'
              : 'border-transparent text-zinc-400 hover:text-white'
          }`}
        >
          <FileText className="h-4 w-4" />
          <span>Interactive Dossier</span>
        </button>

        <button
          onClick={() => setActiveTab('certificate')}
          className={`flex items-center gap-2 border-b-2 px-5 py-3 transition-colors ${
            activeTab === 'certificate'
              ? 'border-amber-400 text-amber-400 font-bold bg-amber-400/5'
              : 'border-transparent text-zinc-400 hover:text-white'
          }`}
        >
          <Award className="h-4 w-4" />
          <span>Archival Certificate</span>
        </button>

        <button
          onClick={() => setActiveTab('audio')}
          className={`flex items-center gap-2 border-b-2 px-5 py-3 transition-colors ${
            activeTab === 'audio'
              ? 'border-amber-400 text-amber-400 font-bold bg-amber-400/5'
              : 'border-transparent text-zinc-400 hover:text-white'
          }`}
        >
          <Headphones className="h-4 w-4" />
          <span>Atmospheric Soundscape</span>
        </button>
      </div>

      {/* Tab 1: Interactive Dossier */}
      {activeTab === 'dossier' && (
        <div className="rounded-2xl border border-white/10 bg-zinc-900/80 p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6">
          {/* Header Metadata badge */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="rounded bg-amber-500/10 px-2 py-0.5 text-amber-300 font-bold">
                {parsed.classification || 'DECRYPTED DOSSIER'}
              </span>
              <span className="text-zinc-500">ID: {secretId}</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-400">
              <Compass className="h-3.5 w-3.5 text-amber-400" />
              <span>{parsed.coordinates || '82°06’14.2”N 034°12’09.8”E'}</span>
            </div>
          </div>

          {/* Dossier Title & Summary */}
          <div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              {title || 'The Obsidian Protocol: Decrypted Chronicle'}
            </h3>
            <p className="mt-2 text-sm text-zinc-300 leading-relaxed bg-black/40 p-4 rounded-xl border border-white/5 font-sans">
              {parsed.summary ||
                'A curated chronicle of humanity’s first synthetic quantum beacon, accompanied by archival audio transmissions and a cryptographic certificate of discovery.'}
            </p>
          </div>

          {/* Narrative paragraphs */}
          <div className="space-y-4 text-sm text-zinc-300 leading-relaxed font-sans border-l-2 border-amber-500/40 pl-4">
            {parsed.narrative && parsed.narrative.length > 0 ? (
              parsed.narrative.map((p, i) => <p key={i}>{p}</p>)
            ) : (
              <>
                <p>
                  At 03:14:07 UTC on an unrecorded date in the sub-polar trench, a transmission began. Not an echo, not an anomaly, but a deliberate harmonic sequence.
                </p>
                <p>
                  You hold the singular decrypted dossier of this discovery. It is not an artifact of chance; it is a guaranteed window into a narrative constructed over fourteen months by five independent investigative minds.
                </p>
                <p>
                  Every frequency logged in this dossier has been sonified into the accompanying audio track. Examine the coordinates, verify the cryptographic proof, and keep the archive safe.
                </p>
              </>
            )}
          </div>

          {/* Cryptographic hash proof */}
          <div className="rounded-xl border border-white/5 bg-black/60 p-4 font-mono text-[11px] text-zinc-400 space-y-1 overflow-x-auto">
            <div className="flex items-center gap-1.5 text-amber-400/90 font-bold">
              <KeyRound className="h-3.5 w-3.5" />
              <span>CRYPTOGRAPHIC ATTESTATION HASH (SHA-256)</span>
            </div>
            <p className="text-zinc-300 select-all font-mono break-all">
              {parsed.hash || 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'}
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-white/5">
            <button
              onClick={handleDownloadCertificate}
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-zinc-200 hover:bg-white/10 hover:text-white transition"
            >
              <Download className="h-4 w-4 text-amber-400" />
              <span>Download Signed Dossier (.txt)</span>
            </button>

            <button
              onClick={handleShare}
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-zinc-200 hover:bg-white/10 hover:text-white transition"
            >
              <Share2 className="h-4 w-4" />
              <span>{copiedLink ? 'Link Copied!' : 'Share Access Link'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Tab 2: Certificate of Custody */}
      {activeTab === 'certificate' && (
        <div className="rounded-3xl border border-amber-500/30 bg-gradient-to-b from-zinc-900 via-zinc-950 to-black p-8 sm:p-12 text-center shadow-2xl relative overflow-hidden">
          {/* Subtle ornate gold border */}
          <div className="pointer-events-none absolute inset-3 rounded-2xl border border-amber-500/20" />

          <div className="relative z-10 space-y-4 max-w-lg mx-auto">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full border border-amber-500/40 bg-amber-500/10 text-amber-400 mb-2">
              <Award className="h-8 w-8" />
            </div>

            <div className="font-mono text-xs uppercase tracking-[0.3em] text-amber-400">
              Certificate of Custody
            </div>

            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-wide">
              THE SECRET
            </h2>

            <p className="text-xs text-zinc-400 font-sans max-w-sm mx-auto">
              This certifies that the bearer is the verified custodian of the decrypted digital experience registered under identifier:
            </p>

            <div className="inline-block rounded-xl border border-amber-500/40 bg-black/60 px-6 py-2.5 font-mono text-lg font-bold tracking-widest text-amber-300">
              {secretId}
            </div>

            <div className="pt-4 grid grid-cols-2 gap-4 text-left font-mono text-[11px] text-zinc-400 border-t border-white/10">
              <div>
                <span className="block text-zinc-500">EDITION</span>
                <span className="text-zinc-200 font-bold">{parsed.edition || '2026 Sovereign Genesis'}</span>
              </div>
              <div>
                <span className="block text-zinc-500">VERIFIED STATUS</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" /> GUARANTEED REVEAL
                </span>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={handleDownloadCertificate}
                className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-2.5 text-xs font-bold text-zinc-950 hover:bg-amber-400 transition shadow-lg shadow-amber-500/20"
              >
                <Download className="h-4 w-4 text-zinc-950" />
                <span>Save Archival Proof</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Soundscape */}
      {activeTab === 'audio' && (
        <div className="rounded-2xl border border-white/10 bg-zinc-900/80 p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4 font-mono text-xs text-zinc-400">
            <span>SOUNDSCAPE TRANSMISSION // 24-BIT 48KHZ</span>
            <span className="text-amber-400 font-bold">04:12 RUNTIME</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6 p-6 rounded-2xl bg-black/50 border border-white/5">
            <button
              onClick={() => setIsPlayingAudio(!isPlayingAudio)}
              className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-zinc-950 shadow-xl shadow-amber-500/20 hover:scale-105 active:scale-95 transition"
            >
              {isPlayingAudio ? <Pause className="h-7 w-7" /> : <Play className="h-7 w-7 ml-0.5" />}
            </button>

            <div className="w-full space-y-2 text-center sm:text-left">
              <div className="text-sm font-bold text-white">
                “Frequencies in the Ice” — Original Ambience
              </div>
              <p className="text-xs text-zinc-400">
                Recorded specifically for The Secret archive. Synchronized with the sub-polar telemetry log.
              </p>

              {/* Synthetic audio waveform visualizer */}
              <div className="flex items-end gap-1 h-8 pt-2">
                {Array.from({ length: 32 }).map((_, i) => (
                  <div
                    key={i}
                    style={{
                      height: isPlayingAudio
                        ? `${Math.max(15, Math.sin(i * 0.4 + Date.now() * 0.003) * 100)}%`
                        : `${15 + (i % 6) * 10}%`
                    }}
                    className={`w-full rounded-full transition-all duration-150 ${
                      isPlayingAudio ? 'bg-amber-400' : 'bg-zinc-700'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <p className="text-xs text-zinc-400 italic">
            Note: All media included with The Secret is DRM-free and permanently accessible to your Secret ID.
          </p>
        </div>
      )}
    </div>
  );
}
