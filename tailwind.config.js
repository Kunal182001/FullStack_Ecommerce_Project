/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'bottom-only': '0px 5px 10px rgba(0, 0, 0, 1)',
        'card-only': '0px 5px 10px rgba(0, 0, 0, 0.5)',
      },
      fontFamily: {
        robotoCondensed: ['"Roboto Condensed"', 'sans-serif'],
      },
      animation: {
        'bounce-slow': 'bounceUpDown 1s infinite',
        'lift-shadow': 'liftShadow 1s infinite',
        'fade-in': 'fadeIn 1.5s ease-in-out',
        'pop-in': 'popIn 0.5s ease-out',
        'pulse-slow': 'pulseSlow 2s infinite',
        'shine': 'shine 1.5s infinite alternate',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        bounceUpDown: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        liftShadow: {
          '0%, 100%': { opacity: '0.6', transform: 'translateY(0)' },
          '50%': { opacity: '1', transform: 'translateY(-5px)' },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        popIn: {
          '0%': { transform: 'scale(0.5)', opacity: 0 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
        pulseSlow: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        shine: {
          '0%': { opacity: 0.7 },
          '100%': { opacity: 1 },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      colors: {
        'primary': '#4F46E5',
        'secondary': '#6EE7B7',
        'background': '#F9FAFB',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
    function ({ addComponents }) {
      addComponents({
        '.no-spinner': {
          /* Chrome, Safari, Edge, Opera */
          '&::-webkit-inner-spin-button, &::-webkit-outer-spin-button': {
            '-webkit-appearance': 'none',
            margin: '0',
          },
          /* Firefox */
          '-moz-appearance': 'textfield',
        },
      });
    },
  ],
};
