<script setup lang="ts">
const {
    tagName,
    platformDownloads,
    detectedPlatform,
    detectedPlatformLabel,
    releasesPageUrl,
    microsoftStoreUrl,
    microsoftStoreProtocolUrl,
} = await useReleaseDownloads();

const windowsDownload = computed(() =>
    platformDownloads.value.find((download) => download.key === "windows")
);

const detectedPlatformDownload = computed(() => {
    if (
        detectedPlatform.value === "windows" ||
        detectedPlatform.value === "macos" ||
        detectedPlatform.value === "linux"
    ) {
        return platformDownloads.value.find(
            (download) => download.key === detectedPlatform.value
        );
    }

    return null;
});

const primaryDownload = computed(() => {
    return detectedPlatformDownload.value || windowsDownload.value || platformDownloads.value[0];
});

const isWindowsDetected = computed(() => detectedPlatform.value === "windows");

const microsoftStoreHref = computed(() =>
    isWindowsDetected.value ? microsoftStoreProtocolUrl : microsoftStoreUrl
);

const microsoftStoreTarget = computed(() =>
    isWindowsDetected.value ? undefined : "_blank"
);

const microsoftStoreRel = computed(() =>
    isWindowsDetected.value ? undefined : "noopener noreferrer"
);

const downloadPanelLabel = computed(() => {
    if (
        detectedPlatform.value === "windows" ||
        detectedPlatform.value === "macos" ||
        detectedPlatform.value === "linux"
    ) {
        return `Recommended for ${detectedPlatformLabel.value}`;
    }

    return "Choose your platform";
});

const downloadPanelCopy = computed(() => {
    if (detectedPlatform.value === "windows") {
        return "We detected Windows, so the fastest options are the direct installer or Microsoft Store.";
    }

    if (detectedPlatform.value === "macos") {
        return "We detected macOS, so the direct macOS build is ready first, with the full downloads page available if you need another package.";
    }

    if (detectedPlatform.value === "linux") {
        return "We detected Linux, so the Linux build is front and center, with more packages available on the downloads page.";
    }

    return "Downloads are pulled from the latest GitHub release, and the full downloads page lists every available option in one place.";
});

const desktopScreenshots = Array.from(
    { length: 7 },
    (_, index) => `/screenshots/desktop/desktop-${String(index + 1).padStart(2, "0")}.png`
);

const mobileScreenshots = Array.from(
    { length: 6 },
    (_, index) => `/screenshots/mobile/mobile-${String(index + 1).padStart(2, "0")}.jpg`
);

const showScrollTop = ref(false);
const isHeroNavSticky = ref(false);

let removeScrollHandler: (() => void) | null = null;

const onWindowScroll = () => {
    showScrollTop.value = window.scrollY > 420;
    isHeroNavSticky.value = window.scrollY > 90;
};

const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
};

onMounted(() => {
    const revealTargets = Array.from(
        document.querySelectorAll<HTMLElement>("[data-reveal]")
    );

    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.2, rootMargin: "0px 0px -12% 0px" }
    );

    revealTargets.forEach((el) => revealObserver.observe(el));

    const parallaxTargets = Array.from(
        document.querySelectorAll<HTMLElement>("[data-parallax]")
    );

    let ticking = false;
    const updateParallax = () => {
        const scrollY = window.scrollY;
        parallaxTargets.forEach((el) => {
            const speed = Number(el.dataset.parallax ?? "0.09");
            el.style.transform = `translate3d(0, ${Math.round(scrollY * speed)}px, 0)`;
        });
        ticking = false;
    };

    const onScroll = () => {
        onWindowScroll();
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    removeScrollHandler = () => {
        revealObserver.disconnect();
        window.removeEventListener("scroll", onScroll);
    };
});

onBeforeUnmount(() => {
    removeScrollHandler?.();
});

useSeoMeta({
    title: "Believers Sword",
    description:
        "Believers Sword is a modern app for reading and studying the Bible with clarity and focus.",
});

defineOgImageComponent("BelieverSwordOg");
</script>

<template>
    <header
        :class="['floating-nav', { 'is-visible': isHeroNavSticky }]"
        aria-label="Sticky primary navigation"
    >
        <div class="hero-topbar glass-card floating-nav-inner">
            <a href="#home" class="hero-brand" style="font-family: 'Space Grotesk', sans-serif">
                Believers Sword
            </a>
            <nav class="hero-nav-pill" aria-label="Primary">
                <a href="#features" class="hero-nav-link">Features</a>
                <a href="#preview" class="hero-nav-link">Preview</a>
                <a href="/screenshots" class="hero-nav-link">Screenshots</a>
                <a href="#testimonials" class="hero-nav-link">Use Cases</a>
                <a href="#download" class="hero-nav-link">Download</a>
            </nav>
            <a href="#download" class="hero-top-action">Get App</a>
        </div>
    </header>

    <main class="landing-shell">
        <div class="ambient-orb ambient-orb-left" data-parallax="0.05"></div>
        <div class="ambient-orb ambient-orb-right" data-parallax="0.08"></div>
        <div class="ambient-grid"></div>

        <section id="home" class="section-frame hero-frame">
            <div class="container-grid hero-grid">
                <div data-reveal data-delay="0" class="hero-topbar-shell">
                    <div class="hero-topbar glass-card">
                    <a href="#home" class="hero-brand" style="font-family: 'Space Grotesk', sans-serif">
                        Believers Sword
                    </a>
                    <nav class="hero-nav-pill" aria-label="Primary">
                        <a href="#features" class="hero-nav-link">Features</a>
                        <a href="#preview" class="hero-nav-link">Preview</a>
                        <a href="/screenshots" class="hero-nav-link">Screenshots</a>
                        <a href="#testimonials" class="hero-nav-link">Use Cases</a>
                        <a href="#download" class="hero-nav-link">Download</a>
                    </nav>
                    <a href="#download" class="hero-top-action">Get App</a>
                    </div>
                </div>

                <div data-reveal data-delay="100" class="hero-content">
                    <p class="eyebrow-pill">
                        Prayerful, focused, and built for daily Scripture study
                    </p>
                    <h1 class="hero-title">
                        Believers Sword helps you read deeper, remember more, and stay rooted in
                        God&apos;s Word.
                    </h1>
                    <p class="hero-subtitle">
                        A calm Bible study workspace with intelligent notes, quick references, and
                        beautifully organized highlights designed for clarity and devotion.
                    </p>
                    <div class="hero-actions-center">
                        <a
                            v-if="primaryDownload"
                            :href="primaryDownload.href"
                            class="btn-primary"
                        >
                            <Icon :name="primaryDownload.icon" size="20" />
                            Download for {{ primaryDownload.label }}
                        </a>

                        <a
                            v-else
                            :href="releasesPageUrl"
                            class="btn-primary"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Icon name="ic:baseline-cloud-download" size="20" />
                            View Latest Release
                        </a>

                        <a
                            v-if="isWindowsDetected"
                            :href="microsoftStoreHref"
                            class="btn-secondary"
                            :target="microsoftStoreTarget"
                            :rel="microsoftStoreRel"
                        >
                            <Icon name="simple-icons:microsoftstore" size="20" />
                            Download on Microsoft Store
                        </a>

                        <a
                            href="/downloads"
                            class="btn-secondary"
                        >
                            <Icon name="material-symbols:apps-rounded" size="20" />
                            More Download Options
                        </a>
                    </div>

                    <div class="hero-meta">
                        <span>Version {{ tagName }}</span>
                        <span v-if="platformDownloads.length">
                            Available for {{ platformDownloads.map((item) => item.label).join(" • ") }}
                        </span>
                        <span>
                            Suggested for {{ detectedPlatformLabel }}
                        </span>
                    </div>
                </div>

                <div data-reveal data-delay="160" class="hero-preview-wrap">
                    <div class="hero-light-ray"></div>
                    <div class="glass-card hero-preview-card" data-parallax="-0.04">
                        <img
                            :src="desktopScreenshots[0]"
                            alt="Believers Sword desktop interface"
                            class="hero-preview-image"
                            loading="eager"
                        />
                        <div class="preview-chip">Live desktop preview</div>
                    </div>
                </div>
            </div>
        </section>

        <section id="features" class="section-frame">
            <div class="container-grid">
                <div data-reveal data-delay="0" class="section-heading">
                    <p class="section-kicker">Core Features</p>
                    <h2 class="section-title">Everything you need for focused digital Bible study.</h2>
                </div>

                <div class="feature-grid">
                    <article data-reveal data-delay="40" class="glass-card feature-card">
                        <Icon class="feature-icon" name="material-symbols:edit-note-rounded" size="25" />
                        <h3>Structured Notes</h3>
                        <p>
                            Capture insights verse-by-verse and keep your study thoughts searchable in
                            one place.
                        </p>
                    </article>
                    <article data-reveal data-delay="100" class="glass-card feature-card">
                        <Icon class="feature-icon" name="material-symbols:bookmark-heart-rounded" size="25" />
                        <h3>Smart Bookmarks</h3>
                        <p>
                            Return instantly to key passages and reading plans without losing context.
                        </p>
                    </article>
                    <article data-reveal data-delay="160" class="glass-card feature-card">
                        <Icon class="feature-icon" name="material-symbols:ink-highlighter-rounded" size="25" />
                        <h3>Highlights that Stick</h3>
                        <p>
                            Highlight themes and moments of conviction with a clean, readable color
                            system.
                        </p>
                    </article>
                    <article data-reveal data-delay="220" class="glass-card feature-card">
                        <Icon class="feature-icon" name="material-symbols:offline-bolt-rounded" size="25" />
                        <h3>Offline Access</h3>
                        <p>
                            Keep studying in low-connectivity settings with your resources ready
                            anytime.
                        </p>
                    </article>
                </div>
            </div>
        </section>

        <section id="preview" class="section-frame dark-frame">
            <div class="container-grid preview-flow">
                <div data-reveal data-delay="0" class="preview-copy preview-copy-wide">
                    <p class="section-kicker">App Preview</p>
                    <h2 class="section-title text-light">
                        A premium reading environment with minimal distractions.
                    </h2>
                    <p class="dark-copy">
                        Thoughtful spacing, refined contrast, and smooth navigation create a
                        reading-like flow that keeps attention on Scripture and study.
                    </p>
                    <ul class="preview-points">
                        <li>Clear typography tuned for long reading sessions.</li>
                        <li>Quick-access panels for notes and references.</li>
                        <li>Responsive layouts for focused study across screens.</li>
                    </ul>

                    <div class="preview-action-row">
                        <a href="/screenshots" class="btn-secondary">
                            <Icon name="material-symbols:image-search-rounded" size="20" />
                            View Full Screenshot Gallery
                        </a>
                    </div>
                </div>

                <div data-reveal data-delay="120" class="preview-stage">
                    <div class="glass-card dark-card preview-showcase preview-stage-card">
                        <img
                            :src="desktopScreenshots[1]"
                            alt="Believers Sword desktop Bible study view"
                            class="preview-image"
                            loading="lazy"
                        />
                        <div class="preview-toolbar">Desktop study workspace</div>
                        <div class="mobile-shot-card" data-parallax="0.03">
                            <img
                                :src="mobileScreenshots[0]"
                                alt="Believers Sword mobile screenshot"
                                class="mobile-shot-image"
                                loading="lazy"
                            />
                        </div>
                    </div>
                </div>

                <div data-reveal data-delay="180" class="preview-thumb-row">
                    <article
                        v-for="(shot, index) in desktopScreenshots.slice(0, 4)"
                        :key="`thumb-${shot}`"
                        class="preview-thumb-card"
                    >
                        <img
                            :src="shot"
                            :alt="`Believers Sword desktop screenshot ${index + 1}`"
                            class="preview-thumb-image"
                            loading="lazy"
                        />
                    </article>
                </div>
            </div>
        </section>

        <section id="testimonials" class="section-frame">
            <div class="container-grid">
                <div data-reveal data-delay="0" class="section-heading">
                    <p class="section-kicker">Use Cases</p>
                    <h2 class="section-title">Designed for personal devotion and group study flow.</h2>
                </div>

                <div class="testimonial-grid">
                    <article data-reveal data-delay="40" class="glass-card testimony-card">
                        <p>
                            I prep Bible study sessions faster now. Notes, references, and highlights
                            all stay together and easy to revisit.
                        </p>
                        <span>For Small Group Leaders</span>
                    </article>
                    <article data-reveal data-delay="110" class="glass-card testimony-card">
                        <p>
                            It feels like reading in a quiet study room. Nothing noisy, just the tools
                            I need to remain attentive.
                        </p>
                        <span>For Daily Devotional Readers</span>
                    </article>
                    <article data-reveal data-delay="180" class="glass-card testimony-card">
                        <p>
                            Offline mode is a blessing during travel. My ongoing studies remain
                            available without interruption.
                        </p>
                        <span>For Mobile Ministry Teams</span>
                    </article>
                </div>
            </div>
        </section>

        <section id="download" class="section-frame cta-frame">
            <div data-reveal data-delay="0" class="container-grid">
                <div class="cta-panel glass-card">
                    <div class="cta-content">
                        <p class="section-kicker">Start Today</p>
                        <h2 class="section-title cta-title">
                            Download Believers Sword and begin your next study session.
                        </h2>
                        <p class="cta-copy">
                            {{ downloadPanelCopy }}
                        </p>

                        <div class="cta-meta-row">
                            <span class="cta-version-pill">Latest {{ tagName }}</span>
                            <a
                                :href="releasesPageUrl"
                                class="cta-meta-link"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                View full release notes
                            </a>
                        </div>
                    </div>

                    <div class="cta-actions-wrap">
                        <p class="cta-actions-label">{{ downloadPanelLabel }}</p>

                        <div class="cta-actions">
                            <template v-if="primaryDownload">
                                <a :href="primaryDownload.href" class="btn-primary">
                                    <Icon :name="primaryDownload.icon" size="20" />
                                    {{ primaryDownload.label }} ({{ tagName }})
                                </a>

                                <a
                                    v-if="isWindowsDetected"
                                    :href="microsoftStoreHref"
                                    :target="microsoftStoreTarget"
                                    :rel="microsoftStoreRel"
                                    class="btn-secondary"
                                >
                                    <Icon name="simple-icons:microsoftstore" size="20" />
                                    Microsoft Store
                                </a>
                            </template>

                            <a
                                href="/downloads"
                                class="btn-secondary"
                            >
                                <Icon name="material-symbols:apps-rounded" size="20" />
                                More Download Options
                            </a>

                            <a
                                v-if="platformDownloads.length === 0"
                                :href="releasesPageUrl"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="btn-primary"
                            >
                                <Icon name="ic:baseline-cloud-download" size="20" />
                                Open Releases Page
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <SiteFooter />

    <button
        type="button"
        v-show="showScrollTop"
        class="scroll-top-btn"
        aria-label="Scroll to top"
        @click="scrollToTop"
    >
        <Icon name="material-symbols:keyboard-double-arrow-up-rounded" size="22" />
    </button>
</template>
