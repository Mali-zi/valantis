import tailwindConfig from './tailwind.config.js';
import autoprefixer from 'autoprefixer';
import tailwind from 'tailwindcss';

const postcss = {
  plugins: [tailwind(tailwindConfig), autoprefixer],
};

export default postcss;
