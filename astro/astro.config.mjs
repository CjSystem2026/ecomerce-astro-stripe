import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  output: 'static', // En Astro 5, 'static' con 'prerender = false' en páginas individuales es el nuevo 'hybrid'
  adapter: vercel({
    webAnalytics: { enabled: true },
  }),
  image: {
    domains: ['reassuring-flower-045536ee58.strapiapp.com'],
  },
  server: {
    port: 4321,
  },
});
