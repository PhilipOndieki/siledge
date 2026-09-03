import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        siledge: {
          blue: "#0A3FA8",
          blueDeep: "#062A73",
          blueBright: "#1E63E9",
          ink: "#0B0B0F",
          slate: "#3A4152",
          mist: "#EAF1FB",
          white: "#FFFFFF",
        },
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1.5" }],
        sm: ["0.875rem", { lineHeight: "1.5" }],
        base: ["1rem", { lineHeight: "1.6" }],
        lg: ["1.125rem", { lineHeight: "1.6" }],
        xl: ["1.25rem", { lineHeight: "1.5" }],
        "2xl": ["1.5rem", { lineHeight: "1.3" }],
        "3xl": ["1.875rem", { lineHeight: "1.25" }],
        "4xl": ["2.25rem", { lineHeight: "1.15" }],
        "5xl": ["3rem", { lineHeight: "1.1" }],
        "6xl": ["3.75rem", { lineHeight: "1.05" }],
      },
      boxShadow: {
        card: "0 2px 12px -2px rgb(10 63 168 / 0.08), 0 1px 3px rgb(11 11 15 / 0.04)",
        cardHover: "0 12px 28px -6px rgb(10 63 168 / 0.16), 0 2px 6px rgb(11 11 15 / 0.06)",
      },
      maxWidth: {
        prose: "60ch",
      },
    },
  },
  plugins: [],
};

export default config;
