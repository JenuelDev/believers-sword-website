<script setup lang="ts">
import { computed, onMounted } from "vue";
import { marked } from "marked";
import type { Sermon } from "~/types/sermon";

// A fresh component instance per slug, so useSermon()'s cache key and the
// fetched row can never disagree when navigating card to card.
definePageMeta({
    key: (route) => route.fullPath,
});

const route = useRoute();
const slug = String(route.params.slug ?? "");

const { data: sermon, error } = await useSermon(slug);

if (error.value) {
    throw createError({
        statusCode: 502,
        statusMessage: "This sermon could not be loaded.",
        fatal: true,
    });
}

if (!sermon.value) {
    throw createError({
        statusCode: 404,
        statusMessage: "Sermon not found",
        fatal: true,
    });
}

// Both guards above are fatal, so from here the row is guaranteed present.
// The cast just carries that fact into the template.
const detail = computed(() => sermon.value as Sermon);

const seriesLabel = computed(() =>
    formatSermonSeries(detail.value.series_name, detail.value.series_part)
);
const scriptureLabel = computed(() =>
    sermonScriptureLabel(detail.value.primary_scripture, detail.value.scripture_refs)
);
const embedUrl = computed(() => toEmbedUrl(detail.value.video_url));
const paragraphs = computed(() => splitParagraphs(detail.value.content));

// Trusted input by construction: no anon/authenticated write policy exists on
// public.sermons, so bodies can only be authored through the service role, the
// Supabase dashboard, or `pnpm sermon:post`. marked does not sanitise, so raw
// HTML in a body is passed through — never paste untrusted markup into a sermon.
const renderedContent = computed(() => {
    const content = detail.value.content;

    if (!content) {
        return null;
    }

    if (detail.value.content_format === "html") {
        return content;
    }

    if (detail.value.content_format === "markdown") {
        return marked.parse(content, { async: false, gfm: true }) as string;
    }

    // 'plain' falls through to paragraph splitting in the template.
    return null;
});

const supabase = useSupabase();

onMounted(async () => {
    // The builder returned by .rpc() is lazy: it only issues the request when
    // awaited or .then()'d. Discarding it with `void` sends nothing at all.
    try {
        await supabase.rpc("increment_sermon_views", { sermon_slug: slug });
    } catch {
        // Still fire-and-forget in effect: a failed view count must never
        // surface to the reader. The RPC no-ops on any non-public row.
    }
});

// image falls back to the site default inside useSeo(). It is taken from the row
// rather than defineOgImage() because nuxt-og-image runs with zeroRuntime, so a
// generated image only exists for routes prerendered at build time — which a
// database-driven slug is not.
const { canonical, siteUrl, absolute } = useSeo({
    title: () => detail.value.meta_title || `${detail.value.title} — Believers Sword`,
    description: () => detail.value.meta_description || detail.value.summary || "",
    image: () => detail.value.og_image_url || detail.value.thumbnail_url,
    type: "article",
    publishedTime: () => detail.value.published_at,
    modifiedTime: () => detail.value.updated_at,
    author: () => detail.value.speaker_name,
});

// Article: headline, image, datePublished and author are the four Google
// requires; publisher, dateModified and description complete it. headline must
// match the visible h1 and stay under ~110 characters.
useJsonLd(() => ({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: detail.value.title.slice(0, 110),
    description: detail.value.meta_description || detail.value.summary || undefined,
    image: [absolute(detail.value.og_image_url || detail.value.thumbnail_url)],
    datePublished: detail.value.published_at || undefined,
    dateModified: detail.value.updated_at || detail.value.published_at || undefined,
    // Google prefers a Person for a real byline; the editorial default is the
    // organisation itself, so the type follows whichever it actually is.
    author:
        detail.value.speaker_name === "Believers Sword"
            ? { "@type": "Organization", name: "Believers Sword", url: `${siteUrl}/` }
            : { "@type": "Person", name: detail.value.speaker_name },
    publisher: {
        "@type": "Organization",
        name: "Believers Sword",
        logo: { "@type": "ImageObject", url: absolute("/logo/300x300.png") },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical() },
    isAccessibleForFree: true,
    inLanguage: detail.value.language || "en",
    about: scriptureLabel.value || undefined,
    keywords: detail.value.topics?.length ? detail.value.topics.join(", ") : undefined,
    articleSection: detail.value.series_name || undefined,
}));

useJsonLd(() => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
        { "@type": "ListItem", position: 2, name: "Sermons", item: `${siteUrl}/sermons` },
        { "@type": "ListItem", position: 3, name: detail.value.title },
    ],
}));
</script>

<template>
    <main>
        <section class="page-head">
            <div class="container">
                <p v-if="seriesLabel" class="eyebrow">{{ seriesLabel }}</p>

                <h1>{{ detail.title }}</h1>

                <p v-if="detail.subtitle" class="lede">{{ detail.subtitle }}</p>

                <p class="meta">
                    <span class="meta-speaker">
                        {{ detail.speaker_name
                        }}<template v-if="detail.speaker_title">
                            , {{ detail.speaker_title }}</template
                        >
                    </span>
                    <time v-if="detail.published_at" :datetime="detail.published_at">
                        {{ formatSermonDate(detail.published_at) }}
                    </time>
                    <span v-if="detail.duration_seconds">
                        {{ formatSermonDuration(detail.duration_seconds) }}
                    </span>
                </p>

                <p v-if="scriptureLabel" class="scripture">
                    <Icon name="material-symbols:menu-book-outline-rounded" size="18" />
                    {{ scriptureLabel }}
                </p>
            </div>
        </section>

        <section v-if="embedUrl || detail.video_url || detail.audio_url" class="section">
            <div class="container">
                <div v-if="embedUrl" class="video-frame">
                    <iframe
                        :src="embedUrl"
                        :title="detail.title"
                        loading="lazy"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                    />
                </div>

                <!-- Not a recognised embed host, so hand it to the browser. -->
                <video
                    v-else-if="detail.video_url"
                    class="native-player"
                    :src="detail.video_url"
                    :poster="detail.thumbnail_url || undefined"
                    controls
                    preload="metadata"
                />

                <audio
                    v-if="detail.audio_url"
                    class="native-player audio-player"
                    :src="detail.audio_url"
                    controls
                    preload="metadata"
                />
            </div>
        </section>

        <section class="section section--edge">
            <div class="container">
                <div class="prose sermon-body">
                    <p v-if="detail.summary" class="summary">{{ detail.summary }}</p>

                    <!-- Between the intro and the body, matching the placement in
                         the reference layout. This is the only ad on the site:
                         SermonAd also owns the loader script, so no other page
                         requests AdSense at all. -->
                    <SermonAd />

                    <!-- eslint-disable-next-line vue/no-v-html -- see renderedContent -->
                    <div v-if="renderedContent" class="rendered" v-html="renderedContent" />

                    <p v-for="(block, index) in paragraphs" v-else :key="index" class="block">
                        {{ block }}
                    </p>

                    <p v-if="!detail.content && !detail.summary" class="note">
                        The written text for this sermon is not available yet.
                    </p>
                </div>

                <ul v-if="detail.topics?.length" class="topics">
                    <li v-for="topic in detail.topics" :key="topic">{{ topic }}</li>
                </ul>

                <details v-if="detail.transcript" class="transcript">
                    <summary>Read the full transcript</summary>
                    <div class="prose transcript-body">
                        <p
                            v-for="(block, index) in splitParagraphs(detail.transcript)"
                            :key="index"
                            class="block"
                        >
                            {{ block }}
                        </p>
                    </div>
                </details>

                <div class="btn-row back-row">
                    <NuxtLink to="/sermons" class="btn">
                        <Icon name="material-symbols:arrow-back-rounded" size="19" />
                        All sermons
                    </NuxtLink>
                </div>
            </div>
        </section>
    </main>
</template>

<style scoped>
.meta {
    display: flex;
    flex-wrap: wrap;
    gap: 0.3rem 0.7rem;
    margin-top: 0.9rem;
    color: var(--muted);
    font-size: 0.9rem;
}

.meta > * + *::before {
    content: "·";
    margin-right: 0.7rem;
}

.meta-speaker {
    color: var(--ink-soft);
    font-weight: 600;
}

.scripture {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    margin-top: 0.9rem;
    padding: 0.3rem 0.7rem;
    border-radius: var(--radius);
    background: rgba(74, 58, 255, 0.08);
    color: var(--brand);
    font-size: 0.88rem;
    font-weight: 600;
}

.video-frame {
    position: relative;
    aspect-ratio: 16 / 9;
    overflow: hidden;
    border: 1px solid var(--line);
    border-radius: var(--radius);
    background: #000;
}

.video-frame iframe {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border: 0;
}

.native-player {
    width: 100%;
    border-radius: var(--radius);
}

video.native-player {
    border: 1px solid var(--line);
    background: #000;
}

.audio-player {
    margin-top: 1rem;
}

.sermon-body .summary {
    margin-bottom: 1.25rem;
    color: var(--ink);
    font-size: 1.05rem;
    font-weight: 600;
}

/* pre-wrap keeps single newlines inside a block, which matters for sermon
   outlines and verse lists. */
.sermon-body .block,
.transcript-body .block {
    white-space: pre-wrap;
}

/* Markdown rendered through v-html is not touched by scoped CSS, so these need
   :deep(). The global .prose rules in main.scss already cover headings,
   paragraphs, lists, links and strong — only what it omits is styled here. */
.rendered :deep(blockquote) {
    margin: 1.25rem 0;
    padding: 0.15rem 0 0.15rem 1.1rem;
    border-left: 3px solid var(--brand);
    color: var(--ink);
    font-size: 1.02rem;
}

.rendered :deep(blockquote p) {
    margin: 0.35rem 0;
}

/* The scripture reference under a quote, written as the last line of the
   blockquote in italics. */
.rendered :deep(blockquote em) {
    display: inline-block;
    margin-top: 0.15rem;
    color: var(--muted);
    font-size: 0.86rem;
    font-style: normal;
    font-weight: 600;
    letter-spacing: 0.02em;
    text-transform: uppercase;
}

.rendered :deep(h2) {
    padding-top: 0.5rem;
}

.rendered :deep(hr) {
    margin: 2rem 0;
    border: 0;
    border-top: 1px solid var(--line);
}

.rendered :deep(code) {
    padding: 0.1rem 0.3rem;
    border-radius: 0.25rem;
    background: var(--bg-soft);
    font-size: 0.9em;
}

.topics {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    margin: 1.75rem 0 0;
    padding: 0;
    list-style: none;
}

.topics li {
    padding: 0.15rem 0.6rem;
    border: 1px solid var(--line);
    border-radius: 999px;
    color: var(--muted);
    font-size: 0.8rem;
}

.transcript {
    margin-top: 1.75rem;
    padding: 0.9rem 1.1rem;
    border: 1px solid var(--line);
    border-radius: var(--radius);
    background: var(--bg-soft);
}

.transcript summary {
    cursor: pointer;
    font-size: 0.92rem;
    font-weight: 600;
}

.transcript-body {
    margin-top: 0.75rem;
    font-size: 0.94rem;
}

.back-row {
    margin-top: 2rem;
}
</style>
