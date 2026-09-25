/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Trustworthy Sage Teal / Slate Green Primary Accent
        primary: {
          50: '#F0FDFA',
          100: '#CCFBF1',
          200: '#99F6E4',
          300: '#5EEAD4',
          400: '#2DD4BF',
          500: '#14B8A6',
          600: '#0D9488',
          700: '#0F766E', // Primary base button / link
          800: '#115E59',
          900: '#134E4A',
          950: '#042F2E',
        },
        // Warm Stone Neutrals (Calm, paper-like, non-sterile)
        surface: {
          50: '#FAF9F6', // Off-white warm canvas
          100: '#F5F5F4',
          200: '#E7E5E4',
          300: '#D6D3D1',
          400: '#A8A29E',
          500: '#78716C',
          600: '#57534E',
          700: '#44403C',
          800: '#292524',
          900: '#1C1917', // High contrast readable text
        },
        // Calming Semantic Accents
        calm: {
          amberBg: '#FFFBEB',
          amberBorder: '#FDE68A',
          amberText: '#92400E',
          
          roseBg: '#FEF2F2',
          roseBorder: '#FECACA',
          roseText: '#991B1B',
          
          emeraldBg: '#ECFDF5',
          emeraldBorder: '#A7F3D0',
          emeraldText: '#065F46',
          
          skyBg: '#F0F9FF',
          skyBorder: '#BAE6FD',
          skyText: '#075985',
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        devanagari: ['var(--font-devanagari)', 'Noto Sans Devanagari', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'soft-sm': '0 1px 3px rgba(28, 25, 23, 0.04), 0 1px 2px rgba(28, 25, 23, 0.02)',
        'soft-md': '0 4px 16px -2px rgba(28, 25, 23, 0.06), 0 2px 6px -1px rgba(28, 25, 23, 0.03)',
        'soft-lg': '0 12px 32px -4px rgba(28, 25, 23, 0.08), 0 4px 12px -2px rgba(28, 25, 23, 0.04)',
        'soft-focus': '0 0 0 4px rgba(15, 118, 110, 0.15)',
      },
    },
  },
  plugins: [],
};
