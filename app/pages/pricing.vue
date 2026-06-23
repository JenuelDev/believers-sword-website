<script setup lang="ts">
useSeoMeta({
    title: "Pricing | Believers Sword",
    description:
        "Believers Sword pricing — start free, add cross-device Sync, or go Pro for AI-powered Bible study, sermon prep, and devotionals.",
});

defineOgImage("BelieverSwordOg", {
    headline: "Believers Sword",
    title: "Pricing",
    description: "Start free. Sync everywhere. Go Pro with AI study tools.",
});

const mobileAppUrl = "/mobile";
const downloadsUrl = "/downloads";

interface Plan {
    key: "free" | "sync" | "pro";
    name: string;
    price: string;
    period: string;
    tagline: string;
    featured?: boolean;
    badge?: string;
    inherits?: string;
    features: string[];
    ctaLabel: string;
    ctaHref: string;
    ctaPrimary?: boolean;
}

const plans: Plan[] = [
    {
        key: "free",
        name: "Free",
        price: "$0",
        period: "forever",
        tagline: "Everything you need to read and study the Bible — fully offline.",
        features: [
            "Offline usage — read anywhere, no connection needed",
            "Take rich-text notes on any book, chapter, or verse",
            "Highlights to color-code verses that speak to you",
            "Bookmarks to save and return to verses",
            "Prayer list to keep and organize requests",
            "Full-text Bible search",
            "Verse cross-references",
        ],
        ctaLabel: "Download free",
        ctaHref: downloadsUrl,
    },
    {
        key: "sync",
        name: "Sync",
        price: "$1.99",
        period: "/ month",
        tagline: "Your study, backed up and available across every device.",
        inherits: "Everything in Free, plus:",
        features: [
            "Cross-device sync — notes, highlights, bookmarks & prayer lists",
            "Cloud backup so you never lose your study data",
            "Web app access from any browser",
            "Continue where you left off on any device",
        ],
        ctaLabel: "Get Sync",
        ctaHref: mobileAppUrl,
    },
    {
        key: "pro",
        name: "Pro",
        price: "$5.99",
        period: "/ month",
        tagline: "Go deeper with AI-powered study, sermon prep, and devotionals.",
        featured: true,
        badge: "Best value",
        inherits: "Everything in Sync, plus AI study tools:",
        features: [
            "AI Bible Study Assistant for questions & passages",
            "Generate verse insights and interpret difficult passages",
            "Generate sermon outlines and full sermon drafts",
            "Devotional assistance — reflections & prayer points",
            "Chat with the assistant about Scripture",
        ],
        ctaLabel: "Get Pro",
        ctaHref: mobileAppUrl,
        ctaPrimary: true,
    },
];

const faqs = [
    {
        q: "Where do I subscribe?",
        a: "Subscribe inside the Believers Sword mobile app. Your subscription is tied to your account, so it unlocks the same features on the web app and desktop automatically.",
    },
    {
        q: "Does my subscription work everywhere?",
        a: "Yes. A Sync or Pro subscription bought on mobile works across mobile, desktop, and the web app — there's no need to pay again on each platform.",
    },
    {
        q: "How do the AI features work?",
        a: "AI features (insights, sermon prep, devotionals, and chat) are part of Pro. They run online and are included with a fair-use allowance that refreshes every few hours.",
    },
    {
        q: "Can I cancel anytime?",
        a: "Yes. Manage or cancel your subscription anytime from your app store account. You keep access until the end of the current billing period.",
    },
];
</script>

<template>
    <div>
        <!-- Header band -->
        <header class="pricing-hero">
            <div class="container-grid">
                <div class="site-nav">
                    <a href="/#home" class="site-brand">
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
                        <a href="/#features">Features</a>
                        <a href="/#preview">Preview</a>
                        <a href="/screenshots">Screenshots</a>
                        <a href="/mobile">Mobile</a>
                    </nav>
                    <a href="/#download" class="nav-action">Get App</a>
                </div>

                <div class="pricing-hero-copy">
                    <p class="eyebrow-pill">Pricing</p>
                    <h1 class="pricing-hero-title">Simple plans for deeper study</h1>
                    <p class="pricing-hero-sub">
                        Start free and read offline forever. Add Sync to keep every device in
                        step, or go Pro for AI-powered Bible study and sermon preparation.
                        Each tier includes everything in the one below it.
                    </p>
                </div>
            </div>
        </header>

        <!-- Plans -->
        <main class="section-frame pricing-main">
            <div class="container-grid">
                <div class="pricing-grid">
                    <article
                        v-for="plan in plans"
                        :key="plan.key"
                        class="pricing-card"
                        :class="{ 'pricing-card--featured': plan.featured }"
                    >
                        <span v-if="plan.badge" class="pricing-badge">{{ plan.badge }}</span>

                        <header class="pricing-card-head">
                            <h2 class="pricing-card-name">{{ plan.name }}</h2>
                            <p class="pricing-price">
                                <span class="pricing-price-amount">{{ plan.price }}</span>
                                <span class="pricing-price-period">{{ plan.period }}</span>
                            </p>
                            <p class="pricing-tagline">{{ plan.tagline }}</p>
                        </header>

                        <a
                            :href="plan.ctaHref"
                            :class="plan.ctaPrimary ? 'btn-primary' : 'btn-secondary'"
                            class="pricing-cta"
                        >
                            {{ plan.ctaLabel }}
                        </a>

                        <p v-if="plan.inherits" class="pricing-inherits">{{ plan.inherits }}</p>

                        <ul class="pricing-features">
                            <li v-for="feature in plan.features" :key="feature">
                                <Icon name="material-symbols:check-circle-rounded" class="pricing-check" />
                                <span>{{ feature }}</span>
                            </li>
                        </ul>
                    </article>
                </div>

                <p class="pricing-note">
                    Subscribe in the mobile app — your subscription unlocks Sync and Pro
                    features on mobile, desktop, and the web app automatically. Sync and Pro
                    require an internet connection for their online features; all Free features
                    stay fully offline.
                </p>

                <!-- FAQ -->
                <section class="pricing-faq">
                    <p class="section-kicker">Questions</p>
                    <h2 class="section-title pricing-faq-title">Good to know</h2>
                    <div class="pricing-faq-grid">
                        <div v-for="faq in faqs" :key="faq.q" class="pricing-faq-item">
                            <h3>{{ faq.q }}</h3>
                            <p>{{ faq.a }}</p>
                        </div>
                    </div>
                </section>
            </div>
        </main>

        <SiteFooter />
    </div>
</template>

<style scoped lang="scss">
.pricing-hero {
    padding: 0.9rem 0 clamp(2.6rem, 6vw, 4.5rem);
    background:
        linear-gradient(180deg, rgba(8, 10, 22, 0.92), rgba(20, 24, 42, 0.98)),
        radial-gradient(circle at 12% 18%, rgba(31, 182, 201, 0.22), transparent 38%),
        radial-gradient(circle at 88% 0%, rgba(74, 58, 255, 0.22), transparent 42%);
    color: var(--light-text);
}

.pricing-hero .site-nav {
    margin-top: 0.55rem;
}

.pricing-hero-copy {
    max-width: 50rem;
    margin: clamp(2.4rem, 6vw, 4rem) auto 0;
    text-align: center;
}

.pricing-hero-title {
    margin: 1.1rem 0 0;
    color: #f4f5ff;
    font-family: "Space Grotesk", "Avenir Next", sans-serif;
    font-size: clamp(2.4rem, 5.5vw, 4rem);
    font-weight: 700;
    line-height: 1.02;
    text-wrap: balance;
}

.pricing-hero-sub {
    max-width: 46rem;
    margin: 1.15rem auto 0;
    color: rgba(238, 240, 251, 0.82);
    font-size: clamp(1rem, 1.6vw, 1.12rem);
    line-height: 1.7;
}

.pricing-main {
    padding-top: clamp(3rem, 6vw, 4.5rem);
}

.pricing-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1rem;
    align-items: start;
}

.pricing-card {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 1.1rem;
    padding: 1.6rem 1.5rem;
    border: 1px solid var(--line);
    border-radius: var(--radius-panel);
    background: rgba(255, 255, 255, 0.86);
    box-shadow: var(--shadow-sm);
    transition: transform 200ms ease, border-color 200ms ease, box-shadow 200ms ease;
}

.pricing-card:hover {
    transform: translateY(-3px);
    border-color: var(--line-strong);
    box-shadow: var(--shadow-md);
}

.pricing-card--featured {
    border-color: rgba(159, 144, 255, 0.55);
    background:
        linear-gradient(180deg, rgba(255, 255, 255, 0.96), rgba(240, 242, 250, 0.92)),
        linear-gradient(135deg, rgba(159, 144, 255, 0.12), rgba(74, 58, 255, 0.08));
    box-shadow: var(--shadow-md);
}

.pricing-badge {
    position: absolute;
    top: -0.7rem;
    right: 1.25rem;
    display: inline-flex;
    align-items: center;
    min-height: 1.5rem;
    padding: 0 0.7rem;
    border-radius: 999px;
    background: linear-gradient(135deg, var(--gold), var(--ember));
    color: #f4f5ff;
    font-size: 0.7rem;
    font-weight: 900;
    letter-spacing: 0.06em;
    text-transform: uppercase;
}

.pricing-card-name {
    color: var(--ink);
    font-family: "Space Grotesk", "Avenir Next", sans-serif;
    font-size: 1.15rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
}

.pricing-price {
    display: flex;
    align-items: baseline;
    gap: 0.35rem;
    margin: 0.55rem 0 0;
}

.pricing-price-amount {
    color: var(--ink);
    font-family: "Space Grotesk", "Avenir Next", sans-serif;
    font-size: 2.6rem;
    font-weight: 700;
    line-height: 1;
}

.pricing-price-period {
    color: var(--ink-muted);
    font-size: 0.92rem;
    font-weight: 700;
}

.pricing-tagline {
    margin: 0.65rem 0 0;
    color: var(--ink-muted);
    font-size: 0.94rem;
    line-height: 1.6;
}

.pricing-cta {
    width: 100%;
}

.pricing-inherits {
    margin: 0;
    color: var(--ink);
    font-size: 0.86rem;
    font-weight: 800;
}

.pricing-features {
    display: grid;
    gap: 0.65rem;
    margin: 0;
    padding: 0;
    list-style: none;
}

.pricing-features li {
    display: grid;
    grid-template-columns: 1.1rem 1fr;
    gap: 0.6rem;
    color: var(--ink);
    font-size: 0.9rem;
    line-height: 1.5;
}

.pricing-check {
    margin-top: 0.15rem;
    color: var(--teal);
    font-size: 1.1rem;
}

.pricing-card--featured .pricing-check {
    color: var(--ember);
}

.pricing-note {
    max-width: 56rem;
    margin: clamp(1.8rem, 4vw, 2.6rem) auto 0;
    padding: 1rem 1.2rem;
    border: 1px solid var(--line);
    border-radius: var(--radius-panel);
    background: rgba(255, 255, 255, 0.7);
    color: var(--ink-muted);
    font-size: 0.9rem;
    line-height: 1.65;
    text-align: center;
}

.pricing-faq {
    margin-top: clamp(3.5rem, 8vw, 6rem);
}

.pricing-faq-title {
    margin-bottom: clamp(1.4rem, 3vw, 2.2rem);
    font-size: clamp(1.7rem, 3.4vw, 2.6rem);
}

.pricing-faq-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
}

.pricing-faq-item {
    padding: 1.25rem;
    border: 1px solid var(--line);
    border-radius: var(--radius-panel);
    background: rgba(255, 255, 255, 0.82);
}

.pricing-faq-item h3 {
    margin: 0 0 0.5rem;
    color: var(--ink);
    font-family: "Space Grotesk", "Avenir Next", sans-serif;
    font-size: 1.02rem;
    line-height: 1.25;
}

.pricing-faq-item p {
    margin: 0;
    color: var(--ink-muted);
    font-size: 0.92rem;
    line-height: 1.65;
}

@media (max-width: 1020px) {
    .pricing-grid {
        grid-template-columns: 1fr;
        max-width: 30rem;
        margin-inline: auto;
    }

    .pricing-card--featured {
        order: -1;
    }
}

@media (max-width: 760px) {
    .site-nav-links {
        display: none;
    }

    .pricing-faq-grid {
        grid-template-columns: 1fr;
    }
}
</style>
