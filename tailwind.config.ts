import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#1C2E4A",
          100: "#223759",
          200: "#274068",
          300: "#2D4976",
          400: "#325285",
          500: "#385B94",
          600: "#3E64A3",
          700: "#436EB1",
          800: "#4E78BC",
          900: "#5C83C1",
        },
        secondary: {
          50: "#8C7E6A",
          100: "#7D7160",
          200: "#6E6456",
          300: "#5F574C",
          400: "#504A41",
          500: "#423D36",
          600: "#33302B",
          700: "#242320",
          800: "#151615",
          900: "#0A0A0A",
        },
        neutral: {
          50: "#FAF9F7",
          100: "#F7F6F2",
          200: "#EFECE6",
          300: "#E7E3D9",
          400: "#E0D9CD",
          500: "#D8D0C0",
          600: "#D0C6B4",
          700: "#C8BDA7",
          800: "#C0B49B",
          900: "#B8AA8E",
        },
        dark: {
          50: "#737373",
          100: "#666666",
          200: "#595959",
          300: "#4D4D4D",
          400: "#404040",
          500: "#333333",
          600: "#262626",
          700: "#1A1A1A",
          800: "#0D0D0D",
          900: "#000000",
        },
      },
      fontFamily: {
        serif: ['var(--font-gfs-didot)'],
        sans: ['var(--font-jost)'],
      },
      keyframes: {
        draw: {
          '0%': {
            strokeDashoffset: '1',
            opacity: '0'
          },
          '20%': {
            opacity: '1'
          },
          '100%': {
            strokeDashoffset: '0',
            opacity: '0.8'
          }
        }
      },
      animation: {
        'draw': 'draw 8s ease-out infinite',
        'draw-delay-1': 'draw 8s ease-out infinite 1s',
        'draw-delay-2': 'draw 8s ease-out infinite 2s',
      }
    },
  },
  plugins: [],
};

export default config;
