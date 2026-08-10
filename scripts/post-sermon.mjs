// Post sermon source files to public.sermons.
//
//   pnpm sermon:post content/sermons/*.md          insert new sermons
//   pnpm sermon:post --dry-run <file>              parse + validate, no database
//   pnpm sermon:post --update <file>               overwrite an existing slug
//   pnpm sermon:post --draft <file>                force status=draft
//
// Values are sent as bound parameters, so sermon prose never has to be escaped
// for SQL. That is the main reason to use this rather than hand-writing INSERT
// statements: an apostrophe in "God's" cannot break anything here.
//
// Needs DATABASE_URL (see scripts/lib/db.mjs) unless --dry-run.

import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { createClient } from "./lib/db.mjs";
import { parseSermonSource } from "./lib/sermon-source.mjs";

const argv = process.argv.slice(2);
const flags = new Set(argv.filter((a) => a.startsWith("--")));
const files = argv.filter((a) => !a.startsWith("--"));

const DRY_RUN = flags.has("--dry-run");
const UPDATE = flags.has("--update");
const DRAFT = flags.has("--draft");

if (files.length === 0) {
    console.error(
        "usage: pnpm sermon:post <file.md> [more.md ...]\n" +
            "       pnpm sermon:post --dry-run <file.md>   parse and validate only\n" +
            "       pnpm sermon:post --update <file.md>    overwrite an existing slug\n" +
            "       pnpm sermon:post --draft <file.md>     force status=draft"
    );
    process.exit(1);
}

// Parse everything before touching the database so a malformed file cannot
// leave a half-posted batch behind.
const sermons = [];

for (const file of files) {
    const path = resolve(process.cwd(), file);

    if (!existsSync(path)) {
        console.error(`no such file: ${file}`);
        process.exit(1);
    }

    try {
        const sermon = parseSermonSource(readFileSync(path, "utf8"), { file });

        if (DRAFT) {
            sermon.status = "draft";
        }

        // The table's CHECK constraint requires a date for these two states.
        // Setting it here keeps that failure out of the database round trip.
        if (sermon.status === "published" || sermon.status === "scheduled") {
            sermon.published_at = "now";
        } else {
            sermon.published_at = null;
        }

        sermons.push({ file, sermon });
    } catch (error) {
        console.error(`parse error: ${error.message}`);
        process.exit(1);
    }
}

const describe = ({ file, sermon }) => {
    const words = sermon.content.split(/\s+/).filter(Boolean).length;
    const refs = sermon.scripture_refs
        .map((r) =>
            r.chapter
                ? `${r.book} ${r.chapter}${r.verse_start ? `:${r.verse_start}${r.verse_end && r.verse_end !== r.verse_start ? `-${r.verse_end}` : ""}` : ""}`
                : r.book
        )
        .join("; ");

    console.log(`  ${file}`);
    console.log(`    slug      ${sermon.slug}`);
    console.log(`    title     ${sermon.title}`);
    console.log(`    status    ${sermon.status}${sermon.featured ? " (featured)" : ""}`);
    console.log(
        `    series    ${sermon.series_name ? `${sermon.series_name} part ${sermon.series_part}` : "(standalone)"}`
    );
    console.log(`    scripture ${sermon.primary_scripture || "(none)"}`);
    console.log(`    refs      ${refs || "(none)"}`);
    console.log(`    topics    ${sermon.topics.join(", ") || "(none)"}`);
    console.log(`    speaker   ${sermon.speaker_name}`);
    console.log(`    body      ${words} words, ${sermon.content.split(/\n{2,}/).length} blocks, ${sermon.content_format}`);
};

console.log(`parsed ${sermons.length} sermon${sermons.length === 1 ? "" : "s"}:\n`);
sermons.forEach(describe);

if (DRY_RUN) {
    console.log("\ndry run — nothing was written");
    process.exit(0);
}

const COLUMNS = [
    "slug",
    "title",
    "subtitle",
    "summary",
    "content",
    "content_format",
    "speaker_name",
    "speaker_title",
    "speaker_avatar_url",
    "series_name",
    "series_part",
    "scripture_refs",
    "primary_scripture",
    "topics",
    "language",
    "video_url",
    "audio_url",
    "thumbnail_url",
    "duration_seconds",
    "preached_at",
    "status",
    "featured",
    "meta_title",
    "meta_description",
    "og_image_url",
];

let client;

try {
    client = createClient();
    await client.connect();

    const { rows: who } = await client.query("select current_database() as db");
    console.log(`\nconnected: ${who[0].db}`);

    await client.query("begin");

    for (const { file, sermon } of sermons) {
        const values = COLUMNS.map((col) => {
            if (col === "scripture_refs") {
                return JSON.stringify(sermon.scripture_refs);
            }

            return sermon[col];
        });

        const placeholders = COLUMNS.map((col, i) => {
            // scripture_refs is jsonb; published_at is set from now() below.
            if (col === "scripture_refs") {
                return `$${i + 1}::jsonb`;
            }

            return `$${i + 1}`;
        });

        const publishedAt = sermon.published_at === "now" ? "now()" : "null";

        const conflict = UPDATE
            ? `do update set ${COLUMNS.filter((c) => c !== "slug")
                  .map((c) => `${c} = excluded.${c}`)
                  .join(", ")}, published_at = excluded.published_at`
            : "do nothing";

        const { rowCount } = await client.query(
            `insert into public.sermons (${COLUMNS.join(", ")}, published_at)
             values (${placeholders.join(", ")}, ${publishedAt})
             on conflict (slug) ${conflict}`,
            values
        );

        if (rowCount === 0) {
            throw new Error(
                `${file}: slug "${sermon.slug}" already exists and --update was not given.\n` +
                    "  Re-run with --update to overwrite it."
            );
        }

        console.log(`  ok  ${sermon.slug} -> ${UPDATE ? "upserted" : "inserted"}`);
    }

    await client.query("commit");
    console.log(`\ncommitted ${sermons.length} sermon${sermons.length === 1 ? "" : "s"}`);
} catch (error) {
    if (client) {
        try {
            await client.query("rollback");
        } catch {
            // Connection may already be gone; the transaction dies with it.
        }
    }

    console.error(`\nFAILED: ${error.message}`);
    console.error("rolled back — nothing was written");
    process.exitCode = 1;
} finally {
    if (client) {
        await client.end();
    }
}
