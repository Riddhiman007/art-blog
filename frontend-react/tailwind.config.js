/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "*.{html,js,jsx,ts,tsx}",
    "public/index.html",
    "src/*.{html,js,jsx,ts,tsx}",
    "src/**/*.{html,js,jsx,ts,tsx}",
    "src/***/**/*.{html,js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    screens: {
      xs: '0px',
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      xxl: '1400px'
    },
    container: {
      screens: {
        xs: '100%',
        sm: '540px',
        md: '720px',
        lg: '960px',
        xl: '1140px',
        xxl: '1320px',
      },
      center: false
    }
  },
  plugins: [
  ]
}