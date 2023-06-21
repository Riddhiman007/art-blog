/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "app/**/*.{js,jsx,ts,tsx}",
    "app/components/**/*.{js,jsx,ts,tsx}",
    // "src/***/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      xs: '0', // mobile
      sm: '600px', // tablet
      md: '900px', // medium laptop
      lg: '1024px', // desktop
      xl: '1400px', // big screens
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
  darkMode: 'class',
  // corePlugins: { preflight: false },
  // important: "#__next",
  // plugins: [ require("@headlessui/tailwindcss")({ prefix: "ui" }) ],
}
