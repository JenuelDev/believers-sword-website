<script setup lang="ts">
import { studyGuides } from "~/data/guides";

definePageMeta({ key: (route) => route.path });
const route = useRoute();
const guide = studyGuides.find((item) => item.slug === route.params.slug);

if (!guide) {
    throw createError({ statusCode: 404, statusMessage: "Guide not found", fatal: true });
}

useSeo({ title: `${guide.title} | Believers Sword`, description: guide.description });
</script>

<template>
    <main>
        <section class="page-head">
            <div class="container">
                <p class="eyebrow"><NuxtLink to="/guides">App guides</NuxtLink> / Desktop</p>
                <h1>{{ guide.title }}</h1>
                <p class="lede">{{ guide.introduction }}</p>
            </div>
        </section>
        <section class="section">
            <div class="container prose">
                <p class="note">Believers Sword editorial guide. Updated November 11, 2026.</p>
                <figure>
                    <NuxtImg :src="guide.image" :alt="guide.imageAlt" width="1920" height="1032" sizes="sm:100vw md:62rem" format="webp" loading="lazy" />
                    <figcaption>{{ guide.caption }} Screenshots show an earlier release; your layout may differ.</figcaption>
                </figure>
                <section v-for="step in guide.steps" :key="step.title" class="guide-step">
                    <h2>{{ step.title }}</h2>
                    <p v-for="paragraph in step.paragraphs" :key="paragraph">{{ paragraph }}</p>
                </section>
                <h2>Try one small study</h2>
                <p>{{ guide.exercise }}</p>
                <p class="note">Need help or found an error? Email <a href="mailto:me@jenuel.dev">me@jenuel.dev</a> with the guide URL, your app version, and your platform. <NuxtLink to="/editorial-policy">How we prepare our content</NuxtLink>.</p>
                <div class="btn-row guide-actions">
                    <NuxtLink to="/downloads" class="btn btn--primary">Get the desktop app</NuxtLink>
                    <NuxtLink to="/guides" class="btn">All guides</NuxtLink>
                    <NuxtLink to="/sermons" class="btn">Read messages</NuxtLink>
                </div>
            </div>
        </section>
    </main>
</template>

<style scoped>
figure {
    margin: 1.5rem 0 2rem;
}
figure img {
    border: 1px solid var(--line);
    border-radius: var(--radius);
    height: auto;
}
figcaption {
    margin-top: 0.75rem;
    font-size: 0.85rem;
    color: var(--muted);
}
.guide-step {
    margin-top: 2rem;
}
.guide-actions {
    margin-top: 1.5rem;
}
</style>
