import test, { before, after } from "node:test";
import assert from "node:assert/strict";
import { createServer } from "node:http";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { mkdtemp, readFile, writeFile, access } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { Resvg } from "@resvg/resvg-js";

const root = new URL("../../", import.meta.url);
const base = {
    id: "00000000-0000-0000-0000-000000000001",
    title: "Grace for Today: Trusting God One Day at a Time",
    slug: "og-test-message",
    summary: "A test fixture for checking sermon social previews.",
    content: "## A written message\n\nTest content for the production rendering check.",
    content_format: "markdown",
    speaker_name: "Believers Sword",
    scripture_refs: [],
    primary_scripture: "Matthew 6:25-34",
    topics: [],
    status: "published",
    published_at: "2026-01-01T00:00:00Z",
    language: "en",
};
const fixtures = [
    base,
    { ...base, slug: "og-test-long", title: "W".repeat(180), primary_scripture: null },
    { ...base, slug: "og-test-escaped", title: "God's Mercy & Our Hope <A Reflection>", primary_scripture: null },
    { ...base, slug: "og-test-custom", og_image_url: "/og-default.png" },
    { ...base, slug: "og-test-draft", status: "draft" },
];
let mock, server, origin, tracePath;
let serverErrors = "";
let databaseRequests = 0;
const documents = new Map();

const listen = async (server) => {
    server.listen(0, "127.0.0.1");
    await once(server, "listening");
    return server.address().port;
};
const decode = (value) => value.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'");
const imageUrl = (html, key = "og:image") => {
    const tags = [...html.matchAll(/<meta\b[^>]*>/g)].map(([tag]) =>
        Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map(([, name, value]) => [name, decode(value)]))
    );
    const matches = tags.filter(tag => tag.property === key || tag.name === key);
    assert.equal(matches.length, 1, `expected one ${key}`);
    return matches[0].content;
};
const localImage = (image) => {
    const url = new URL(image);
    return `${origin}${url.pathname}${url.search}`;
};

before(async () => {
    await access(new URL(".output/server/index.mjs", root)).catch(() => {
        throw new Error("Run pnpm build before pnpm test:og.");
    });
    const temporary = await mkdtemp(join(tmpdir(), "sermon-og-"));
    tracePath = join(temporary, "renderer-imports.log");
    await writeFile(tracePath, "");
    const hookPath = join(temporary, "trace.mjs");
    await writeFile(hookPath, `
        import { registerHooks } from "node:module";
        import { appendFileSync } from "node:fs";
        registerHooks({ resolve(specifier, context, nextResolve) {
            if (specifier === "satori" || specifier === "@resvg/resvg-js") {
                appendFileSync(process.env.OG_IMPORT_TRACE, specifier + "\\n");
            }
            return nextResolve(specifier, context);
        } });
    `);
    mock = createServer((request, response) => {
        databaseRequests++;
        assert.equal(request.headers.apikey, "test-public-key");
        const url = new URL(request.url, "http://localhost");
        const slug = url.searchParams.get("slug")?.replace(/^eq\./, "");
        const rows = fixtures.filter(row => row.status === "published" && (!slug || row.slug === slug));
        response.writeHead(200, { "Content-Type": "application/json" });
        response.end(JSON.stringify(rows));
    });
    const mockPort = await listen(mock);
    const portReservation = createServer();
    const port = await listen(portReservation);
    await new Promise(resolve => portReservation.close(resolve));
    origin = `http://127.0.0.1:${port}`;
    server = spawn(process.execPath, ["--import", pathToFileURL(hookPath).href, ".output/server/index.mjs"], {
        cwd: root,
        env: {
            ...process.env,
            NITRO_PORT: String(port),
            NITRO_HOST: "127.0.0.1",
            NUXT_PUBLIC_SUPABASE_URL: `http://127.0.0.1:${mockPort}`,
            NUXT_PUBLIC_SUPABASE_KEY: "test-public-key",
            OG_IMPORT_TRACE: tracePath,
        },
        windowsHide: true,
        stdio: ["ignore", "pipe", "pipe"],
    });
    let errors = "";
    server.stderr.on("data", chunk => { errors += chunk; serverErrors += chunk; });
    await new Promise((resolve, reject) => {
        const timeout = setTimeout(() => reject(new Error(`Server startup timed out: ${errors}`)), 20000);
        server.stdout.on("data", chunk => {
            if (String(chunk).includes("Listening")) {
                clearTimeout(timeout);
                resolve();
            }
        });
        server.once("exit", code => {
            clearTimeout(timeout);
            reject(new Error(`Server exited (${code}): ${errors}`));
        });
    });
});

after(async () => {
    if (server && server.exitCode === null) {
        server.kill();
        await once(server, "exit");
    }
    if (mock) {
        mock.closeAllConnections();
        await new Promise(resolve => mock.close(resolve));
    }
});

test("page SSR registers matching social/schema URLs without loading image libraries", async () => {
    for (const path of ["/sermons", ...fixtures.filter(row => row.status === "published").map(row => `/sermons/${row.slug}`)]) {
        const response = await fetch(`${origin}${path}`);
        assert.equal(response.status, 200);
        const html = await response.text();
        documents.set(path, html);
        const image = imageUrl(html);
        assert.equal(imageUrl(html, "twitter:image"), image);
        if (path.endsWith("og-test-custom")) {
            assert.equal(new URL(image).pathname, "/og-default.png");
        } else {
            assert.ok(new URL(image).pathname.startsWith("/_og/d/"), "use the module's runtime endpoint");
            assert.ok(html.includes('property="og:image:width" content="1200"'));
            assert.ok(html.includes('property="og:image:height" content="630"'));
        }
        const article = [...html.matchAll(/application\/ld\+json[^>]*>([\s\S]*?)<\/script>/g)]
            .map(match => JSON.parse(match[1])).find(schema => schema["@type"] === "Article");
        if (article) {
            assert.deepEqual(article.image, [image]);
        }
        assert.equal(await readFile(tracePath, "utf8"), "", "SSR must not initialize Satori or Resvg");
    }
    for (const slug of ["og-test-draft", "og-test-missing"]) {
        assert.equal((await fetch(`${origin}/sermons/${slug}`)).status, 404);
    }
    const campaign = await fetch(`${origin}/sermons/og-test-message?utm_source=integration`);
    const campaignHtml = await campaign.text();
    assert.equal(campaign.status, 200);
    assert.equal(imageUrl(campaignHtml), imageUrl(campaignHtml, "twitter:image"));
    const article = [...campaignHtml.matchAll(/application\/ld\+json[^>]*>([\s\S]*?)<\/script>/g)]
        .map(match => JSON.parse(match[1])).find(schema => schema["@type"] === "Article");
    assert.deepEqual(article.image, [imageUrl(campaignHtml)]);
    assert.ok(campaignHtml.includes('rel="canonical" href="https://www.believersword.com/sermons/og-test-message"'));
});

test("module renders distinct 1200x630 PNGs with safe long-title layouts", async () => {
    let previous;
    for (const [path, html] of documents) {
        if (path.endsWith("og-test-custom")) continue;
        const response = await fetch(localImage(imageUrl(html)));
        const png = Buffer.from(await response.arrayBuffer());
        assert.equal(response.status, 200, `${png.toString().slice(0, 1200)}\n${serverErrors.slice(-5000)}`);
        assert.equal(response.headers.get("content-type"), "image/png");
        assert.equal(png.readUInt32BE(16), 1200);
        assert.equal(png.readUInt32BE(20), 630);
        if (previous) assert.notDeepEqual(png, previous);
        previous = png;
        const pixels = new Resvg(
            `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><image width="1200" height="630" href="data:image/png;base64,${png.toString("base64")}"/></svg>`,
            { font: { loadSystemFonts: false } }
        ).render().pixels;
        for (let y = 192; y < 446; y++) {
            const offset = (y * 1200 + 820) * 4;
            assert.deepEqual([...pixels.subarray(offset, offset + 4)], [250, 248, 242, 255]);
        }
    }
    const imports = await readFile(tracePath, "utf8");
    assert.ok(imports.includes("satori"));
    assert.ok(imports.includes("@resvg/resvg-js"));
    assert.doesNotMatch(serverErrors, /Failed to load font|is not declared by component|Invalid value/);
});

test("module caches PNGs for one hour and handles conditional and HEAD requests", async () => {
    const url = localImage(imageUrl(documents.get("/sermons/og-test-message")));
    const first = await fetch(url);
    assert.equal(first.status, 200, serverErrors.slice(-5000));
    const png = Buffer.from(await first.arrayBuffer());
    const databaseRequestsBefore = databaseRequests;
    const repeated = await fetch(url);
    assert.deepEqual(Buffer.from(await repeated.arrayBuffer()), png);
    assert.match(repeated.headers.get("cache-control"), /s-maxage=3600/);
    assert.equal(databaseRequests, databaseRequestsBefore);
    const conditional = await fetch(url, { headers: { "If-None-Match": repeated.headers.get("etag") } });
    assert.equal(conditional.status, 304);
    assert.equal((await conditional.arrayBuffer()).byteLength, 0);
    const head = await fetch(url, { method: "HEAD" });
    assert.equal(head.status, 200);
    assert.equal((await head.arrayBuffer()).byteLength, 0);
});
