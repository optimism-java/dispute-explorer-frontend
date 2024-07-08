/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'background-light': 'rgb(245 245 245 / 1)',
        'background-surface-light': 'rgb(255 255 255 / 1)',
        'accent-light': 'rgb(93 37 212/1)',
      },
    },
  },
  plugins: [],
};
