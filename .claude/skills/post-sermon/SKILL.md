---
name: post-sermon
description: Write a full sermon for believersword.com and publish it to the Supabase sermons table. Use when asked to write, draft, add, or post a sermon, devotional, or message — or to publish sermon content to the database.
---

# Posting a sermon

Two steps: write a source file, then run one command. Never hand-write SQL for a
sermon — `pnpm sermon:post` binds every value as a parameter, so an apostrophe in
"God's" cannot break anything.

## 1. Write the source file

Create `content/sermons/<slug>.md`. Frontmatter, then a markdown body.

```
---
slug: the-cost-of-following
title: The Cost of Following
subtitle: What Jesus said to three men who wanted to come with him
summary: One or two sentences for the card and the meta description. Plain prose, no markdown.
series_name: Counting the Cost
series_part: 1
primary_scripture: Luke 9:57-62
scripture_refs: Luke 9:57-62; 1 Kings 19:19-21; Philippians 3:7-8
topics: discipleship, cost, luke
status: published
featured: false
---

Body starts here.
```

### Frontmatter rules

The parser is strict on purpose — a malformed file fails loudly rather than
being half-understood. One `key: value` per line, **single line values only**.

Required: `slug`, `title`, `summary`, plus a non-empty body.

| Key | Notes |
|---|---|
| `slug` | lowercase words joined by single hyphens; becomes the URL |
| `title` | shown as the `h1` |
| `subtitle` | one line under the title, optional |
| `summary` | 1-2 sentences, no markdown. Used on cards and for SEO |
| `primary_scripture` | display label, e.g. `Luke 9:57-62` |
| `scripture_refs` | `;`-separated refs, parsed into structured jsonb for filtering |
| `topics` | `,`-separated |
| `series_name` / `series_part` | both or neither; `series_part` is an integer |
| `status` | `draft` \| `scheduled` \| `published` \| `archived`. Defaults to `published` |
| `featured` | `true` \| `false`. Defaults to `false` |
| `speaker_name` | defaults to `Believers Sword` — see honesty rules below |
| `content_format` | defaults to `markdown`. Leave it alone |

Accepted `scripture_refs` forms: `John 3:16`, `John 3:16-17`, `1 Kings 19`,
`Psalm 46` (normalised to `Psalms`), `Jude`.

### Honesty rules — do not violate these

These fields make factual claims about the world. Leave them unset unless you
have been told the specific fact.

- **`preached_at`** — asserts a service happened on that date. Omit it for a
  piece written for the site. Never invent one.
- **`speaker_name`** — defaults to the editorial byline `Believers Sword`. Do
  **not** put a real person's name on a sermon they did not preach. Only set it
  if the user explicitly says who preached it.
- **`video_url` / `audio_url` / `thumbnail_url`** — a placeholder URL becomes a
  404 or an unrelated video on a live page. Omit unless given a real one.
- **`duration_seconds`** — meaningless without a recording. Omit.

## 2. Write the body like a preacher, not a summary

The body is markdown and renders with headings, lists, and blockquotes. Aim for
**1200-1800 words**. Structure that works:

1. **Open with something concrete** — an image, a tension, a common misreading.
   Not "In today's passage we will examine…".
2. **Three or four numbered points**, each an `## H2`.
3. **Land on application** that is specific enough to act on this week.

### Every point carries at least three verses

This is the substance of the sermon, not decoration. Per point, aim for:

- **One anchor verse** from the sermon's main passage — the line the point is
  actually about.
- **Two or more supporting verses from other books**, and where possible from a
  different part of the canon: Old Testament beside New, narrative beside
  epistle, prophet beside psalm.

Use more than three where the text supports it. What you are building is a point
the whole canon leans on from several directions at once, not one verse with
footnotes.

Give each supporting verse a distinct job. Three that say the same thing is
padding; three that do different work is an argument:

| Job | What it adds |
|---|---|
| **Corroborate** | the same claim from a different author or era — it was not a one-off |
| **Deepen** | the mechanism or cost behind the claim |
| **Complicate** | the honest tension, the verse that resists a tidy conclusion |
| **Fulfil** | an OT promise or pattern that the NT passage lands on |

The *complicate* slot matters most and is the one most often skipped. A point
that never admits a difficulty reads like advertising.

Quote verses as a blockquote with the reference italicised on the last line. The
page styles that reference as a small caps label:

````markdown
## 1. The call comes before the comfort

The anchor — the line the point is about:

> Foxes have holes and birds of the air have nests, but the Son of Man has
> nowhere to lay his head.
>
> *Luke 9:58*

Explain it before adding anything. What did it cost *this* man, in his world? He
had asked to come along; he is told what the accommodation looks like.

Corroborate from another author, who reached the same place from the far side of a
life already spent:

> I count everything as loss compared to the surpassing worth of knowing Christ.
>
> *Philippians 3:8*

Deepen it — the pattern is older than the gospels. Elisha is called mid-furrow,
and the oxen he was ploughing with become the fire he cooks them on:

> He took the yoke of oxen and sacrificed them, and with the wood of the plough
> he boiled their flesh.
>
> *1 Kings 19:21*

He burns the equipment. There is no arrangement here for going back to ploughing
if the prophet thing does not work out.

Then complicate it, because the passage does:

> Let the dead bury their own dead.
>
> *Luke 9:60*

That is a hard saying and pretending otherwise is dishonest. Sit with it rather
than explaining it away.
````

### The rule that keeps this from becoming proof-texting

**Every quoted verse gets its own exposition.** At least a sentence or two saying
what it means in its own context and why it belongs here.

The test: delete the verse and its exposition. If the paragraph reads exactly the
same, the verse was ornamental — cut it or replace it with one that does work.
A stack of citations with no explanation between them is weaker than a single
verse read carefully, no matter how many references it contains.

Two specific failures to avoid:

- **Quoting against context.** A verse that only supports the point once torn
  from its surroundings is not support. Check what the passage is actually
  arguing before you enlist it. Philippians 4:13 is the standing example — it
  means the opposite of how it is usually quoted.
- **Chaining on a shared English word.** Two verses using "light" or "rest" are
  not necessarily about the same thing; often the underlying Hebrew and Greek
  differ. The connection has to be in the sense, not the vocabulary.

### Quality bar

- **Say something the reader has not already heard.** Take a passage commonly
  misread and read it closely. The existing catalog does this (Psalm 46's
  `harpu` means *let drop*, not *relax*; Psalm 121's hills are the danger, not
  the help; Philippians 4:13's "all things" is the hunger-and-plenty list).
- **Earn every claim from the text.** If you lean on a Hebrew or Greek word,
  make sure it is actually the word in that verse and that the gloss is
  defensible. Do not invent etymology, and do not invent an attribution — if you
  are unsure a quotation is really Augustine's, leave the name off.
- **List every verse you cite** in `scripture_refs`. Ten or more entries is
  normal and expected for a sermon built this way; that field is what makes the
  catalog searchable by passage.
- **No filler.** Cut anything that only restates the previous paragraph.
- **Plain prose.** No exclamation marks, no stacked rhetorical questions.

### Self-check before posting

- [ ] Every point has an anchor verse plus **two or more** from other books
- [ ] No two supporting verses in a point are doing the same job
- [ ] At least one point includes a verse that complicates the conclusion
- [ ] Every quoted verse has its own exposition, and none survives the delete test
- [ ] Every citation appears in `scripture_refs`
- [ ] 1200-1800 words
- [ ] `preached_at`, `speaker_name`, and media fields obey the honesty rules

## 3. Post it

Validate first — this parses, checks every constraint, and prints what would be
written without touching the database:

```bash
pnpm sermon:post --dry-run content/sermons/<slug>.md
```

Then publish:

```bash
pnpm sermon:post content/sermons/<slug>.md
```

Other flags:

- `--update` — overwrite an existing slug. Without it, a duplicate slug is an
  error rather than a silent no-op.
- `--draft` — force `status=draft`. RLS hides drafts completely, so use this
  when the user should review before it goes public.

Requires `DATABASE_URL` in `.env.local` (Supabase → Connect → Shared Pooler →
**Session mode**, port 5432). The direct `db.<ref>.supabase.co` host is
IPv6-only and will not connect. `--dry-run` needs no credential.

## 4. Verify

Confirm it is actually readable through the public API, not just inserted:

```bash
curl -s "$SUPABASE_URL/rest/v1/sermons?slug=eq.<slug>&select=slug,title,status,published_at" \
  -H "apikey: $SUPABASE_KEY" -H "Authorization: Bearer $SUPABASE_KEY"
```

An empty `[]` means RLS is hiding it — expected for a `draft`, a bug for
`published`. Then check `/sermons` and `/sermons/<slug>` render, with the dev
server on port 7788 (`pnpm dev`).

## How this fits together

- `content/sermons/*.md` — sermon sources, the thing you author
- `scripts/post-sermon.mjs` — parses and upserts with bound parameters
- `scripts/lib/sermon-source.mjs` — the frontmatter parser and its validation
- `app/pages/sermons/[slug].vue` — renders markdown via `marked`
- `supabase/migrations/*.sql` — the `public.sermons` schema

Reads are public but **writes are service-role only** — the anon key cannot
insert, which is why this script needs `DATABASE_URL`.

Because writes are privileged, sermon bodies are trusted input and `marked` does
not sanitise HTML. Never paste untrusted markup into a body.
