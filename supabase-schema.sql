-- ============================================================
-- Escape to Paradise — Supabase Schema
-- Run this in: Supabase Dashboard > SQL Editor > New query
-- ============================================================


-- ============================================================
-- 1. flight_requests
--    Customer flight inquiry form (RequestFlight.tsx)
-- ============================================================
create table if not exists flight_requests (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),

  -- Customer contact info
  name         text not null,
  email        text not null,
  phone        text not null,

  -- Flight details
  from_city    text not null,
  to_city      text not null,
  departure_date date not null,
  return_date    date,
  travelers      integer not null default 1,
  preferred_time text,
  budget         numeric(10, 2),
  notes          text,

  -- Workflow (admin use)
  status       text not null default 'pending'
                 check (status in ('pending', 'contacted', 'completed', 'cancelled')),
  admin_notes  text
);

create index if not exists idx_flight_requests_created_at on flight_requests (created_at desc);
create index if not exists idx_flight_requests_status     on flight_requests (status);

-- Auto-update updated_at on edit
create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger trg_flight_requests_updated_at
  before update on flight_requests
  for each row execute function set_updated_at();


-- ============================================================
-- 2. trip_requests
--    Customer trip planning form (PlanTrip.tsx)
-- ============================================================
create table if not exists trip_requests (
  id                   uuid primary key default gen_random_uuid(),
  created_at           timestamptz not null default now(),

  -- Customer contact info
  name                 text not null,
  email                text not null,
  phone                text not null,

  -- Trip details
  destination          text not null,
  trip_type            text not null,
  travel_start_date    text,
  travel_end_date      text,
  number_of_travelers  integer not null default 1,
  budget               text,
  additional_notes     text,

  -- Workflow
  status               text default 'new'
);

create index if not exists idx_trip_requests_created_at on trip_requests (created_at desc);


-- ============================================================
-- 3. contact_submissions
--    Contact form messages (Contact.tsx)
-- ============================================================
create table if not exists contact_submissions (
  id         uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  name       text not null,
  email      text not null,
  phone      text,
  message    text not null
);

create index if not exists idx_contact_submissions_created_at on contact_submissions (created_at desc);


-- ============================================================
-- 4. deals
--    Admin-managed package deals (AdminDeals.tsx)
-- ============================================================
create table if not exists deals (
  id                 uuid primary key default gen_random_uuid(),
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now(),

  -- Core fields
  name               text not null,
  type               text not null
                       check (type in ('Flights', 'Packages', 'Cruises', 'Hotels')),
  destination        text not null,
  route              text not null,
  price_per_person   numeric(10, 2) not null,
  travel_start_date  date not null,
  travel_end_date    date not null,
  image_url          text,
  is_active          boolean not null default true,

  -- Package-specific fields (nullable for non-package types)
  description        text,
  duration           text,
  group_size         text,
  accommodation      text,
  meals              text,
  includes           text[],    -- array of included items
  highlights         text[]     -- array of highlights
);

create index if not exists idx_deals_active     on deals (is_active);
create index if not exists idx_deals_type       on deals (type);
create index if not exists idx_deals_created_at on deals (created_at desc);

create trigger trg_deals_updated_at
  before update on deals
  for each row execute function set_updated_at();


-- ============================================================
-- 5. newsletter_subscribers
-- ============================================================
create table if not exists newsletter_subscribers (
  id            uuid primary key default gen_random_uuid(),
  subscribed_at timestamptz not null default now(),
  email         text not null unique,
  is_active     boolean not null default true
);


-- ============================================================
-- 6. admins
--    Stores which auth.users are admins. Managed manually.
-- ============================================================
create table if not exists admins (
  user_id    uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz default now()
);

-- Helper function: returns true if the current session belongs to an admin.
-- security definer so it can read the admins table regardless of RLS.
create or replace function is_admin()
returns boolean language sql security definer set search_path = public stable as $
  select exists (select 1 from admins where user_id = auth.uid());
$;


-- ============================================================
-- 7. Row Level Security (RLS)
-- ============================================================

alter table admins              enable row level security;
alter table flight_requests     enable row level security;
alter table trip_requests       enable row level security;
alter table contact_submissions enable row level security;
alter table deals               enable row level security;
alter table newsletter_subscribers enable row level security;

-- ── flight_requests ──────────────────────────────────────────
-- Public can submit; only admins (via is_admin()) can view/manage
create policy "public submit flights"
  on flight_requests for insert
  with check (true);

create policy "admins manage flights"
  on flight_requests for all
  using (is_admin()) with check (is_admin());

-- ── trip_requests ─────────────────────────────────────────────
create policy "public submit trips"
  on trip_requests for insert
  with check (true);

create policy "admins manage trips"
  on trip_requests for all
  using (is_admin()) with check (is_admin());

-- ── contact_submissions ───────────────────────────────────────
create policy "public submit contact"
  on contact_submissions for insert
  with check (true);

create policy "admins manage contact"
  on contact_submissions for all
  using (is_admin()) with check (is_admin());

-- ── deals ─────────────────────────────────────────────────────
-- Public can view active deals; only admins can create/edit/delete
create policy "public read deals"
  on deals for select
  using (is_active = true);

create policy "admins manage deals"
  on deals for all
  using (is_admin()) with check (is_admin());

-- ── newsletter_subscribers ────────────────────────────────────
create policy "Public can subscribe"
  on newsletter_subscribers for insert to anon
  with check (true);

create policy "Authenticated can view subscribers"
  on newsletter_subscribers for select to authenticated
  using (true);
