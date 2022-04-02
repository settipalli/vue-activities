module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        azure: {
          50: '#b4c8e4',
          100: '#9bb5db',
          200: '#83a3d2',
          300: '#6a90c9',
          400: '#517ec0',
          500: '#386bb7',
          600: '#1f59ae',
          700: '#0646a5',
          800: '#053F95',
          900: '#053884',
          1000: '#043173',
          1200: '#042a63',
          1300: '#032353',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
};
