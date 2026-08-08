<script setup lang="ts">
const { googlePlayStoreUrl } = useReleaseDownloads();

const mobileShots = Array.from(
    { length: 3 },
    (_, index) => `/screenshots/mobile/mobile-${String(index + 1).padStart(2, "0")}.jpg`
);

const features = [
    {
        icon: "material-symbols:menu-book-rounded",
        title: "Multi-translation reader",
        copy: "Read two translations side by side and compare any passage.",
    },
    {
        icon: "material-symbols:highlight-rounded",
        title: "Highlights",
        copy: "Colour-code verses; marks are saved on the device.",
    },
    {
        icon: "material-symbols:search-rounded",
        title: "Full-text search",
        copy: "Search every installed translation at once.",
    },
    {
        icon: "material-symbols:offline-bolt-rounded",
        title: "Fully offline",
        copy: "Download the translations you need and read without a connection.",
    },
];

useSeoMeta({
    title: "Mobile App — Believers Sword Bible Study",
    description:
        "Download Believers Sword on Android from Google Play — read Scripture, study with highlights, and search across translations on the go.",
});

defineOgImage("BelieverSwordOg", {
    headline: "Now on Android",
    title: "Believers Sword Mobile",
    description: "Available now on Google Play for Android.",
});
</script>

<template>
    <main>
        <section class="page-head">
            <div class="container">
                <h1>Believers Sword on Android</h1>
                <p class="lede">
                    The same Bible study workspace in your pocket — reading, highlights,
                    search, and notes, all available offline.
                </p>

                <div class="btn-row head-actions">
                    <a
                        :href="googlePlayStoreUrl"
                        class="btn btn--primary"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Icon name="simple-icons:googleplay" size="19" />
                        Get it on Google Play
                    </a>
                    <a href="/screenshots" class="btn">
                        <Icon name="material-symbols:image-search-rounded" size="19" />
                        All screenshots
                    </a>
                </div>
            </div>
        </section>

        <section class="section">
            <div class="container">
                <div class="shot-grid shot-grid--phone phones">
                    <NuxtImg
                        v-for="(shot, index) in mobileShots"
                        :key="shot"
                        :src="shot"
                        :alt="`Believers Sword mobile screenshot ${index + 1}`"
                        class="shot"
                        format="webp"
                        quality="78"
                        sizes="sm:45vw md:11rem"
                        loading="lazy"
                    />
                </div>
            </div>
        </section>

        <section class="section section--edge">
            <div class="container">
                <h2>What's inside</h2>
                <ul class="stack">
                    <li v-for="feature in features" :key="feature.title" class="stack-item">
                        <Icon class="icon" :name="feature.icon" size="20" />
                        <div>
                            <h3>{{ feature.title }}</h3>
                            <p>{{ feature.copy }}</p>
                        </div>
                    </li>
                </ul>
            </div>
        </section>
    </main>
</template>

<style scoped>
.head-actions {
    margin-top: 1.5rem;
}

.phones {
    max-width: 34rem;
}
</style>
