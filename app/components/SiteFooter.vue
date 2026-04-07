<template>
    <footer class="relative overflow-hidden border-t border-[#f0c7a2] bg-[#2d170e] text-[#ffe9d8]">
        <div
            class="pointer-events-none absolute -left-20 -top-14 h-56 w-56 rounded-full bg-[#ff9f5c]/20 blur-3xl"
        ></div>
        <div
            class="pointer-events-none absolute -bottom-20 right-0 h-72 w-72 rounded-full bg-[#ff7d4d]/20 blur-3xl"
        ></div>

        <div class="relative mx-auto w-full max-w-6xl px-6 pb-8 pt-14 sm:pt-16">
            <div class="grid gap-10 border-b border-[#563020] pb-10 md:grid-cols-12">
                <section class="md:col-span-6">
                    <h3
                        class="mb-3 text-2xl font-semibold text-white"
                        style="font-family: 'Space Grotesk', sans-serif"
                    >
                        Believers Sword
                    </h3>
                    <p
                        class="max-w-md text-sm leading-relaxed text-[#f8d5bf]"
                        style="font-family: 'Sora', sans-serif"
                    >
                        A modern Bible study app built to help believers read with focus,
                        study with clarity, and grow in Christ one passage at a time.
                    </p>
                </section>

                <section class="md:col-span-3">
                    <p
                        class="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#ffc999]"
                        style="font-family: 'Sora', sans-serif"
                    >
                        Navigation
                    </p>
                    <nav class="flex flex-col gap-2 text-sm" style="font-family: 'Sora', sans-serif">
                        <a href="/#home" class="text-[#ffe1cb] transition hover:text-white">Home</a>
                        <a href="/#about" class="text-[#ffe1cb] transition hover:text-white">About</a>
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
                        class="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#ffc999]"
                        style="font-family: 'Sora', sans-serif"
                    >
                        Connect
                    </p>
                    <div class="flex flex-col gap-2 text-sm" style="font-family: 'Sora', sans-serif">
                        <a
                            href="https://github.com/Bible-Projects/believers-sword-next"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="text-[#ffe1cb] transition hover:text-white"
                        >
                            GitHub Repository
                        </a>
                        <a
                            href="https://jenuel.dev"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="text-[#ffe1cb] transition hover:text-white"
                        >
                            Creator: Jenuel.Dev
                        </a>
                    </div>
                </section>
            </div>

            <div
                class="flex flex-col gap-3 pt-6 text-xs text-[#e7baa0] sm:flex-row sm:items-center sm:justify-between"
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
