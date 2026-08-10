import { useAsyncData, useSupabase } from "#imports";
import type { Sermon, SermonCard } from "~/types/sermon";

const cardColumns = [
    "id",
    "slug",
    "title",
    "subtitle",
    "summary",
    "speaker_name",
    "series_name",
    "series_part",
    "primary_scripture",
    "topics",
    "thumbnail_url",
    "duration_seconds",
    "published_at",
    "preached_at",
    "featured",
].join(",");

// Note on filtering: the RLS policy on public.sermons already restricts reads to
// status='published' rows whose published_at has passed, so no status filter is
// added here. RLS is the authority; duplicating it in the query would just
// invite confusion about which one is enforcing the rule.

export const useSermonList = () => {
    const supabase = useSupabase();

    return useAsyncData<SermonCard[]>("sermons-list", async () => {
        const { data, error } = await supabase
            .from("sermons")
            .select(cardColumns)
            .order("featured", { ascending: false })
            .order("published_at", { ascending: false });

        if (error) {
            throw new Error(error.message);
        }

        return (data ?? []) as unknown as SermonCard[];
    });
};

export const useSermon = (slug: string) => {
    const supabase = useSupabase();

    return useAsyncData<Sermon | null>(`sermon-${slug}`, async () => {
        // maybeSingle() returns null instead of erroring on no match, which
        // lets the page raise a proper 404 rather than a 500.
        const { data, error } = await supabase
            .from("sermons")
            .select("*")
            .eq("slug", slug)
            .maybeSingle();

        if (error) {
            throw new Error(error.message);
        }

        return (data as Sermon | null) ?? null;
    });
};
