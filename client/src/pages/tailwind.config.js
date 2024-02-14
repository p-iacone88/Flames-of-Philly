module.exports = {
  purge: ['./**/*.{js,jsx}', './src/**/*.html'],
  darkMode: false, // optional, set to 'media' for dark mode based on user preference
  theme: {
    extend: {
      backgroundColor: {
        'my-custom-bg': '#DBEE7B', // Add custom background color here
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
