import { Secret, Order, SecretPublicView } from '@/types/secret';
import { generateSecretId } from './crypto';
import { supabaseAdmin, isSupabaseConfigured } from './supabase';

export const DEFAULT_REVEAL_DATE = '2026-09-30T20:00:00.000Z';

class SecretDatabase {
  private secrets: Map<string, Secret> = new Map();
  private orders: Map<string, Order> = new Map();

  constructor() {
    this.seedDefaults();
  }

  private seedDefaults() {
    const secret1: Secret = {
      id: 'sec_001_canonical',
      public_secret_id: 'SECRET-7F3A92',
      title: 'The Obsidian Protocol: Artifact Omega',
      subtitle: 'Classified Transmission — Level 5 Clearance',
      content_type: 'interactive',
      content: JSON.stringify({
        classification: 'TOP SECRET // EYES ONLY',
        summary: 'A curated chronicle of humanity’s first synthetic quantum beacon, accompanied by archival audio transmissions and a cryptographic certificate of discovery.',
        narrative: [
          'At 03:14:07 UTC on an unrecorded date in the sub-polar trench, a transmission began. Not an echo, not an anomaly, but a deliberate harmonic sequence.',
          'You hold the singular decrypted dossier of this discovery. It is not an artifact of chance; it is a guaranteed window into a narrative constructed over fourteen months by five independent investigative minds.',
          'Every frequency logged in this dossier has been sonified into the accompanying audio track. Examine the coordinates, verify the cryptographic proof, and keep the archive safe.'
        ],
        coordinates: '82°06’14.2”N 034°12’09.8”E',
        hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
        edition: 'First Edition — Sovereign Archive'
      }),
      reveal_at: DEFAULT_REVEAL_DATE,
      created_at: '2026-09-01T00:00:00.000Z',
      updated_at: '2026-09-01T00:00:00.000Z',
      status: 'scheduled',
      metadata: {
        dossierLevel: 'Classified Omega',
        clearanceCode: 'OMEGA-772',
        edition: 'Guaranteed 2026 Mystery Series',
        tags: ['Lore', 'Audio Dossier', 'Generative Artifact']
      }
    };

    const secretDemo: Secret = {
      id: 'sec_002_demo',
      public_secret_id: 'SECRET-DEMO26',
      title: 'Project Chronos: The Unwritten Archive',
      subtitle: 'Interactive Decrypted Narrative & Digital Certificate',
      content_type: 'report',
      content: JSON.stringify({
        classification: 'DECRYPTED // UNLOCKED',
        summary: 'The sealed memory chamber of the 2026 Zenith Initiative. You have unlocked the full high-fidelity report.',
        narrative: [
          'Welcome inside The Secret. When you secured this product, you took a step into intentional anticipation.',
          'Unlike modern disposable media, this experience was held under lock until the moment of synchronous release.',
          'Enclosed is your high-resolution digital certificate of participation, the complete 12-page narrative chronicle, and exclusive audio soundscape recorded exclusively for Secret holders.'
        ],
        coordinates: '37°14’06.0”N 115°48’40.0”W',
        hash: 'b5d4045c3f466fa91fe2cc6abe79232a1a57cdf104f7a26e716e0a1e2789df78',
        edition: 'Genesis Edition — Verified Custody'
      }),
      reveal_at: '2026-01-01T00:00:00.000Z',
      created_at: '2026-01-01T00:00:00.000Z',
      updated_at: '2026-01-01T00:00:00.000Z',
      status: 'revealed',
      metadata: {
        dossierLevel: 'Public Decryption',
        clearanceCode: 'ALPHA-909',
        edition: 'Demo Preview Series',
        tags: ['Interactive Report', 'Genesis Certificate']
      }
    };

    this.secrets.set(secret1.public_secret_id, secret1);
    this.secrets.set(secretDemo.public_secret_id, secretDemo);

    this.orders.set('ord_demo_01', {
      id: 'ord_demo_01',
      stripe_payment_id: 'pi_3Psecret_001_mock',
      customer_email: 'collector@thesecret.club',
      customer_name: 'Elena Rostova',
      secret_id: 'SECRET-7F3A92',
      amount: 1999,
      currency: 'USD',
      payment_status: 'succeeded',
      created_at: new Date(Date.now() - 86400000 * 2).toISOString()
    });
  }

  public getSecretByPublicId(publicId: string): Secret | null {
    const cleanId = publicId.trim().toUpperCase();
    return this.secrets.get(cleanId) || null;
  }

  public getPublicSecretView(publicId: string, forceUnlock: boolean = false): SecretPublicView | null {
    const secret = this.getSecretByPublicId(publicId);
    if (!secret) return null;

    const isPastReveal = new Date() >= new Date(secret.reveal_at);
    const isRevealed = forceUnlock || secret.status === 'revealed' || isPastReveal;

    return {
      public_secret_id: secret.public_secret_id,
      title: isRevealed ? secret.title : undefined,
      reveal_at: secret.reveal_at,
      status: isRevealed ? 'revealed' : secret.status,
      is_revealed: isRevealed,
      content: isRevealed ? secret.content : undefined,
      content_type: isRevealed ? secret.content_type : undefined,
      metadata: secret.metadata
    };
  }

  public getAllSecrets(): Secret[] {
    return Array.from(this.secrets.values()).sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  }

  public createSecret(data: {
    title: string;
    subtitle?: string;
    content: string;
    content_type: Secret['content_type'];
    reveal_at: string;
    metadata?: Secret['metadata'];
  }): Secret {
    const public_secret_id = generateSecretId();
    const newSecret: Secret = {
      id: `sec_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      public_secret_id,
      title: data.title,
      subtitle: data.subtitle,
      content: data.content,
      content_type: data.content_type,
      reveal_at: data.reveal_at,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      status: new Date() >= new Date(data.reveal_at) ? 'revealed' : 'scheduled',
      metadata: data.metadata
    };

    this.secrets.set(public_secret_id, newSecret);

    // Sync to Supabase in background if configured
    if (isSupabaseConfigured && supabaseAdmin) {
      supabaseAdmin.from('secrets').insert({
        public_secret_id: newSecret.public_secret_id,
        title: newSecret.title,
        subtitle: newSecret.subtitle,
        content: JSON.parse(newSecret.content),
        content_type: newSecret.content_type,
        reveal_at: newSecret.reveal_at,
        status: newSecret.status,
        metadata: newSecret.metadata
      }).then(({ error }) => {
        if (error) console.error('[Supabase Sync Error]', error);
      });
    }

    return newSecret;
  }

  public updateSecret(publicId: string, updates: Partial<Secret>): Secret | null {
    const existing = this.getSecretByPublicId(publicId);
    if (!existing) return null;

    const updated: Secret = {
      ...existing,
      ...updates,
      updated_at: new Date().toISOString()
    };
    this.secrets.set(publicId.toUpperCase(), updated);

    if (isSupabaseConfigured && supabaseAdmin) {
      supabaseAdmin.from('secrets')
        .update({
          status: updated.status,
          reveal_at: updated.reveal_at,
          title: updated.title
        })
        .eq('public_secret_id', publicId.toUpperCase())
        .then(({ error }) => {
          if (error) console.error('[Supabase Update Error]', error);
        });
    }

    return updated;
  }

  public createOrder(params: {
    customer_email: string;
    customer_name?: string;
    stripe_payment_id?: string;
    payment_method?: string;
  }): { order: Order; secret: Secret } {
    const publicSecretId = generateSecretId();

    const secret: Secret = {
      id: `sec_${Date.now()}`,
      public_secret_id: publicSecretId,
      title: 'The Obsidian Protocol: Decrypted Transmission',
      subtitle: 'Classified Soundscape & Archival Dossier',
      content_type: 'interactive',
      content: JSON.stringify({
        classification: 'CONFIDENTIAL // REVEALED ARCHIVE',
        summary: 'Your guaranteed digital Secret experience. An immersive narrative mystery with unreleased digital artifacts.',
        narrative: [
          'You acquired this Secret with no spoilers, trusting the promise of guaranteed digital craftsmanship.',
          'Now that the reveal countdown has reached zero, the cryptographic seal has dissolved.',
          'Here lies the complete dossier of the 2026 Mystery. You can stream the atmospheric audio, read the decrypted field log, and download your verified custodial certificate below.'
        ],
        coordinates: '64°08’42.1”N 021°55’41.5”W',
        hash: 'a71e846182c40c8831ef39a67a80b1e5a32906df0e2cf065f496155998a12e31',
        edition: 'Verified Custody — First Generation'
      }),
      reveal_at: DEFAULT_REVEAL_DATE,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      status: 'scheduled',
      metadata: {
        dossierLevel: 'Standard Sealed',
        clearanceCode: `CUSTODY-${publicSecretId.replace('SECRET-', '')}`,
        edition: 'September 2026 Reveal',
        tags: ['Guaranteed Product', 'Narrative Lore', 'Audio File']
      }
    };

    this.secrets.set(publicSecretId, secret);

    const orderId = `ord_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const order: Order = {
      id: orderId,
      stripe_payment_id: params.stripe_payment_id || `pi_${Date.now()}_mock`,
      customer_email: params.customer_email.toLowerCase().trim(),
      customer_name: params.customer_name || 'Collector',
      secret_id: publicSecretId,
      amount: 1999, // $19.99
      currency: 'USD',
      payment_status: 'succeeded',
      created_at: new Date().toISOString()
    };

    this.orders.set(orderId, order);

    // Sync to Supabase if available
    if (isSupabaseConfigured && supabaseAdmin) {
      const client = supabaseAdmin;
      client.from('secrets').insert({
        public_secret_id: secret.public_secret_id,
        title: secret.title,
        subtitle: secret.subtitle,
        content: JSON.parse(secret.content),
        content_type: secret.content_type,
        reveal_at: secret.reveal_at,
        status: secret.status,
        metadata: secret.metadata
      }).then(() => {
        return client.from('orders').insert({
          payment_id: order.stripe_payment_id,
          customer_email: order.customer_email,
          customer_name: order.customer_name,
          secret_id: order.secret_id,
          amount: order.amount,
          currency: order.currency,
          payment_status: order.payment_status,
          payment_method: params.payment_method || 'card'
        });
      }).then(({ error }) => {
        if (error) console.error('[Supabase Order Sync Error]', error);
      });
    }

    return { order, secret };
  }

  public getAllOrders(): Order[] {
    return Array.from(this.orders.values()).sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  }

  public getOrdersByEmail(email: string): Order[] {
    const cleanEmail = email.toLowerCase().trim();
    return this.getAllOrders().filter((o) => o.customer_email === cleanEmail);
  }

  public getMetrics() {
    const orders = this.getAllOrders();
    const secrets = this.getAllSecrets();
    const totalPurchases = orders.filter((o) => o.payment_status === 'succeeded').length;
    const revenue = totalPurchases * 19.99;
    const secretsIssued = secrets.length;
    const secretsRevealed = secrets.filter(
      (s) => s.status === 'revealed' || new Date() >= new Date(s.reveal_at)
    ).length;
    const refunds = orders.filter((o) => o.payment_status === 'refunded').length;
    const failedPayments = orders.filter((o) => o.payment_status === 'failed').length;

    return {
      totalPurchases,
      revenue,
      secretsIssued,
      secretsRevealed,
      refunds,
      failedPayments
    };
  }
}

declare global {
  // eslint-disable-next-line no-var
  var __secretDatabase: SecretDatabase | undefined;
}

export const secretDb = globalThis.__secretDatabase ?? new SecretDatabase();
if (process.env.NODE_ENV !== 'production') {
  globalThis.__secretDatabase = secretDb;
}
