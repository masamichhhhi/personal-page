import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import { remarkLinkCard } from './src/plugins/remarkLinkCard.ts';

export default defineConfig({
  site: 'https://example.com', // Update with your domain
  integrations: [
    sitemap(),
    icon(),
  ],
  markdown: {
    remarkPlugins: [remarkLinkCard],
  },
  vite: {
    plugins: [tailwindcss()],
  },
  output: 'static',
});
