import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0e0e0d",
        parchment: "#f6f3ec",
        bone: "#efe9dc",
        gold: "#b08d4f",
        goldLight: "#d8c08a",
        clay: "#8a6a4a",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      letterSpacing: {
        widest2: "0.28em",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        drawerIn: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0%)" },
        },
        drawerInLeft: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
      animation: {
        marquee: "marquee 22s linear infinite",
        drawerIn: "drawerIn 0.35s ease-out",
        drawerInLeft: "drawerInLeft 0.35s ease-out",
      },
    },
  },
  plugins: [],
};
export default config;
