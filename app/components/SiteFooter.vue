<template>
    <footer class="relative overflow-hidden border-t border-[#3b2920] bg-[#160f0d] text-[#ead7c5]">
        <div
            class="pointer-events-none absolute -left-20 -top-14 h-56 w-56 rounded-full bg-[#f3bf8a]/16 blur-3xl"
        ></div>
        <div
            class="pointer-events-none absolute -bottom-20 right-0 h-72 w-72 rounded-full bg-[#cd9d76]/14 blur-3xl"
        ></div>

        <div class="relative mx-auto w-full max-w-6xl px-6 pb-8 pt-14 sm:pt-16">
            <div class="grid gap-10 border-b border-[#433026] pb-10 md:grid-cols-12">
                <section class="md:col-span-6">
                    <h3
                        class="mb-3 text-2xl font-semibold text-[#f6e5d5]"
                        style="font-family: 'Space Grotesk', sans-serif"
                    >
                        Believers Sword
                    </h3>
                    <p
                        class="max-w-md text-sm leading-relaxed text-[#ceb7a2]"
                        style="font-family: 'Sora', sans-serif"
                    >
                        A modern Bible study app built to help believers read with focus,
                        study with clarity, and grow in Christ one passage at a time.
                    </p>
                </section>

                <section class="md:col-span-3">
                    <p
                        class="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#d0b196]"
                        style="font-family: 'Sora', sans-serif"
                    >
                        Navigation
                    </p>
                    <nav class="flex flex-col gap-2 text-sm" style="font-family: 'Sora', sans-serif">
                        <a href="/#home" class="text-[#dcc5b0] transition hover:text-white">Home</a>
                        <a href="/#features" class="text-[#dcc5b0] transition hover:text-white">Features</a>
                        <a href="/#preview" class="text-[#dcc5b0] transition hover:text-white">App Preview</a>
                        <a href="/screenshots" class="text-[#dcc5b0] transition hover:text-white">
                            Screenshots
                        </a>
                        <a href="/#download" class="text-[#dcc5b0] transition hover:text-white">Download</a>
                        <a href="/delete-account" class="text-[#ffe1cb] transition hover:text-white">
                            Delete Account
                        </a>
                        <a href="/privacy-policy" class="text-[#ffe1cb] transition hover:text-white">
                            Privacy Policy
                        </a>
                    </nav>
                </section>

                <section class="md:col-span-3">
                    <p
                        class="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#d0b196]"
                        style="font-family: 'Sora', sans-serif"
                    >
                        Connect
                    </p>
                    <div class="flex flex-col gap-2 text-sm" style="font-family: 'Sora', sans-serif">
                        <a
                            href="https://github.com/Bible-Projects/believers-sword-next"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="text-[#dcc5b0] transition hover:text-white"
                        >
                            GitHub Repository
                        </a>
                        <a
                            href="https://jenuel.dev"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="text-[#dcc5b0] transition hover:text-white"
                        >
                            Creator: Jenuel.Dev
                        </a>
                    </div>
                </section>
            </div>

            <div
                class="flex flex-col gap-3 pt-6 text-xs text-[#b99f8a] sm:flex-row sm:items-center sm:justify-between"
                style="font-family: 'Sora', sans-serif"
            >
                <p>
                    Copyright {{ new Date().getFullYear() }} Believers Sword. All rights reserved.
                </p>
                <p>
                    Built with faith and code.
                </p>
            </div>
        </div>
    </footer>
</template>
