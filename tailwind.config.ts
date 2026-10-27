import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#0a192f", // Azul oscuro profundo
          navy: "#0f2744", // Azul oscuro principal
          blue: "#1a406e", // Azul automotriz medio
          light: "#f0f5fa", // Azul muy suave para fondos
          orange: "#ff5e14", // Naranja brillante de acción y acento
          orangeHover: "#e04e0a",
          amber: "#f59e0b",
        },
      },
    },
  },
  plugins: [],
};
export default config;
