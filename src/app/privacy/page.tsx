import React from 'react';
import { ShieldAlert, Lock } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy — THE SECRET',
  description: 'Privacy Policy describing data minimization and security measures for The Secret.'
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#070709] py-16 px-4 sm:px-6 lg:px-8 text-zinc-100 font-sans">
      <div className="mx-auto max-w-3xl space-y-8">
        <div className="rounded-xl border border-amber-500/30 bg-amber-950/30 p-4 text-xs text-amber-200 flex items-start gap-2.5">
          <ShieldAlert className="h-4 w-4 shrink-0 text-amber-400 mt-0.5" />
          <span>
            <strong>Legal Notice:</strong> Standard privacy disclosures. Subject to professional legal review in respective jurisdictions.
          </span>
        </div>

        <div className="border-b border-white/10 pb-4">
          <h1 className="text-3xl font-bold text-white">Privacy Policy</h1>
          <p className="text-xs font-mono text-zinc-500 mt-1">Last Updated: September 2026</p>
        </div>

        <div className="space-y-6 text-sm text-zinc-300 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">1. Data Minimization Commitment</h2>
            <p>
              We practice strict data minimization. We only collect the minimal personal data necessary to execute your transaction and deliver your Secret:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-zinc-400">
              <li><strong>Email Address:</strong> To deliver your Secret ID confirmation, receipt, and reveal announcement.</li>
              <li><strong>Billing Name:</strong> For transaction authorization and anti-fraud verification.</li>
              <li><strong>Technical Logs:</strong> Minimal IP and security logs to protect against brute-force enumeration attacks.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">2. Payment Data</h2>
            <p>
              Payment card details are entered directly into encrypted iframe elements handled by our PCI-DSS certified payment processor (Stripe). Our application servers never view, process, or store raw credit card numbers or CVC codes.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">3. Third-Party Sharing</h2>
            <p>
              We do NOT sell, rent, monetize, or trade customer contact information to data brokers, advertising networks, or third parties under any circumstances.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">4. Your Rights & Deletion</h2>
            <p>
              You have the right to request access to or deletion of your purchase records at any time by contacting <span className="font-mono text-amber-300">privacy@thesecret.club</span>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
