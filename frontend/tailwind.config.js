module.exports = {
  mode: 'jit',
  content: [
    "./src/**/*.html",
  ],
  theme: {
    extend: {
      colors : {
        'light-gray': '#BDBDBD',
        'dark-gray': '#404040',
        'light-blue': '#CAEBF2',
        'main-red': '#FF383F',
      },
      container: {
        center: true
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}