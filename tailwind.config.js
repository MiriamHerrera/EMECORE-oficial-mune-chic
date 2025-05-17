/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./app/components/**/*.{js,jsx,ts,tsx}",
    "./app/routes/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#fde3ec',
          DEFAULT: '#fde3ec',
        },
        secondary: {
          DEFAULT: '#b57c21',
        },
        black: '#000000',
      },
      fontFamily: {
        elegant: ['Higuen Elegant Serif', 'serif'],
      },
      backgroundImage: {
        'mune': "url('/fondo.jpg')",
      },
    },
  },
  plugins: [],
}