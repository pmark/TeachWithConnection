// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://teachwithconnection.com',
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [
    sitemap({
      filter: (page) =>
        !['/privacy/', '/disclaimer/', '/terms/', '/resources/', '/articles/', '/styleguide/'].some(
          (path) => page === `https://teachwithconnection.com${path}`
        )
    })
  ]
});
