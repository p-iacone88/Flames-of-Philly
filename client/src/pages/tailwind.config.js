module.exports = {
  content: ['./**/*.{js,jsx}', './src/**/*.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'my-custom-bg': '#DBEE7B', // Custom background color
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
