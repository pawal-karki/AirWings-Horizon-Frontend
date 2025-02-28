/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark_purple: {
          DEFAULT: "#003399",
          100: "#b3c7f0",
          500: "#003399",
          900: "#001a66",
        },
        naples_yellow: {
          DEFAULT: "#efcb68",
          500: "#efcb68",
        },
        honeydew: {
          DEFAULT: "#e1efe6",
          500: "#e1efe6",
        },
        ash_gray: {
          DEFAULT: "#aeb7b3",
          500: "#aeb7b3",
        },
        rich_black: {
          DEFAULT: "#000411",
          500: "#000411",
        },
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-in-out",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
