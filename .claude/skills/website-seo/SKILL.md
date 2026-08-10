---
name: website-seo
description: Add or audit SEO on believersword.com — page metadata, canonical URLs, Open Graph and Twitter cards, JSON-LD structured data, sitemap coverage, and indexability. Use when adding a page, changing titles or descriptions, fixing link previews, working on search ranking or Search Console issues, or when asked to check or improve SEO.
---

# SEO on this site

## The one rule for a new page

Call `useSeo()`. Never call `useSeoMeta()` directly.

```ts
useSeo({
    title: "Sermons — Believers Sword",
    description: "One or two sentences, 120-160 characters, written for a search result.",
});
```

`useSeoMeta({ title, description })` looks complete and is not. It leaves out
canonical, `og:title`, `og:description`, `og:url`, `og:image` and the whole
`twitter:*` set. Nothing errors — the page simply shares as a blank card and
every query-string variant reads as a duplicate. Every page on this site was in
that state until [app/composables/useSeo.ts](../../../app/composables/useSeo.ts)
was added.

`useSeo()` sets, from those two arguments: `<title>`, `description`, `canonical`,
`og:title`, `og:description`, `og:url`, `og:image`, `og:image:alt`, `og:type`,
`twitter:title`, `twitter:description`, `twitter:image`, `twitter:image:alt`, and
`robots`.

### Options

| Option | Use when |
|---|---|
| `ogTitle` / `ogDescription` | share copy should differ from the search-result copy |
| `image` | the page has its own image; absolute or root-relative. Defaults to `/og-default.png` |
| `type: "article"` | the page is a piece of writing rather than a site page |
| `publishedTime` / `modifiedTime` / `author` | with `type: "article"` |
| `noindex: true` | the page should not be indexed (404s, thank-you pages, anything thin) |

Values may be getters, which is how async data works:

```ts
useSeo({
    title: () => `${detail.value.title} — Believers Sword`,
    description: () => detail.value.summary || "",
    image: () => detail.value.thumbnail_url,
    type: "article",
});
```

## Writing titles and descriptions

- **Title**: unique per page, ~50-60 characters before truncation, the
  distinguishing words first. `"Download Believers Sword — Android, Windows,
  macOS, Linux"`, not `"Believers Sword — Download"`.
- **Description**: 120-160 characters. It is not a ranking factor; it is the
  click decision. Say what the page gives the reader.
- **One `<h1>` per page**, and it should agree with the title. They need not be
  identical, but they must not describe different things.
- **Never reuse** a title or description across pages. Duplicates make Google
  choose which page to show, and it may choose the wrong one.

## Structured data

Emit it with `useJsonLd()`, which takes a plain object or a getter:

```ts
useJsonLd(() => ({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: detail.value.title.slice(0, 110),
    // ...
}));
```

What already exists — extend it, do not duplicate it:

| Where | Schema |
|---|---|
| [app.vue](../../../app/app.vue) | `Organization` + `WebSite` graph, on every page |
| [index.vue](../../../app/pages/index.vue) | `SoftwareApplication` |
| [sermons/index.vue](../../../app/pages/sermons/index.vue) | `CollectionPage` with an `ItemList` |
| [sermons/[slug].vue](../../../app/pages/sermons/%5Bslug%5D.vue) | `Article` + `BreadcrumbList` |

### Article requirements

Google requires exactly four: **`headline`, `image`, `datePublished`,
`author`**. Add `publisher`, `dateModified` and `description` to complete it.

- `headline` must match the visible `<h1>` and stay **under ~110 characters**.
- `image` must be an **array of absolute URLs**, at least 1200px wide.
- `author` should be a `Person` for a real byline and an `Organization` for an
  editorial one. Google prefers `Person` where a person genuinely wrote it. The
  sermon page picks the type based on whether `speaker_name` is the site itself.
- Dates must be ISO 8601.

### The rule that gets sites penalised

**Structured data must describe what is visibly on the page.** Do not add a
rating, an author, or a date that a reader cannot see. Claiming more than the
page shows is a spam violation, not a clever optimisation.

Use `undefined` for absent values rather than empty strings — `JSON.stringify`
strips undefined keys, so optional fields disappear cleanly instead of emitting
`""`.

## Sitemap

`@nuxtjs/sitemap` finds static routes by crawling. It **cannot** find
database-driven routes, and its silence is the trap: `/sermons` was indexed while
all ten sermon URLs it linked to were missing.

Anything dynamic must be added to
[server/api/__sitemap__/urls.ts](../../../server/api/__sitemap__/urls.ts), which
is registered under `sitemap.sources` in `nuxt.config.ts`. Include `lastmod` so
recrawls target what changed.

After adding any dynamic route type, check the count:

```bash
curl -s http://localhost:7788/sitemap.xml | grep -c "<loc>"
```

## Indexability

- **A "not found" page must return HTTP 404**, not 200. A 200 with "not found"
  text is a soft 404: Google indexes it as a real page. Set the status with
  `setResponseStatus(useRequestEvent(), 404)` rather than `createError()` when
  the page has a design worth keeping — `createError` replaces it with the
  generic error screen.
- **`robots.txt`** lives at `public/robots.txt` and must keep pointing at
  `sitemap.xml`.
- **`noindex` anything thin** — search results pages, tag pages with one item,
  duplicate landing pages.

## OG images

`ogImage.zeroRuntime` is enabled in `nuxt.config.ts`, which means generated OG
images only exist for routes **prerendered at build time**. So:

- **Static routes** may use `defineOgImage("BelieverSwordOg", { ... })`.
- **Dynamic routes must not** — the generated URL would 404. Pass a real image
  via `useSeo({ image })`, which falls back to `/og-default.png` (1200×630).

To regenerate the default, the source SVG and the resvg call are described in
`scripts/` history; any 1200×630 PNG at `public/og-default.png` works.

## Auditing

Check a page end to end:

```bash
curl -s http://localhost:7788/<path> -o /tmp/p.html
grep -oE '<title>[^<]*|<link rel="canonical"[^>]*>|<meta (property|name)="(og|twitter|robots)[^>]*>' /tmp/p.html
```

Then confirm every JSON-LD block parses — a malformed block is ignored silently
by Google, so it fails invisibly:

```bash
node -e "const h=require('fs').readFileSync('/tmp/p.html','utf8');
[...h.matchAll(/application\/ld\+json[^>]*>([\s\S]*?)<\/script>/g)]
  .forEach((m,i)=>{try{JSON.parse(m[1]);console.log(i,'ok')}catch(e){console.log(i,'INVALID',e.message)}})"
```

Checklist for any page:

- [ ] `useSeo()` called, with a unique title and description
- [ ] exactly one `<h1>`, agreeing with the title
- [ ] canonical is absolute, on `www`, with no trailing slash and no query
- [ ] `og:image` resolves to a real image ≥1200px wide
- [ ] JSON-LD parses and every claim is visible on the page
- [ ] the route is in `sitemap.xml`
- [ ] correct HTTP status (200 for real pages, 404 for missing)

## What matters beyond markup

Core Web Vitals are ranking signals, and **INP replaced FID** in March 2024.
Google is mobile-first for crawling and indexing all sites, so test narrow
viewports, not just desktop. Field data in Search Console is what Google actually
ranks on — fix what it flags before optimising anything a lab tool reports.

Order of work when auditing: **indexability first, then performance, then
structured data.** A fast page with perfect schema earns nothing if it is not
indexable.
