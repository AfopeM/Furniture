/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
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
          light: "rgb(254,250,252)",
          secondary: "rgb(243,173,150)",
          base: "rgb(233,94,51)",
          gray: "rgba(254,247,245,50%)",
          darkgray: "rgba(45,46,45)",
          dark: "rgb(30,31,30)",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
