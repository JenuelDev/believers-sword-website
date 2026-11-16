import { toValue, type MaybeRefOrGetter } from "vue";
import { useHead, useRoute, useSeoMeta, useSiteConfig } from "#imports";

// One call per page sets everything search engines and social scrapers need.
// The point of centralising it: `useSeoMeta({ title, description })` alone leaves
// out canonical, og:title, og:description, og:url and the twitter:* pair, and
// those omissions are invisible until a link preview comes out blank.

export interface SeoInput {
    /** Full <title>, including any " — Believers Sword" suffix. */
    title: MaybeRefOrGetter<string>;
    description: MaybeRefOrGetter<string>;
    /**
     * Social copy, when it should differ from the page title/description — a
     * <title> is written for a search results page, a share card is not. Both
     * default to the values above.
     */
    ogTitle?: MaybeRefOrGetter<string>;
    ogDescription?: MaybeRefOrGetter<string>;
    /** Absolute URL, or root-relative path. Falls back to the site default. */
    image?: MaybeRefOrGetter<string | null | undefined>;
    imageAlt?: MaybeRefOrGetter<string>;
    imageWidth?: MaybeRefOrGetter<number | undefined>;
    imageHeight?: MaybeRefOrGetter<number | undefined>;
    imageType?: MaybeRefOrGetter<string | undefined>;
    type?: "website" | "article";
    publishedTime?: MaybeRefOrGetter<string | null | undefined>;
    modifiedTime?: MaybeRefOrGetter<string | null | undefined>;
    author?: MaybeRefOrGetter<string | null | undefined>;
    /** Keep the page out of the index but still let links be followed. */
    noindex?: boolean;
}

const DEFAULT_OG_IMAGE = "/og-default.png";

export const useSeo = (input: SeoInput) => {
    const route = useRoute();
    const siteConfig = useSiteConfig();

    const siteUrl = String(siteConfig?.url || "https://www.believersword.com").replace(
        /\/+$/,
        ""
    );

    // Canonical URLs drop the query string and any trailing slash, so that
    // /sermons, /sermons/ and /sermons?utm_source=x all declare one address.
    // Without this, every campaign link reads as a separate duplicate page.
    const canonical = () => {
        const path = route.path.replace(/\/+$/, "") || "/";
        return path === "/" ? `${siteUrl}/` : `${siteUrl}${path}`;
    };

    const absolute = (value: string | null | undefined) => {
        if (!value) {
            return `${siteUrl}${DEFAULT_OG_IMAGE}`;
        }

        return /^https?:\/\//.test(value) ? value : `${siteUrl}${value.startsWith("/") ? "" : "/"}${value}`;
    };

    const title = () => toValue(input.title);
    const description = () => toValue(input.description);
    const image = () => absolute(toValue(input.image));
    const socialTitle = () => toValue(input.ogTitle) || title();
    const socialDescription = () => toValue(input.ogDescription) || description();
    const imageAlt = () => toValue(input.imageAlt) || title();

    useSeoMeta({
        title,
        description,

        // Social previews read og:*/twitter:* and ignore <title>, so these have
        // to be set explicitly even though they usually mirror the values above.
        ogTitle: socialTitle,
        ogDescription: socialDescription,
        ogUrl: canonical,
        ogImage: image,
        ogImageAlt: imageAlt,
        ogImageWidth: () => toValue(input.imageWidth),
        ogImageHeight: () => toValue(input.imageHeight),
        ogImageType: () => toValue(input.imageType),
        ogType: input.type ?? "website",

        twitterTitle: socialTitle,
        twitterDescription: socialDescription,
        twitterImage: image,
        twitterImageAlt: imageAlt,

        articlePublishedTime: () => toValue(input.publishedTime) || undefined,
        articleModifiedTime: () => toValue(input.modifiedTime) || undefined,
        articleAuthor: () => {
            const author = toValue(input.author);
            return author ? [author] : undefined;
        },

        robots: input.noindex ? "noindex, follow" : "index, follow",
    }, {
        // Explicit image URLs also feed Article schema. Keep them authoritative
        // alongside the social tags registered by nuxt-og-image.
        tagPriority: input.image ? 30 : undefined,
    });

    useHead({
        link: [{ rel: "canonical", href: canonical }],
    });

    return { canonical, siteUrl, absolute };
};

/**
 * Emits a JSON-LD block. Kept separate from useSeo because a page may need
 * several (an Article plus its BreadcrumbList, say).
 */
export const useJsonLd = (data: MaybeRefOrGetter<Record<string, unknown>>) => {
    // A literal "</script>" in database-backed content would otherwise close
    // the element early, leaving invalid schema and creating an injection risk.
    // Escaping HTML-significant characters preserves the exact JSON values
    // after parsing while keeping the script body safe.
    const serialize = () =>
        JSON.stringify(toValue(data))
            .replace(/</g, "\\u003C")
            .replace(/>/g, "\\u003E")
            .replace(/&/g, "\\u0026");

    useHead({
        script: [
            {
                type: "application/ld+json",
                // Serialised here rather than passed as an object so Unhead emits
                // it as the script body instead of as attributes.
                innerHTML: serialize,
            },
        ],
    });
};
