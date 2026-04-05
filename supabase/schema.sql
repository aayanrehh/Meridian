-- ══════════════════════════════════════════════════════════════════
-- Meridian — Full Database Schema
-- Run this in Supabase SQL Editor → New Query
-- ══════════════════════════════════════════════════════════════════

-- ─── CLIENTS TABLE ───────────────────────────────────────────────
-- Multi-tenant: each row = one Meridian client (e.g., Jerah Reeves)
create table clients (
  id                        uuid         default gen_random_uuid() primary key,
  created_at                timestamptz  default now(),
  name                      text         not null,
  title                     text,                           -- "Gen-Z Business Dean"
  linkedin_urn              text,                           -- "urn:li:person:xxxx"
  voice_profile             jsonb,                          -- structured voice config (see below)
  core_thesis               text,                           -- "I help Gen-Z thrive..."
  followers                 integer      default 0,
  linkedin_token_expires_at timestamptz,                    -- alert when within 7 days of expiry
  auth_user_id              uuid         references auth.users(id) on delete cascade
);

-- ─── SCRAPE_ITEMS TABLE ──────────────────────────────────────────
-- Raw content ingested from Serper + Firecrawl
create table scrape_items (
  id          uuid         default gen_random_uuid() primary key,
  created_at  timestamptz  default now(),
  client_id   uuid         references clients(id) on delete cascade,
  source      text         not null,   -- 'serper_news' | 'firecrawl' | 'rss'
  url         text         unique,     -- deduplication key
  title       text,
  snippet     text,                    -- short excerpt from Serper
  full_text   text,                    -- full Markdown from Firecrawl
  relevance   numeric,                 -- 0.0–1.0, set by Claude
  used        boolean      default false  -- true after a draft references it
);

-- ─── POSTS TABLE ─────────────────────────────────────────────────
-- AI-generated drafts before they enter the deployment queue
create table posts (
  id             uuid         default gen_random_uuid() primary key,
  created_at     timestamptz  default now(),
  updated_at     timestamptz  default now(),
  client_id      uuid         references clients(id) on delete cascade,
  asset_type     text         not null,   -- 'LinkedIn Post' | 'Comment Reply' | 'Carousel' | 'Substack Draft'
  focus          text         not null,   -- topic / context string shown in queue table
  content        text         not null,   -- the draft text (JSON string for Carousels)
  scrape_item_id uuid         references scrape_items(id),  -- source material
  generation     integer      default 1,  -- increments on each Regenerate call
  status         text         default 'draft'  -- 'draft' | 'queued' | 'approved'
);

-- ─── DEPLOYMENTS TABLE ───────────────────────────────────────────
-- Tracks every LinkedIn publish action — the Deployment Queue in the UI
create table deployments (
  id               uuid         default gen_random_uuid() primary key,
  created_at       timestamptz  default now(),
  updated_at       timestamptz  default now(),
  client_id        uuid         references clients(id) on delete cascade,
  post_id          uuid         references posts(id),
  content_snapshot text         not null,    -- snapshot of text at time of deploy
  status           text         default 'pending',  -- 'pending'|'deployed'|'failed'|'scheduled'
  idempotency_key  text         unique,      -- prevents double-posting; hash of deploymentId
  linkedin_post_id text,                    -- returned by LinkedIn API after publish
  scheduled_for    timestamptz,             -- null = deploy immediately
  deployed_at      timestamptz,
  error_message    text                     -- filled if status = 'failed'
);

-- ─── INDEXES ─────────────────────────────────────────────────────
create index on deployments (client_id, status, created_at desc);
create index on posts       (client_id, status, created_at desc);
create index on scrape_items(client_id, used,   created_at desc);
create index on scrape_items(url);  -- fast dedup lookups

-- ─── UPDATED_AT TRIGGER ──────────────────────────────────────────
create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger posts_updated
  before update on posts
  for each row execute function set_updated_at();

create trigger deployments_updated
  before update on deployments
  for each row execute function set_updated_at();

-- ─── ROW LEVEL SECURITY ──────────────────────────────────────────
alter table clients      enable row level security;
alter table posts        enable row level security;
alter table deployments  enable row level security;
alter table scrape_items enable row level security;

-- Service role (n8n) bypasses RLS — full access via service_role key.
-- Auth user policies added in rls.sql (run after auth is wired up).
-- For Phase 0 MVP: skip auth, use service_role key from n8n only.
