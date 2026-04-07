<script setup lang="ts">
useSeoMeta({
    title: "Delete Account | Believers Sword",
    description:
        "Instructions for deleting your Believers Sword account on desktop and mobile.",
});
</script>

<template>
    <main class="min-h-screen overflow-hidden bg-[#fff8ef] text-[#3a2213]">
        <div
            class="pointer-events-none absolute -left-32 top-0 h-80 w-80 rounded-full bg-[#ffb86c]/25 blur-3xl"
        ></div>
        <div
            class="pointer-events-none absolute right-0 top-56 h-96 w-96 rounded-full bg-[#ff8a4c]/15 blur-3xl"
        ></div>

        <section class="relative px-6 pb-10 pt-16 sm:pt-20">
            <div class="mx-auto w-full max-w-5xl">
                <p
                    class="mb-4 inline-flex items-center rounded-full border border-[#f7c99c] bg-white/75 px-4 py-1 text-sm font-semibold text-[#b86129]"
                    style="font-family: 'Sora', sans-serif"
                >
                    Account Help
                </p>

                <h1
                    class="max-w-3xl text-4xl leading-tight sm:text-5xl"
                    style="font-family: 'Space Grotesk', sans-serif"
                >
                    How to delete your account
                </h1>

                <p
                    class="mt-5 max-w-2xl text-base leading-relaxed text-[#6b4430] sm:text-lg"
                    style="font-family: 'Sora', sans-serif"
                >
                    Follow the steps below to find the account deletion option inside the
                    Believers Sword app.
                </p>
            </div>
        </section>

        <section class="relative px-6 pb-20">
            <div class="mx-auto grid w-full max-w-5xl gap-6 lg:grid-cols-2">
                <article
                    class="rounded-3xl border border-[#f1cfb0] bg-white/85 p-8 shadow-xl shadow-[#efb37d]/12"
                >
                    <div class="mb-6 flex items-center gap-3">
                        <div
                            class="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fff0df] text-[#bf5d24]"
                        >
                            <Icon name="material-symbols:laptop-windows-outline-rounded" size="28" />
                        </div>
                        <div>
                            <h2
                                class="text-2xl font-semibold"
                                style="font-family: 'Space Grotesk', sans-serif"
                            >
                                Desktop Application
                            </h2>
                            <p class="text-sm text-[#7b5642]" style="font-family: 'Sora', sans-serif">
                                For the Windows desktop app
                            </p>
                        </div>
                    </div>

                    <ol
                        class="space-y-4 text-base leading-relaxed text-[#5e3a28]"
                        style="font-family: 'Sora', sans-serif"
                    >
                        <li class="flex gap-4">
                            <span
                                class="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#cc5f24] text-sm font-semibold text-white"
                            >
                                1
                            </span>
                            <span>
                                Go to the profile account page in the top right corner of the app. If
                                you are not logged in yet, log in first.
                            </span>
                        </li>
                        <li class="flex gap-4">
                            <span
                                class="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#cc5f24] text-sm font-semibold text-white"
                            >
                                2
                            </span>
                            <span>
                                In the <strong>Danger Zone</strong> area, select
                                <strong>Delete Account</strong>.
                            </span>
                        </li>
                    </ol>
                </article>

                <article
                    class="rounded-3xl border border-[#f1cfb0] bg-white/85 p-8 shadow-xl shadow-[#efb37d]/12"
                >
                    <div class="mb-6 flex items-center gap-3">
                        <div
                            class="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fff0df] text-[#bf5d24]"
                        >
                            <Icon name="ic:baseline-phone-android" size="28" />
                        </div>
                        <div>
                            <h2
                                class="text-2xl font-semibold"
                                style="font-family: 'Space Grotesk', sans-serif"
                            >
                                Mobile
                            </h2>
                            <p class="text-sm text-[#7b5642]" style="font-family: 'Sora', sans-serif">
                                For the mobile app experience
                            </p>
                        </div>
                    </div>

                    <ol
                        class="space-y-4 text-base leading-relaxed text-[#5e3a28]"
                        style="font-family: 'Sora', sans-serif"
                    >
                        <li class="flex gap-4">
                            <span
                                class="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#cc5f24] text-sm font-semibold text-white"
                            >
                                1
                            </span>
                            <span>If you are not logged in, log in first.</span>
                        </li>
                        <li class="flex gap-4">
                            <span
                                class="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#cc5f24] text-sm font-semibold text-white"
                            >
                                2
                            </span>
                            <span>Open the menu drawer.</span>
                        </li>
                        <li class="flex gap-4">
                            <span
                                class="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#cc5f24] text-sm font-semibold text-white"
                            >
                                3
                            </span>
                            <span>Select <strong>Account</strong>.</span>
                        </li>
                        <li class="flex gap-4">
                            <span
                                class="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#cc5f24] text-sm font-semibold text-white"
                            >
                                4
                            </span>
                            <span>
                                Scroll down to the <strong>Danger Zone</strong> area and select
                                <strong>Delete Account</strong>.
                            </span>
                        </li>
                    </ol>
                </article>
            </div>
        </section>
    </main>

    <SiteFooter />
</template>
