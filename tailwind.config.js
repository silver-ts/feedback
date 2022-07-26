/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [
    // Add typographic defaults to vanilla HTML rendered from Markdown
    require('@tailwindcss/typography'),
  ],
}
