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
          50: "#8A7E72",
          100: "#887A6E",
          200: "#7B7065",
          300: "#70665C",
          400: "#665C53",
          500: "#5A5249",
          600: "#4F4740",
          700: "#433D37",
          800: "#38332E",
          900: "#2D2925",
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
          50: "#4F5E7D",
          100: "#475571",
          200: "#3F4C64",
          300: "#374358",
          400: "#2F3A4B",
          500: "#27313F",
          600: "#1F2832",
          700: "#181F26",
          800: "#101619",
          900: "#050608",
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
