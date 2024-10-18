/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': colors.blue,
        'secondary': colors.green,
        'danger': colors.red,
        'warning': colors.yellow,
        'info': colors.blue,
        'light': colors.gray,
        'dark': colors.gray,
        'success': colors.green,
        'white': colors.white,
        'black': colors.black,
        'gray': colors.gray,
        'transparent': 'transparent',
        'current': 'currentColor',
      },
      container: {
        screens: {
          sm: "100%",
          md: "100%",
          lg: "1024px",
          xl: "1024px",
          '2xl': '1536px',
        },
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

