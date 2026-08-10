<script setup lang="ts">
// Without this the page rendered "not found" while the HTTP status said 200 — a
// soft 404, which search engines index as a real page. createError() would also
// give a true 404 but would discard this page in favour of the generic error
// screen, so set the status on the response instead and keep the design.
// There is no request event during client-side navigation, hence the guard.
const event = useRequestEvent();

if (event) {
    setResponseStatus(event, 404);
}

useSeo({
    title: "Page Not Found | Believers Sword",
    description: "The page you are looking for does not exist.",
    // Nothing to gain from indexing a 404, and it keeps stray URLs out of
    // Search Console.
    noindex: true,
});
</script>

<template>
    <main class="page-head">
        <div class="container">
            <h1>Page not found</h1>
            <p class="lede">
                This page doesn't exist or has been moved.
            </p>
            <div class="btn-row actions">
                <a href="/" class="btn btn--primary">Back to home</a>
                <a href="/downloads" class="btn">Download</a>
            </div>
        </div>
    </main>
</template>

<style scoped>
.page-head {
    padding-bottom: clamp(3rem, 8vw, 5rem);
}

.actions {
    margin-top: 1.5rem;
}
</style>
