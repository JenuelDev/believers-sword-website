<template>
    <header class="site-header">
        <div class="container site-header-inner">
            <a href="/" class="site-header-brand">
                <NuxtImg
                    src="/apple-touch-icon.png"
                    alt=""
                    width="25"
                    height="25"
                    format="webp"
                    quality="88"
                />
                Believers Sword
            </a>
            <nav class="site-header-nav" aria-label="Primary">
                <a href="/downloads">Download</a>
                <a href="/screenshots">Screenshots</a>
                <a href="/mobile">Mobile</a>
                <a href="/sermons">Sermons</a>
                <a href="/about">About</a>
                <a
                    href="https://buymeacoffee.com/jenuel.dev"
                    class="site-header-support"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Support the project"
                    title="Support the project"
                >
                    <Icon name="material-symbols:favorite-rounded" size="17" />
                    <span>Support</span>
                </a>
            </nav>
        </div>
    </header>
</template>
