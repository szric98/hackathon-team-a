
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#FFF6EE",
          100: "#FFE3C9",
          200: "#FFD7B1",
          300: "#FFC288",
          400: "#FFA957",
          500: "#FF922A",
          600: "#FF7C00",
          700: "#DF6C00",
          800: "#C86303",
          900: "#924A05",
        },
        gray: {
          50: "#F9FAFB",
          100: "#F0F4F7",
          200: "#D8E3EB",
          300: "#C0CDD4",
          400: "#829099",
          500: "#58676F",
          600: "#40494E",
          700: "#2F373A",
          800: "#202427",
          900: "#16181A",
        },
      },
      backgroundImage: {
        "dark-textured-background": "url('./assets/DarkTexturedBackground.png')",
      },
    },
  },
  plugins: [
    ({ addUtilities }) => {
      addUtilities({
        ".truncate-clip": {
          overflowX: "clip",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        },
      });
    },
  ],
};

export default config;
