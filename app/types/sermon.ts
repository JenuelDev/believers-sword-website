// Mirrors public.sermons in
// supabase/migrations/20260810083134_create_sermons.sql.
// Hand-written rather than generated: `supabase gen types` needs an access
// token, and the anon key cannot read the schema. Keep in sync by hand.

export interface ScriptureRef {
    book: string;
    chapter?: number;
    verse_start?: number;
    verse_end?: number;
}

export type SermonStatus = "draft" | "scheduled" | "published" | "archived";
export type SermonContentFormat = "markdown" | "html" | "plain";

export interface Sermon {
    id: string;
    slug: string;
    title: string;
    subtitle: string | null;
    summary: string | null;
    content: string | null;
    content_format: SermonContentFormat;
    speaker_name: string;
    speaker_title: string | null;
    speaker_avatar_url: string | null;
    series_name: string | null;
    series_part: number | null;
    scripture_refs: ScriptureRef[];
    primary_scripture: string | null;
    topics: string[];
    language: string;
    video_url: string | null;
    audio_url: string | null;
    thumbnail_url: string | null;
    duration_seconds: number | null;
    transcript: string | null;
    status: SermonStatus;
    published_at: string | null;
    preached_at: string | null;
    featured: boolean;
    view_count: number;
    meta_title: string | null;
    meta_description: string | null;
    og_image_url: string | null;
    created_at: string;
    updated_at: string;
}

// The listing page never needs content/transcript, which are the two large
// columns. Selecting a subset keeps the payload out of the SSR hydration blob.
export type SermonCard = Pick<
    Sermon,
    | "id"
    | "slug"
    | "title"
    | "subtitle"
    | "summary"
    | "speaker_name"
    | "series_name"
    | "series_part"
    | "primary_scripture"
    | "topics"
    | "thumbnail_url"
    | "duration_seconds"
    | "published_at"
    | "preached_at"
    | "featured"
>;
