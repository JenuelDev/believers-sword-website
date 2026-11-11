import { defineEventHandler, createError } from "h3";
import { useRuntimeConfig } from "#imports";
import { isActiveSermonSlug, sermonRevisionDates } from "#shared/sermon-policy";
import { studyGuides } from "../../../app/data/guides";

// @nuxtjs/sitemap cannot discover database-driven routes, so the 10 sermon pages
// were absent from sitemap.xml entirely — the listing page was indexed but
// nothing it linked to. This feeds them in, with lastmod so recrawls are targeted
// at what actually changed.
//
// Registered via `sitemap.sources` in nuxt.config.ts.

interface SermonUrlRow {
    slug: string;
    updated_at: string | null;
    published_at: string | null;
}

export default defineEventHandler(async () => {
    const { supabaseUrl, supabaseKey } = useRuntimeConfig().public;

    if (!supabaseUrl || !supabaseKey) {
        throw createError({
            statusCode: 500,
            statusMessage: "Supabase is not configured; cannot build sermon sitemap entries.",
        });
    }

    // The anon key is enough: RLS already limits this to published rows whose
    // published_at has passed, which is exactly the set that should be indexed.
    // A draft or future-dated sermon cannot leak into the sitemap.
    const rows = await $fetch<SermonUrlRow[]>(`${supabaseUrl}/rest/v1/sermons`, {
        query: {
            select: "slug,updated_at,published_at",
            order: "published_at.desc",
        },
        headers: {
            apikey: supabaseKey,
            Authorization: `Bearer ${supabaseKey}`,
        },
    });

    const sermons = rows.filter((row) => isActiveSermonSlug(row.slug)).map((row) => ({
        loc: `/sermons/${row.slug}`,
        lastmod: Object.hasOwn(sermonRevisionDates, row.slug)
            ? sermonRevisionDates[row.slug as keyof typeof sermonRevisionDates]
            : undefined,
        changefreq: "monthly",
        priority: 0.8,
    }));

    return [
        ...studyGuides.map((guide) => ({ loc: `/guides/${guide.slug}` })),
        ...sermons,
    ];
});
