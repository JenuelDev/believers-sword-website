// Shared connection handling for the scripts in this folder.

import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import pg from "pg";

const readEnvFile = (name) => {
    const path = resolve(process.cwd(), ".env.local");

    if (!existsSync(path)) {
        return undefined;
    }

    for (const line of readFileSync(path, "utf8").split(/\r?\n/)) {
        const match = /^\s*([A-Z0-9_]+)\s*=\s*(.*)$/.exec(line);

        if (match && match[1] === name) {
            return match[2].trim().replace(/^["']|["']$/g, "");
        }
    }

    return undefined;
};

export const resolveConnectionString = () => {
    const value = process.env.DATABASE_URL || readEnvFile("DATABASE_URL");

    if (!value) {
        throw new Error(
            "DATABASE_URL is not set.\n" +
                "Supabase dashboard -> Connect -> Shared Pooler -> Session mode (port 5432).\n" +
                "Put it in .env.local as DATABASE_URL=... or export it in your shell."
        );
    }

    let host;

    try {
        host = new URL(value).hostname;
    } catch {
        throw new Error("DATABASE_URL is not a parseable URL.");
    }

    // The direct host only answers over IPv6, which is a confusing failure to
    // diagnose from a timeout alone.
    if (/^db\..*\.supabase\.co$/.test(host)) {
        throw new Error(
            `DATABASE_URL points at the direct host (${host}), which is IPv6-only.\n` +
                "Use the Shared Pooler / Session mode string instead:\n" +
                "  postgresql://postgres.<ref>:<password>@aws-<n>-<region>.pooler.supabase.com:5432/postgres"
        );
    }

    return value;
};

export const createClient = ({ quiet = false } = {}) => {
    const connectionString = resolveConnectionString();
    const caPath = process.env.PGSSLROOTCERT;

    const ssl = caPath
        ? { ca: readFileSync(resolve(caPath), "utf8"), rejectUnauthorized: true }
        : { rejectUnauthorized: false };

    if (!caPath && !quiet) {
        console.warn(
            "note: TLS is on but the server certificate is not verified.\n" +
                "      Set PGSSLROOTCERT to Supabase's CA bundle to enable verification.\n"
        );
    }

    return new pg.Client({ connectionString, ssl, connectionTimeoutMillis: 20000 });
};
