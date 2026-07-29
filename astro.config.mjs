// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  trailingSlash: 'always',
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [mdx()]
});
