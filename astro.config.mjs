import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://ksen0.github.io',
  base: '/lgm2026',
  integrations: [mdx()],
});