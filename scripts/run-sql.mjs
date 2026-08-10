// Run .sql files against the Supabase database, once each.
//
//   pnpm db:sql supabase/content/*.sql       apply anything not yet applied
//   pnpm db:sql --status                     show what has been applied
//   pnpm db:sql --force <file>               re-apply a file already recorded
//   pnpm db:sql --allow-changed <file>       apply a file whose contents changed
//
// Every applied file is recorded in migrations.applied_files, in the SAME
// transaction as the file itself. That is the part that matters: the record and
// the change either both land or neither does, so the ledger cannot claim a file
// ran when it did not. A plain log file on disk can drift from the database
// (wrong machine, restored backup, someone using the SQL editor); the table
// cannot. migration.log is written too, but it is a human-readable convenience,
// not the source of truth.
//
// The ledger lives in a `migrations` schema rather than `public` on purpose:
// PostgREST only exposes `public`, so this keeps the table off your REST API.
//
// Needs DATABASE_URL. Supabase dashboard -> Connect button -> Shared Pooler,
// Session mode (port 5432). The direct db.<ref>.supabase.co host is IPv6-only.
//   - in .env.local as DATABASE_URL=postgresql://...   (gitignored)
//   - or in your shell, so it never lands in a file:
//       $env:DATABASE_URL="postgresql://..."; pnpm db:sql <files>

import { readFileSync, existsSync, appendFileSync } from "node:fs";
import { resolve, relative } from "node:path";
import { createHash } from "node:crypto";
import { createClient } from "./lib/db.mjs";

const argv = process.argv.slice(2);
const flags = new Set(argv.filter((a) => a.startsWith("--")));
const files = argv.filter((a) => !a.startsWith("--"));

const STATUS = flags.has("--status");
const FORCE = flags.has("--force");
const ALLOW_CHANGED = flags.has("--allow-changed");
// For files already applied out of band (e.g. pasted into the SQL editor before
// this runner existed). Records them as applied WITHOUT executing them, so a
// later bulk run does not try to re-create objects that already exist.
const RECORD_ONLY = flags.has("--record-only");

const LOG_PATH = resolve(process.cwd(), "migration.log");

if (!STATUS && files.length === 0) {
    console.error(
        "usage: pnpm db:sql <file.sql> [more.sql ...]\n" +
            "       pnpm db:sql --status                 list applied files\n" +
            "       pnpm db:sql --force <file.sql>       re-apply a recorded file\n" +
            "       pnpm db:sql --allow-changed <file>   apply despite a changed checksum\n" +
            "       pnpm db:sql --record-only <file>     mark as applied WITHOUT running it"
    );
    process.exit(1);
}

// Read and hash everything before connecting, so a bad path or unreadable file
// fails without touching the database.
const payloads = files.map((file) => {
    const path = resolve(process.cwd(), file);

    if (!existsSync(path)) {
        console.error(`no such file: ${file}`);
        process.exit(1);
    }

    const sql = readFileSync(path, "utf8");

    return {
        // Store a repo-relative, forward-slashed key so the ledger matches
        // regardless of platform or where the command was run from.
        key: relative(process.cwd(), path).split("\\").join("/"),
        file,
        sql,
        sha256: createHash("sha256").update(sql).digest("hex"),
    };
});

const TRACKING_DDL = `
create schema if not exists migrations;
create table if not exists migrations.applied_files (
    filename text primary key,
    sha256 text not null,
    applied_at timestamptz not null default now(),
    statements integer
);
`;

let client;

try {
    client = createClient();
} catch (error) {
    console.error(error.message);
    process.exit(1);
}

const logLines = [];
const stamp = new Date().toISOString();

let applied = 0;
let skipped = 0;

try {
    await client.connect();

    const { rows: who } = await client.query(
        "select current_database() as db, current_user as usr"
    );
    console.log(`connected: ${who[0].db} as ${who[0].usr}\n`);

    if (STATUS) {
        await client.query(TRACKING_DDL);
        const { rows } = await client.query(
            "select filename, sha256, applied_at, statements from migrations.applied_files order by applied_at"
        );

        if (rows.length === 0) {
            console.log("nothing applied yet");
        } else {
            for (const r of rows) {
                const when = r.applied_at.toISOString().replace("T", " ").slice(0, 19);
                console.log(`  ${when}  ${r.sha256.slice(0, 12)}  ${r.filename}`);
            }
            console.log(`\n${rows.length} file${rows.length === 1 ? "" : "s"} applied`);
        }

        await client.end();
        process.exit(0);
    }

    await client.query("begin");
    await client.query(TRACKING_DDL);

    const { rows: prior } = await client.query(
        "select filename, sha256 from migrations.applied_files"
    );
    const seen = new Map(prior.map((r) => [r.filename, r.sha256]));

    for (const { key, file, sql, sha256 } of payloads) {
        const previous = seen.get(key);

        if (previous && !FORCE) {
            if (previous !== sha256 && !ALLOW_CHANGED) {
                throw new Error(
                    `${file} was already applied, but its contents have changed since.\n` +
                        `  recorded sha256: ${previous}\n` +
                        `  current  sha256: ${sha256}\n` +
                        "  Re-run with --allow-changed to apply it anyway, or --force to re-apply."
                );
            }

            if (previous === sha256) {
                console.log(`  skip ${file} (already applied)`);
                logLines.push(`${stamp}  skip     ${key}  sha256=${sha256}`);
                skipped++;
                continue;
            }
        }

        let results = [];
        let summary = "recorded only, not executed";

        if (!RECORD_ONLY) {
            const result = await client.query(sql);
            results = Array.isArray(result) ? result : [result];
            summary = results
                .map((r) => `${r.command ?? "OK"}${r.rowCount == null ? "" : ` ${r.rowCount}`}`)
                .join(", ");
        }

        await client.query(
            `insert into migrations.applied_files (filename, sha256, applied_at, statements)
             values ($1, $2, now(), $3)
             on conflict (filename) do update
                set sha256 = excluded.sha256,
                    applied_at = excluded.applied_at,
                    statements = excluded.statements`,
            [key, sha256, RECORD_ONLY ? null : results.length]
        );

        const verb = RECORD_ONLY
            ? "recorded"
            : previous
              ? FORCE
                  ? "re-applied"
                  : "updated"
              : "applied";
        console.log(`  ${RECORD_ONLY ? "rec " : "ok  "} ${file} -> ${summary}`);
        logLines.push(`${stamp}  ${verb.padEnd(9)}${key}  sha256=${sha256}  ${summary}`);
        applied++;
    }

    await client.query("commit");
    console.log(
        `\ncommitted — ${applied} applied, ${skipped} skipped` +
            (applied ? ` (recorded in migrations.applied_files)` : "")
    );
} catch (error) {
    try {
        await client.query("rollback");
    } catch {
        // Connection may already be gone; the transaction dies with it either way.
    }

    console.error(`\nFAILED after ${applied} applied, ${skipped} skipped`);
    console.error(`  ${error.message}`);

    if (error.position) {
        console.error(`  at character position ${error.position}`);
    }

    console.error("\nrolled back — no changes were applied, nothing was recorded");
    // Only the failure goes to the log: no file was applied, so claiming
    // otherwise would make the log disagree with the database.
    logLines.length = 0;
    logLines.push(`${stamp}  FAILED    ${error.message.split("\n")[0]}`);
    process.exitCode = 1;
} finally {
    await client.end();

    if (logLines.length) {
        appendFileSync(LOG_PATH, logLines.join("\n") + "\n", "utf8");
        console.log(`log: ${relative(process.cwd(), LOG_PATH)}`);
    }
}
