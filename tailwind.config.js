/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "comic-sans": ["Comic Sans MS", "cursive"],
      },
      colors: {
        'green': "#50D6A6",
        'green2': "#a7f3d0",
        'orange': "#FFC544",
        'blue2': "#a7d2e7",
      },
    },
  },
  plugins: [],
};
