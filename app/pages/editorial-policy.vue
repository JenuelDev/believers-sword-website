<script setup lang="ts">
useSeo({
    title: "Editorial Policy | Believers Sword",
    description: "How Believers Sword prepares Bible reflections, uses AI assistance, identifies sources, and handles corrections. Contact the site owner with concerns.",
});
</script>

<template>
    <main>
        <section class="page-head">
            <div class="container">
                <p class="eyebrow">About our content</p>
                <h1>Editorial policy</h1>
                <p class="lede">Who is responsible for this site, how our messages are prepared, and how to ask for a correction.</p>
            </div>
        </section>
        <section class="section">
            <div class="container prose">
                <p class="note">Updated November 11, 2026</p>
                <h2>Responsibility and bylines</h2>
                <p>
                    Jenuel Oras Ganawed builds and maintains Believers Sword and this
                    website. Read the <NuxtLink to="/about">project's story</NuxtLink>
                    or contact him at <a href="mailto:me@jenuel.dev">me@jenuel.dev</a>.
                </p>
                <p>
                    Messages with the byline Believers Sword are written content
                    published by the site. That byline does not identify a named pastor
                    or imply that the message was preached at a church service.
                    A publication date is the date an article was made available on
                    this site. Recordings and preaching details are included only
                    when there is a real recording and known information to support them.
                </p>
                <h2>AI assistance and review</h2>
                <p>
                    We use AI tools to help draft and revise Bible reflections and
                    website guides. Some earlier messages were prepared through an
                    automated publishing workflow. Automatic sermon publishing is
                    currently paused while we review accuracy, repeated material,
                    attribution, and usefulness.
                </p>
                <p>
                    An editorial byline or publication date is not a claim that a
                    pastor, scholar, or independent human reviewer checked the article.
                    We do not present AI assistance as personal experience or give it
                    invented qualifications. These messages can contain mistakes;
                    compare their claims with the Bible passage and its context.
                </p>
                <h2>Scripture, interpretation, and sources</h2>
                <p>
                    Our messages are Christian reflections intended to help readers
                    understand and respond to Scripture. An explanation or application
                    is our interpretation. Read it alongside the passage, including
                    the verses before and after it.
                </p>
                <p>
                    Revised short reflections identify their quoted Bible translation
                    and link to the source passage. They use the World English Bible,
                    which its publisher makes available in the
                    <a href="https://ebible.org/engwebp/copyright.htm" target="_blank" rel="noopener noreferrer">public domain</a>.
                    Older articles may use other wording and are still being checked
                    for complete attribution. Do not assume every quotation on the
                    site comes from the same translation.
                </p>
                <p>
                    Historical details, ancient customs, and explanations of Hebrew
                    or Greek need supporting sources. If we cannot establish a detail,
                    we should remove it or identify the uncertainty. We do not invent
                    quotations, experiences, services, credentials, or statistics.
                </p>
                <h2>Revisions and corrections</h2>
                <p>
                    We revise material when a claim needs correction or an explanation
                    is unclear. Overlapping articles may be combined, with older URLs
                    redirected to the fuller message. Revisions preserve the original
                    publication date. Where available, a separate updated date records
                    the latest change.
                </p>
                <p>
                    To report an error, email <a href="mailto:me@jenuel.dev">me@jenuel.dev</a>
                    with the page URL, the sentence or quotation in question, and the
                    passage or source supporting your correction. Please also report
                    broken links or a guide that does not match your app version.
                </p>
                <h2>Advertising and support</h2>
                <p>
                    The site has an AdSense integration, currently paused during the
                    cleanup. Short reflections remain free of advertising. Supporting
                    the project does not buy a favorable interpretation or a place in
                    a message. See our <NuxtLink to="/privacy-policy#advertising">advertising privacy information</NuxtLink>
                    for data practices and advertising choices.
                </p>
                <div class="btn-row editorial-links">
                    <NuxtLink to="/sermons" class="btn">Read messages</NuxtLink>
                    <NuxtLink to="/guides" class="btn">App guides</NuxtLink>
                </div>
            </div>
        </section>
    </main>
</template>

<style scoped>
.editorial-links {
    margin-top: 1.5rem;
}
</style>
