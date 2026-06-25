/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Dourado — destaque primário (CTAs, labels, ícones)
        accent: '#C8960C',
        'accent-dark': '#A67B08',
        // Grafite/chumbo escuro — base estrutural
        'brand-dark': '#18181B',
        'brand-mid': '#D4D4D8',
        // Fundo cinza muito claro — fundo das secções claras
        'brand-light': '#F4F4F5',
        // Vermelho — acento secundário (energia, urgência)
        secondary: '#992D26',
        'secondary-dark': '#7A2320',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        logo: ['Montserrat', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
