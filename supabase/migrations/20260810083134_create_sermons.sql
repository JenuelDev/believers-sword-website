-- Public sermon catalog for believersword.com.
--
-- Read model: anyone (anon key) may read sermons that are actually published.
-- Write model: no anon/authenticated write policies exist, so all inserts,
-- updates and deletes must go through the service role (server-side) or the
-- Supabase dashboard. Do not add a write policy for `anon`.

create table public.sermons (
    id uuid primary key default gen_random_uuid(),

    -- Identity / routing
    slug text not null unique,
    title text not null,
    subtitle text,

    -- Copy. `summary` is the short card/meta blurb, `content` the full body.
    summary text,
    content text,
    content_format text not null default 'markdown'
        check (content_format in ('markdown', 'html', 'plain')),

    -- Speaker. Denormalised on purpose: a catalog rarely needs a speakers
    -- table until you have per-speaker pages and bios to maintain.
    speaker_name text not null,
    speaker_title text,
    speaker_avatar_url text,

    -- Series grouping
    series_name text,
    series_part integer,

    -- Scripture. `scripture_refs` is structured for filtering, e.g.
    --   [{"book": "John", "chapter": 3, "verse_start": 16, "verse_end": 17}]
    -- and `primary_scripture` is the human-readable label ("John 3:16-17").
    scripture_refs jsonb not null default '[]'::jsonb,
    primary_scripture text,

    -- Discovery
    topics text[] not null default '{}',
    language text not null default 'en',

    -- Media
    video_url text,
    audio_url text,
    thumbnail_url text,
    duration_seconds integer,
    transcript text,

    -- Publishing lifecycle
    status text not null default 'draft'
        check (status in ('draft', 'scheduled', 'published', 'archived')),
    published_at timestamptz,
    preached_at date,
    featured boolean not null default false,
    view_count bigint not null default 0,

    -- SEO overrides; fall back to title/summary in the app when null.
    meta_title text,
    meta_description text,
    og_image_url text,

    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),

    -- Weighted full-text search: title beats summary beats speaker beats body.
    search_vector tsvector generated always as (
        setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
        setweight(to_tsvector('english', coalesce(subtitle, '')), 'B') ||
        setweight(to_tsvector('english', coalesce(summary, '')), 'B') ||
        setweight(to_tsvector('english', coalesce(primary_scripture, '')), 'B') ||
        setweight(to_tsvector('english', coalesce(speaker_name, '')), 'C') ||
        setweight(to_tsvector('english', coalesce(content, '')), 'D')
    ) stored,

    -- A row claiming to be published must say when, otherwise the RLS policy
    -- below would hide it and the state would be silently broken.
    constraint sermons_published_needs_date
        check (status <> 'published' or published_at is not null),
    constraint sermons_scheduled_needs_date
        check (status <> 'scheduled' or published_at is not null),
    constraint sermons_slug_format
        check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
    constraint sermons_duration_positive
        check (duration_seconds is null or duration_seconds > 0),
    constraint sermons_series_part_positive
        check (series_part is null or series_part > 0),
    constraint sermons_scripture_refs_is_array
        check (jsonb_typeof(scripture_refs) = 'array')
);

comment on table public.sermons is
    'Publicly readable sermon catalog. Only status=published rows whose published_at has passed are visible to anon.';
comment on column public.sermons.view_count is
    'Incremented via public.increment_sermon_views(); never writable directly by anon.';

-- Indexes -------------------------------------------------------------------

-- Main listing query: published sermons, newest first.
create index sermons_published_at_idx
    on public.sermons (published_at desc)
    where status = 'published';

create index sermons_status_idx on public.sermons (status);
create index sermons_preached_at_idx on public.sermons (preached_at desc nulls last);

create index sermons_series_idx
    on public.sermons (series_name, series_part)
    where series_name is not null;

create index sermons_featured_idx
    on public.sermons (published_at desc)
    where featured and status = 'published';

create index sermons_topics_idx on public.sermons using gin (topics);
create index sermons_scripture_refs_idx on public.sermons using gin (scripture_refs);
create index sermons_search_idx on public.sermons using gin (search_vector);

-- Keep updated_at honest --------------------------------------------------

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
    new.updated_at = now();
    return new;
end;
$$;

create trigger sermons_set_updated_at
    before update on public.sermons
    for each row
    execute function public.set_updated_at();

-- Row level security --------------------------------------------------------

alter table public.sermons enable row level security;

-- `published_at <= now()` is what makes status='scheduled' safe: a future-dated
-- row stays invisible until its time arrives.
create policy "Published sermons are viewable by everyone"
    on public.sermons
    for select
    to anon, authenticated
    using (
        status = 'published'
        and published_at is not null
        and published_at <= now()
    );

-- View counting -------------------------------------------------------------

-- Opening UPDATE to anon just to bump a counter would let anyone rewrite any
-- column. This function is the narrow alternative: it can only ever touch
-- view_count, and only on a row that is already publicly visible.
create or replace function public.increment_sermon_views(sermon_slug text)
returns void
language sql
security definer
set search_path = ''
as $$
    update public.sermons
    set view_count = view_count + 1
    where slug = sermon_slug
      and status = 'published'
      and published_at is not null
      and published_at <= now();
$$;

revoke all on function public.increment_sermon_views(text) from public;
grant execute on function public.increment_sermon_views(text) to anon, authenticated;
