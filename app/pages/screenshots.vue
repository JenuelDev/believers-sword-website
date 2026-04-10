<script setup lang="ts">
const desktopShots = Array.from(
    { length: 7 },
    (_, index) => `/screenshots/desktop/desktop-${String(index + 1).padStart(2, "0")}.png`
);

const mobileShots = Array.from(
    { length: 6 },
    (_, index) => `/screenshots/mobile/mobile-${String(index + 1).padStart(2, "0")}.jpg`
);

useSeoMeta({
    title: "Screenshots — Believers Sword Bible Study App",
    description:
        "See desktop and mobile screenshots of Believers Sword showing the Bible reader, notes editor, highlights, prayer lists, and more.",
});

defineOgImage({
    component: "BelieverSwordOg",
    headline: "Believers Sword",
    title: "Screenshots",
    description: "Desktop and mobile screenshots of the Bible study app.",
});
</script>

<template>
    <main class="screenshots-shell">
        <section class="screenshots-hero section-frame">
            <div class="container-grid">
                <p class="section-kicker">Gallery</p>
                <h1 class="screenshots-title">Believers Sword Screenshots</h1>
                <p class="screenshots-subtitle">
                    Browse real product captures from desktop and mobile builds. The gallery updates
                    from your latest screenshot exports in the project.
                </p>
                <div class="screenshots-actions">
                    <a href="/#preview" class="btn-secondary">
                        <Icon name="material-symbols:arrow-back-rounded" size="20" />
                        Back to Home Preview
                    </a>
                    <a href="/downloads" class="btn-primary">
                        <Icon name="ic:baseline-cloud-download" size="20" />
                        Go to Downloads
                    </a>
                </div>
            </div>
        </section>

        <section class="section-frame screenshots-section">
            <div class="container-grid">
                <div class="screenshots-header">
                    <h2>Desktop Screenshots</h2>
                    <span>{{ desktopShots.length }} captures</span>
                </div>
                <div class="desktop-grid">
                    <article
                        v-for="(shot, index) in desktopShots"
                        :key="shot"
                        class="shot-card desktop-card"
                    >
                        <img
                            :src="shot"
                            :alt="`Believers Sword desktop screenshot ${index + 1}`"
                            loading="lazy"
                        />
                    </article>
                </div>
            </div>
        </section>

        <section class="section-frame screenshots-section mobile-section">
            <div class="container-grid">
                <div class="screenshots-header">
                    <h2>Mobile Screenshots</h2>
                    <span>{{ mobileShots.length }} captures</span>
                </div>
                <div class="mobile-grid">
                    <article
                        v-for="(shot, index) in mobileShots"
                        :key="shot"
                        class="shot-card mobile-card"
                    >
                        <img
                            :src="shot"
                            :alt="`Believers Sword mobile screenshot ${index + 1}`"
                            loading="lazy"
                        />
                    </article>
                </div>
            </div>
        </section>
    </main>

    <SiteFooter />
</template>

<style scoped lang="scss">
.screenshots-shell {
    min-height: 100vh;
}

.screenshots-hero {
    padding-top: clamp(3.5rem, 8vw, 6rem);
    padding-bottom: clamp(2rem, 5vw, 3rem);
}

.screenshots-title {
    font-family: "Space Grotesk", "Avenir Next", sans-serif;
    font-size: clamp(2rem, 5vw, 3.6rem);
    line-height: 1.12;
    letter-spacing: -0.02em;
    max-width: 15ch;
}

.screenshots-subtitle {
    margin-top: 0.8rem;
    max-width: 60ch;
    color: #665244;
    line-height: 1.75;
}

.screenshots-actions {
    margin-top: 1.2rem;
    display: flex;
    gap: 0.7rem;
    flex-wrap: wrap;
}

.screenshots-section {
    padding-top: 1.4rem;
}

.screenshots-header {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 0.8rem;
    margin-bottom: 0.8rem;
}

.screenshots-header h2 {
    font-family: "Space Grotesk", "Avenir Next", sans-serif;
    font-size: clamp(1.3rem, 3vw, 2rem);
}

.screenshots-header span {
    color: #6f594a;
    font-size: 0.9rem;
}

.desktop-grid {
    display: grid;
    gap: 0.8rem;
}

.shot-card {
    border-radius: 1.1rem;
    overflow: hidden;
    border: 1px solid rgba(132, 95, 66, 0.22);
    background: rgba(255, 251, 246, 0.78);
    box-shadow: 0 18px 35px rgba(39, 24, 15, 0.14);
}

.shot-card img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
}

.desktop-card img {
    aspect-ratio: 16 / 9;
}

.mobile-section {
    padding-bottom: clamp(3.8rem, 8vw, 6.2rem);
}

.mobile-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.8rem;
}

.mobile-card {
    max-width: 16rem;
}

.mobile-card img {
    aspect-ratio: 9 / 19;
}

@media (min-width: 768px) {
    .desktop-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .mobile-grid {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }
}

@media (min-width: 1200px) {
    .desktop-grid {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }
}
</style>
