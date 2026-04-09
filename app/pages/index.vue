<script setup lang="ts">
interface GithubAsset {
    name: string;
    browser_download_url: string;
}

interface GithubRelease {
    tag_name: string;
    assets: GithubAsset[];
}

const latestReleaseUrl =
    "https://api.github.com/repos/JenuelDev/Believers-Sword/releases/latest";

const releasesPageUrl = "https://github.com/JenuelDev/Believers-Sword/releases";

const { data: release } = await useFetch<GithubRelease>(latestReleaseUrl, {
    default: () => ({
        tag_name: "latest",
        assets: [],
    }),
});

const assets = computed(() => release.value?.assets ?? []);
const tagName = computed(() => release.value?.tag_name || "latest");

type DownloadKey = "windows" | "macos" | "linux" | "windows-portable";

interface DownloadOption {
    key: DownloadKey;
    label: string;
    icon: string;
    asset?: GithubAsset;
}

const downloadOptions: Array<Omit<DownloadOption, "asset">> = [
    {
        key: "windows",
        label: "Windows",
        icon: "simple-icons:windows11",
    },
    {
        key: "macos",
        label: "macOS",
        icon: "simple-icons:apple",
    },
    {
        key: "linux",
        label: "Linux",
        icon: "simple-icons:linux",
    },
    {
        key: "windows-portable",
        label: "Windows Portable",
        icon: "simple-icons:windows11",
    },
];

const detectDownloadKey = (assetName: string): DownloadKey | null => {
    const name = assetName.toLowerCase();

    const hasAny = (tokens: string[]) => tokens.some((token) => name.includes(token));

    const isPortable = hasAny(["portable", "noinstall", "standalone"]);
    const isWindows =
        hasAny(["windows", "win32", "win64", "setup", "installer"]) ||
        name.endsWith(".exe") ||
        name.endsWith(".msi");
    const isMac =
        hasAny(["mac", "macos", "darwin", "osx"]) ||
        name.endsWith(".dmg") ||
        name.endsWith(".pkg");
    const isLinux =
        hasAny(["linux", "appimage", "deb", "rpm", "snap"]) ||
        name.endsWith(".appimage") ||
        name.endsWith(".deb") ||
        name.endsWith(".rpm") ||
        name.endsWith(".tar.gz") ||
        name.endsWith(".tar.xz");

    if (isPortable && (isWindows || (!isMac && !isLinux))) {
        return "windows-portable";
    }

    if (isWindows) {
        return "windows";
    }

    if (isMac) {
        return "macos";
    }

    if (isLinux) {
        return "linux";
    }

    return null;
};

const platformDownloads = computed<DownloadOption[]>(() => {
    const matched = new Map<DownloadKey, GithubAsset>();

    for (const asset of assets.value) {
        const key = detectDownloadKey(asset.name);
        if (!key || matched.has(key)) {
            continue;
        }
        matched.set(key, asset);
    }

    return downloadOptions
        .map((option) => ({
            ...option,
            asset: matched.get(option.key),
        }))
        .filter((option) => Boolean(option.asset));
});

const primaryDownload = computed(() => {
    return (
        platformDownloads.value.find((download) => download.key === "windows") ||
        platformDownloads.value[0]
    );
});

const desktopScreenshots = [
    "/screenshots/desktop/desktop-hero-01.png",
    "/screenshots/desktop/desktop-preview-01.png",
    "/screenshots/desktop/desktop-preview-02.png",
];

const mobileScreenshots = [
    "/screenshots/mobile/mobile-preview-01.jpg",
    "/screenshots/mobile/mobile-preview-02.jpg",
];

const showScrollTop = ref(false);

let removeScrollHandler: (() => void) | null = null;

const onWindowScroll = () => {
    showScrollTop.value = window.scrollY > 420;
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
    <main class="landing-shell">
        <div class="ambient-orb ambient-orb-left" data-parallax="0.05"></div>
        <div class="ambient-orb ambient-orb-right" data-parallax="0.08"></div>
        <div class="ambient-grid"></div>

        <section id="home" class="section-frame hero-frame">
            <div class="container-grid hero-grid">
                <div data-reveal data-delay="0" class="hero-topbar glass-card">
                    <a href="#home" class="hero-brand" style="font-family: 'Space Grotesk', sans-serif">
                        Believers Sword
                    </a>
                    <nav class="hero-nav-pill" aria-label="Primary">
                        <a href="#features" class="hero-nav-link">Features</a>
                        <a href="#preview" class="hero-nav-link">Preview</a>
                        <a href="#testimonials" class="hero-nav-link">Use Cases</a>
                        <a href="#download" class="hero-nav-link">Download</a>
                    </nav>
                    <a href="#download" class="hero-top-action">Get App</a>
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
                            :href="primaryDownload.asset?.browser_download_url"
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

                        <a href="#features" class="btn-secondary">
                            <Icon name="material-symbols:arrow-downward-rounded" size="20" />
                            Explore Features
                        </a>
                    </div>
                    <div class="hero-meta">
                        <span>Version {{ tagName }}</span>
                        <span v-if="platformDownloads.length">
                            Available for {{ platformDownloads.map((item) => item.label).join(" • ") }}
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
            <div class="container-grid preview-grid">
                <div data-reveal data-delay="0" class="preview-copy">
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
                </div>

                <div data-reveal data-delay="120" class="preview-image-wrap" data-parallax="-0.06">
                    <div class="glass-card dark-card preview-showcase">
                        <img
                            :src="desktopScreenshots[1]"
                            alt="Believers Sword desktop Bible study view"
                            class="preview-image"
                            loading="lazy"
                        />
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
                    <div>
                        <p class="section-kicker">Start Today</p>
                        <h2 class="section-title">Download Believers Sword and begin your next study session.</h2>
                        <p class="cta-copy">
                            Downloads are automatically pulled from the latest GitHub release for
                            Windows, macOS, Linux, and Windows Portable builds.
                        </p>
                    </div>

                    <div class="cta-actions">
                        <a
                            v-for="download in platformDownloads"
                            :key="`cta-${download.key}`"
                            :href="download.asset?.browser_download_url"
                            :class="download.key === 'windows' ? 'btn-primary' : 'btn-secondary'"
                        >
                            <Icon :name="download.icon" size="20" />
                            {{ download.label }} ({{ tagName }})
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
