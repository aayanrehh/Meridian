-- ══════════════════════════════════════════════════════════════════
-- Meridian — Row Level Security Policies
-- Run AFTER schema.sql AND after Supabase Auth is configured (Phase 2)
-- For Phase 0 MVP: skip this file. n8n uses service_role which bypasses RLS.
-- ══════════════════════════════════════════════════════════════════

-- Users can only read/write their own client row
create policy "client owner access" on clients
  for all using (auth_user_id = auth.uid());

-- Cascading: users access posts/deployments/scrape_items via client ownership
create policy "posts via client" on posts
  for all using (
    client_id in (select id from clients where auth_user_id = auth.uid())
  );

create policy "deployments via client" on deployments
  for all using (
    client_id in (select id from clients where auth_user_id = auth.uid())
  );

create policy "scrape_items via client" on scrape_items
  for all using (
    client_id in (select id from clients where auth_user_id = auth.uid())
  );
