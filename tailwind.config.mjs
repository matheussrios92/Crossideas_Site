/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Dourado — destaque primário (CTAs, labels, ícones)
        accent: '#C8960C',
        'accent-dark': '#A67B08',
        // Verde floresta profundo — base estrutural
        'brand-dark': '#1A3B1C',
        'brand-mid': '#2D6B30',
        // Fundo creme quente — harmoniza com o dourado
        'brand-light': '#F8F4EC',
        // Vermelho — acento secundário (energia, urgência)
        secondary: '#992D26',
        'secondary-dark': '#7A2320',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
