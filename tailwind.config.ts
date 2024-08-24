import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        spinner: {
          '0%': { transform: 'rotate(45deg) rotateX(-25deg) rotateY(25deg)' },
          '50%': { transform: 'rotate(45deg) rotateX(-385deg) rotateY(25deg)' },
          '100%': { transform: 'rotate(45deg) rotateX(-385deg) rotateY(385deg)' },
        },
      },
      animation: {
        spinner: 'spinner 1.6s infinite ease',
      }
    },
  },
  plugins: [],
};
export default config;
