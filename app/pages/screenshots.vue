<script setup lang="ts">
const desktopShots = Array.from(
    { length: 7 },
    (_, index) => `/screenshots/desktop/desktop-${String(index + 1).padStart(2, "0")}.png`
);

const mobileShots = Array.from(
    { length: 6 },
    (_, index) => `/screenshots/mobile/mobile-${String(index + 1).padStart(2, "0")}.jpg`
);

useSeo({
    title: "Screenshots — Believers Sword Bible Study App",
    description:
        "See desktop and mobile screenshots of Believers Sword showing the Bible reader, notes editor, highlights, prayer lists, and more.",
});

defineOgImage("BelieverSwordOg", {
    headline: "Believers Sword",
    title: "Screenshots",
    description: "Desktop and mobile screenshots of the Bible study app.",
});
</script>

<template>
    <main>
        <section class="page-head">
            <div class="container">
                <h1>Screenshots</h1>
                <p class="lede">Captures from the desktop and Android builds.</p>
            </div>
        </section>

        <section class="section">
            <div class="container">
                <h2>Desktop</h2>
                <div class="shot-grid grid-spaced">
                    <NuxtImg
                        v-for="(shot, index) in desktopShots"
                        :key="shot"
                        :src="shot"
                        :alt="`Believers Sword desktop screenshot ${index + 1}`"
                        class="shot"
                        format="webp"
                        quality="78"
                        sizes="sm:100vw md:20rem"
                        loading="lazy"
                    />
                </div>
            </div>
        </section>

        <section class="section section--edge">
            <div class="container">
                <h2>Mobile</h2>
                <div class="shot-grid shot-grid--phone grid-spaced">
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
    </main>
</template>

<style scoped>
.grid-spaced {
    margin-top: 1.25rem;
}
</style>
