import { createClient } from "@supabase/supabase-js";
import { defineNuxtPlugin, useRuntimeConfig } from "#imports";

// Created per Nuxt app instance, which means one client per request on the
// server rather than a module-level singleton shared across requests.
export default defineNuxtPlugin(() => {
    const { supabaseUrl, supabaseKey } = useRuntimeConfig().public;

    if (!supabaseUrl || !supabaseKey) {
        throw new Error(
            "Missing SUPABASE_URL or SUPABASE_KEY. Add them to .env.local (see .env.example)."
        );
    }

    return {
        provide: {
            supabase: createClient(supabaseUrl, supabaseKey),
        },
    };
});
