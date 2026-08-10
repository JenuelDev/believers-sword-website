# believersword.com

Marketing and content site for the Believers Sword Bible study app. Nuxt 4, plain
SCSS (no utility CSS framework), pnpm, deployed on Vercel. Content lives in
Supabase Postgres.

## Commands

| Command | Purpose |
|---|---|
| `pnpm dev` | dev server on **port 7788** |
| `pnpm build` | production build |
| `pnpm sermon:post <file.md>` | publish a sermon source file to the database |
| `pnpm db:sql <file.sql>` | run .sql files once each, tracked in a ledger |

Note `dev`, `build`, and `generate` pass `--dotenv .env.local` — Nuxt only loads
`.env` by default, and this project keeps its variables in `.env.local`.

## Writing and posting sermons

**Follow [.claude/skills/post-sermon/SKILL.md](.claude/skills/post-sermon/SKILL.md).**
It is the single source of truth for the sermon source format, the quality bar
for the prose, and the publish commands. Read it before writing a sermon.

The short version: create `content/sermons/<slug>.md` with `key: value`
frontmatter and a markdown body, validate with
`pnpm sermon:post --dry-run <file>`, then publish with `pnpm sermon:post <file>`.
Never hand-write SQL for a sermon — the script binds parameters, so prose
containing apostrophes is safe.

### Honesty rules for content

Some columns assert facts about the world. Do not invent them:

- `preached_at` claims a service happened on that date — omit it for a piece
  written for the site.
- `speaker_name` defaults to the editorial byline `Believers Sword`. Never
  attribute a sermon to a real person who did not preach it.
- `video_url` / `audio_url` / `thumbnail_url` / `duration_seconds` — omit unless
  you have a real recording. Placeholder URLs become 404s on a live page.

This is not hypothetical: a seed fixture once reached production attributing an
invented sermon to a real pastor with a placeholder YouTube link.

## Database

`public.sermons` is defined in `supabase/migrations/`. Two things to know before
touching it:

- **Reads are public, writes are not.** RLS exposes only `status='published'`
  rows whose `published_at` has passed. There is no anon/authenticated write
  policy, so all writes need `DATABASE_URL` (the service-level connection) or the
  Supabase SQL editor. Do not add a write policy for `anon`.
- **`DATABASE_URL` must be the Shared Pooler / Session mode string** (port 5432).
  The direct `db.<ref>.supabase.co` host is IPv6-only and will not connect from
  an IPv4-only network. The scripts reject it with an explanatory error.

`pnpm db:sql` records every applied file in `migrations.applied_files` in the same
transaction as the change, so a file cannot be applied twice. Use
`--record-only` for a file already applied by hand, `--status` to list the ledger.

## Conventions

- 4-space indent, double-quoted strings and semicolons in `.ts`/`.mjs`.
- Pages follow `<main>` → `<section class="page-head">` → `<section class="section">`,
  reusing the shared classes in `app/assets/styles/main.scss` (`container`,
  `section`, `lede`, `eyebrow`, `btn`, `prose`, `note`). Page-specific rules go in
  `<style scoped>`; add new shared classes to `main.scss` only if reused.
- Every page sets SEO metadata through **`useSeo()`**, never `useSeoMeta()`
  directly — see [.claude/skills/website-seo/SKILL.md](.claude/skills/website-seo/SKILL.md).
  `useSeoMeta` alone silently omits canonical, `og:*` and `twitter:*`.
  Static pages may also call `defineOgImage`; dynamic routes must **not**, because
  `ogImage.zeroRuntime` means generated images only exist for prerendered routes.
- Dynamic routes must be added to `server/api/__sitemap__/urls.ts`. The sitemap
  module cannot discover database-driven pages on its own.
- Remote images use a plain `<img>`, not `NuxtImg` — `@nuxt/image` requires each
  remote host to be allowlisted in config first.
- Format dates through `app/utils/sermon.ts`, which pins locale and UTC. Locale-
  or timezone-dependent formatting causes hydration mismatches.
