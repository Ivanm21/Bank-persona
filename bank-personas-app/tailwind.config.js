/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'forum': ['Forum', 'serif'],
        'ibm': ['IBM Plex Sans', 'sans-serif'],
      },
      colors: {
        'primary': '#00A599',
        'secondary': '#2DADA4',
        'text': '#284541',
        'background': '#ECF0EF',
      },
    },
  },
  plugins: [],
}
