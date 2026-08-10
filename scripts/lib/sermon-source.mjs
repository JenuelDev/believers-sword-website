// Parses a sermon source file: strict key: value frontmatter, then a markdown
// body. Deliberately not YAML — the accepted forms are small and fully
// documented so a malformed file fails loudly instead of being half-understood.

const KNOWN_KEYS = new Set([
    "slug",
    "title",
    "subtitle",
    "summary",
    "series_name",
    "series_part",
    "primary_scripture",
    "scripture_refs",
    "topics",
    "status",
    "featured",
    "speaker_name",
    "speaker_title",
    "speaker_avatar_url",
    "language",
    "video_url",
    "audio_url",
    "thumbnail_url",
    "duration_seconds",
    "preached_at",
    "meta_title",
    "meta_description",
    "og_image_url",
    "content_format",
]);

const REQUIRED_KEYS = ["slug", "title", "summary"];

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const STATUSES = new Set(["draft", "scheduled", "published", "archived"]);
const FORMATS = new Set(["markdown", "html", "plain"]);

// "1 Kings 19:19-21" -> { book: "1 Kings", chapter: 19, verse_start: 19, verse_end: 21 }
// "Psalm 46"         -> { book: "Psalms", chapter: 46 }
// "Jude"             -> { book: "Jude" }
const REF_RE = /^((?:[1-3]\s+)?[A-Za-z][A-Za-z ]*?)\s+(\d+)(?::(\d+)(?:\s*[-–]\s*(\d+))?)?$/;
const BOOK_ONLY_RE = /^((?:[1-3]\s+)?[A-Za-z][A-Za-z ]*)$/;

// The existing rows use "Psalms", so normalise the common singular for
// consistent jsonb containment queries.
const normaliseBook = (book) => (/^psalm$/i.test(book) ? "Psalms" : book);

export const parseScriptureRef = (input) => {
    const text = String(input).trim();

    if (!text) {
        return null;
    }

    const m = REF_RE.exec(text);

    if (m) {
        const ref = { book: normaliseBook(m[1].trim()), chapter: Number(m[2]) };

        if (m[3]) {
            ref.verse_start = Number(m[3]);
            ref.verse_end = m[4] ? Number(m[4]) : Number(m[3]);
        }

        return ref;
    }

    const b = BOOK_ONLY_RE.exec(text);

    if (b) {
        return { book: normaliseBook(b[1].trim()) };
    }

    throw new Error(
        `could not parse scripture reference "${text}". ` +
            'Expected forms: "John 3:16", "John 3:16-17", "1 Kings 19", "Jude".'
    );
};

export const parseSermonSource = (text, { file = "<input>" } = {}) => {
    const normalised = text.replace(/^﻿/, "").replace(/\r\n/g, "\n");
    const lines = normalised.split("\n");

    if (lines[0].trim() !== "---") {
        throw new Error(`${file}: must begin with a --- frontmatter delimiter`);
    }

    const closing = lines.indexOf("---", 1);

    if (closing === -1) {
        throw new Error(`${file}: frontmatter is not closed with ---`);
    }

    const fields = {};

    for (let i = 1; i < closing; i++) {
        const line = lines[i];

        if (!line.trim() || line.trim().startsWith("#")) {
            continue;
        }

        const m = /^([a-z_]+)\s*:\s*(.*)$/.exec(line);

        if (!m) {
            throw new Error(
                `${file}: line ${i + 1} is not \`key: value\` -> ${JSON.stringify(line)}`
            );
        }

        const [, key, rawValue] = m;

        if (!KNOWN_KEYS.has(key)) {
            throw new Error(
                `${file}: unknown frontmatter key "${key}". Known keys: ${[...KNOWN_KEYS].join(", ")}`
            );
        }

        if (key in fields) {
            throw new Error(`${file}: duplicate key "${key}" on line ${i + 1}`);
        }

        fields[key] = rawValue.trim().replace(/^["']|["']$/g, "");
    }

    for (const key of REQUIRED_KEYS) {
        if (!fields[key]) {
            throw new Error(`${file}: missing required frontmatter key "${key}"`);
        }
    }

    const body = lines.slice(closing + 1).join("\n").trim();

    if (!body) {
        throw new Error(`${file}: the body (everything after the closing ---) is empty`);
    }

    if (!SLUG_RE.test(fields.slug)) {
        throw new Error(
            `${file}: slug "${fields.slug}" must be lowercase words joined by single hyphens`
        );
    }

    const status = fields.status || "published";

    if (!STATUSES.has(status)) {
        throw new Error(`${file}: status must be one of ${[...STATUSES].join(", ")}`);
    }

    const contentFormat = fields.content_format || "markdown";

    if (!FORMATS.has(contentFormat)) {
        throw new Error(`${file}: content_format must be one of ${[...FORMATS].join(", ")}`);
    }

    const int = (key) => {
        if (!fields[key]) {
            return null;
        }

        if (!/^\d+$/.test(fields[key])) {
            throw new Error(`${file}: ${key} must be a positive integer`);
        }

        return Number(fields[key]);
    };

    const bool = (key) => {
        if (!fields[key]) {
            return false;
        }

        if (!/^(true|false)$/i.test(fields[key])) {
            throw new Error(`${file}: ${key} must be true or false`);
        }

        return /^true$/i.test(fields[key]);
    };

    const list = (key, separator) =>
        fields[key]
            ? fields[key]
                  .split(separator)
                  .map((s) => s.trim())
                  .filter(Boolean)
            : [];

    const scriptureRefs = list("scripture_refs", ";").map(parseScriptureRef);

    if (fields.preached_at && !/^\d{4}-\d{2}-\d{2}$/.test(fields.preached_at)) {
        throw new Error(`${file}: preached_at must be YYYY-MM-DD`);
    }

    if (fields.series_part && !fields.series_name) {
        throw new Error(`${file}: series_part was given without series_name`);
    }

    return {
        slug: fields.slug,
        title: fields.title,
        subtitle: fields.subtitle || null,
        summary: fields.summary,
        content: body,
        content_format: contentFormat,
        speaker_name: fields.speaker_name || "Believers Sword",
        speaker_title: fields.speaker_title || null,
        speaker_avatar_url: fields.speaker_avatar_url || null,
        series_name: fields.series_name || null,
        series_part: int("series_part"),
        scripture_refs: scriptureRefs,
        primary_scripture: fields.primary_scripture || null,
        topics: list("topics", ","),
        language: fields.language || "en",
        video_url: fields.video_url || null,
        audio_url: fields.audio_url || null,
        thumbnail_url: fields.thumbnail_url || null,
        duration_seconds: int("duration_seconds"),
        // Left null unless explicitly given: it asserts that a service happened.
        preached_at: fields.preached_at || null,
        status,
        featured: bool("featured"),
        meta_title: fields.meta_title || null,
        meta_description: fields.meta_description || null,
        og_image_url: fields.og_image_url || null,
    };
};
