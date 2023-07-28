/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        oswald: ["var(--font-oswald)"],
        fira: ["var(--font-fira)"],
      },
      colors: {
        brand: {
          red: "rgb(232,50,57)",
          light: "rgb(254,247,245)",
          secondary: "rgb(243,173,150)",
          base: "rgb(233,94,51)",
          border: "rgb(215,146,124)",
          lightgray: "rgb(211,210,211)",
          gray: "rgb(129,128,128)",
          dark: "rgb(30,31,30)",
        },
      },
    },
  },
  plugins: [],
};
