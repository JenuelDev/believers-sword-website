<script setup lang="ts">
const {
    tagName,
    platformDownloads,
    detectedPlatform,
    googlePlayStoreUrl,
    microsoftStoreUrl,
    microsoftStoreProtocolUrl,
} = useReleaseDownloads();

const webAppUrl = "https://app.believersword.com";

const isWindows = computed(() => detectedPlatform.value === "windows");
const isAndroid = computed(() => detectedPlatform.value === "android");

// On Windows the ms-windows-store: protocol opens the Store app directly,
// so it stays in the same tab; elsewhere it's a normal web listing.
const microsoftStoreHref = computed(() =>
    isWindows.value ? microsoftStoreProtocolUrl : microsoftStoreUrl
);

const desktopDownload = computed(
    () =>
        platformDownloads.value.find((item) => item.key === detectedPlatform.value) ||
        platformDownloads.value.find((item) => item.key === "windows") ||
        platformDownloads.value[0] ||
        null
);

// The build that matches the visitor's OS. On Windows this is the direct
// installer, which takes second place behind the Microsoft Store.
const deviceDownload = computed(() => {
    if (detectedPlatform.value === "android") {
        return {
            label: "Get it on Google Play",
            href: googlePlayStoreUrl,
            icon: "simple-icons:googleplay",
            external: true,
        };
    }

    if (desktopDownload.value) {
        return {
            label: `Download for ${desktopDownload.value.label}`,
            href: desktopDownload.value.href,
            icon: desktopDownload.value.icon,
            external: false,
        };
    }

    return {
        label: "Download",
        href: "/downloads",
        icon: "material-symbols:download-rounded",
        external: false,
    };
});

const features = [
    {
        icon: "material-symbols:translate-rounded",
        title: "100+ translations",
        copy: "Download from over 100 versions across different sources, and compare any verse side by side.",
    },
    {
        icon: "material-symbols:dictionary-rounded",
        title: "Strong's support",
        copy: "Look up the original Hebrew and Greek behind a verse with Strong's numbers.",
    },
    {
        icon: "material-symbols:edit-note-rounded",
        title: "Rich-text notes",
        copy: "Write formatted study notes linked to the chapter you're reading.",
    },
    {
        icon: "material-symbols:ink-highlighter-rounded",
        title: "Highlights & bookmarks",
        copy: "Colour-code verses and jump back to saved passages instantly.",
    },
    {
        icon: "material-symbols:menu-book-rounded",
        title: "Daily devotionals",
        copy: "A guided reading for every day of the year: Pause, Listen, Think, Pray, Go.",
    },
    {
        icon: "material-symbols:prayer-times-rounded",
        title: "Prayer lists",
        copy: "Track requests, group them, and mark them answered.",
    },
    {
        icon: "material-symbols:quiz-rounded",
        title: "Bible games",
        copy: "Test how well you know Scripture with built-in games and quizzes.",
    },
    {
        icon: "material-symbols:offline-bolt-rounded",
        title: "Works offline",
        copy: "Bible data is stored on your device — no connection needed to study.",
    },
];

useSeoMeta({
    title: "Believers Sword — Bible Study App for Desktop & Mobile",
    description:
        "Believers Sword is a free Bible study app with 100+ downloadable translations, rich-text notes, highlights, prayer lists, daily devotionals, and offline access. Available on Windows, macOS, Linux, and Android.",
    ogTitle: "Believers Sword — Bible Study App",
    ogDescription:
        "Read, study, and meditate on Scripture with rich-text notes, multiple translations, highlights, prayer lists, and daily devotionals. Free and offline-ready.",
});

defineOgImage("BelieverSwordOg", {
    headline: "Bible Study App",
    title: "Believers Sword",
    description: "Read, study, and meditate on Scripture with clarity and focus.",
});

useHead({
    script: [
        {
            type: "application/ld+json",
            innerHTML: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                name: "Believers Sword",
                description:
                    "A free Bible study app with 100+ downloadable translations, rich-text notes, highlights, prayer lists, daily devotionals, and offline access.",
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
    <main>
        <section class="hero">
            <div class="container">
                <NuxtImg
                    src="/logo/240x240.png"
                    alt="Believers Sword logo"
                    class="hero-logo"
                    width="64"
                    height="64"
                    format="webp"
                    quality="88"
                    loading="eager"
                />
                <h1>Believers Sword</h1>
                <p class="lede hero-lede">
                    A free Bible study app for reading Scripture, taking notes, highlighting
                    verses, and keeping prayer lists — online or completely offline.
                </p>

                <div class="btn-row hero-actions">
                    <a
                        v-if="isWindows"
                        :href="microsoftStoreHref"
                        class="btn btn--primary"
                    >
                        <Icon name="simple-icons:microsoftstore" size="19" />
                        Get from Microsoft Store
                    </a>
                    <a
                        :href="deviceDownload.href"
                        :class="isWindows ? 'btn' : 'btn btn--primary'"
                        :target="deviceDownload.external ? '_blank' : undefined"
                        :rel="deviceDownload.external ? 'noopener noreferrer' : undefined"
                    >
                        <Icon :name="deviceDownload.icon" size="19" />
                        {{ deviceDownload.label }}
                    </a>
                    <a
                        :href="webAppUrl"
                        class="btn"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Icon name="material-symbols:open-in-new-rounded" size="19" />
                        Open web app
                    </a>
                    <a
                        v-if="!isAndroid"
                        :href="googlePlayStoreUrl"
                        class="btn btn--icon"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Get it on Google Play"
                        title="Get it on Google Play"
                    >
                        <Icon name="simple-icons:googleplay" size="19" />
                    </a>
                </div>

                <p class="note hero-note">
                    Free on Windows, macOS, Linux, Android, and the browser.
                </p>

                <NuxtImg
                    src="/screenshots/desktop/desktop-02.png"
                    alt="Believers Sword desktop Bible study view"
                    class="shot hero-shot"
                    format="webp"
                    quality="80"
                    sizes="sm:100vw md:62rem"
                    loading="eager"
                />
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

        <section class="section section--edge">
            <div class="container">
                <h2>Get Believers Sword</h2>
                <p class="lede">
                    Free on every platform. Latest release {{ tagName }}.
                </p>

                <div class="btn-row get-actions">
                    <a
                        v-if="isWindows"
                        :href="microsoftStoreHref"
                        class="btn btn--primary"
                    >
                        <Icon name="simple-icons:microsoftstore" size="19" />
                        Microsoft Store
                    </a>
                    <a href="/downloads" :class="isWindows ? 'btn' : 'btn btn--primary'">
                        <Icon name="material-symbols:download-rounded" size="19" />
                        Desktop downloads
                    </a>
                    <a
                        :href="googlePlayStoreUrl"
                        class="btn"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Icon name="simple-icons:googleplay" size="19" />
                        Google Play
                    </a>
                    <a
                        :href="webAppUrl"
                        class="btn"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Icon name="material-symbols:open-in-new-rounded" size="19" />
                        Web app
                    </a>
                </div>
            </div>
        </section>
    </main>
</template>

<style scoped>
.hero {
    padding: clamp(3rem, 8vw, 5rem) 0 clamp(2.5rem, 6vw, 3.5rem);
}

.hero-logo {
    width: 3.5rem;
    height: 3.5rem;
    margin-bottom: 1.25rem;
    border-radius: 0.75rem;
}

.hero-lede {
    font-size: 1.05rem;
}

.hero-actions {
    margin-top: 1.5rem;
}

.hero-note {
    margin-top: 0.9rem;
}

.hero-shot {
    margin-top: clamp(2rem, 5vw, 3rem);
}

.get-actions {
    margin-top: 1.5rem;
}
</style>
