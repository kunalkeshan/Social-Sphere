/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2A2A2A'
      },
      fontFamily: {
        heading: 'Syne',
      }
    },
  },
  plugins: [],
}

