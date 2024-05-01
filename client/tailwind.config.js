/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/components/mainpage/ImageSlider.jsx", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

