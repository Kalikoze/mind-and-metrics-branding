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
          50: "#8E95A2",
          100: "#7D8494",
          200: "#6B7385",
          300: "#5A6275",
          400: "#495266",
          500: "#384157",
          600: "#2B3347",
          700: "#1E2638",
          800: "#131A29",
          900: "#0A0E19",
        },
        neutral: {
          50: '#F9FAFB',
          100: '#F2F4F5',
          200: '#E5E7EA',
          300: '#D1D5DA',
          400: '#9BA3AD',
          500: '#707A87',
          600: '#4F5864',
          700: '#373F47',
          800: '#242A31',
          900: '#14171C',
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
        serif: ['var(--font-cormorant)'],
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
        },
        pulse: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.05)', opacity: '0.8' },
        }
      },
      animation: {
        'draw': 'draw 8s ease-out infinite',
        'draw-delay-1': 'draw 8s ease-out infinite 1s',
        'draw-delay-2': 'draw 8s ease-out infinite 2s',
        'pulse': 'pulse 4s infinite'
      }
    },
  },
  plugins: [],
};

export default config;
