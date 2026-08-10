<script setup lang="ts">
import { computed } from "vue";

const { data: sermons, status, error } = await useSermonList();

const hasSermons = computed(() => (sermons.value?.length ?? 0) > 0);

const { siteUrl } = useSeo({
    title: "Sermons — Believers Sword",
    description:
        "Browse sermons from Believers Sword. Read the full message, follow the passage, and listen or watch where available.",
});

// ItemList inside a CollectionPage gives Google the ordering and the member URLs
// explicitly, rather than leaving it to infer the list from the markup. Only the
// fields visible on the page are described, which is a requirement: structured
// data that claims more than the page shows is a violation.
useJsonLd(() => ({
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${siteUrl}/sermons`,
    name: "Sermons",
    description:
        "Browse sermons from Believers Sword. Read the full message, follow the passage, and listen or watch where available.",
    isPartOf: { "@id": `${siteUrl}/#website` },
    mainEntity: {
        "@type": "ItemList",
        numberOfItems: sermons.value?.length ?? 0,
        itemListElement: (sermons.value ?? []).map((sermon, index) => ({
            "@type": "ListItem",
            position: index + 1,
            url: `${siteUrl}/sermons/${sermon.slug}`,
            name: sermon.title,
        })),
    },
}));

defineOgImage("BelieverSwordOg", {
    headline: "Believers Sword",
    title: "Sermons",
    description: "Messages to read, watch, and study.",
});
</script>

<template>
    <main>
        <section class="page-head">
            <div class="container">
                <h1>Sermons</h1>
                <p class="lede">
                    Messages to read and study, with the passage and audio or video
                    where available.
                </p>
            </div>
        </section>

        <section class="section">
            <div class="container">
                <p v-if="error" class="note state">
                    Sermons could not be loaded right now. Please try again shortly.
                </p>

                <p v-else-if="status === 'pending'" class="note state">Loading sermons…</p>

                <div v-else-if="!hasSermons" class="state empty">
                    <h2>No sermons published yet</h2>
                    <p class="lede">
                        This page fills in automatically as sermons are published. Check
                        back soon.
                    </p>
                    <div class="btn-row empty-actions">
                        <a href="/downloads" class="btn btn--primary">Get the app</a>
                        <a href="/" class="btn">Back to home</a>
                    </div>
                </div>

                <ul v-else class="sermon-grid">
                    <li v-for="sermon in sermons" :key="sermon.id">
                        <article class="sermon-card">
                            <NuxtLink
                                :to="`/sermons/${sermon.slug}`"
                                class="sermon-card-media"
                                :aria-label="sermon.title"
                            >
                                <!-- Plain <img>, not NuxtImg: thumbnails are arbitrary
                                     remote URLs and @nuxt/image would need every host
                                     added to an allowlist first. -->
                                <img
                                    v-if="sermon.thumbnail_url"
                                    :src="sermon.thumbnail_url"
                                    :alt="''"
                                    loading="lazy"
                                    decoding="async"
                                />
                                <span v-else class="sermon-card-placeholder" aria-hidden="true">
                                    <Icon name="material-symbols:menu-book-outline-rounded" size="26" />
                                </span>
                            </NuxtLink>

                            <div class="sermon-card-body">
                                <p
                                    v-if="sermon.series_name"
                                    class="eyebrow sermon-card-series"
                                >
                                    {{ formatSermonSeries(sermon.series_name, sermon.series_part) }}
                                </p>

                                <h3>
                                    <NuxtLink :to="`/sermons/${sermon.slug}`">
                                        {{ sermon.title }}
                                    </NuxtLink>
                                    <span v-if="sermon.featured" class="tag">Featured</span>
                                </h3>

                                <p v-if="sermon.summary" class="sermon-card-summary">
                                    {{ sermon.summary }}
                                </p>

                                <p class="sermon-card-meta">
                                    <span>{{ sermon.speaker_name }}</span>
                                    <span
                                        v-if="sermon.primary_scripture"
                                        class="sermon-card-scripture"
                                    >
                                        {{ sermon.primary_scripture }}
                                    </span>
                                    <time
                                        v-if="sermon.published_at"
                                        :datetime="sermon.published_at"
                                    >
                                        {{ formatSermonDate(sermon.published_at) }}
                                    </time>
                                    <span v-if="sermon.duration_seconds">
                                        {{ formatSermonDuration(sermon.duration_seconds) }}
                                    </span>
                                </p>

                                <ul v-if="sermon.topics?.length" class="topics">
                                    <li v-for="topic in sermon.topics" :key="topic">
                                        {{ topic }}
                                    </li>
                                </ul>
                            </div>
                        </article>
                    </li>
                </ul>
            </div>
        </section>
    </main>
</template>

<style scoped>
.state {
    margin-top: 0.5rem;
}

.empty {
    padding: clamp(1.75rem, 5vw, 2.75rem);
    border: 1px solid var(--line);
    border-radius: var(--radius);
    background: var(--bg-soft);
    text-align: center;
}

.empty .lede {
    margin-inline: auto;
}

.empty-actions {
    justify-content: center;
    margin-top: 1.4rem;
}

.sermon-grid {
    display: grid;
    gap: 1.1rem;
    margin: 0;
    padding: 0;
    list-style: none;
    grid-template-columns: repeat(auto-fill, minmax(19rem, 1fr));
}

.sermon-card {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
    border: 1px solid var(--line);
    border-radius: var(--radius);
    background: var(--bg);
    transition: border-color 150ms ease;
}

.sermon-card:hover {
    border-color: #c8cad8;
}

.sermon-card-media {
    display: block;
    aspect-ratio: 16 / 9;
    overflow: hidden;
    border-bottom: 1px solid var(--line);
    background: var(--bg-soft);
}

.sermon-card-media img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.sermon-card-placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    color: var(--muted);
}

.sermon-card-body {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 0.45rem;
    padding: 1rem 1.1rem 1.15rem;
}

.sermon-card-series {
    margin-bottom: 0;
}

.sermon-card h3 {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.05rem;
}

.sermon-card-summary {
    display: -webkit-box;
    overflow: hidden;
    color: var(--muted);
    font-size: 0.92rem;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    line-clamp: 3;
}

.sermon-card-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 0.3rem 0.65rem;
    margin-top: auto;
    padding-top: 0.35rem;
    color: var(--muted);
    font-size: 0.84rem;
}

.sermon-card-meta > * + *::before {
    content: "·";
    margin-right: 0.65rem;
}

.sermon-card-scripture {
    color: var(--ink-soft);
    font-weight: 600;
}

.tag {
    padding: 0.1rem 0.5rem;
    border-radius: 999px;
    background: rgba(74, 58, 255, 0.1);
    color: var(--brand);
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
}

.topics {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
    margin: 0.15rem 0 0;
    padding: 0;
    list-style: none;
}

.topics li {
    padding: 0.1rem 0.55rem;
    border: 1px solid var(--line);
    border-radius: 999px;
    color: var(--muted);
    font-size: 0.78rem;
}
</style>
