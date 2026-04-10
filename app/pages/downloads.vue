<script setup lang="ts">
const {
    tagName,
    platformDownloads,
    detectedPlatform,
    detectedPlatformLabel,
    releasesPageUrl,
    microsoftStoreUrl,
    microsoftStoreProtocolUrl,
} = useReleaseDownloads();

const primaryDownload = computed(() => {
    if (
        detectedPlatform.value === "windows" ||
        detectedPlatform.value === "macos" ||
        detectedPlatform.value === "linux"
    ) {
        const detectedMatch = platformDownloads.value.find(
            (download) => download.key === detectedPlatform.value
        );

        if (detectedMatch) {
            return detectedMatch;
        }
    }

    return (
        platformDownloads.value.find((download) => download.key === "windows") ||
        platformDownloads.value[0] ||
        null
    );
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

const recommendedDownloads = computed(() => {
    const actions: Array<{
        key: string;
        label: string;
        icon: string;
        href: string;
        description: string;
        variant: "primary" | "secondary";
        target?: string;
        rel?: string;
    }> = [];

    if (primaryDownload.value) {
        actions.push({
            key: primaryDownload.value.key,
            label: `Download for ${primaryDownload.value.label}`,
            icon: primaryDownload.value.icon,
            href: primaryDownload.value.href,
            description: primaryDownload.value.description,
            variant: "primary",
        });
    }

    if (isWindowsDetected.value) {
        actions.push({
            key: "microsoft-store",
            label: "Open Microsoft Store",
            icon: "simple-icons:microsoftstore",
            href: microsoftStoreHref.value,
            description: "Install the Windows app from Microsoft Store.",
            variant: "secondary",
            target: microsoftStoreTarget.value,
            rel: microsoftStoreRel.value,
        });
    }

    return actions;
});

const allDownloadCards = computed(() => {
    const cards = platformDownloads.value.map((download) => ({
        key: download.key,
        title: download.label,
        description: download.description,
        href: download.href,
        icon: download.icon,
        buttonLabel: `${download.label} (${tagName.value})`,
        target: "_blank",
        rel: "noopener noreferrer",
        variant:
            download.key === primaryDownload.value?.key ? "primary" : ("secondary" as const),
    }));

    cards.push({
        key: "microsoft-store",
        title: "Microsoft Store",
        description: "Install Believers Sword from the Microsoft Store listing.",
        href: microsoftStoreHref.value,
        icon: "simple-icons:microsoftstore",
        buttonLabel: "Microsoft Store",
        target: microsoftStoreTarget.value,
        rel: microsoftStoreRel.value,
        variant: isWindowsDetected.value ? "primary" : ("secondary" as const),
    });

    return cards;
});

const recommendationCopy = computed(() => {
    if (detectedPlatform.value === "windows") {
        return "Windows was detected on this device, so we are surfacing both the direct installer and the Microsoft Store route first.";
    }

    if (detectedPlatform.value === "macos") {
        return "macOS was detected on this device, so the macOS build is highlighted first.";
    }

    if (detectedPlatform.value === "linux") {
        return "Linux was detected on this device, so the Linux build is highlighted first.";
    }

    return "We could not confidently match a desktop OS, so every available download option is listed below.";
});

useSeoMeta({
    title: "Believers Sword Downloads",
    description:
        "Download Believers Sword for Windows, macOS, Linux, or Microsoft Store from one page.",
});
</script>

<template>
    <main class="downloads-shell">
        <section class="downloads-hero section-frame">
            <div class="container-grid">
                <p class="section-kicker">Downloads</p>
                <h1 class="downloads-title">Choose the Believers Sword build that fits your device.</h1>
                <p class="downloads-subtitle">
                    Direct downloads are pulled from the latest GitHub release, and the Windows app
                    is also available through Microsoft Store.
                </p>

                <div class="downloads-actions">
                    <a href="/" class="btn-secondary">
                        <Icon name="material-symbols:arrow-back-rounded" size="20" />
                        Back to Home
                    </a>
                    <a
                        :href="releasesPageUrl"
                        class="btn-primary"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Icon name="ic:baseline-cloud-download" size="20" />
                        View Release Notes
                    </a>
                </div>
            </div>
        </section>

        <section class="section-frame downloads-section">
            <div class="container-grid">
                <div class="downloads-recommend glass-card">
                    <div class="downloads-recommend-copy">
                        <p class="section-kicker">Recommended</p>
                        <h2>Suggested for {{ detectedPlatformLabel }}</h2>
                        <p>{{ recommendationCopy }}</p>
                        <span class="downloads-version-pill">Latest {{ tagName }}</span>
                    </div>

                    <div class="downloads-recommend-actions">
                        <a
                            v-for="action in recommendedDownloads"
                            :key="`recommended-${action.key}`"
                            :href="action.href"
                            :class="action.variant === 'primary' ? 'btn-primary' : 'btn-secondary'"
                            :target="action.target"
                            :rel="action.rel"
                        >
                            <Icon :name="action.icon" size="20" />
                            {{ action.label }}
                        </a>

                        <a
                            v-if="recommendedDownloads.length === 0"
                            :href="releasesPageUrl"
                            class="btn-primary"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Icon name="ic:baseline-cloud-download" size="20" />
                            Open Latest Release
                        </a>
                    </div>
                </div>
            </div>
        </section>

        <section class="section-frame downloads-section downloads-grid-section">
            <div class="container-grid">
                <div class="downloads-grid-header">
                    <div>
                        <p class="section-kicker">All Options</p>
                        <h2>Every available download button in one place.</h2>
                    </div>
                    <span>{{ allDownloadCards.length }} options</span>
                </div>

                <div class="downloads-grid">
                    <article
                        v-for="card in allDownloadCards"
                        :key="card.key"
                        class="download-card glass-card"
                    >
                        <div class="download-card-icon">
                            <Icon :name="card.icon" size="24" />
                        </div>
                        <h3>{{ card.title }}</h3>
                        <p>{{ card.description }}</p>
                        <a
                            :href="card.href"
                            :class="card.variant === 'primary' ? 'btn-primary' : 'btn-secondary'"
                            :target="card.target"
                            :rel="card.rel"
                        >
                            <Icon :name="card.icon" size="20" />
                            {{ card.buttonLabel }}
                        </a>
                    </article>
                </div>
            </div>
        </section>
    </main>

    <SiteFooter />
</template>

<style scoped lang="scss">
.downloads-shell {
    min-height: 100vh;
}

.downloads-hero {
    padding-top: clamp(3.5rem, 8vw, 6rem);
    padding-bottom: clamp(2rem, 5vw, 3rem);
}

.downloads-title {
    font-family: "Space Grotesk", "Avenir Next", sans-serif;
    font-size: clamp(2rem, 5vw, 3.8rem);
    line-height: 1.1;
    letter-spacing: -0.02em;
    max-width: 14ch;
}

.downloads-subtitle {
    margin-top: 0.8rem;
    max-width: 62ch;
    color: #665244;
    line-height: 1.75;
}

.downloads-actions {
    margin-top: 1.2rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.7rem;
}

.downloads-section {
    padding-top: 1.4rem;
}

.downloads-recommend {
    display: grid;
    gap: 1rem;
    padding: clamp(1.2rem, 3vw, 2rem);
    border-radius: 1.3rem;
    background:
        radial-gradient(circle at 10% 0%, rgba(243, 218, 184, 0.52), transparent 38%),
        linear-gradient(135deg, rgba(255, 251, 246, 0.9), rgba(250, 236, 219, 0.72));
    border: 1px solid rgba(149, 108, 75, 0.24);
}

.downloads-recommend-copy h2,
.downloads-grid-header h2,
.download-card h3 {
    font-family: "Space Grotesk", "Avenir Next", sans-serif;
}

.downloads-recommend-copy p {
    color: #644e3d;
    line-height: 1.7;
}

.downloads-version-pill {
    margin-top: 0.8rem;
    display: inline-flex;
    align-items: center;
    border-radius: 999px;
    padding: 0.34rem 0.78rem;
    font-size: 0.8rem;
    font-weight: 700;
    color: #5f412b;
    background: rgba(255, 250, 244, 0.82);
    border: 1px solid rgba(126, 88, 60, 0.24);
}

.downloads-recommend-actions {
    display: grid;
    gap: 0.75rem;
}

.downloads-recommend-actions .btn-primary,
.downloads-recommend-actions .btn-secondary,
.download-card .btn-primary,
.download-card .btn-secondary {
    width: 100%;
    justify-content: flex-start;
}

.downloads-grid-section {
    padding-bottom: clamp(3.8rem, 8vw, 6.2rem);
}

.downloads-grid-header {
    display: flex;
    align-items: end;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 1rem;
}

.downloads-grid-header span {
    color: #6f594a;
    font-size: 0.9rem;
}

.downloads-grid {
    display: grid;
    gap: 0.9rem;
}

.download-card {
    display: grid;
    gap: 0.85rem;
    padding: 1.2rem;
    border-radius: 1.2rem;
}

.download-card-icon {
    width: 3rem;
    height: 3rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.95rem;
    background: rgba(255, 248, 239, 0.82);
    color: #754b30;
    border: 1px solid rgba(132, 95, 66, 0.2);
}

.download-card p {
    color: #5f4b3d;
    line-height: 1.7;
}

@media (min-width: 768px) {
    .downloads-recommend {
        grid-template-columns: 1fr 1fr;
        align-items: start;
    }

    .downloads-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}

@media (min-width: 1100px) {
    .downloads-grid {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }
}
</style>
