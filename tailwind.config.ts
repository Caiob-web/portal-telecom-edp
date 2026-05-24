import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eff8ff",
          100: "#dff1ff",
          200: "#b8e4ff",
          300: "#74ceff",
          400: "#29b4f4",
          500: "#0498d4",
          600: "#007ab3",
          700: "#006191",
          800: "#064f76",
          900: "#0a4362"
        },
        edp: {
          50: "#effbf3",
          100: "#d8f5e1",
          200: "#b3eac6",
          300: "#7ddaa0",
          400: "#43c575",
          500: "#20a957",
          600: "#168845",
          700: "#146b39",
          800: "#13562f",
          900: "#104728"
        },
        graphite: {
          50: "#f7f8fa",
          100: "#eef1f4",
          200: "#d8dee5",
          300: "#b7c2cd",
          400: "#8f9dab",
          500: "#718091",
          600: "#5a6574",
          700: "#495260",
          800: "#3f4651",
          900: "#242a32"
        }
      },
      boxShadow: {
        panel: "0 24px 60px rgba(19, 42, 68, 0.12)",
        card: "0 12px 35px rgba(15, 45, 78, 0.08)"
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        "pulse-line": {
          "0%, 100%": { opacity: "0.35" },
          "50%": { opacity: "0.85" }
        }
      },
      animation: {
        "fade-up": "fade-up 0.55s ease-out both",
        "pulse-line": "pulse-line 2.8s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;
