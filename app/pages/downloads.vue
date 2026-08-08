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

const isWindows = computed(() => detectedPlatform.value === "windows");

const options = computed(() => {
    const rows = platformDownloads.value.map((download) => ({
        key: download.key,
        title: download.label,
        description: download.description,
        icon: download.icon,
        href: download.href,
        action: `Download ${tagName.value}`,
        actionIcon: "material-symbols:download-rounded",
        external: true,
        // On Windows the Microsoft Store takes the recommended slot instead,
        // since it handles updates for the user.
        recommended: !isWindows.value && download.key === detectedPlatform.value,
    }));

    rows.push({
        key: "microsoft-store",
        title: "Microsoft Store",
        description: "Install on Windows through the Microsoft Store listing.",
        icon: "simple-icons:microsoftstore",
        href: isWindows.value ? microsoftStoreProtocolUrl : microsoftStoreUrl,
        action: "Open Store",
        actionIcon: "simple-icons:microsoftstore",
        external: !isWindows.value,
        recommended: isWindows.value,
    });

    rows.push({
        key: "google-play",
        title: "Android",
        description: "Install the production Android app from Google Play.",
        icon: "simple-icons:googleplay",
        href: googlePlayStoreUrl,
        action: "Google Play",
        actionIcon: "simple-icons:googleplay",
        external: true,
        recommended: detectedPlatform.value === "android",
    });

    // Sort is stable, so this only lifts the recommended row to the top.
    return rows.sort((a, b) => Number(b.recommended) - Number(a.recommended));
});

useSeoMeta({
    title: "Download Believers Sword — Android, Windows, macOS, Linux",
    description:
        "Download Believers Sword Bible study app for free. Available on Android through Google Play, as a direct installer for Windows, macOS, and Linux, or from the Microsoft Store.",
});

defineOgImage("BelieverSwordOg", {
    headline: "Believers Sword",
    title: "Downloads",
    description: "Free on Windows, macOS, Linux, and Android.",
});
</script>

<template>
    <main>
        <section class="page-head">
            <div class="container">
                <h1>Download</h1>
                <p class="lede">
                    Free on every platform. Desktop builds come from the latest GitHub
                    release ({{ tagName }}); Android comes from Google Play.
                </p>
            </div>
        </section>

        <section class="section">
            <div class="container">
                <p class="note">Detected: {{ detectedPlatformLabel }}</p>

                <ul class="link-list">
                    <li v-for="option in options" :key="option.key" class="link-row">
                        <div class="link-row-text">
                            <h3>
                                <Icon :name="option.icon" size="18" />
                                {{ option.title }}
                                <span v-if="option.recommended" class="tag">Recommended</span>
                            </h3>
                            <p>{{ option.description }}</p>
                        </div>
                        <a
                            :href="option.href"
                            :class="option.recommended ? 'btn btn--primary' : 'btn'"
                            :target="option.external ? '_blank' : undefined"
                            :rel="option.external ? 'noopener noreferrer' : undefined"
                        >
                            <Icon :name="option.actionIcon" size="19" />
                            {{ option.action }}
                        </a>
                    </li>
                </ul>

                <p class="note releases-note">
                    <a
                        :href="releasesPageUrl"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        View all releases and release notes on GitHub
                    </a>
                </p>
            </div>
        </section>
    </main>
</template>

<style scoped>
.tag {
    padding: 0.1rem 0.5rem;
    border-radius: 999px;
    background: rgba(74, 58, 255, 0.1);
    color: var(--brand);
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
}

.releases-note {
    margin-top: 1.25rem;
}

.releases-note a {
    text-decoration: underline;
    text-underline-offset: 2px;
}
</style>
