/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        textColor: "#334456",
        textLightColor: "#6F6F6F",
        footerColor: "#4A4A4A",
        mobilebg: "#FFF7E0",
        herobg: "#FCFAF0",
        coursebg: "#FFF7E0",
        cardbg: "#F9F8F4",
        yellowColor: "#FACC48",
        dashboardLightColor: "#f5f8fa",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".boxShadow": {
          boxShadow: "5px 5px 0px 0px rgba(0, 0, 0, 0.75)",
          "-webkit-box-shadow": "5px 5px 0px 0px rgba(0, 0, 0, 0.75)",
          "-moz-box-shadow": "5px 5px 0px 0px rgba(0, 0, 0, 0.75)",
          borderRadius: "10px",
        },
        //Used for Display a correct quiz answers
        ".boxShadow1": {
          boxShadow: "5px 5px 0px 0px rgba(0, 128, 0, 0.75)",
          "-webkit-box-shadow": "5px 5px 0px 0px rgba(0, 128, 0, 0.75)",
          "-moz-box-shadow": "5px 5px 0px 0px rgba(0, 128, 0, 0.75)",
          borderRadius: "10px",
        },
        ".wrongAns": {
          boxShadow: "5px 5px 0px 0px rgba(0, 0, 255, 0.75)",
          "-webkit-box-shadow": "5px 5px 0px 0px rgba(0, 0, 255, 0.75)",
          "-moz-box-shadow": "5px 5px 0px 0px rgba(0, 0, 255, 0.75)",
          borderRadius: "10px",
        },
      };

      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};
