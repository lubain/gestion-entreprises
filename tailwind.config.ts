import type { Config } from "tailwindcss";
import {
  ACCENT,
  BLACK,
  DESTRUCTIVE,
  MUTED,
  PRIMARY,
  SECONDARY,
  ORANGE,
  BLEU_FONCE,
} from "./src/shared/constants/Color";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        pme: {
          primary: PRIMARY,
          secondary: SECONDARY,
          fonce: BLEU_FONCE,
          green: "#027f3b",
          orange: "#ed704d",
          light: "#F1F5F9",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        fonce: {
          DEFAULT: "hsl(var(--fonce))",
          foreground: "hsl(var(--fonce-foreground))",
        },
        orange: {
          DEFAULT: "hsl(var(--orange))",
          foreground: "hsl(var(--orange-foreground))",
        },
        // black: {
        //   DEFAULT: BLACK,
        //   foreground: "#FFFFFF",
        // },

        // primary: {
        //   DEFAULT: PRIMARY,
        //   foreground: "#FFFFFF",
        // },
        // secondary: {
        //   DEFAULT: SECONDARY,
        //   foreground: "#1A202C",
        // },
        destructive: {
          DEFAULT: DESTRUCTIVE,
          foreground: "#FFFFFF",
        },
        muted: {
          DEFAULT: MUTED,
          foreground: "#64748B",
        },
        accent: {
          DEFAULT: ACCENT,
          foreground: "#1A202C",
        },
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        "gradient-x": {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-out",
        "slide-in": "slide-in 0.5s ease-out",
        "pulse-slow": "pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "gradient-x": "gradient-x 10s ease infinite",
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
