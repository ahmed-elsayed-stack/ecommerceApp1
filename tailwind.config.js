/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FBF6E9',
        secondary: '#E3F0AF',
        accent: '#5DB996',
        dark: '#118B50',
      },
    },
  },
  plugins: [],
}
