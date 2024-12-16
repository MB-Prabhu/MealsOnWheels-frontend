/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Arimo', 'Poppins', 'Roboto', 'sans-serif'], // Default font stack
      },
    },
  },
  plugins: [],
}

