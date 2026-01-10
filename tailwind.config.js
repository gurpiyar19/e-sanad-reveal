/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Theater curtain colors
        velvet: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#8B0000',
          600: '#7B0000',
          700: '#6B0000',
          800: '#5B0000',
          900: '#4B0000',
        },
        gold: {
          light: '#FFD700',
          DEFAULT: '#D4AF37',
          dark: '#B8860B',
        },
        // Government brand colors
        punjab: {
          orange: '#E87722',
          brown: '#8B4513',
        },
        pseb: {
          maroon: '#800000',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      animation: {
        'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
        'curtain-left': 'curtain-left 2s ease-out forwards',
        'curtain-right': 'curtain-right 2s ease-out forwards',
      },
      keyframes: {
        'pulse-soft': {
          '0%, 100%': { boxShadow: '0 6px 20px rgba(255, 20, 147, 0.35)' },
          '50%': { boxShadow: '0 8px 25px rgba(255, 20, 147, 0.5)' },
        },
        'curtain-left': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        'curtain-right': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [],
}
