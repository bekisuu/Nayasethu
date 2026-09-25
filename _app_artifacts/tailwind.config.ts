// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class', // enable class‑based dark mode
  theme: {
    extend: {
      colors: {
        // Primary teal‑blue gradient palette (professional, modern)
        primary: {
          50: '#e0f7f2',
          100: '#b2ebdf',
          200: '#80dfca',
          300: '#4dd3b5',
          400: '#26c9a5',
          500: '#00bf95', // main teal accent
          600: '#00a984',
          700: '#008c73',
          800: '#006f62',
          900: '#004c40',
        },
        secondary: {
          50: '#e6f2ff',
          100: '#b3d4ff',
          200: '#80b6ff',
          300: '#4d98ff',
          400: '#267eff',
          500: '#0064ff', // cyan accent used for gradients
          600: '#0059e6',
          700: '#004ecc',
          800: '#0042b3',
          900: '#002d80',
        },
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
      },
      // Add useful gradient utilities (can be used via bg-gradient-to-r etc.)
      backgroundImage: {
        'header-gradient': 'linear-gradient(to right, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};

export default config;
