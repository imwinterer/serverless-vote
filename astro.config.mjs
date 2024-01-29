import { defineConfig } from 'astro/config';
import vpg from "vite-plugin-glsl";

// https://astro.build/config
export default defineConfig({
  site: 'https://imwinterer.github.io',
  base: '/serverless-vote',
  trailingSlash: 'always',
  server: {
    host: true,
  },
  vite: {
    plugins: [
      vpg(),
    ],
    build: {
      assetsInlineLimit: 0,
      // cssCodeSplit: false,
    },
  },

});
