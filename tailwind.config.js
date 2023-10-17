/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        myPurple: "#6152ff",
        myPurpleSec: "#4e3eff",
        myDarkPurple: "#2f3349",
      },
    },
  },
  plugins: [],
};
