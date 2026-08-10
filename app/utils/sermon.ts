import type { ScriptureRef } from "~/types/sermon";

// Fixed locale and UTC on purpose: the server and the browser must produce the
// identical string or hydration mismatches on every sermon date.
const dateFormatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
});

export const formatSermonDate = (value: string | null): string => {
    if (!value) {
        return "";
    }

    const date = new Date(value);

    return Number.isNaN(date.getTime()) ? "" : dateFormatter.format(date);
};

export const formatSermonDuration = (seconds: number | null): string => {
    if (!seconds || seconds <= 0) {
        return "";
    }

    const totalMinutes = Math.round(seconds / 60);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    if (!hours) {
        return `${totalMinutes} min`;
    }

    return minutes ? `${hours} hr ${minutes} min` : `${hours} hr`;
};

export const formatSermonSeries = (
    name: string | null,
    part: number | null
): string => {
    if (!name) {
        return "";
    }

    return part ? `${name} · Part ${part}` : name;
};

// Fallback label when primary_scripture was left blank but scripture_refs has
// structured data.
export const formatScriptureRef = (ref: ScriptureRef): string => {
    if (!ref?.book) {
        return "";
    }

    if (!ref.chapter) {
        return ref.book;
    }

    const base = `${ref.book} ${ref.chapter}`;

    if (!ref.verse_start) {
        return base;
    }

    const verses =
        ref.verse_end && ref.verse_end !== ref.verse_start
            ? `${ref.verse_start}-${ref.verse_end}`
            : `${ref.verse_start}`;

    return `${base}:${verses}`;
};

export const sermonScriptureLabel = (
    primary: string | null,
    refs: ScriptureRef[] | null
): string => {
    if (primary) {
        return primary;
    }

    return (refs ?? []).map(formatScriptureRef).filter(Boolean).join("; ");
};

// Turns a YouTube/Vimeo watch URL into an embeddable one. Returns null for
// anything else so the caller can fall back to a native <video> element.
export const toEmbedUrl = (url: string | null): string | null => {
    if (!url) {
        return null;
    }

    let parsed: URL;

    try {
        parsed = new URL(url);
    } catch {
        return null;
    }

    const host = parsed.hostname.replace(/^www\./, "");

    if (host === "youtu.be") {
        const id = parsed.pathname.slice(1);
        return id ? `https://www.youtube-nocookie.com/embed/${id}` : null;
    }

    if (host === "youtube.com" || host === "youtube-nocookie.com") {
        if (parsed.pathname.startsWith("/embed/")) {
            return url;
        }

        const id = parsed.searchParams.get("v");
        return id ? `https://www.youtube-nocookie.com/embed/${id}` : null;
    }

    if (host === "vimeo.com") {
        const id = parsed.pathname.split("/").filter(Boolean)[0];
        return id && /^\d+$/.test(id) ? `https://player.vimeo.com/video/${id}` : null;
    }

    return null;
};

// Cheap block splitter so plain/markdown bodies render as real paragraphs
// instead of one collapsed wall of text. Not a markdown parser: inline syntax
// such as **bold** is left as written.
export const splitParagraphs = (content: string | null): string[] => {
    if (!content) {
        return [];
    }

    return content
        .split(/\n{2,}/)
        .map((block) => block.trim())
        .filter(Boolean);
};
