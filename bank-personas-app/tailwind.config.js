/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00A599',
        secondary: '#2DADA4',
        text: '#284541',
        background: '#ECF0EF',
        white: '#FFFFFF',
      },
      fontFamily: {
        'forum': ['Forum', 'serif'],
        'ibm': ['IBM Plex Sans', 'sans-serif'],
      },
      fontSize: {
        '5xl': ['3rem', { lineHeight: '1.167' }], // 48px with 1.167 line height
        '6xl': ['3.5rem', { lineHeight: '1' }],
      },
    },
  },
  plugins: [],
}
