/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        sand: {
          100: '#f7f5f3',
          200: '#efe8df',
          300: '#e2d8c8',
          400: '#cbbda5',
          500: '#b79f83',
          600: '#8f6e55',
          700: '#6b4b30',
          800: '#402a19'
        },
        night: {
          100: '#0f1720',
          200: '#12161b',
          300: '#1b2330',
          400: '#253041',
          500: '#2f3e46',
          600: '#33434a',
          700: '#0b0f12',
          800: '#07090b'
        }
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
}
