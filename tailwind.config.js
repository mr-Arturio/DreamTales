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
        green: "#50D6A6",
        green2: "#a7f3d0",
        orange: "#FFC544",
        blue2: "#a7d2e7",
      },
      "btn-nav": {
        padding: "0.5rem 1.5rem",
        fontSize: "1rem",
        fontWeight: "500",
        borderRadius: "1.8rem",
        fontFamily: ["Garet", "sans-serif"],
        cursor: "pointer",
        transition: "background-color 0.3s, color 0.3s",
      },
    },
  },
  plugins: [],
};
