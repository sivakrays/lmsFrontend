/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        textColor: "#334456",
        textLigntColor: "#6F6F6F",
        footerColor: "#4A4A4A",

        mobilebg: "#FFF7E0",
        herobg: "#FCFAF0",
        coursebg: "#FFF7E0",
        cardbg: "#F9F8F4",
        yellowColor: "#FACC48",
      },
    },
  },
  plugins: [],
};
