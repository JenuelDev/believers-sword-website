<script setup lang="ts">
const mobileShots = Array.from(
    { length: 6 },
    (_, index) => `/screenshots/mobile/mobile-${String(index + 1).padStart(2, "0")}.jpg`
);

useSeoMeta({
    title: "Mobile App — Believers Sword Bible Study",
    description:
        "Believers Sword is coming to Android. Join the closed beta to get early access — read Scripture, study with highlights, and search across translations on the go.",
});

defineOgImage("BelieverSwordOg", {
    headline: "Now on Android",
    title: "Believers Sword Mobile",
    description: "Closed beta — join to get early access on Android.",
});
</script>

<template>
    <div class="mobile-page-shell">
        <header class="mobile-page-nav">
            <div class="mobile-page-nav-inner">
                <a href="/" class="mobile-page-brand" style="font-family: 'Space Grotesk', sans-serif">
                    <img src="/apple-touch-icon.png" alt="" width="28" height="28" class="mobile-page-brand-logo" />
                    Believers Sword
                </a>
                <nav class="mobile-page-nav-links">
                    <a href="/" class="mobile-page-nav-link">Home</a>
                    <a href="/screenshots" class="mobile-page-nav-link">Screenshots</a>
                    <a href="/downloads" class="mobile-page-nav-link">Downloads</a>
                </nav>
                <a
                    href="https://groups.google.com/g/believersswordgroup"
                    class="mobile-page-nav-cta"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Join Beta
                </a>
            </div>
        </header>

        <main>
            <section class="mob-hero section-frame">
                <div class="container-grid">
                    <div class="mob-hero-layout">
                        <div class="mob-hero-content">
                            <span class="mob-beta-badge">
                                <Icon name="material-symbols:science-rounded" size="14" />
                                Closed Beta · Android
                            </span>
                            <h1 class="mob-hero-title">
                                Your Bible study,<br />now in your pocket.
                            </h1>
                            <p class="mob-hero-copy">
                                Read Scripture, compare translations side by side, highlight
                                verses, and take rich-text notes — all offline, right on your
                                Android device.
                            </p>

                            <div class="mob-hero-actions">
                                <a
                                    href="https://groups.google.com/g/believersswordgroup"
                                    class="btn-primary"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Icon name="material-symbols:group-rounded" size="20" />
                                    Join the Beta Group
                                </a>
                                <a
                                    href="https://play.google.com/apps/testing/com.believers.sword.believers_sword_mobile"
                                    class="btn-secondary"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Icon name="simple-icons:googleplay" size="18" />
                                    Open Play Store
                                </a>
                            </div>

                            <p class="mob-hero-note">
                                You must join the Google Group first before the Play Store link becomes active.
                            </p>
                        </div>

                        <div class="mob-hero-phones">
                            <div class="mob-phone mob-phone--back">
                                <img
                                    :src="mobileShots[1]"
                                    alt="Believers Sword mobile search view"
                                    class="mob-phone-img"
                                    loading="eager"
                                />
                            </div>
                            <div class="mob-phone mob-phone--front">
                                <img
                                    :src="mobileShots[0]"
                                    alt="Believers Sword mobile Bible reading with highlights"
                                    class="mob-phone-img"
                                    loading="eager"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="section-frame mob-features-frame">
                <div class="container-grid">
                    <div class="section-heading">
                        <p class="section-kicker">What's Inside</p>
                        <h2 class="section-title">Everything you need, on the go.</h2>
                    </div>
                    <div class="mob-features-grid">
                        <article class="glass-card mob-feature-card">
                            <Icon class="mob-feature-icon" name="material-symbols:menu-book-rounded" size="24" />
                            <h3>Multi-Translation Reader</h3>
                            <p>Read two Bible translations side by side and compare how different versions render the same passage.</p>
                        </article>
                        <article class="glass-card mob-feature-card">
                            <Icon class="mob-feature-icon" name="material-symbols:highlight-rounded" size="24" />
                            <h3>Verse Highlights</h3>
                            <p>Color-code your reading with multiple highlight colors. Your marks are saved locally and always available offline.</p>
                        </article>
                        <article class="glass-card mob-feature-card">
                            <Icon class="mob-feature-icon" name="material-symbols:search-rounded" size="24" />
                            <h3>Full-Text Search</h3>
                            <p>Search across all your installed translations simultaneously and jump to any result instantly.</p>
                        </article>
                        <article class="glass-card mob-feature-card">
                            <Icon class="mob-feature-icon" name="material-symbols:dark-mode-rounded" size="24" />
                            <h3>17+ Reading Themes</h3>
                            <p>Choose from Light, Night, Sepia, Dusk, Forest, and more to match your reading environment and preference.</p>
                        </article>
                        <article class="glass-card mob-feature-card">
                            <Icon class="mob-feature-icon" name="material-symbols:offline-bolt-rounded" size="24" />
                            <h3>Fully Offline</h3>
                            <p>All Bible data is stored locally on your device — no internet required once your translations are downloaded.</p>
                        </article>
                        <article class="glass-card mob-feature-card">
                            <Icon class="mob-feature-icon" name="material-symbols:download-rounded" size="24" />
                            <h3>Download Translations</h3>
                            <p>Download only the translations you need. Each version is stored locally for instant, offline access.</p>
                        </article>
                    </div>
                </div>
            </section>

            <section class="section-frame mob-shots-frame">
                <div class="container-grid">
                    <div class="section-heading">
                        <p class="section-kicker">Preview</p>
                        <h2 class="section-title">See it in action.</h2>
                    </div>
                    <div class="mob-shots-grid">
                        <div
                            v-for="(shot, index) in mobileShots"
                            :key="shot"
                            class="mob-shot-card glass-card"
                        >
                            <img
                                :src="shot"
                                :alt="`Believers Sword mobile screenshot ${index + 1}`"
                                class="mob-shot-img"
                                loading="lazy"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section class="section-frame mob-cta-frame">
                <div class="container-grid">
                    <div class="mob-cta-panel glass-card">
                        <div class="mob-cta-content">
                            <p class="section-kicker">Get Early Access</p>
                            <h2 class="section-title mob-cta-title">Two steps to join the beta.</h2>
                            <p class="mob-cta-copy">
                                The app is in closed testing. Complete both steps in order —
                                the Play Store link only activates after your group membership is approved.
                            </p>
                        </div>
                        <div class="mob-cta-steps">
                            <div class="glass-card mob-cta-step">
                                <div class="mobile-step-number">1</div>
                                <div class="mobile-step-body">
                                    <h3>Join the Testing Group</h3>
                                    <p>Request access through the Google Group for beta testers. Approval is required before installing.</p>
                                    <a
                                        href="https://groups.google.com/g/believersswordgroup"
                                        class="btn-primary"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Icon name="material-symbols:group-rounded" size="20" />
                                        Join Beta Group
                                    </a>
                                </div>
                            </div>
                            <div class="glass-card mob-cta-step">
                                <div class="mobile-step-number">2</div>
                                <div class="mobile-step-body">
                                    <h3>Download on Google Play</h3>
                                    <p>Once approved, use this link to install from the Google Play testing program.</p>
                                    <a
                                        href="https://play.google.com/apps/testing/com.believers.sword.believers_sword_mobile"
                                        class="btn-secondary"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Icon name="simple-icons:googleplay" size="20" />
                                        Open Play Store
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>

        <SiteFooter />
    </div>
</template>

<style scoped lang="scss">
.mobile-page-shell {
    min-height: 100vh;
    background:
        radial-gradient(circle at 80% 10%, rgba(212, 170, 120, 0.18), transparent 45%),
        radial-gradient(circle at 10% 85%, rgba(180, 140, 100, 0.12), transparent 40%),
        #f5ede3;
}

/* ── Nav ── */
.mobile-page-nav {
    position: sticky;
    top: 0.6rem;
    z-index: 50;
    padding: 0 1.25rem;
    pointer-events: none;
}

.mobile-page-nav-inner {
    pointer-events: auto;
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 1rem;
    max-width: 72rem;
    margin: 0 auto;
    padding: 0.5rem 0.6rem 0.5rem 0.75rem;
    border-radius: 999px;
    background: rgba(255, 250, 244, 0.72);
    border: 1px solid rgba(127, 90, 62, 0.26);
    backdrop-filter: blur(20px) saturate(1.15);
    box-shadow: 0 8px 28px rgba(54, 34, 23, 0.12);
}

.mobile-page-brand {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1rem;
    font-weight: 700;
    color: #2a1c15;
    text-decoration: none;
    padding: 0.3rem 0.5rem 0.3rem 0.3rem;
    border-radius: 999px;
}

.mobile-page-brand-logo {
    border-radius: 0.45rem;
    flex-shrink: 0;
}

.mobile-page-nav-links {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.2rem;
    background: rgba(255, 255, 255, 0.72);
    border: 1px solid rgba(117, 84, 61, 0.16);
    border-radius: 999px;
    padding: 0.25rem;
    width: fit-content;
    margin: 0 auto;
}

.mobile-page-nav-link {
    border-radius: 999px;
    padding: 0.38rem 0.82rem;
    font-size: 0.86rem;
    color: #5a4637;
    transition: background-color 180ms ease, color 180ms ease;
    white-space: nowrap;
}

.mobile-page-nav-link:hover {
    background: rgba(126, 90, 63, 0.12);
    color: #2f2119;
}

.mobile-page-nav-cta {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.52rem 1.1rem;
    border-radius: 999px;
    background: linear-gradient(130deg, #8d5f3d, #6e452b);
    color: #fffaf3;
    font-size: 0.88rem;
    font-weight: 600;
    white-space: nowrap;
    transition: transform 200ms ease, box-shadow 200ms ease;
}

.mobile-page-nav-cta:hover {
    transform: translateY(-1px);
    box-shadow: 0 8px 20px rgba(80, 45, 22, 0.28);
}

/* ── Hero ── */
.mob-hero {
    padding-top: clamp(3rem, 7vw, 5rem);
}

.mob-hero-layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: clamp(2rem, 5vw, 4rem);
    align-items: center;
}

.mob-hero-content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.mob-beta-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.34rem 0.85rem;
    border-radius: 999px;
    background: rgba(141, 95, 61, 0.12);
    border: 1px solid rgba(141, 95, 61, 0.28);
    color: #6e452b;
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    width: fit-content;
}

.mob-hero-title {
    font-family: "Space Grotesk", "Avenir Next", sans-serif;
    font-size: clamp(2rem, 5vw, 3.4rem);
    line-height: 1.14;
    letter-spacing: -0.02em;
    color: #1c1009;
}

.mob-hero-copy {
    color: #5a4336;
    line-height: 1.72;
    max-width: 38ch;
}

.mob-hero-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.7rem;
    margin-top: 0.25rem;
}

.mob-hero-note {
    font-size: 0.8rem;
    color: #8a6a56;
    line-height: 1.55;
    max-width: 36ch;
}

/* ── Hero phones ── */
.mob-hero-phones {
    position: relative;
    height: clamp(360px, 46vw, 580px);
}

.mob-phone {
    position: absolute;
    width: 52%;
    border-radius: 2.4rem;
    overflow: hidden;
    border: 1px solid rgba(149, 108, 75, 0.18);
}

.mob-phone--back {
    right: 4%;
    top: 0;
    transform: rotate(5deg);
    z-index: 1;
    box-shadow: 0 16px 48px rgba(30, 18, 10, 0.14);
    opacity: 0.88;
}

.mob-phone--front {
    left: 4%;
    bottom: 0;
    transform: rotate(-4deg);
    z-index: 2;
    box-shadow: 0 24px 64px rgba(30, 18, 10, 0.22);
}

.mob-phone-img {
    width: 100%;
    display: block;
}

/* ── Features ── */
.mob-features-frame {
    background:
        radial-gradient(circle at 12% 8%, rgba(131, 93, 67, 0.4), transparent 42%),
        linear-gradient(160deg, #2a1a11 0%, #1a0f09 100%);
}

.mob-features-grid {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
}

.mob-feature-card {
    padding: clamp(1.2rem, 3vw, 1.6rem);
    border-radius: 1.2rem;
    border-color: rgba(236, 205, 170, 0.22);
    background: rgba(245, 230, 214, 0.07);
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.mob-feature-icon {
    color: #c49468;
}

.mob-feature-card h3 {
    font-size: 1rem;
    font-weight: 700;
    color: #f0dfc8;
}

.mob-feature-card p {
    font-size: 0.9rem;
    color: rgba(220, 197, 170, 0.82);
    line-height: 1.65;
}

.mob-features-frame :deep(.section-kicker) {
    color: rgba(220, 180, 140, 0.72);
}

.mob-features-frame :deep(.section-title) {
    color: #f2e4d4;
}

/* ── Screenshots ── */
.mob-shots-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1rem;
}

.mob-shot-card {
    border-radius: 1.4rem;
    overflow: hidden;
}

.mob-shot-img {
    width: 100%;
    display: block;
}

/* ── CTA ── */
.mob-cta-frame {
    padding-bottom: clamp(4rem, 8vw, 6rem);
}

.mob-cta-panel {
    border-radius: 1.6rem;
    padding: clamp(1.6rem, 4vw, 2.8rem);
    background:
        radial-gradient(circle at 7% 0%, rgba(243, 218, 184, 0.58), transparent 40%),
        linear-gradient(128deg, rgba(255, 252, 247, 0.9), rgba(250, 236, 219, 0.7));
    border: 1px solid rgba(149, 108, 75, 0.26);
    display: grid;
    gap: 2rem;
}

.mob-cta-title {
    max-width: 18ch;
}

.mob-cta-copy {
    color: #644e3d;
    margin-top: 0.5rem;
    line-height: 1.7;
    max-width: 46ch;
}

.mob-cta-steps {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 1rem;
}

.mob-cta-step {
    display: flex;
    gap: 1.25rem;
    padding: clamp(1rem, 3vw, 1.5rem);
    border-radius: 1.2rem;
    align-items: flex-start;
}

/* ── Responsive ── */
@media (max-width: 860px) {
    .mob-hero-layout {
        grid-template-columns: 1fr;
    }

    .mob-hero-phones {
        height: auto;
        display: flex;
        justify-content: center;
        padding: 0.5rem 1rem;
    }

    .mob-phone {
        position: static;
        transform: none;
        width: min(220px, 60vw);
    }

    .mob-phone--back {
        display: none;
    }

    .mob-phone--front {
        opacity: 1;
        box-shadow: 0 16px 40px rgba(30, 18, 10, 0.2);
    }

    .mob-shots-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}

@media (max-width: 600px) {
    .mobile-page-nav-links {
        display: none;
    }

    .mobile-page-nav-inner {
        grid-template-columns: 1fr auto;
    }
}
</style>
