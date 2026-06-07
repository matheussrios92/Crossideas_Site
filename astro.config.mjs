import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  output: 'static',
  site: 'https://crossideas.com.br', // actualizar se o domínio final for diferente
  integrations: [tailwind()],
});
