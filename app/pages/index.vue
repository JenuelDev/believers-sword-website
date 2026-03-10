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
    "https://api.github.com/repos/Bible-Projects/believers-sword-next/releases/latest";

const { data: release } = await useFetch<GithubRelease>(latestReleaseUrl, {
    default: () => ({
        tag_name: "latest",
        assets: [],
    }),
});

const assets = computed(() => release.value?.assets ?? []);
const tagName = computed(() => release.value?.tag_name || "latest");

const installerAsset = computed(() => {
    return (
        assets.value.find((asset) => {
            const name = asset.name.toLowerCase();
            return (
                !name.includes("portable") &&
                (name.includes("setup") ||
                    name.includes("installer") ||
                    name.endsWith(".exe"))
            );
        }) || assets.value[0]
    );
});

const portableAsset = computed(() => {
    return assets.value.find((asset) => {
        const name = asset.name.toLowerCase();
        return (
            name.includes("portable") ||
            name.includes("noinstall") ||
            name.endsWith(".zip")
        );
    });
});

useSeoMeta({
    title: "Believers Sword",
    description:
        "Believers Sword is a modern app for reading and studying the Bible with clarity and focus.",
});

defineOgImageComponent("BelieverSwordOg");
</script>

<template>
    <main class="home-shell relative overflow-hidden bg-[#fff8ef] text-[#3a2213]">
        <div
            class="pointer-events-none absolute -left-40 -top-20 h-96 w-96 rounded-full bg-[#ffb86c]/30 blur-3xl"
        ></div>
        <div
            class="pointer-events-none absolute -right-28 top-64 h-96 w-96 rounded-full bg-[#ff8a4c]/20 blur-3xl"
        ></div>

        <section id="home" class="relative px-6 pb-18 pt-16 sm:pt-24">
            <div class="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-2">
                <div class="scroll-revealed">
                    <p
                        class="mb-4 inline-flex items-center rounded-full border border-[#f7c99c] bg-white/70 px-4 py-1 text-sm font-semibold text-[#b86129]"
                        style="font-family: 'Sora', sans-serif"
                    >
                        Built for focused Bible study
                    </p>

                    <h1
                        class="mb-5 text-4xl leading-tight sm:text-5xl lg:text-6xl"
                        style="font-family: 'Space Grotesk', sans-serif"
                    >
                        Believers Sword
                        <span class="block text-[#cc5f24]">Simple. Powerful. Christ-centered.</span>
                    </h1>

                    <p
                        class="mb-9 max-w-xl text-base leading-relaxed text-[#6b4430] sm:text-lg"
                        style="font-family: 'Sora', sans-serif"
                    >
                        Go deeper in God&apos;s Word with a clean reading experience, fast search,
                        highlights, and practical study tools designed for everyday discipleship.
                    </p>

                    <div class="mb-6 flex flex-wrap gap-3">
                        <a
                            v-if="installerAsset"
                            :href="installerAsset.browser_download_url"
                            class="inline-flex items-center gap-3 rounded-xl bg-[#cc5f24] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#cc5f24]/25 transition hover:-translate-y-0.5 hover:bg-[#b9531d] hover:text-white"
                            style="font-family: 'Sora', sans-serif"
                        >
                            <Icon name="ic:baseline-cloud-download" size="22" />
                            Download Installer ({{ tagName }})
                        </a>

                        <a
                            v-if="portableAsset"
                            :href="portableAsset.browser_download_url"
                            class="inline-flex items-center gap-3 rounded-xl border border-[#e6b68d] bg-white px-6 py-3 text-sm font-semibold text-[#8b471f] transition hover:-translate-y-0.5 hover:border-[#cc5f24] hover:text-[#8b471f]"
                            style="font-family: 'Sora', sans-serif"
                        >
                            <Icon name="material-symbols:app-badging" size="22" />
                            Portable Version
                        </a>
                    </div>

                    <p class="text-sm text-[#7f5a46]" style="font-family: 'Sora', sans-serif">
                        Currently available on <strong>Windows</strong>. macOS and Linux support is
                        planned.
                    </p>
                </div>

                <div class="scroll-revealed">
                    <div
                        class="relative rounded-3xl border border-[#f1c9a5] bg-white/85 p-4 shadow-2xl shadow-[#f0a66b]/20"
                    >
                        <img
                            src="@/assets/img/hero.png"
                            alt="Believers Sword app preview"
                            class="w-full rounded-2xl"
                        />
                        <div
                            class="absolute -bottom-4 -left-4 rounded-xl border border-[#f5c8a3] bg-[#fff5ea] px-3 py-2 text-xs font-semibold text-[#ad5926]"
                            style="font-family: 'Sora', sans-serif"
                        >
                            Real desktop UI preview
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="px-6 pb-6">
            <div class="mx-auto grid w-full max-w-6xl gap-4 md:grid-cols-3">
                <article class="scroll-revealed rounded-2xl border border-[#f1cfb0] bg-white/80 p-5">
                    <h3 class="mb-2 text-lg font-semibold" style="font-family: 'Space Grotesk', sans-serif">
                        Distraction-Free Reading
                    </h3>
                    <p class="text-sm text-[#714a35]" style="font-family: 'Sora', sans-serif">
                        A calm interface that keeps Scripture front and center.
                    </p>
                </article>

                <article class="scroll-revealed rounded-2xl border border-[#f1cfb0] bg-white/80 p-5">
                    <h3 class="mb-2 text-lg font-semibold" style="font-family: 'Space Grotesk', sans-serif">
                        Fast Word Lookup
                    </h3>
                    <p class="text-sm text-[#714a35]" style="font-family: 'Sora', sans-serif">
                        Quickly search verses, keywords, and references while studying.
                    </p>
                </article>

                <article class="scroll-revealed rounded-2xl border border-[#f1cfb0] bg-white/80 p-5">
                    <h3 class="mb-2 text-lg font-semibold" style="font-family: 'Space Grotesk', sans-serif">
                        Highlight and Revisit
                    </h3>
                    <p class="text-sm text-[#714a35]" style="font-family: 'Sora', sans-serif">
                        Mark meaningful passages and return to them with ease.
                    </p>
                </article>
            </div>
        </section>

        <section id="about" class="px-6 py-16 sm:py-20">
            <div class="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-2">
                <figure class="scroll-revealed">
                    <NuxtImg
                        format="webp"
                        src="https://i.imgur.com/yIajRNN.jpeg"
                        alt="Creator of Believers Sword"
                        quality="80"
                        class="w-full rounded-3xl border border-[#f1c9a5]"
                    />
                </figure>

                <div class="scroll-revealed">
                    <p
                        class="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-[#bf5d24]"
                        style="font-family: 'Sora', sans-serif"
                    >
                        Why I Built It
                    </p>
                    <h2
                        class="mb-5 text-3xl leading-tight sm:text-4xl"
                        style="font-family: 'Space Grotesk', sans-serif"
                    >
                        From portfolio experiment to personal ministry tool.
                    </h2>

                    <div class="space-y-4 text-[#6e4733]" style="font-family: 'Sora', sans-serif">
                        <p>
                            Believers Sword started as a simple portfolio project. As I kept improving
                            it with search, highlights, and dictionary support, people began using it
                            in their own study routines.
                        </p>
                        <p>
                            Today, it is something I rely on personally. I continue building it step by
                            step, praying it helps others read, understand, and love Scripture more.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <section class="px-6 pb-20">
            <div
                class="scroll-revealed mx-auto w-full max-w-6xl rounded-3xl border border-[#edbf97] bg-gradient-to-r from-[#ffe8d2] via-[#ffdcb6] to-[#ffcfa0] p-8 sm:p-10"
            >
                <div class="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h3 class="mb-2 text-2xl font-semibold" style="font-family: 'Space Grotesk', sans-serif">
                            Ready to study with more clarity?
                        </h3>
                        <p class="text-[#7a4d35]" style="font-family: 'Sora', sans-serif">
                            Download the latest release and start your next reading session.
                        </p>
                    </div>

                    <a
                        v-if="installerAsset"
                        :href="installerAsset.browser_download_url"
                        class="inline-flex items-center justify-center gap-3 rounded-xl bg-[#7f3717] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#692c12] hover:text-white"
                        style="font-family: 'Sora', sans-serif"
                    >
                        <Icon name="ic:baseline-cloud-download" size="20" />
                        Get Believers Sword {{ tagName }}
                    </a>
                </div>
            </div>
        </section>
    </main>

    <SiteFooter />

    <button
        type="button"
        class="fixed bottom-[117px] right-[20px] z-50 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#cc5f24] text-lg/none text-white opacity-100 shadow-lg shadow-[#cc5f24]/25 transition hover:-translate-y-1 hover:bg-[#b9531d] visible is-hided"
        data-web-trigger="scroll-top"
        aria-label="Scroll to top"
    >
        <i class="lni lni-chevron-up"></i>
    </button>
</template>
