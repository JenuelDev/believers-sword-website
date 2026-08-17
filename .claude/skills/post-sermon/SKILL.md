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

`title`, `subtitle`, and `summary` are read before anything else — on the card,
in search results, in a shared link preview. Hold them to the same plain-language
standard as the body below: familiar words, no unexplained church terms, no
clichés. If a ten-year-old could not say what the sermon is about after reading
the summary, rewrite the summary.

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

### Write so a ten-year-old can follow it

Aim for a **Grade 5-6 reading level** in plain, warm, natural English. This is a
clarity target, not permission to sound childish. Nothing here lowers the
theological bar — the ideas stay adult, the sentences carrying them get simpler.
Picture two readers at once: a bright ten-year-old, and a tired adult reading on
a phone between shifts. Both should understand it on the first pass, without
rereading a sentence and without a Bible dictionary.

How that looks in practice:

- **Familiar words first.** Use the word an ordinary person would use out loud.
- **Short to medium sentences.** Most under about 20 words. Vary the length so it
  reads like speech, not like a list.
- **Short paragraphs.** Two to four sentences. One main idea per paragraph.
- **Active voice.** "God rescued Israel", not "Israel was rescued".
- **Concrete over abstract.** A picture the reader can see beats a category.
- **Direct explanations.** Say what you mean in the first sentence, then support
  it. Do not circle the point and hope the reader arrives.
- **Transitions between paragraphs and points**, so the argument is easy to
  follow: *But there is a problem. / That is why the next verse matters. / Notice
  what he does not say.*

Some swaps that usually improve a line:

| Instead of | Write |
|---|---|
| utilise, endeavour, commence | use, try, start |
| in order that, by virtue of the fact that | so that, because |
| ontological, eschatological, soteriological | name the idea in plain words |
| efficacious, salvific | it works, it saves |
| the human condition | what people are actually like |
| it behooves us to consider | look at |

Do not talk down. No baby talk, no "isn't that wonderful", no explaining the
obvious twice, no nickname for the reader. Plain does not mean thin: a simple
sentence can carry a hard truth, and usually carries it better.

This costs no extra words. Plain sentences are shorter than ornate ones, so the
room you gain by cutting flourishes is the room you spend explaining properly.
The **1200-1800 word** target does not move.

### Explain every church word

Assume the reader has never sat in a church. Any term that belongs to church,
theology, or the ancient world gets defined **the first time it appears**, in one
short clause or sentence, right there in the flow of the prose. No glossary at
the end, no "as we all know".

If a simpler phrase does the same work, use the simpler phrase. Keep the
technical word only when the reader gains something by owning it — then define it
and use it consistently.

| Term | The kind of gloss to give it |
|---|---|
| justification | being declared right with God — the verdict, not the improvement |
| sanctification | the slow work of actually becoming good, after the verdict |
| covenant | a binding promise between two sides, with terms and consequences |
| redemption | buying someone out of slavery or debt, at a price |
| repentance | turning around and walking the other way, not just feeling bad |
| grace | a gift given to someone who has not earned it and cannot repay it |
| Pharisee | a strict religious teacher, respected, serious about God's law |
| Gentile | anyone who was not Jewish — an outsider to Israel |
| gospel | announcement of news, the way a herald announces a victory |

Write the gloss into the sentence rather than parking it in brackets: "The
Pharisees — the strict religious teachers, the men everyone assumed were closest
to God — were the ones he warned." Vary the wording to fit the sermon; the table
is the standard, not a script to paste.

The same rule covers **every Hebrew or Greek word**. Give the word, say what it
means in plain English, and say why the reader should care. Never leave a
transliterated word standing on its own, and never lean on a word you have not
verified is the word in that verse — see the honesty requirement in the quality
bar below. Written out, that looks like: *The word behind "be still" is `harpu`.
It does not mean relax. It is what you say to someone gripping a rope: let go.*

### Set the scene before you argue from it

The reader may not know the story. Before a passage carries any weight, say
plainly:

- **Where and when** it happens, and what has just happened before it.
- **Who is speaking**, and what kind of person that is.
- **Who is listening** — and whether they are friendly, hostile, or confused.
- **The key action** — what actually happens in the passage, in order.
- **Why it matters** — the stakes for them then, and the reason a reader today
  should keep reading.

A few sentences does it. This is not a history lecture; it is the minimum a
stranger needs to follow the argument.

Name the people and places as if for the first time: not "as Elisha shows", but
"Elisha was a farmer, ploughing with twelve pairs of oxen, when the prophet
Elijah walked past and threw a cloak over his shoulders." Explain the things a
first-century reader knew and a modern one does not — what a tax collector was
to his neighbours, why touching a leper was unthinkable, how much a team of oxen
was worth to the family that owned it.

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

Set the scene first, in a sentence or two. Jesus is walking to Jerusalem, and he
knows what is waiting there. A man catches up with him on the road and volunteers:
he will follow Jesus anywhere. Jesus answers him with a picture rather than a yes.

The anchor — the line the point is about:

> Foxes have holes and birds of the air have nests, but the Son of Man has
> nowhere to lay his head.
>
> *Luke 9:58*

Explain it before adding anything, in plain words. Wild animals have somewhere to
sleep, Jesus says, and I do not. He is not complaining. He is telling the
volunteer the price up front, before the man commits to something he has not
counted. Most of us would rather find out the cost afterwards, when it is too late
to feel it — a job accepted before we asked about the hours.

Corroborate from another author, who reached the same place from the far side of a
life already spent:

> I count everything as loss compared to the surpassing worth of knowing Christ.
>
> *Philippians 3:8*

Deepen it — the pattern is older than the gospels. Elisha lived centuries before
Jesus. He was a farmer, out ploughing his field, when the prophet Elijah walked
past and called him. The oxen and the plough were his family's livelihood, the
way a truck is a driver's livelihood:

> He took the yoke of oxen and sacrificed them, and with the wood of the plough
> he boiled their flesh.
>
> *1 Kings 19:21*

He kills the animals and burns the equipment to cook them. Then he feeds the meal
to his neighbours. There is nothing left to go back to if the prophet thing does
not work out — which is exactly the point.

Then complicate it, because the passage does:

> Let the dead bury their own dead.
>
> *Luke 9:60*

That is a hard saying and pretending otherwise is dishonest. Sit with it rather
than explaining it away.
````

### The rule that keeps this from becoming proof-texting

**Every quoted verse gets its own exposition.** Never quote and move on. After
the blockquote, in plain words, cover:

1. **What it means** — say the verse again in ordinary English, as if explaining
   it to someone who has just heard it for the first time.
2. **What it was doing there** — who said it, to whom, and what it meant in its
   own setting before it meant anything to us.
3. **Why it is here** — the link to the point you are making. Make the
   connection explicit; do not leave the reader to infer it.
4. **What it looks like on a Tuesday** — a concrete, everyday example, where one
   helps. Not every verse needs this, but a point that never touches ordinary
   life has not landed.

Two or three plain sentences usually cover all four. Length is not the standard;
the reader knowing what the verse means is the standard.

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
- **Examples anyone can picture.** Draw from ordinary life that a child and an
  adult both know: school, work, chores, money, friendship, illness, waiting,
  being left out, keeping or breaking a promise. Avoid examples that need adult
  experience, national context, or insider church culture to make sense.
- **Never manufacture an example.** No invented personal story, no "I once met a
  woman who…", no made-up statistic, study, news event, or historical detail.
  This is the same rule as the honesty rules above, applied to prose. Hypotheticals
  are fine when the reader can see they are hypothetical: *imagine a boy who…*.

Cut these on sight:

| Cut | Why |
|---|---|
| Vague religious clichés — *let go and let God*, *the enemy is attacking*, *God's perfect timing*, *travelling mercies* | they sound like meaning without carrying any |
| Academic register — *hermeneutic*, *christological*, *the Sitz im Leben*, *problematise* | this is a sermon, not a seminar paper |
| Unexplained metaphors — *the veil was torn*, *dying to self*, *walking in the light* | either explain what the picture means or use the plain sentence instead |
| Long nested sentences with three clauses hanging off a fourth | the reader loses the subject before reaching the verb |
| Warm-up filler — *In this passage we will see*, *Beloved, the Word tells us*, *needless to say* | delete and start with the actual sentence |
| Rhetorical flourish that obscures the point — inverted word order, a triplet where one phrase would do, a metaphor stacked on a metaphor | if it sounds impressive and you cannot say what it claims, it claims nothing |

If you cannot restate a sentence more simply, that is usually a sign you have not
finished thinking it through — not a sign the idea is too deep for plain words.

### Self-check before posting

- [ ] Every point has an anchor verse plus **two or more** from other books
- [ ] No two supporting verses in a point are doing the same job
- [ ] At least one point includes a verse that complicates the conclusion
- [ ] Every quoted verse has its own exposition, and none survives the delete test
- [ ] Every citation appears in `scripture_refs`
- [ ] 1200-1800 words
- [ ] `preached_at`, `speaker_name`, and media fields obey the honesty rules

### Readability self-check

Run this after the sermon is written, as a separate pass over the finished draft.
If a line fails, rewrite it — do not talk yourself out of the check.

- [ ] **Read it aloud.** Any sentence you stumble over, run out of breath in, or
      have to restart is too long or too tangled. Split it.
- [ ] **Every unfamiliar term is explained at first use** — church words,
      theological words, Hebrew and Greek, ancient customs, place names.
- [ ] **No assumed Bible knowledge.** Every person, place, and story is
      introduced. A reader who has never opened a Bible can follow it start to
      finish.
- [ ] **Each main point can be summarised in one simple sentence.** Write that
      sentence out. If it takes two, the point is doing two jobs — split it or
      cut one.
- [ ] **Every application is specific.** "Pray more" and "trust God" fail.
      "Before you answer the message you are angry about, wait until tomorrow
      morning" passes.
- [ ] **A ten-year-old could retell the central message** to someone else, in
      their own words, and get it right.
- [ ] Nothing is childish, talked down, or padded — plain, not thin.
- [ ] No invented stories, statistics, quotations, or attributions.

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
