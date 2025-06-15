/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
      colors: {
        spezi: {
          50:  "#fff7e6",
          100: "#ffe5bf",
          200: "#ffd089",
          300: "#ffb951",
          400: "#ffa327",   // light rim
          500: "#ff8c00",   // logo orange
          600: "#f27000",
          700: "#d75a00",
          800: "#b94600",
          900: "#953300",
        },
      },
      gradientColorStops: {
        "spezi-start": "#ffb951",
        "spezi-end":   "#ff8c00",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
