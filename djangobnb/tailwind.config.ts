import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
     
      colors: {
        'airbnb':'#ff385C',
        'airbnb-dark':'#d50027'
      }
    },
  },
  plugins: [],
};
export default config;
