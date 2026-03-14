/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: "var(--brand)",
        accent: "var(--accent)",
        offwhite: "var(--offwhite)",
        "brand-light": "var(--brand-light)",
        "brand-dark": "var(--brand-dark)",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Breezy", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};