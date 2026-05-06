// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-22',
  devtools: { enabled: false },
  devServer: {
    port: 7788
  },
  modules: [
    '@nuxt/image',
    '@nuxt/icon',
    '@nuxt/scripts',
    '@nuxt/fonts',
    '@unocss/nuxt',
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
  css: [
    '@/assets/styles/main.scss'
  ],
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      script: [
        {
          'data-name': 'BMC-Widget',
          'data-cfasync': 'false',
          src: 'https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js',
          'data-id': 'jenuel.dev',
          'data-description': 'Support me on Buy me a coffee!',
          'data-message': '',
          'data-color': '#26B0A1',
          'data-position': 'Right',
          'data-x_margin': '18',
          'data-y_margin': '80',
        },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      ],
      meta: [
        { name: 'theme-color', content: '#f47a5a' },
        { property: 'og:site_name', content: 'Believers Sword' },
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'en_US' },
        { name: 'twitter:card', content: 'summary_large_image' },
      ],
    },
  },
})