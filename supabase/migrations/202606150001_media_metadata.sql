alter table public.portfolios
  add column if not exists media_type text not null default 'image' check (media_type in ('image', 'video')),
  add column if not exists media_width integer,
  add column if not exists media_height integer,
  add column if not exists media_duration numeric,
  add column if not exists cloudinary_public_id text;

create index if not exists portfolios_created_at_idx on public.portfolios (created_at desc);
create index if not exists portfolios_category_id_idx on public.portfolios (category_id);
