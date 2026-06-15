alter table public.categories enable row level security;
alter table public.portfolios enable row level security;

create policy "Public can read categories"
on public.categories for select
to anon, authenticated
using (true);

create policy "Authenticated users manage categories"
on public.categories for all
to authenticated
using (true)
with check (true);

create policy "Public can read portfolios"
on public.portfolios for select
to anon, authenticated
using (true);

create policy "Authenticated users manage portfolios"
on public.portfolios for all
to authenticated
using (true)
with check (true);
