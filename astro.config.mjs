import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  devToolbar: {
    enabled: false
  },
  site: 'https://jainkrishnadebug.github.io',
  base: '/Portfolio'
});
