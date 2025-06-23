// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    extend: {
      colors: {
        accent: "#f59e0b",
        background1: "",
        surface: "#ffffff",
        base:"#f9fafb",
        text: {
          DEFAULT: "#1f2937", // gray-800
          muted: "#6b7280", // gray-500
          
        },
      },
    },
  },
  plugins: [],
};
export default config;

// brand: {
//           DEFAULT: "#1e40af",      // brand (primary)         // darker variant
//           light: "#60a5fa",        // lighter variant
//         },
