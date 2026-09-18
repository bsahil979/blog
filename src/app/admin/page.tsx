'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Lock,
  Unlock,
  DollarSign,
  ShoppingCart,
  Layers,
  Sparkles,
  RotateCcw,
  AlertTriangle,
  Plus,
  Eye,
  Calendar,
  CheckCircle2,
  Mail,
  Shield,
  KeyRound
} from 'lucide-react';
import { Secret, Order } from '@/types/secret';
import { EmailModal } from '@/components/secret/EmailModal';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState(false);

  const [activeTab, setActiveTab] = useState<'overview' | 'secrets' | 'orders'>('overview');
  const [metrics, setMetrics] = useState({
    totalPurchases: 2,
    revenue: 39.98,
    secretsIssued: 2,
    secretsRevealed: 1,
    refunds: 0,
    failedPayments: 0
  });

  const [secrets, setSecrets] = useState<Secret[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // New Secret form state
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newSubtitle, setNewSubtitle] = useState('');
  const [newContentType, setNewContentType] = useState<Secret['content_type']>('interactive');
  const [newRevealAt, setNewRevealAt] = useState('2026-09-30T20:00:00.000Z');
  const [newContent, setNewContent] = useState('');

  // Email modal state
  const [emailModalData, setEmailModalData] = useState<{
    open: boolean;
    secretId: string;
    email: string;
    type: 'confirmation' | 'reveal';
  }>({
    open: false,
    secretId: '',
    email: '',
    type: 'confirmation'
  });

  const fetchAdminData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin');
      const data = await res.json();
      if (data.metrics) setMetrics(data.metrics);
      if (data.secrets) setSecrets(data.secrets);
      if (data.orders) setOrders(data.orders);
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchAdminData();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim().toUpperCase() === 'SECRET2026' || passcode.trim() === 'admin') {
      setIsAuthenticated(true);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  const handleToggleSecretStatus = async (publicId: string) => {
    try {
      const res = await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'toggle_status', publicId })
      });
      if (res.ok) {
        fetchAdminData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateSecret = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'create',
          title: newTitle,
          subtitle: newSubtitle,
          content_type: newContentType,
          reveal_at: newRevealAt,
          content: newContent || JSON.stringify({
            summary: 'Custom digital lore release.',
            narrative: ['Unlocked through admin issuance.']
          })
        })
      });

      if (res.ok) {
        setShowCreateModal(false);
        setNewTitle('');
        setNewSubtitle('');
        setNewContent('');
        fetchAdminData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Auth gate
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#070709] py-20 px-4 text-zinc-100 flex items-center justify-center">
        <div className="w-full max-w-sm rounded-3xl border border-white/10 bg-zinc-900/90 p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-500/40 bg-zinc-950">
              <Shield className="h-6 w-6 text-amber-400" />
            </div>
            <h1 className="text-xl font-bold text-white">The Secret — Admin Vault</h1>
            <p className="text-xs text-zinc-400">
              Enter authorized administrative clearance code.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                placeholder="Clearance Code"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-center text-sm font-mono text-amber-300 placeholder-zinc-600 focus:border-amber-400 focus:outline-none"
              />
              {authError && (
                <p className="mt-2 text-center text-xs text-rose-400">
                  Invalid clearance code. (Hint: SECRET2026)
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-amber-500 py-3 text-xs font-bold uppercase tracking-wider text-zinc-950 hover:bg-amber-400 transition"
            >
              Authenticate
            </button>
          </form>

          <div className="text-center">
            <button
              onClick={() => {
                setPasscode('SECRET2026');
                setIsAuthenticated(true);
              }}
              className="text-[11px] font-mono text-zinc-500 hover:text-amber-400 underline"
            >
              Auto-unlock Demo Admin (SECRET2026)
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070709] py-10 px-4 sm:px-6 lg:px-8 text-zinc-100">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Top Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-widest">
                ADMIN COCKPIT
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              The Secret Operations Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-1.5 rounded-xl bg-amber-500 px-4 py-2 text-xs font-bold text-zinc-950 hover:bg-amber-400 transition"
            >
              <Plus className="h-4 w-4" />
              <span>Create New Secret</span>
            </button>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-mono text-zinc-400 hover:text-white"
            >
              Lock Admin
            </button>
          </div>
        </div>

        {/* 1. KEY METRICS GRID */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
          <div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-4 space-y-1">
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-1">
              <ShoppingCart className="h-3 w-3 text-amber-400" /> Total Purchases
            </span>
            <div className="text-2xl font-black text-white">{metrics.totalPurchases}</div>
            <span className="text-[10px] text-emerald-400 font-mono">100% Succeeded</span>
          </div>

          <div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-4 space-y-1">
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-1">
              <DollarSign className="h-3 w-3 text-emerald-400" /> Total Revenue
            </span>
            <div className="text-2xl font-black text-emerald-300">
              ${metrics.revenue.toFixed(2)}
            </div>
            <span className="text-[10px] text-zinc-500 font-mono">USD Gross</span>
          </div>

          <div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-4 space-y-1">
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-1">
              <Layers className="h-3 w-3 text-amber-400" /> Secrets Issued
            </span>
            <div className="text-2xl font-black text-white">{metrics.secretsIssued}</div>
            <span className="text-[10px] text-zinc-500 font-mono">Unique Ciphers</span>
          </div>

          <div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-4 space-y-1">
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="h-3 w-3 text-indigo-400" /> Secrets Revealed
            </span>
            <div className="text-2xl font-black text-indigo-300">{metrics.secretsRevealed}</div>
            <span className="text-[10px] text-zinc-500 font-mono">Accessible now</span>
          </div>

          <div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-4 space-y-1">
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-1">
              <RotateCcw className="h-3 w-3 text-zinc-400" /> Refunds
            </span>
            <div className="text-2xl font-black text-zinc-300">{metrics.refunds}</div>
            <span className="text-[10px] text-zinc-500 font-mono">0.0% Rate</span>
          </div>

          <div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-4 space-y-1">
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-1">
              <AlertTriangle className="h-3 w-3 text-rose-400" /> Failed Payments
            </span>
            <div className="text-2xl font-black text-zinc-300">{metrics.failedPayments}</div>
            <span className="text-[10px] text-emerald-400 font-mono">Zero Errors</span>
          </div>
        </div>

        {/* 2. TAB CONTROLS */}
        <div className="flex border-b border-white/10 text-xs font-mono">
          <button
            onClick={() => setActiveTab('overview')}
            className={`border-b-2 px-6 py-3 transition ${
              activeTab === 'overview'
                ? 'border-amber-400 text-amber-400 font-bold'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            Secrets Management ({secrets.length})
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`border-b-2 px-6 py-3 transition ${
              activeTab === 'orders'
                ? 'border-amber-400 text-amber-400 font-bold'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            Customer Orders ({orders.length})
          </button>
        </div>

        {/* 3. SECRETS TABLE */}
        {activeTab === 'overview' && (
          <div className="rounded-2xl border border-white/10 bg-zinc-900/40 backdrop-blur-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-white/10 bg-black/40 font-mono text-[11px] text-zinc-400 uppercase">
                  <tr>
                    <th className="p-4">Secret Identifier</th>
                    <th className="p-4">Title / Dossier</th>
                    <th className="p-4">Format</th>
                    <th className="p-4">Scheduled Reveal</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-sans">
                  {secrets.map((s) => (
                    <tr key={s.id} className="hover:bg-white/5 transition">
                      <td className="p-4 font-mono font-bold text-amber-300">
                        {s.public_secret_id}
                      </td>
                      <td className="p-4">
                        <div className="font-semibold text-white">{s.title}</div>
                        <div className="text-[11px] text-zinc-500">{s.subtitle || 'Standard Edition'}</div>
                      </td>
                      <td className="p-4">
                        <span className="rounded bg-white/5 px-2 py-0.5 font-mono text-[10px] text-zinc-300 uppercase">
                          {s.content_type}
                        </span>
                      </td>
                      <td className="p-4 font-mono text-zinc-400">
                        {new Date(s.reveal_at).toLocaleDateString()} {new Date(s.reveal_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td className="p-4">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-mono font-semibold ${
                            s.status === 'revealed'
                              ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/30'
                              : 'bg-amber-950/60 text-amber-300 border border-amber-500/30'
                          }`}
                        >
                          {s.status === 'revealed' ? <Unlock className="h-2.5 w-2.5" /> : <Lock className="h-2.5 w-2.5" />}
                          {s.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => handleToggleSecretStatus(s.public_secret_id)}
                          className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-mono text-zinc-300 hover:text-amber-400 hover:border-amber-500/30 transition"
                          title="Instant reveal toggle for verification"
                        >
                          {s.status === 'revealed' ? 'Lock' : 'Reveal Now'}
                        </button>
                        <Link
                          href={`/secret/${s.public_secret_id}`}
                          target="_blank"
                          className="inline-flex items-center gap-1 rounded-lg bg-white/10 px-2.5 py-1 text-[11px] font-mono text-white hover:bg-white/20 transition"
                        >
                          <Eye className="h-3 w-3" />
                          <span>Preview</span>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 4. ORDERS TABLE */}
        {activeTab === 'orders' && (
          <div className="rounded-2xl border border-white/10 bg-zinc-900/40 backdrop-blur-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-white/10 bg-black/40 font-mono text-[11px] text-zinc-400 uppercase">
                  <tr>
                    <th className="p-4">Order ID</th>
                    <th className="p-4">Customer Email</th>
                    <th className="p-4">Assigned Secret</th>
                    <th className="p-4">Amount</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Date</th>
                    <th className="p-4 text-right">Email Tools</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-sans">
                  {orders.map((o) => (
                    <tr key={o.id} className="hover:bg-white/5 transition">
                      <td className="p-4 font-mono text-zinc-400">{o.id}</td>
                      <td className="p-4 text-white font-medium">{o.customer_email}</td>
                      <td className="p-4 font-mono text-amber-300 font-bold">{o.secret_id}</td>
                      <td className="p-4 font-mono text-zinc-300">${(o.amount / 100).toFixed(2)}</td>
                      <td className="p-4">
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-950/60 px-2.5 py-0.5 text-[10px] font-mono text-emerald-400 border border-emerald-500/30">
                          <CheckCircle2 className="h-2.5 w-2.5" />
                          {o.payment_status.toUpperCase()}
                        </span>
                      </td>
                      <td className="p-4 font-mono text-zinc-400">
                        {new Date(o.created_at).toLocaleDateString()}
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() =>
                            setEmailModalData({
                              open: true,
                              secretId: o.secret_id,
                              email: o.customer_email,
                              type: 'confirmation'
                            })
                          }
                          className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-mono text-zinc-300 hover:text-white"
                        >
                          <Mail className="h-3 w-3 text-amber-400" />
                          <span>View Email</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Modal: Create Secret */}
        {showCreateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
            <div className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-zinc-950 p-6 space-y-4 shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="text-base font-bold text-white">Create New Secret</h3>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-zinc-500 hover:text-white text-xs font-mono"
                >
                  ✕ Close
                </button>
              </div>

              <form onSubmit={handleCreateSecret} className="space-y-4 text-xs font-mono">
                <div>
                  <label className="block text-zinc-400 mb-1">Secret Title</label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="Project Zenith: Encrypted Transmission"
                    className="w-full rounded-lg border border-white/10 bg-zinc-900 px-3 py-2 text-white placeholder-zinc-600 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 mb-1">Subtitle</label>
                  <input
                    type="text"
                    value={newSubtitle}
                    onChange={(e) => setNewSubtitle(e.target.value)}
                    placeholder="Classified Archival Dossier"
                    className="w-full rounded-lg border border-white/10 bg-zinc-900 px-3 py-2 text-white placeholder-zinc-600 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-zinc-400 mb-1">Content Type</label>
                    <select
                      value={newContentType}
                      onChange={(e) => setNewContentType(e.target.value as Secret['content_type'])}
                      className="w-full rounded-lg border border-white/10 bg-zinc-900 px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="interactive">Interactive Dossier</option>
                      <option value="report">Classified Report</option>
                      <option value="text">Narrative Text</option>
                      <option value="audio">Soundscape</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-zinc-400 mb-1">Reveal Timestamp (ISO)</label>
                    <input
                      type="text"
                      value={newRevealAt}
                      onChange={(e) => setNewRevealAt(e.target.value)}
                      className="w-full rounded-lg border border-white/10 bg-zinc-900 px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-zinc-400 mb-1">Content / Narrative (Optional)</label>
                  <textarea
                    rows={3}
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    placeholder="Enter custom text or leave blank for default generated lore..."
                    className="w-full rounded-lg border border-white/10 bg-zinc-900 px-3 py-2 text-white placeholder-zinc-600 focus:outline-none focus:border-amber-400 font-sans"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="px-4 py-2 rounded-lg bg-zinc-800 text-zinc-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-amber-500 font-bold text-zinc-950 hover:bg-amber-400"
                  >
                    Generate Secret
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Email Preview Modal */}
        <EmailModal
          isOpen={emailModalData.open}
          onClose={() => setEmailModalData({ ...emailModalData, open: false })}
          secretId={emailModalData.secretId}
          customerEmail={emailModalData.email}
          defaultEmailType={emailModalData.type}
        />
      </div>
    </div>
  );
}
