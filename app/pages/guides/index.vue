<script setup lang="ts">
import { studyGuides } from "~/data/guides";

useSeo({
    title: "Bible Study App Guides | Believers Sword",
    description: "Practical Believers Sword desktop guides for offline reading, comparing Bible translations, and keeping useful study notes with real app screenshots.",
});
</script>

<template>
    <main>
        <section class="page-head">
            <div class="container">
                <p class="eyebrow">Using the app</p>
                <h1>Make room for a useful study</h1>
                <p class="lede">Prepare an offline reader, compare a passage, and keep notes you can return to. These guides cover the desktop app.</p>
            </div>
        </section>
        <section class="section">
            <div class="container">
                <ol class="guide-list">
                    <li v-for="guide in studyGuides" :key="guide.slug">
                        <h2><NuxtLink :to="`/guides/${guide.slug}`">{{ guide.title }}</NuxtLink></h2>
                        <p>{{ guide.introduction }}</p>
                        <NuxtLink :to="`/guides/${guide.slug}`" class="btn">Read guide</NuxtLink>
                    </li>
                </ol>
                <p class="note guide-help">Something different on your screen? Include your platform and app version when you <a href="mailto:me@jenuel.dev">ask for help</a>.</p>
            </div>
        </section>
    </main>
</template>

<style scoped>
.guide-list {
    display: grid;
    gap: 1.5rem;
    margin: 0;
    padding: 0;
    list-style: none;
}
.guide-list li {
    padding: 1.5rem;
    border: 1px solid var(--line);
    border-radius: var(--radius);
}
.guide-list p {
    max-width: 65ch;
    margin: 0.75rem 0 1rem;
    color: var(--ink-soft);
}
.guide-help {
    margin-top: 1.5rem;
}
</style>
