import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        trade: {
          green: "#0ecb81",
          greenHover: "#0bb371",
          greenBg: "rgba(14, 203, 129, 0.12)",
          red: "#f6465d",
          redHover: "#df3e53",
          redBg: "rgba(246, 70, 93, 0.12)",
          dark: {
            bg: "#0b0e14",
            card: "#121722",
            cardHover: "#182030",
            border: "#1f293d",
            muted: "#6b778c",
            text: "#eaecef",
          },
          light: {
            bg: "#f4f6f9",
            card: "#ffffff",
            cardHover: "#f8fafc",
            border: "#e2e8f0",
            muted: "#64748b",
            text: "#0f172a",
          },
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
