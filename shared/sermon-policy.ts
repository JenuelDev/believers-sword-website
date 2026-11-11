// Retired URLs keep a permanent route to the fuller article. Keep this shared
// by redirects, listings and the sitemap so retired pages cannot be rediscovered.
export const sermonRedirects = Object.freeze({
    "look-at-the-thing-that-bit-you": "the-snake-they-had-to-look-at",
    "the-angel-let-him-sleep": "the-journey-is-too-great-for-you",
    "the-whisper-was-not-the-point": "the-journey-is-too-great-for-you",
});

export const isActiveSermonSlug = (slug: string) => !Object.hasOwn(sermonRedirects, slug);

export const sermonRedirectForPath = (pathname: string) => {
    const match = /^\/sermons\/([^/]+)\/*$/.exec(pathname);
    const slug = match?.[1];

    return slug && Object.hasOwn(sermonRedirects, slug)
        ? `/sermons/${sermonRedirects[slug as keyof typeof sermonRedirects]}`
        : null;
};

// Historical updated_at values also included view-counter changes. Only show
// an editorial revision date when we have a recorded content revision for it.
export const sermonRevisionDates = Object.freeze({
    "arriving-together": "2026-11-11",
    "out-of-the-depths": "2026-11-11",
    "not-from-the-hills": "2026-11-11",
    "he-was-asleep": "2026-11-11",
    "where-the-climb-starts": "2026-11-11",
});

// These short reflections remain available to readers without advertising.
// This is an editorial choice, not a minimum word count imposed by Google.
const adFreeReflections = new Set([
    "arriving-together",
    "out-of-the-depths",
    "not-from-the-hills",
    "he-was-asleep",
    "where-the-climb-starts",
]);

export const hasWrittenContent = (content: string | null | undefined) => {
    const text = String(content ?? "")
        .replace(/<!--[\s\S]*?-->/g, " ")
        .replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, " ")
        .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
        .replace(/<[^>]*>/g, " ")
        .replace(/&(?:[a-z]+|#\d+|#x[a-f\d]+);/gi, " ");

    return /[\p{L}\p{N}]/u.test(text);
};

export const isSermonAdEligible = (
    sermon: { slug: string; content?: string | null },
    enabled: unknown = false
) =>
    (enabled === true || enabled === "true") &&
    isActiveSermonSlug(sermon.slug) &&
    !adFreeReflections.has(sermon.slug) &&
    hasWrittenContent(sermon.content);
