const defaulThemes = require('tailwindcss/defaultTheme')
module.exports = {
  mode: 'jit',
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['Inter', ...defaulThemes.fontFamily.sans],
    },
    extend: {
      colors: {
        'gray-base': {
          50: '#f4f4f4', 
          100: '#e9e9e9', 
          200: '#c7c7c7', 
          300: '#a5a5a5', 
          400: '#626262', 
          500: '#1f1f1f', 
          600: '#1c1c1c', 
          700: '#171717', 
          800: '#131313', 
          900: '#0f0f0f'
        },
        'gray-second': {
          50: '#f5f5f5', 
          100: '#eaeaea', 
          200: '#cbcbcb', 
          300: '#ababab', 
          400: '#6c6c6c', 
          500: '#2d2d2d', 
          600: '#292929', 
          700: '#222222', 
          800: '#1b1b1b', 
          900: '#161616'
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
