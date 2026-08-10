import { useNuxtApp } from "#imports";

export const useSupabase = () => useNuxtApp().$supabase;
