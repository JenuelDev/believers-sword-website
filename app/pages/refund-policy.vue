<script setup lang="ts">
useSeoMeta({
    title: "Refund Policy | Believers Sword",
    description:
        "How refunds work for Believers Sword subscriptions purchased through the Apple App Store and Google Play.",
});

defineOgImage("BelieverSwordOg", {
    headline: "Believers Sword",
    title: "Refund Policy",
    description: "How refunds work for Believers Sword subscriptions.",
});
</script>

<template>
    <main class="policy-page">
        <div class="policy-shell">
            <article class="policy-card">
                <header class="policy-header">
                    <p class="policy-kicker">Believers Sword</p>
                    <h1>Refund Policy</h1>
                    <p class="policy-updated">Last updated: June 2, 2026</p>
                </header>

                <p>
                    This Refund Policy explains how refunds work for Believers Sword. It
                    should be read together with our
                    <a href="/terms-and-condition">Terms &amp; Conditions</a>.
                </p>

                <h2>Free Tier</h2>
                <p>
                    The Believers Sword Free tier is free to use and does not involve any
                    charge, so no refund is needed. You can read and study offline for as long
                    as you like without paying.
                </p>

                <h2>Subscriptions Are Billed by the App Stores</h2>
                <p>
                    Paid subscriptions ("Sync" and "Pro") are purchased and billed through the
                    app store on the platform where you subscribed — currently the
                    <strong>Apple App Store</strong> or <strong>Google Play</strong>. Because
                    these purchases are processed by the stores and not directly by us,
                    <strong>refunds are handled by the relevant app store under its own
                    refund policy.</strong> We are not able to issue store refunds directly on
                    your behalf.
                </p>

                <h2>How to Request a Refund</h2>
                <p><strong>Apple App Store</strong></p>
                <ul>
                    <li>
                        Visit
                        <a href="https://reportaproblem.apple.com" target="_blank" rel="noopener noreferrer">reportaproblem.apple.com</a>
                        and sign in with your Apple ID.
                    </li>
                    <li>Find the Believers Sword purchase and choose "Request a refund".</li>
                    <li>Follow Apple's prompts; Apple reviews and decides the request.</li>
                </ul>
                <p><strong>Google Play</strong></p>
                <ul>
                    <li>
                        Open the
                        <a href="https://play.google.com/store/account/subscriptions" target="_blank" rel="noopener noreferrer">Google Play subscriptions page</a>
                        or the Play Store app.
                    </li>
                    <li>Locate the Believers Sword subscription and request a refund.</li>
                    <li>Follow Google's prompts; Google reviews and decides the request.</li>
                </ul>

                <h2>Cancellation</h2>
                <p>
                    You can cancel a subscription at any time from your app store account
                    settings. Cancelling stops future renewals — you will continue to have
                    access to paid features until the end of the billing period you have
                    already paid for. Cancelling on its own does not automatically issue a
                    refund for the current period.
                </p>

                <h2>Your Statutory Rights</h2>
                <p>
                    Nothing in this policy limits any refund or cancellation rights you may
                    have under the consumer-protection laws that apply to you. Where such laws
                    grant you a right to a refund, that right still applies and is typically
                    exercised through the app store that processed your purchase.
                </p>

                <h2>Billing Problems</h2>
                <p>
                    If you were charged in error, charged more than once, or believe there is a
                    billing problem, please contact us and also raise the issue with the app
                    store, since the store holds the transaction and payment records.
                </p>

                <h2>Contact Us</h2>
                <p>
                    For questions about this Refund Policy or help with a subscription, contact
                    us at <a href="mailto:me@jenuel.dev">me@jenuel.dev</a>.
                </p>
            </article>
        </div>
    </main>

    <SiteFooter />
</template>

<style scoped>
.policy-page {
    --policy-bg: #f6f8fb;
    --policy-accent: #1f5ec9;
    --policy-heading: #102443;
    --policy-text: #2d3440;
    --policy-muted: #5d6877;

    position: relative;
    overflow: hidden;
    background:
        radial-gradient(circle at 0% 0%, rgba(31, 94, 201, 0.12), transparent 45%),
        radial-gradient(circle at 100% 100%, rgba(7, 148, 117, 0.14), transparent 50%),
        var(--policy-bg);
}

.policy-shell {
    width: min(100%, 980px);
    margin: 0 auto;
    padding: 2.75rem 1rem 3.25rem;
}

.policy-card {
    border: 1px solid rgba(16, 36, 67, 0.1);
    border-radius: 1rem;
    padding: clamp(1.2rem, 1.7vw + 0.8rem, 2.5rem);
    background-color: #ffffff;
    color: var(--policy-text);
    box-shadow:
        0 10px 35px rgba(11, 32, 66, 0.08),
        0 2px 8px rgba(11, 32, 66, 0.05);
}

.policy-header {
    margin-bottom: 1.4rem;
}

.policy-kicker {
    margin: 0;
    font-size: 0.78rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--policy-accent);
    font-weight: 700;
}

.policy-updated {
    margin-top: 0.4rem;
    color: var(--policy-muted);
    font-size: 0.95rem;
}

.policy-card :deep(h1),
.policy-card :deep(h2),
.policy-card :deep(h3),
.policy-card :deep(h4) {
    color: var(--policy-heading);
    line-height: 1.25;
    margin-top: 1.6rem;
    margin-bottom: 0.72rem;
    font-weight: 700;
}

.policy-card h1 {
    margin-top: 0.35rem;
    font-size: clamp(1.8rem, 1.6rem + 1.2vw, 2.55rem);
}

.policy-card h2 {
    font-size: clamp(1.28rem, 1.2rem + 0.5vw, 1.75rem);
    padding-top: 0.3rem;
    border-top: 1px solid rgba(16, 36, 67, 0.09);
}

.policy-card :deep(p),
.policy-card :deep(li) {
    line-height: 1.72;
    font-size: 1rem;
}

.policy-card p {
    margin: 0.65rem 0;
}

.policy-card ul {
    margin: 0.65rem 0 0.8rem;
    padding-left: 1.2rem;
}

.policy-card li {
    margin: 0.38rem 0;
}

.policy-card a {
    color: var(--policy-accent);
    text-decoration: underline;
    text-decoration-thickness: 1.5px;
    text-underline-offset: 2px;
    word-break: break-word;
}

.policy-card a:hover {
    color: #124ca8;
}

@media (max-width: 640px) {
    .policy-shell {
        padding: 1.5rem 0.8rem 2rem;
    }

    .policy-card {
        border-radius: 0.75rem;
    }

    .policy-card ul {
        padding-left: 1.05rem;
    }
}
</style>
