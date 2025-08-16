/** @type {import('tailwindcss').Config} */
import fluid, { extract, screens, fontSize } from "fluid-tailwind";

export default {
  content: {
    files: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    extract,
  },
  theme: {
    screens,
    fontSize,
    extend: {
      colors: {
        yellow: "#FFD045",
        orange: "#FA6E32",
        dark: "#081F26",
        red: "#92140C",
        gray: "#ADADAD",
        "gray-dark": "#777777",

        "red-task": "#B10F2E",
        "red-task-light": "#C7304D",
        "yellow-task": "#F4D35E",
        "yellow-task-light": "#F7DF88",
        "green-task": "#69995D",
        "green-task-light": "#90BF84",
        "gray-task": "#D1D1D1",
        "gray-task-light": "#E8E8E8",
      },
    },
  },
  plugins: [fluid],
};
