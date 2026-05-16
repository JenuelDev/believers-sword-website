<script setup lang="ts">
const {
    tagName,
    platformDownloads,
    detectedPlatform,
    detectedPlatformLabel,
    releasesPageUrl,
    microsoftStoreUrl,
    microsoftStoreProtocolUrl,
    googlePlayStoreUrl,
} = useReleaseDownloads();

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

const webAppUrl = "https://app.believersword.com";
const mobilePageUrl = "/mobile";
const mobileAppUrl = googlePlayStoreUrl;
const webViewScreenshot =
    "/Web View ScreenShots/Screenshot 2026-05-11 065513.png";

const desktopDownloadHref = computed(() =>
    isWindowsDetected.value ? microsoftStoreHref.value : primaryDownload.value?.href || "/downloads"
);

const desktopDownloadIcon = computed(() =>
    isWindowsDetected.value
        ? "simple-icons:microsoftstore"
        : primaryDownload.value?.icon || "ic:baseline-cloud-download"
);

const desktopDownloadLabel = computed(() =>
    isWindowsDetected.value ? "Download on Microsoft Store" : "Download Desktop App"
);

const desktopDownloadTarget = computed(() =>
    isWindowsDetected.value ? microsoftStoreTarget.value : undefined
);

const desktopDownloadRel = computed(() =>
    isWindowsDetected.value ? microsoftStoreRel.value : undefined
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
    title: "Believers Sword — Bible Study App for Desktop & Mobile",
    description:
        "Believers Sword is a free Bible study app with 17+ translations, rich-text notes, highlights, prayer lists, daily devotionals, and offline access. Available on Windows, macOS, Linux, and Android.",
    ogTitle: "Believers Sword — Bible Study App",
    ogDescription:
        "Read, study, and meditate on Scripture with rich-text notes, multiple translations, highlights, prayer lists, and daily devotionals. Free and offline-ready.",
});

defineOgImage(
    "BelieverSwordOg",
    {
        headline: "Bible Study App",
        title: "Believers Sword",
        description: "Read, study, and meditate on Scripture with clarity and focus.",
    }
);

useHead({
    script: [
        {
            type: "application/ld+json",
            innerHTML: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                name: "Believers Sword",
                description:
                    "A free Bible study app with multiple translations, rich-text notes, highlights, prayer lists, daily devotionals, and offline access.",
                applicationCategory: "ReligiousApplication",
                operatingSystem: "Windows, macOS, Linux, Android",
                offers: {
                    "@type": "Offer",
                    price: "0",
                    priceCurrency: "USD",
                },
                author: {
                    "@type": "Person",
                    name: "Jenuel Oras Ganawed",
                    url: "https://jenuel.dev",
                },
                url: "https://www.believersword.com",
            }),
        },
    ],
});
</script>

<template>
    <header
        :class="['floating-nav', { 'is-visible': isHeroNavSticky }]"
        aria-label="Sticky primary navigation"
    >
        <div class="site-nav floating-nav-inner">
            <a href="#home" class="site-brand">
                <NuxtImg
                    src="/apple-touch-icon.png"
                    alt=""
                    class="site-brand-logo"
                    width="28"
                    height="28"
                    format="webp"
                    quality="88"
                />
                Believers Sword
            </a>
            <nav class="site-nav-links" aria-label="Primary">
                <a href="#features">Features</a>
                <a href="#preview">Preview</a>
                <a href="/screenshots">Screenshots</a>
                <a href="/mobile">Mobile</a>
                <a href="#download">Download</a>
            </nav>
            <a href="#download" class="nav-action">Get App</a>
        </div>
    </header>

    <main class="landing-shell">
        <section id="home" class="hero-section">
            <NuxtImg
                :src="desktopScreenshots[1]"
                alt=""
                class="hero-bg-image"
                loading="eager"
                format="webp"
                quality="80"
                fetchpriority="high"
                sizes="100vw"
            />
            <div class="hero-overlay"></div>

            <div class="container-grid hero-container">
                <div data-reveal data-delay="0" class="hero-nav-shell">
                    <div class="site-nav">
                        <a href="#home" class="site-brand">
                            <NuxtImg
                                src="/apple-touch-icon.png"
                                alt=""
                                class="site-brand-logo"
                                width="28"
                                height="28"
                                format="webp"
                                quality="88"
                            />
                            Believers Sword
                        </a>
                        <nav class="site-nav-links" aria-label="Primary">
                            <a href="#features">Features</a>
                            <a href="#preview">Preview</a>
                            <a href="/screenshots">Screenshots</a>
                            <a href="/mobile">Mobile</a>
                            <a href="#download">Download</a>
                        </nav>
                        <a href="#download" class="nav-action">Get App</a>
                    </div>
                </div>

                <div data-reveal data-delay="100" class="hero-copy">
                    <div class="hero-lockup">
                        <NuxtImg
                            src="/logo/240x240.png"
                            alt="Believers Sword logo"
                            class="hero-logo"
                            width="74"
                            height="74"
                            format="webp"
                            quality="88"
                            loading="eager"
                        />
                        <p class="eyebrow-pill">Free Bible study app for desktop, web, and Android</p>
                    </div>
                    <h1 class="hero-title">Believers Sword</h1>
                    <p class="hero-subtitle">
                        A focused Scripture study workspace for reading, comparing translations,
                        writing rich notes, highlighting passages, and keeping prayer lists close at hand.
                    </p>

                    <div class="hero-actions">
                        <a
                            :href="desktopDownloadHref"
                            class="btn-primary"
                            :target="desktopDownloadTarget"
                            :rel="desktopDownloadRel"
                        >
                            <Icon :name="desktopDownloadIcon" size="20" />
                            {{ desktopDownloadLabel }}
                        </a>
                        <a
                            :href="webAppUrl"
                            class="btn-secondary btn-secondary--dark"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Icon name="material-symbols:open-in-new-rounded" size="20" />
                            Study Online
                        </a>
                    </div>

                    <dl class="hero-proof">
                        <div>
                            <dt>17+</dt>
                            <dd>Translations</dd>
                        </div>
                        <div>
                            <dt>{{ tagName }}</dt>
                            <dd>Latest release</dd>
                        </div>
                        <div>
                            <dt>Offline</dt>
                            <dd>Desktop study</dd>
                        </div>
                    </dl>
                </div>

                <div data-reveal data-delay="140" class="hero-product-panel" aria-hidden="true">
                    <img
                        :src="desktopScreenshots[2]"
                        alt=""
                        class="hero-product-image"
                        loading="eager"
                    />
                    <div class="hero-product-caption">
                        <Icon name="material-symbols:splitscreen-rounded" size="18" />
                        Parallel study workspace
                    </div>
                </div>

                <div data-reveal data-delay="180" class="platform-strip" aria-label="Choose how to use Believers Sword">
                    <article class="platform-card">
                        <NuxtImg
                            :src="webViewScreenshot"
                            alt="Believers Sword web view interface"
                            class="platform-card-image"
                            loading="eager"
                            format="webp"
                            quality="78"
                            sizes="sm:100vw md:28vw"
                        />
                        <div class="platform-card-body">
                            <p class="platform-kicker">Web View</p>
                            <h2>Open in your browser</h2>
                            <p>Quick access for study without installing the desktop app.</p>
                            <a
                                :href="webAppUrl"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Check Web View
                            </a>
                        </div>
                    </article>

                    <article class="platform-card platform-card--desktop">
                        <NuxtImg
                            :src="desktopScreenshots[0]"
                            alt="Believers Sword desktop interface"
                            class="platform-card-image"
                            loading="eager"
                            format="webp"
                            quality="78"
                            sizes="sm:100vw md:28vw"
                        />
                        <div class="platform-card-body">
                            <p class="platform-kicker">Desktop App</p>
                            <h2>Install the full workspace</h2>
                            <p>
                                Available for
                                <span v-if="platformDownloads.length">
                                    {{ platformDownloads.map((item) => item.label).join(", ") }}.
                                </span>
                                <span v-else>desktop platforms.</span>
                            </p>
                            <a href="/downloads">View all downloads</a>
                        </div>
                    </article>

                    <article class="platform-card platform-card--mobile">
                        <NuxtImg
                            :src="mobileScreenshots[0]"
                            alt="Believers Sword mobile Bible reader"
                            class="platform-card-image platform-card-image--phone"
                            loading="eager"
                            format="webp"
                            quality="78"
                            sizes="sm:60vw md:14vw"
                        />
                        <div class="platform-card-body">
                            <p class="platform-kicker">Mobile App</p>
                            <h2>Read on Android</h2>
                            <p>Install the production app from Google Play.</p>
                            <a
                                :href="mobileAppUrl"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Download mobile app
                            </a>
                        </div>
                    </article>
                </div>
            </div>
        </section>

        <section id="features" class="section-frame feature-section">
            <div class="container-grid">
                <div data-reveal data-delay="0" class="section-heading">
                    <p class="section-kicker">Study Workflow</p>
                    <h2 class="section-title">Everything is organized around reading with attention.</h2>
                    <p class="section-copy">
                        Believers Sword brings core study tools into a single, steady workspace so
                        users can move from Scripture to notes, highlights, prayer, and comparison
                        without losing context.
                    </p>
                </div>

                <div class="feature-grid">
                    <article data-reveal data-delay="40" class="feature-card">
                        <Icon class="feature-icon" name="material-symbols:translate-rounded" size="25" />
                        <h3>Multiple Translations</h3>
                        <p>
                            Read from 17+ Bible versions including KJV, ESV, NIV, NASB, and more.
                            Download additional translations as you need them.
                        </p>
                    </article>
                    <article data-reveal data-delay="100" class="feature-card">
                        <Icon class="feature-icon" name="material-symbols:edit-note-rounded" size="25" />
                        <h3>Rich-Text Notes</h3>
                        <p>
                            Write study notes with full formatting support and keep them linked to the
                            chapters and verses you're reading.
                        </p>
                    </article>
                    <article data-reveal data-delay="160" class="feature-card">
                        <Icon class="feature-icon" name="material-symbols:ink-highlighter-rounded" size="25" />
                        <h3>Highlights &amp; Clip Notes</h3>
                        <p>
                            Color-code verses that stand out and attach quick clip notes for thoughts
                            you want to remember later.
                        </p>
                    </article>
                    <article data-reveal data-delay="220" class="feature-card">
                        <Icon class="feature-icon" name="material-symbols:bookmark-heart-rounded" size="25" />
                        <h3>Bookmarks</h3>
                        <p>
                            Save your favorite passages and return to them instantly without losing
                            your place.
                        </p>
                    </article>
                    <article data-reveal data-delay="280" class="feature-card">
                        <Icon class="feature-icon" name="material-symbols:menu-book-rounded" size="25" />
                        <h3>Daily Devotionals</h3>
                        <p>
                            Follow a guided 5-step devotional format — Pause, Listen, Think, Pray,
                            Go — with content for every day of the year.
                        </p>
                    </article>
                    <article data-reveal data-delay="340" class="feature-card">
                        <Icon class="feature-icon" name="material-symbols:prayer-times-rounded" size="25" />
                        <h3>Prayer Lists</h3>
                        <p>
                            Track your prayer requests, mark them as answered, and organize them into
                            groups for ongoing intercession.
                        </p>
                    </article>
                    <article data-reveal data-delay="400" class="feature-card">
                        <Icon class="feature-icon" name="material-symbols:search-rounded" size="25" />
                        <h3>Search &amp; Compare</h3>
                        <p>
                            Search across your installed Bible translations and compare the same verse
                            side-by-side in different versions.
                        </p>
                    </article>
                    <article data-reveal data-delay="460" class="feature-card">
                        <Icon class="feature-icon" name="material-symbols:offline-bolt-rounded" size="25" />
                        <h3>Offline &amp; Cross-Platform</h3>
                        <p>
                            All Bible data is stored locally — no internet required. Available on
                            Windows, macOS, Linux, and Android.
                        </p>
                    </article>
                </div>
            </div>
        </section>

        <section id="preview" class="section-frame preview-section">
            <div class="container-grid preview-flow">
                <div data-reveal data-delay="0" class="preview-copy preview-copy-wide">
                    <p class="section-kicker">App Preview</p>
                    <h2 class="section-title text-light">A real study desk, not a noisy feed.</h2>
                    <p class="dark-copy">
                        The desktop workspace gives room to Scripture, highlights, notes, references,
                        and search without turning the study session into a maze.
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
                    <div class="preview-showcase">
                        <NuxtImg
                            :src="desktopScreenshots[1]"
                            alt="Believers Sword desktop Bible study view"
                            class="preview-image"
                            loading="lazy"
                            format="webp"
                            quality="80"
                            sizes="sm:100vw md:72rem"
                        />
                        <div class="mobile-shot-card" data-parallax="0.03">
                            <NuxtImg
                                :src="mobileScreenshots[0]"
                                alt="Believers Sword mobile screenshot"
                                class="mobile-shot-image"
                                loading="lazy"
                                format="webp"
                                quality="78"
                                sizes="sm:36vw md:11rem"
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
                        <NuxtImg
                            :src="shot"
                            :alt="`Believers Sword desktop screenshot ${index + 1}`"
                            class="preview-thumb-image"
                            loading="lazy"
                            format="webp"
                            quality="76"
                            sizes="sm:50vw md:18rem"
                        />
                    </article>
                </div>
            </div>
        </section>

        <section id="testimonials" class="section-frame">
            <div class="container-grid">
                <div data-reveal data-delay="0" class="section-heading">
                    <p class="section-kicker">Use Cases</p>
                    <h2 class="section-title">Designed for real devotional and ministry rhythms.</h2>
                </div>

                <div class="testimonial-grid">
                    <article data-reveal data-delay="40" class="testimony-card">
                        <p>
                            Prepare study sessions with notes, highlights, and verse comparison all in
                            one workspace. Everything stays organized and easy to revisit.
                        </p>
                        <span>For Small Group Leaders</span>
                    </article>
                    <article data-reveal data-delay="110" class="testimony-card">
                        <p>
                            A focused reading environment with built-in daily devotionals, prayer
                            lists, and distraction-free design for consistent quiet time.
                        </p>
                        <span>For Daily Devotional Readers</span>
                    </article>
                    <article data-reveal data-delay="180" class="testimony-card">
                        <p>
                            All Bible translations and study data are stored locally, so everything
                            remains available offline during travel or in low-connectivity areas.
                        </p>
                        <span>For Mobile Ministry Teams</span>
                    </article>
                </div>
            </div>
        </section>

        <section id="mobile" class="section-frame">
            <div class="container-grid">
                <div class="mobile-layout">
                    <div class="mobile-content">
                        <div data-reveal data-delay="0" class="section-heading">
                            <p class="section-kicker">Mobile App</p>
                            <h2 class="section-title">Take your Bible study anywhere.</h2>
                            <p class="mobile-section-copy">
                                The Android app is live in production. Install it from
                                Google Play and keep Scripture, highlights, and study tools with you.
                            </p>
                        </div>

                        <div class="mobile-steps">
                            <div data-reveal data-delay="60" class="mobile-step-card">
                                <div class="mobile-step-number">
                                    <Icon name="simple-icons:googleplay" size="22" />
                                </div>
                                <div class="mobile-step-body">
                                    <h3>Download on Google Play</h3>
                                    <p>
                                        Open the official production listing to install the latest
                                        Android release and receive store-managed updates.
                                    </p>
                                    <a
                                        :href="mobileAppUrl"
                                        class="btn-primary"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Icon name="simple-icons:googleplay" size="20" />
                                        Get it on Google Play
                                    </a>
                                </div>
                            </div>

                            <div data-reveal data-delay="140" class="mobile-step-card">
                                <div class="mobile-step-number">
                                    <Icon name="material-symbols:phone-android-rounded" size="22" />
                                </div>
                                <div class="mobile-step-body">
                                    <h3>Explore the mobile page</h3>
                                    <p>
                                        Preview the mobile experience, screenshots, offline reading,
                                        highlights, themes, and translation downloads.
                                    </p>
                                    <a
                                        :href="mobilePageUrl"
                                        class="btn-secondary"
                                    >
                                        <Icon name="material-symbols:phone-android-rounded" size="20" />
                                        View Mobile Page
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div data-reveal data-delay="80" class="mobile-phones-wrap">
                        <div class="mobile-phone mobile-phone--back">
                            <NuxtImg
                                :src="mobileScreenshots[3]"
                                alt="Believers Sword mobile dark reading mode"
                                class="mobile-phone-img"
                                loading="lazy"
                                format="webp"
                                quality="78"
                                sizes="sm:60vw md:16rem"
                            />
                        </div>
                        <div class="mobile-phone mobile-phone--front">
                            <NuxtImg
                                :src="mobileScreenshots[0]"
                                alt="Believers Sword mobile Bible reading with highlights"
                                class="mobile-phone-img"
                                loading="lazy"
                                format="webp"
                                quality="78"
                                sizes="sm:60vw md:16rem"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section id="download" class="section-frame cta-frame">
            <div data-reveal data-delay="0" class="container-grid">
                <div class="cta-panel">
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
                                :href="mobileAppUrl"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="btn-secondary"
                            >
                                <Icon name="simple-icons:googleplay" size="20" />
                                Google Play
                            </a>

                            <a
                                href="/downloads"
                                class="btn-secondary"
                            >
                                <Icon name="material-symbols:grid-view-rounded" size="20" />
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
