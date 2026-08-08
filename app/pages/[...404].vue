<script setup lang="ts">
useSeoMeta({
    title: "Page Not Found | Believers Sword",
    description: "The page you are looking for does not exist.",
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
