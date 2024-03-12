import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.tsx"
  ],
  theme: {
    extend: {
      colors: {
        "veraleo-blue-primary": "#236E92",
        "veraleo-text-white": "#FFFFFF"
      },
    },
  },
  
  plugins: [],
};
export default config;
