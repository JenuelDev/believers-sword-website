<script setup lang="ts">
useSeoMeta({
    title: "Page Not Found | Believers Sword",
    description: "The page you are looking for does not exist.",
});
</script>

<template>
    <main class="not-found-page">
        <div class="not-found-shell">
            <div class="not-found-card">
                <p class="not-found-code">404</p>
                <h1 class="not-found-title">Page not found</h1>
                <p class="not-found-copy">
                    The page you are looking for doesn't exist or has been moved.
                </p>
                <div class="not-found-actions">
                    <a href="/" class="not-found-btn">
                        Back to Home
                    </a>
                    <a href="/downloads" class="not-found-btn-secondary">
                        Downloads
                    </a>
                </div>
            </div>
        </div>
        <SiteFooter />
    </main>
</template>

<style scoped>
.not-found-page {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background:
        radial-gradient(circle at 30% 20%, rgba(244, 122, 90, 0.1), transparent 50%),
        radial-gradient(circle at 70% 80%, rgba(255, 180, 80, 0.08), transparent 50%),
        #f6f8fb;
}

.not-found-shell {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem 1rem;
}

.not-found-card {
    text-align: center;
    max-width: 480px;
}

.not-found-code {
    font-size: clamp(4rem, 10vw, 7rem);
    font-weight: 800;
    line-height: 1;
    margin: 0;
    background: linear-gradient(135deg, #f47a5a, #ffb050);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.not-found-title {
    font-size: clamp(1.5rem, 3vw, 2rem);
    font-weight: 700;
    color: #102443;
    margin: 0.5rem 0;
}

.not-found-copy {
    color: #5d6877;
    font-size: 1.05rem;
    line-height: 1.6;
    margin: 0.75rem 0 1.75rem;
}

.not-found-actions {
    display: flex;
    gap: 0.75rem;
    justify-content: center;
    flex-wrap: wrap;
}

.not-found-btn {
    display: inline-flex;
    align-items: center;
    padding: 0.65rem 1.5rem;
    border-radius: 0.5rem;
    font-weight: 600;
    font-size: 0.95rem;
    text-decoration: none;
    color: #fff;
    background: linear-gradient(135deg, #f47a5a, #ffb050);
    transition: opacity 0.2s;
}

.not-found-btn:hover {
    opacity: 0.88;
}

.not-found-btn-secondary {
    display: inline-flex;
    align-items: center;
    padding: 0.65rem 1.5rem;
    border-radius: 0.5rem;
    font-weight: 600;
    font-size: 0.95rem;
    text-decoration: none;
    color: #102443;
    background: rgba(16, 36, 67, 0.06);
    transition: background 0.2s;
}

.not-found-btn-secondary:hover {
    background: rgba(16, 36, 67, 0.12);
}
</style>
