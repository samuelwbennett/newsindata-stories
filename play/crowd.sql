-- The News in Data: anonymous guess counts for stories.thenewsindata.com/play
-- Readers can add a guess but cannot read the table; they only get the summary from guess_stats.
create table if not exists public.guesses(
  id bigint generated always as identity primary key,
  game text not null check (char_length(game) between 1 and 40),
  value real not null check (value between -1000 and 1000),
  created_at timestamptz not null default now()
);
create index if not exists guesses_game_idx on public.guesses(game);
alter table public.guesses enable row level security;
drop policy if exists "anyone can add a guess" on public.guesses;
create policy "anyone can add a guess" on public.guesses for insert to anon with check (true);

create or replace function public.guess_stats(g text, lo real, hi real, nb int, mine real, ans real)
returns json language sql stable security definer set search_path = public as $$
  with s as (select value from public.guesses where game = g),
  b as (
    select i, (select count(*) from s where least(greatest(width_bucket(value, lo, hi, nb), 1), nb) = i) c
    from generate_series(1, least(nb, 60)) i
  )
  select json_build_object(
    'total', (select count(*) from s),
    'further', (select count(*) from s where abs(value - ans) > abs(mine - ans)),
    'bins', (select json_agg(c order by i) from b)
  );
$$;
revoke all on function public.guess_stats(text, real, real, int, real, real) from public;
grant execute on function public.guess_stats(text, real, real, int, real, real) to anon;
