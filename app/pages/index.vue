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

const themePresets = [
    {
        name: "Default",
        color: "#8b7cf6",
        background: "#ffffff",
        dark: false,
        image: "/screenshots/home screen shots/Screenshot 2026-08-10 110144.png",
    },
    {
        name: "Default Dark",
        color: "#8b7cf6",
        background: "#171c29",
        dark: true,
        image: "/screenshots/home screen shots/Screenshot 2026-08-10 110155.png",
    },
    {
        name: "Clear Sky",
        color: "#2f91e5",
        background: "#edf5fa",
        dark: false,
        image: "/screenshots/home screen shots/Screenshot 2026-08-10 110218.png",
    },
    {
        name: "Coral Blush",
        color: "#ff625c",
        background: "#fff0f2",
        dark: false,
        image: "/screenshots/home screen shots/Screenshot 2026-08-10 110209.png",
    },
    {
        name: "Obsidian Mist",
        color: "#4bbd9e",
        background: "#0d1118",
        dark: true,
        image: "/screenshots/home screen shots/Screenshot 2026-08-10 110225.png",
    },
    {
        name: "Deep Ocean",
        color: "#20c5c2",
        background: "#0d2931",
        dark: true,
        image: "/screenshots/home screen shots/Screenshot 2026-08-10 110233.png",
    },
] as const;

const selectedTheme = ref<(typeof themePresets)[number]>(themePresets[1]);
const themeTransition = ref("theme-slide-next");

const selectTheme = (theme: (typeof themePresets)[number]) => {
    const currentIndex = themePresets.indexOf(selectedTheme.value);
    const nextIndex = themePresets.indexOf(theme);

    if (currentIndex === nextIndex) return;

    themeTransition.value = nextIndex > currentIndex
        ? "theme-slide-next"
        : "theme-slide-previous";
    selectedTheme.value = theme;
};

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

                <div class="theme-picker">
                    <div class="theme-picker__options" role="group" aria-label="App color presets">
                        <button
                            v-for="theme in themePresets"
                            :key="theme.name"
                            type="button"
                            class="theme-swatch"
                            :class="{ 'theme-swatch--active': selectedTheme.name === theme.name }"
                            :style="{ backgroundColor: theme.dark ? theme.background : '#ffffff' }"
                            :aria-label="`Preview ${theme.name} theme`"
                            :aria-pressed="selectedTheme.name === theme.name"
                            :title="theme.name"
                            @click="selectTheme(theme)"
                        >
                            <span
                                class="theme-swatch__color"
                                :style="{ backgroundColor: theme.color }"
                            />
                        </button>
                    </div>
                </div>

                <div class="hero-shot-frame">
                    <Transition :name="themeTransition">
                        <NuxtImg
                            :key="selectedTheme.name"
                            :src="selectedTheme.image"
                            :alt="`Believers Sword desktop Bible study view in the ${selectedTheme.name} theme`"
                            class="shot hero-shot"
                            format="webp"
                            quality="80"
                            sizes="sm:100vw md:62rem"
                            loading="eager"
                        />
                    </Transition>
                </div>
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

.theme-picker {
    display: flex;
    align-items: center;
    margin-top: 1.25rem;
}

.theme-picker__options {
    display: flex;
    gap: 0.45rem;
}

.theme-swatch {
    display: grid;
    width: 2.3rem;
    height: 2rem;
    padding: 0;
    place-items: center;
    border: 1px solid var(--line);
    border-radius: 0.55rem;
    background: var(--bg);
    cursor: pointer;
    transition: border-color 150ms ease, box-shadow 150ms ease, transform 150ms ease;
}

.theme-swatch:hover {
    transform: translateY(-1px);
    border-color: var(--ink);
}

.theme-swatch:focus-visible {
    outline: 3px solid color-mix(in srgb, var(--brand) 25%, transparent);
    outline-offset: 2px;
}

.theme-swatch--active {
    border-color: var(--brand);
    box-shadow: 0 0 0 2px color-mix(in srgb, var(--brand) 18%, transparent);
}

.theme-swatch__color {
    width: 0.75rem;
    height: 0.75rem;
    border-radius: 999px;
}

.hero-shot {
    grid-area: 1 / 1;
    width: 100%;
}

.hero-shot-frame {
    display: grid;
    overflow: hidden;
    margin-top: 1rem;
    border-radius: var(--radius);
}

.theme-slide-next-enter-active,
.theme-slide-next-leave-active,
.theme-slide-previous-enter-active,
.theme-slide-previous-leave-active {
    transition: opacity 300ms ease, transform 300ms ease;
}

.theme-slide-next-enter-from,
.theme-slide-previous-leave-to {
    opacity: 0;
    transform: translateX(4%);
}

.theme-slide-next-leave-to,
.theme-slide-previous-enter-from {
    opacity: 0;
    transform: translateX(-4%);
}

@media (prefers-reduced-motion: reduce) {
    .theme-slide-next-enter-active,
    .theme-slide-next-leave-active,
    .theme-slide-previous-enter-active,
    .theme-slide-previous-leave-active {
        transition: none;
    }
}

.get-actions {
    margin-top: 1.5rem;
}
</style>
