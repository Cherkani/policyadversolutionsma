import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', '*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      boxShadow: {
        elevated: '0 10px 40px rgba(15, 23, 42, 0.15)',
        glow: '0 0 30px rgba(14, 165, 233, 0.25)',
      },
      colors: {
        brand: {
          DEFAULT: '#38bdf8',
          dark: '#0ea5e9',
        },
      },
    },
  },
  plugins: [],
};
