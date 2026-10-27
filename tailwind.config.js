/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './app.jsx'],
  theme: {
    extend: {
      fontFamily: {
        // `font-mono` is used for labels, tags and prices across the site.
        // Map it to the brand sans (with tabular figures via CSS) instead of a
        // code font, which read as a tech dashboard rather than a studio.
        mono: ['"Space Grotesk"', 'Outfit', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        gujarati: ['"Noto Sans Gujarati"', 'ui-sans-serif', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
