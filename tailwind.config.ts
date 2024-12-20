import { addDynamicIconSelectors } from '@iconify/tailwind'

import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        background: "var(--background)",
        primary: "var(--primary)",
        accent: "var(--accent)",
      },
      textColor: {
        primary: "var(--text-primary)",
        primaryLight: "var(--text-primary--light)",
        accent: "var(--accent)",
      },
      borderColor: {
        primary: "var(--border-primary)",
      },
    },
  },
  plugins: [addDynamicIconSelectors()],
} satisfies Config;
