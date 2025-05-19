/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#5d5fef",
        "primary-dark": "#4c4ed9",
        "primary-light": "#7577f3",
      },
    },
  },
  plugins: [],
};
