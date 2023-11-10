/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');
const colors = require('./src/styles/themes/colorObject');

const createSize = (number) => {
  const obj = new Object();
  for (let i = 1; i <= number; i++) {
    obj[i] = `${i}px`;
  }
  return obj;
};

module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  jit: true,
  theme: {
    colors,
    fontWeight: {
      regular: '400',
      semibold: '600',
      bold: '700',
      extraBold: '800',
    },
    extend: {
      borderRadius: {
        xs: '4px',
        sm: '6px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        xxl: '100px',
      },
      spacing: createSize(70),
      transitionProperty: {
        position: 'top, left, right, bottom',
      },
    },
    borderWidth: createSize(10),
  },
  plugins: [
    plugin(function ({ addComponents }) {
      addComponents({
        '.x-scroll-touchable': {
          '-webkit-transform': 'translateZ(0)',
        },
      });
    }),
    require('tailwind-scrollbar-hide'),
    require('tailwindcss-textshadow'),
    require('tailwindcss-animation-delay'),
  ],
};
