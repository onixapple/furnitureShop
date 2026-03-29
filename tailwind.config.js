/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {
        colors: {
          gold: "#C9A84C",
          dark: "#0F0F0F",
          charcoal: "#1A1A1A",
          muted: "#6B6B6B",
          cream: "#F5F0E8",
        },
        fontFamily: {
          serif: ["Cormorant Garamond", "serif"],
          sans: ["Montserrat", "sans-serif"],
        },
      },
    },
    plugins: [],
  };