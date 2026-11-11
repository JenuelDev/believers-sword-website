import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import {
    sermonRedirects,
    sermonRedirectForPath,
    isActiveSermonSlug,
    isSermonAdEligible,
    hasWrittenContent,
} from "../shared/sermon-policy.ts";

test("ads require an explicit enable and a written body", () => {
    const sermon = { slug: "a-complete-message", content: "A complete explanation of the passage." };
    assert.equal(isSermonAdEligible(sermon), false);
    assert.equal(isSermonAdEligible(sermon, "false"), false);
    assert.equal(isSermonAdEligible(sermon, true), true);
    assert.equal(isSermonAdEligible(sermon, "true"), true);
    assert.equal(isSermonAdEligible({ ...sermon, content: null, summary: "A summary" }, true), false);
});

test("empty markup and media without writing cannot request ads", () => {
    for (const content of ["", " ", "<p>&nbsp;</p>", "<!-- placeholder -->", "<script>alert(1)</script>", "![Image](https://example.com/image.jpg)"]) {
        assert.equal(hasWrittenContent(content), false, content);
    }
    assert.equal(hasWrittenContent("<p>A written reflection.</p>"), true);
});

test("short reflections remain ad-free when other sermon ads are enabled", () => {
    for (const slug of ["arriving-together", "out-of-the-depths", "not-from-the-hills", "he-was-asleep", "where-the-climb-starts"]) {
        assert.equal(isSermonAdEligible({ slug, content: "A useful short reflection." }, true), false);
    }
});

test("retired slugs are excluded and redirects have no loops or chains", () => {
    for (const [from, to] of Object.entries(sermonRedirects)) {
        assert.equal(isActiveSermonSlug(from), false);
        assert.equal(isActiveSermonSlug(to), true);
        assert.notEqual(from, to);
    }
    assert.equal(isActiveSermonSlug("toString"), true);
});

test("redirects cover trailing slashes without redirecting unrelated paths", () => {
    for (const [from, to] of Object.entries(sermonRedirects)) {
        assert.equal(sermonRedirectForPath(`/sermons/${from}`), `/sermons/${to}`);
        assert.equal(sermonRedirectForPath(`/sermons/${from}/`), `/sermons/${to}`);
        assert.equal(sermonRedirectForPath(`/sermons/${from}/extra`), null);
    }
    assert.equal(sermonRedirectForPath("/sermons/jesus-wept"), null);
    assert.equal(sermonRedirectForPath("/guides/read-offline"), null);
});

test("paused publishing fails before connecting to the database", () => {
    const result = spawnSync(process.execPath, ["scripts/post-sermon.mjs", "content/sermons/jesus-wept.md"], {
        cwd: new URL("..", import.meta.url), encoding: "utf8",
    });
    assert.equal(result.status, 1);
    assert.match(result.stderr, /Publishing is paused/);
    assert.doesNotMatch(result.stdout, /connected:/);
});

test("maintenance requires an explicit update", () => {
    const result = spawnSync(process.execPath, ["scripts/post-sermon.mjs", "--maintenance", "content/sermons/jesus-wept.md"], {
        cwd: new URL("..", import.meta.url), encoding: "utf8",
    });
    assert.equal(result.status, 1);
    assert.match(result.stderr, /requires --update/);
});
