// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import keystatic from '@keystatic/astro';
import react from '@astrojs/react';

import sitemap from '@astrojs/sitemap';

// Keystatic's /keystatic admin route and its API route are dev-only (local
// mode, no deployed admin) and require on-demand rendering, so they're only
// added when explicitly requested via `pnpm dev:admin`. Plain `pnpm dev` and
// `pnpm build` stay fully static with no adapter required.
const adminEnabled = process.env.KEYSTATIC_ADMIN === 'true';

// https://astro.build/config
export default defineConfig({
  site: 'https://teachwithconnection.com',
  output: adminEnabled ? 'server' : 'static',
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [
    sitemap({
      filter: (page) =>
        !['/privacy/', '/disclaimer/', '/terms/', '/resources/', '/articles/', '/styleguide/'].some(
          (path) => page === `https://teachwithconnection.com${path}`
        )
    }),
    ...(adminEnabled ? [react(), keystatic()] : [])
  ]
});
