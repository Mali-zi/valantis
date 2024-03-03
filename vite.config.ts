import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import postcss from './postcss.config';

// https://vitejs.dev/config/
export default defineConfig({
  base: 'https://mali-zi.github.io/valantis/',
  plugins: [react()],
  css: {
    postcss,
  },
});
