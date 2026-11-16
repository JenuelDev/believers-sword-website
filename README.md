# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Sermon social previews

Sermon previews use Nuxt OG Image with a shared Vue template in
`app/components/OgImage/SermonOg.satori.vue`. Images render on request and are
cached for one hour. New published sermons do not require a site rebuild.
Curated `og_image_url` values remain in use when present.

Set a stable `NUXT_OG_IMAGE_SECRET` in the production build environment (Vercel)
so signed image URLs remain valid across deployments. When it is absent, the
module generates a different signing secret for each build. Keep this value
private and out of source control.

Run `pnpm build` followed by `pnpm test:og` to verify the production image routes,
metadata, local fonts, title wrapping, caching, and lazy renderer loading. These
integration tests use a local Supabase fixture and do not need database access.
