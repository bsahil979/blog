export type SecretContentType = 'text' | 'image' | 'report' | 'interactive' | 'audio';

export type SecretStatus = 'scheduled' | 'revealed' | 'archived';

export interface Secret {
  id: string;
  public_secret_id: string; // e.g. "SECRET-7F3A92"
  title: string;
  subtitle?: string;
  content: string; // Markdown or rich JSON string
  content_type: SecretContentType;
  reveal_at: string; // ISO 8601 string, e.g. "2026-09-30T20:00:00Z"
  created_at: string;
  updated_at: string;
  status: SecretStatus;
  media_url?: string;
  audio_url?: string;
  metadata?: {
    dossierLevel?: string;
    clearanceCode?: string;
    edition?: string;
    tags?: string[];
  };
}

export type PaymentStatus = 'pending' | 'succeeded' | 'failed' | 'refunded';

export interface Order {
  id: string;
  stripe_payment_id: string;
  customer_email: string;
  secret_id: string; // links to Secret.public_secret_id
  amount: number; // in cents, e.g. 1999 for $19.99
  currency: string; // "USD"
  payment_status: PaymentStatus;
  created_at: string;
  customer_name?: string;
}

export interface SecretPublicView {
  public_secret_id: string;
  title?: string;
  reveal_at: string;
  status: SecretStatus;
  is_revealed: boolean;
  content?: string;
  content_type?: SecretContentType;
  metadata?: Secret['metadata'];
}
