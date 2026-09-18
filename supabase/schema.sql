-- ============================================================
-- THE SECRET: SUPABASE POSTGRESQL PRODUCTION SCHEMA
-- ============================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. SECRETS TABLE
create table if not exists public.secrets (
  id uuid primary key default uuid_generate_v4(),
  public_secret_id text unique not null,
  title text not null,
  subtitle text,
  content jsonb not null,
  content_type text not null default 'interactive', -- 'interactive' | 'report' | 'text' | 'audio'
  reveal_at timestamptz not null default '2026-09-30 20:00:00+00',
  status text not null default 'scheduled', -- 'scheduled' | 'revealed' | 'archived'
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Index for instant public_secret_id lookups
create index if not exists idx_secrets_public_id on public.secrets(public_secret_id);

-- 2. ORDERS TABLE
create table if not exists public.orders (
  id uuid primary key default uuid_generate_v4(),
  payment_id text unique not null,
  customer_email text not null,
  customer_name text,
  secret_id text not null references public.secrets(public_secret_id),
  amount integer not null default 1999, -- in cents: $19.99
  currency text not null default 'usd',
  payment_status text not null default 'pending', -- 'pending' | 'succeeded' | 'failed' | 'refunded'
  payment_method text not null default 'card', -- 'card' | 'crypto_btc'
  created_at timestamptz not null default now()
);

-- Index for lookups by customer email and payment ID
create index if not exists idx_orders_customer_email on public.orders(customer_email);
create index if not exists idx_orders_payment_id on public.orders(payment_id);

-- 3. ROW LEVEL SECURITY (RLS)
alter table public.secrets enable row level security;
alter table public.orders enable row level security;

-- Public can read basic metadata for any secret
create policy "Allow public read of secret metadata"
  on public.secrets for select
  using (true);

-- Secrets content is only revealed once reveal_at timestamp has passed OR status is 'revealed'
create or replace view public.public_secrets as
  select
    id,
    public_secret_id,
    case when (now() >= reveal_at or status = 'revealed') then title else null end as title,
    subtitle,
    content_type,
    reveal_at,
    status,
    case when (now() >= reveal_at or status = 'revealed') then content else null end as content,
    case when (now() >= reveal_at or status = 'revealed') then true else false end as is_revealed,
    metadata
  from public.secrets;

-- Service role bypasses RLS for webhooks & order processing
create policy "Service role can manage secrets"
  on public.secrets for all
  using (auth.role() = 'service_role');

create policy "Service role can manage orders"
  on public.orders for all
  using (auth.role() = 'service_role');

-- 4. SEED INITIAL CANONICAL DATA
insert into public.secrets (public_secret_id, title, subtitle, content_type, reveal_at, status, content, metadata)
values (
  'SECRET-7F3A92',
  'The Obsidian Protocol: Artifact Omega',
  'Classified Transmission — Level 5 Clearance',
  'interactive',
  '2026-09-30 20:00:00+00',
  'scheduled',
  jsonb_build_object(
    'classification', 'TOP SECRET // EYES ONLY',
    'summary', 'A curated chronicle of humanity’s first synthetic quantum beacon, accompanied by archival audio transmissions and a cryptographic certificate of discovery.',
    'coordinates', '82°06’14.2”N 034°12’09.8”E',
    'hash', 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    'edition', 'First Edition — Sovereign Archive',
    'narrative', jsonb_build_array(
      'At 03:14:07 UTC on an unrecorded date in the sub-polar trench, a transmission began. Not an echo, not an anomaly, but a deliberate harmonic sequence.',
      'You hold the singular decrypted dossier of this discovery. It is not an artifact of chance; it is a guaranteed window into a narrative constructed over fourteen months by five independent investigative minds.',
      'Every frequency logged in this dossier has been sonified into the accompanying audio track. Examine the coordinates, verify the cryptographic proof, and keep the archive safe.'
    )
  ),
  jsonb_build_object('dossierLevel', 'Classified Omega', 'edition', 'Guaranteed 2026 Mystery Series')
)
on conflict (public_secret_id) do nothing;
