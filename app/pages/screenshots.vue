<script setup lang="ts">
const desktopShots = [
    {
        src: "/screenshots/desktop/desktop-01.png",
        alt: "John 3 in three desktop translation panes, with verse clip notes and a chapter note editor.",
        caption: "Compare the same passage across translations. Blue clip notes attach comments to a verse, while the editor below keeps a longer chapter study together.",
    },
    {
        src: "/screenshots/desktop/desktop-03.png",
        alt: "The desktop study workspace in a blue appearance with purple highlights and three reading panes.",
        caption: "The same study workspace with a different appearance. Choose a readable combination of background, text, and highlight colors before spending a long time in a passage.",
    },
];

const mobileShots = [
    { src: "/screenshots/mobile/mobile-01.jpg", alt: "Genesis 1 in two stacked Android translation panes with verse highlights.", caption: "Compare translations vertically on a phone. The selected version names appear between the reading panes, and saved highlights remain visible in the passage." },
    { src: "/screenshots/mobile/mobile-02.jpg", alt: "Android search results for love, with matching words highlighted and verse references.", caption: "Search results include a reference and surrounding text. Open the chapter to check what a matching verse means in context instead of relying on the result snippet alone." },
    { src: "/screenshots/mobile/mobile-03.jpg", alt: "Android appearance settings with reading environment and accent color choices.", caption: "Reading environment and accent color are separate choices. Use the appearance controls to find a comfortable background and a clear highlight color." },
    { src: "/screenshots/mobile/mobile-04.jpg", alt: "John 3 in two Android translations using a dark reading environment.", caption: "A dark reading environment with two versions of John 3. The chapter navigation stays at the top while the translation names identify each pane." },
];

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
                <p class="lede">See how reading panes, study notes, highlights, and search fit together on desktop and Android. These captures show earlier builds; controls may differ in your version.</p>
            </div>
        </section>

        <section class="section">
            <div class="container">
                <h2>Desktop</h2>
                <div class="shot-grid grid-spaced">
                    <figure v-for="shot in desktopShots" :key="shot.src">
                    <NuxtImg
                        :src="shot.src"
                        :alt="shot.alt"
                        class="shot"
                        format="webp"
                        quality="78"
                        sizes="sm:100vw md:20rem"
                        loading="lazy"
                    />
                    <figcaption>{{ shot.caption }}</figcaption>
                    </figure>
                </div>
                <p class="note screenshot-help">Try these features with our <NuxtLink to="/guides/compare-translations">translation comparison guide</NuxtLink> and <NuxtLink to="/guides/keep-study-notes">study notes guide</NuxtLink>.</p>
            </div>
        </section>

        <section class="section section--edge">
            <div class="container">
                <h2>Mobile</h2>
                <div class="shot-grid shot-grid--phone grid-spaced">
                    <figure v-for="shot in mobileShots" :key="shot.src">
                    <NuxtImg
                        :src="shot.src"
                        :alt="shot.alt"
                        class="shot"
                        format="webp"
                        quality="78"
                        sizes="sm:45vw md:11rem"
                        loading="lazy"
                    />
                    <figcaption>{{ shot.caption }}</figcaption>
                    </figure>
                </div>
            </div>
        </section>
    </main>
</template>

<style scoped>
.grid-spaced {
    margin-top: 1.25rem;
}
figure {
    margin: 0;
    min-width: 0;
}
figcaption {
    margin-top: 0.75rem;
    color: var(--muted);
    font-size: 0.85rem;
    line-height: 1.6;
}
.screenshot-help {
    margin-top: 1rem;
}
.screenshot-help a {
    text-decoration: underline;
    color: var(--brand);
}
</style>
