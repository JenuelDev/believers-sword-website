// Exercises the live trigger without keeping any test writes.
import assert from "node:assert/strict";
import { createClient } from "./lib/db.mjs";

const client = createClient({ quiet: true });

try {
    await client.connect();
    await client.query("begin");
    const { rows: [before] } = await client.query(
        "select slug, updated_at, view_count from public.sermons where status = 'published' order by slug limit 1 for update"
    );
    assert.ok(before, "A published sermon is required for this check.");

    await client.query("select public.increment_sermon_views($1)", [before.slug]);
    const { rows: [viewed] } = await client.query(
        "select updated_at, view_count from public.sermons where slug = $1", [before.slug]
    );
    assert.equal(BigInt(viewed.view_count), BigInt(before.view_count) + 1n);
    assert.equal(viewed.updated_at.toISOString(), before.updated_at.toISOString());

    const { rows: [edited] } = await client.query(
        "update public.sermons set featured = not featured where slug = $1 returning updated_at", [before.slug]
    );
    assert.notEqual(edited.updated_at.toISOString(), before.updated_at.toISOString());
    console.log("Passed: views preserve the date; editorial changes update it. All test writes rolled back.");
} finally {
    try {
        await client.query("rollback");
    } finally {
        await client.end();
    }
}
