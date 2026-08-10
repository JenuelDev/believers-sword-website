// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-22',
  devtools: { enabled: false },
  devServer: {
    port: 7788
  },
  runtimeConfig: {
    public: {
      // Publishable (anon) key — safe to ship to the browser. Baked in at build
      // time, so these must be set in the deploy environment too.
      supabaseUrl: process.env.SUPABASE_URL || '',
      supabaseKey: process.env.SUPABASE_KEY || '',
    },
  },
  modules: [
    '@nuxt/image',
    '@nuxt/icon',
    '@nuxt/scripts',
    '@nuxt/fonts',
    'nuxt-og-image',
    '@nuxtjs/sitemap',
  ],
  site: {
    url: 'https://www.believersword.com',
    name: 'Believers Sword',
  },
  sitemap: {
    strictNuxtContentPaths: true,
  },
  ogImage: {
    zeroRuntime: true,
  },
  nitro: {
    // Vercel's function tracer can omit Unhead's subpath files when pnpm is
    // used. Bundle Unhead into Nitro so the function has no runtime import
    // from node_modules/unhead/dist.
    externals: {
      inline: ['unhead'],
    },
  },
  css: [
    '@/assets/styles/main.scss'
  ],
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      ],
      meta: [
        { name: 'theme-color', content: '#4A3AFF' },
        { property: 'og:site_name', content: 'Believers Sword' },
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'en_US' },
        { name: 'twitter:card', content: 'summary_large_image' },
      ],
    },
  },
})
