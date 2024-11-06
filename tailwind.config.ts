import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./layouts/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: "#0C7DFF",
        "light-blue": "#4FA1FF",
        yellow: "#FFF83C",
        dark: "#11151D",
        gray: "#B4AAAA",
        red: "#F96D4B",
        "dark-red": "#F84013",
      },
    },
  },
  plugins: [],
};
export default config;
