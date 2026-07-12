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
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        logo: ['Montserrat', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Escala fluida (clamp) — títulos de destaque (Hero)
        display: ['clamp(2.25rem, 1.35rem + 4.5vw, 4.75rem)', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        // Escala fluida — títulos de página (ex: Políticas)
        'heading-lg': ['clamp(1.875rem, 1.4rem + 2.4vw, 3rem)', { lineHeight: '1.2' }],
        // Escala fluida — títulos de secção (About, Catalog, Faq, Contact, HowToBuy, VideoSection)
        heading: ['clamp(1.5rem, 1.2rem + 1.5vw, 2.25rem)', { lineHeight: '1.25' }],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
