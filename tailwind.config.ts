import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
      animation: {
        scroll: 'scroll 20s linear infinite',
        slideUp: 'slideUp 0.35s cubic-bezier(0.4,0,0.2,1)',
      },
      colors: {
        paradox: {
          black: '#181818',
          gold: '#FFD700',
          'gold-dark': '#907900',
          gray: {
            100: '#CACACA',
            200: '#979797',
            300: '#747474',
            400: '#646464',
            500: '#424242',
            600: '#333333',
          },
        },
      },
    },
  },
  plugins: [],
};

export default config; 