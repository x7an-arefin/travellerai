import { defineConfig } from 'astro/config';
import solidJs from '@astrojs/solid-js';

// https://astro.build/config
export default defineConfig({
  site: 'https://travellerai.com',
  output: 'static',
  integrations: [solidJs()],
  build: {
    format: 'directory'
  }
});
