<<<<<<< HEAD
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
=======
const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      primary: "#15803d",
      secondary: "#22c55e",
    },
  },
  plugins: [flowbite.content()],
>>>>>>> 5ade910e06be2e9413398ec4d201577f51fc16a9
};
