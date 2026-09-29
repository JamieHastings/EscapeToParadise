-- Add optional image_alt column to deals table for SEO alt text
alter table public.deals
  add column if not exists image_alt text default null;
