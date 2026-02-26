import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  output: 'static', // En Astro 5, 'static' con 'prerender = false' en páginas individuales es el nuevo 'hybrid'
  adapter: vercel({
    webAnalytics: { enabled: true },
  }),
  server: {
    port: 4321,
  },
});
