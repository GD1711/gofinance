import type { Config } from "tailwindcss";
import { heroui } from "@heroui/react";

const config: Config = {
  content: [
    "./src/ui/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#000000",
          secondary: "#0a0a0a",
          card: "rgba(26, 26, 26, 0.6)",
          glass: "rgba(255, 255, 255, 0.03)",
        },
        primary: {
          DEFAULT: "#E5E5E5",
          light: "#F5F5F5",
          dark: "#C0C0C0",
          glow: "rgba(229, 229, 229, 0.3)",
        },
        accent: {
          DEFAULT: "#B8B8B8",
          light: "#D0D0D0",
          dark: "#909090",
        },
        status: {
          success: "#10B981",
          warning: "#F59E0B",
          danger: "#EF4444",
          info: "#3B82F6",
        },
        glass: {
          border: "rgba(255, 255, 255, 0.1)",
          bg: "rgba(255, 255, 255, 0.05)",
          hover: "rgba(255, 255, 255, 0.08)",
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', '-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'Segoe UI', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'SF Mono', 'Monaco', 'Cascadia Code', 'Consolas', 'monospace'],
      },
      backdropBlur: {
        xs: "2px",
        sm: "4px",
        DEFAULT: "8px",
        md: "12px",
        lg: "16px",
        xl: "24px",
      },
      boxShadow: {
        'glow': '0 0 20px rgba(229, 229, 229, 0.2)',
        'glow-lg': '0 0 40px rgba(229, 229, 229, 0.3)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'inner-glow': 'inset 0 0 20px rgba(229, 229, 229, 0.15)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
    },
  },
  darkMode: "class",
  // `@heroui/react` brings its own tailwind types which can conflict
  // with the workspace `tailwindcss` types. Cast to `any` to avoid
  // the incompatible `PluginAPI` type error.
  plugins: [heroui() as unknown as any],
};

export default config;
