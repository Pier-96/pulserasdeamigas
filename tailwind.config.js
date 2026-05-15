/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pastel: {
          pink: '#FDE4EC',
          lavender: '#E8E0F0',
          cream: '#FFF9F5',
          mint: '#E0F7F4',
          coral: '#FFE4E1',
        },
        primary: {
          light: '#F8BBD9',
          DEFAULT: '#F48FB1',
          dark: '#EC407A',
        },
        secondary: {
          light: '#D1C4E9',
          DEFAULT: '#B39DDB',
          dark: '#9575CD',
        },
      },
      fontFamily: {
        display: ['Quicksand', 'sans-serif'],
        body: ['Nunito', 'sans-serif'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.7 },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}