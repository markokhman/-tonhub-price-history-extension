/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "ton-blue": "#45a8f1",
        "ton-blue-dark": "#303757",
        red: "#ee4c38",
      },
    },
  },
  plugins: [],
};
