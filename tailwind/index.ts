import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

import { baseColors, semanticColors } from "./colors";
console.log(process.env.NEXT_PUBLIC_BASE_SEPOLIA_URL, 'process-env1')

export default {
  content: [""],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        ...baseColors,
        ...semanticColors,
      },
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@headlessui/tailwindcss")],
} satisfies Config;