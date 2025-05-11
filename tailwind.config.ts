
import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}"
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
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        orbitron: ["Orbitron", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        neon: {
          pink: "#FF2A6D",
          blue: "#05D9E8",
          purple: "#9b87f5",
          green: "#00FF9F",
        },
        cyber: {
          black: "#1A1F2C",
          darkblue: "#0D0221",
          gray: "#333844",
          lightgray: "#65647C",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "neon-pulse": {
          "0%, 100%": { 
            textShadow: "0 0 4px rgba(255, 42, 109, 0.7), 0 0 10px rgba(255, 42, 109, 0.5), 0 0 20px rgba(255, 42, 109, 0.3)" 
          },
          "50%": { 
            textShadow: "0 0 10px rgba(255, 42, 109, 0.9), 0 0 20px rgba(255, 42, 109, 0.7), 0 0 30px rgba(255, 42, 109, 0.5)" 
          },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "cyber-glitch": {
          "0%, 100%": { transform: "translate(0)" },
          "10%": { transform: "translate(-5px, 0)" },
          "20%": { transform: "translate(5px, 0)" },
          "30%": { transform: "translate(-3px, 0)" },
          "40%": { transform: "translate(3px, 0)" },
          "50%": { transform: "translate(0, 0)" },
          "60%": { transform: "translate(0, 0)" },
          "70%": { transform: "translate(5px, 0)" },
          "80%": { transform: "translate(-5px, 0)" },
          "90%": { transform: "translate(3px, 0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "neon-pulse": "neon-pulse 2s infinite",
        "float": "float 3s ease-in-out infinite",
        "cyber-glitch": "cyber-glitch 2s ease-in-out infinite",
      },
      backgroundImage: {
        "cyber-grid": "linear-gradient(0deg, rgba(5, 5, 10, 0.9) 0%, rgba(5, 5, 10, 0.9) 100%), url('/images/cyber-grid.webp')",
        "cyber-gradient": "linear-gradient(135deg, #1A1F2C 0%, #0D0221 100%)",
        "neon-glow": "linear-gradient(90deg, rgba(255, 42, 109, 0) 0%, rgba(255, 42, 109, 0.5) 50%, rgba(255, 42, 109, 0) 100%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require('@tailwindcss/typography')],
} satisfies Config;

export default config;
