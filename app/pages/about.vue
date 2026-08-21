<script setup lang="ts">
// The story is deliberately thin on claims: only what actually happened, in the
// years it happened. No install counts, no awards: a page about a side project
// is the easiest place to overstate one, and the JSON-LD below asserts nothing
// the reader cannot see on the page.
//
// The "free to use" section is worded to match /refund-policy and
// /terms-and-condition, which document a free tier alongside paid "Sync" and
// "Pro" subscriptions. An unqualified "no paywall, ever" here would contradict
// both of those pages.
const milestones = [
    {
        year: "2019",
        title: "A simple desktop app",
        copy: "I built it as a portfolio piece: a desktop app for reading and studying the Bible. That was the whole of it at the time.",
    },
    {
        year: "2025",
        title: "The web and mobile apps",
        copy: "Six years in, the desktop build stopped being the only way in. I started the web app and the Android app so the same reader and the same study tools would follow you off the desk.",
    },
    {
        year: "Today",
        title: "Still being built",
        copy: "Desktop, web, and Android, and still a work in progress. I keep adding to it and fixing it as I go.",
    },
];

const creatorUrl = "https://jenuel.dev";
const githubUrl = "https://github.com/JenuelDev/Believers-Sword";
const webAppUrl = "https://app.believersword.com";

const { siteUrl } = useSeo({
    title: "About Believers Sword | Why I Build a Free Bible App",
    description:
        "Why Believers Sword exists: to put Scripture on the phones and PCs people already carry. The story since 2019, and why the app stays free to use.",
    ogTitle: "About Believers Sword",
    ogDescription:
        "Putting Scripture on the devices people already carry. A Bible study app I started in 2019 and kept building because people were using it.",
});

useJsonLd(() => ({
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${siteUrl}/about`,
    name: "About Believers Sword",
    description:
        "Why Believers Sword exists and who builds it: a Bible study app started in 2019 as a simple desktop reader, now on desktop, the web, and Android, and free to use.",
    isPartOf: { "@id": `${siteUrl}/#website` },
    about: { "@id": `${siteUrl}/#organization` },
    mainEntity: {
        "@type": "Person",
        name: "Jenuel Oras Ganawed",
        description: "Developer and maintainer of Believers Sword.",
        url: creatorUrl,
        sameAs: [creatorUrl, "https://github.com/JenuelDev"],
    },
}));

defineOgImage("BelieverSwordOg", {
    headline: "About",
    title: "Believers Sword",
    description: "Scripture on the devices people already carry. Free to use.",
});
</script>

<template>
    <main>
        <section class="page-head">
            <div class="container">
                <p class="eyebrow">About</p>
                <h1>About Believers Sword</h1>
                <p class="lede">
                    I started Believers Sword in 2019 as a simple desktop app for reading
                    and studying the Bible. I kept building it because I found out people
                    were using it, and it is free to use.
                </p>

                <div class="btn-row head-actions">
                    <a
                        :href="webAppUrl"
                        class="btn btn--primary"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Icon name="material-symbols:open-in-new-rounded" size="19" />
                        Try the app in your browser
                    </a>
                    <a href="/downloads" class="btn">
                        <Icon name="material-symbols:download-rounded" size="19" />
                        Download
                    </a>
                </div>
                <p class="note head-note">
                    No install needed to try it. The web app opens in a tab.
                </p>
            </div>
        </section>

        <section class="section">
            <div class="container">
                <h2>The mission</h2>
                <p class="mission">
                    Put Scripture on the devices people already carry, so the Word of God
                    stays part of an ordinary day.
                </p>
                <div class="copy">
                    <p>
                        A phone and a PC are where most of us spend our hours. If the Bible is
                        on them, a tap away and working offline, it stays within reach
                        instead of becoming something you keep meaning to get back to.
                    </p>
                    <p>
                        That is what I am building toward: not another app to collect, but the
                        Gospel close at hand on the screens already in front of people.
                    </p>
                </div>
            </div>
        </section>

        <section class="section section--edge">
            <div class="container">
                <h2>How it started</h2>
                <ol class="timeline">
                    <li
                        v-for="milestone in milestones"
                        :key="milestone.year"
                        class="timeline-item"
                    >
                        <p class="timeline-year">{{ milestone.year }}</p>
                        <div class="timeline-body">
                            <h3>{{ milestone.title }}</h3>
                            <p>{{ milestone.copy }}</p>
                        </div>
                    </li>
                </ol>
            </div>
        </section>

        <section class="section section--edge">
            <div class="container">
                <h2>Why I kept going</h2>
                <div class="copy">
                    <p>
                        It has been a long ride, and most projects this old get quietly
                        abandoned, plenty of mine included. What changed this one was
                        realising there were people actually using it.
                    </p>
                    <p>
                        Not someone reviewing my work: people opening the app to read
                        Scripture. A portfolio piece is where it began, but it stopped being
                        the point a long time ago. So I kept working on it, and I still am.
                    </p>
                </div>
            </div>
        </section>

        <section class="section section--edge">
            <div class="container">
                <h2>Free to use</h2>
                <div class="pledge">
                    <Icon class="pledge-icon" name="material-symbols:volunteer-activism-rounded" size="22" />
                    <div>
                        <p>
                            Believers Sword is free to use, and it stays that way. Reading the
                            Bible, studying it, and keeping your notes and highlights costs
                            nothing on every platform it runs on, online or offline.
                        </p>
                        <p class="note pledge-note">
                            Optional paid tiers cover extras such as cross-device sync. The
                            reading and studying is free, and there is no trial to run out.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <section class="section section--edge">
            <div class="container">
                <h2>Who builds it</h2>
                <div class="copy">
                    <p>
                        I am Jenuel Oras Ganawed, a developer. I design, build, and maintain
                        Believers Sword: the desktop app, the web app, the Android app, and
                        this site.
                    </p>
                </div>

                <div class="btn-row author-actions">
                    <a
                        :href="creatorUrl"
                        class="btn"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Icon name="material-symbols:person-rounded" size="19" />
                        jenuel.dev
                    </a>
                    <a
                        :href="githubUrl"
                        class="btn"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Icon name="simple-icons:github" size="19" />
                        GitHub
                    </a>
                </div>
            </div>
        </section>

        <section class="section section--edge">
            <div class="container">
                <h2>Start reading</h2>
                <p class="lede">
                    Free on Windows, macOS, Linux, Android, and the browser. Pick whichever
                    is nearest.
                </p>

                <div class="btn-row try-actions">
                    <a href="/downloads" class="btn btn--primary">
                        <Icon name="material-symbols:download-rounded" size="19" />
                        Download
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
                    <a href="/sermons" class="btn">
                        <Icon name="material-symbols:menu-book-rounded" size="19" />
                        Read sermons
                    </a>
                </div>
            </div>
        </section>
    </main>
</template>

<style scoped>
.head-actions {
    margin-top: 1.5rem;
}

.head-note {
    margin-top: 0.9rem;
}

/* The mission in one sentence, set larger than body copy so it reads as the
   claim the rest of the section explains. */
.mission {
    max-width: 34ch;
    margin-top: 1.25rem;
    padding-left: 1.1rem;
    border-left: 2px solid var(--brand);
    color: var(--ink);
    font-size: clamp(1.15rem, 2.6vw, 1.4rem);
    font-weight: 600;
    letter-spacing: -0.015em;
    line-height: 1.35;
    text-wrap: balance;
}

.timeline {
    margin: 1.75rem 0 0;
    padding: 0;
    list-style: none;
}

.timeline-item {
    display: grid;
    gap: 0 1.5rem;
    grid-template-columns: 4.5rem 1fr;
}

.timeline-year {
    padding-top: 0.05rem;
    color: var(--brand);
    font-size: 0.9rem;
    font-weight: 600;
}

.timeline-body {
    position: relative;
    padding-left: 1.5rem;
    padding-bottom: 1.75rem;
    border-left: 1px solid var(--line);
}

/* The last row keeps its left padding so the dot stays on the same axis, but
   the rule itself must not continue past the final entry. */
.timeline-item:last-child .timeline-body {
    padding-bottom: 0;
    border-left-color: transparent;
}

.timeline-body::before {
    content: "";
    position: absolute;
    top: 0.42rem;
    left: -0.28rem;
    width: 0.55rem;
    height: 0.55rem;
    border-radius: 999px;
    background: var(--brand);
}

.timeline-body p {
    max-width: 56ch;
    margin-top: 0.3rem;
    color: var(--muted);
    font-size: 0.92rem;
    line-height: 1.6;
}

.copy {
    display: grid;
    gap: 0.85rem;
    max-width: 56ch;
    margin-top: 1rem;
    color: var(--ink-soft);
}

.pledge {
    display: flex;
    gap: 0.85rem;
    max-width: 46rem;
    margin-top: 1.25rem;
    padding: 1.15rem 1.25rem;
    border: 1px solid var(--line);
    border-radius: var(--radius);
    background: var(--bg-soft);
    color: var(--ink-soft);
}

.pledge-icon {
    flex: 0 0 auto;
    margin-top: 0.2rem;
    color: var(--brand);
}

.pledge-note {
    margin-top: 0.6rem;
}

.author-actions,
.try-actions {
    margin-top: 1.5rem;
}

@media (max-width: 560px) {
    .timeline-item {
        gap: 0 1rem;
        grid-template-columns: 3.2rem 1fr;
    }

    .timeline-body {
        padding-left: 1.1rem;
    }
}
</style>
