/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animationDelay: {
        500: "500ms",
      },
      colors: {
        primary: {
          50: "var(--primary-50)",
          100: "var(--primary-100)",
          200: "var(--primary-200)",
          300: "var(--primary-300)",
          400: "var(--primary-400)",
          500: "var(--primary-500)",
          600: "var(--primary-600)",
          700: "var(--primary-700)",
          800: "var(--primary-800)",
          900: "var(--primary-900)",
          950: "var(--primary-950)",
        },
        accent: {
          50: "var(--accent-50)",
          100: "var(--accent-100)",
          200: "var(--accent-200)",
          300: "var(--accent-300)",
          400: "var(--accent-400)",
          500: "var(--accent-500)",
          600: "var(--accent-600)",
          700: "var(--accent-700)",
          800: "var(--accent-800)",
          900: "var(--accent-900)",
          950: "var(--accent-950)",
        },
      },

      keyframes: {
        waveSlide: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }, // loop a 200% strip
        },
        waveSlideReverse: {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        floatSoft: {
          "0%": { transform: "translate3d(0,0,0)" },
          "50%": { transform: "translate3d(0,-6px,0)" },
          "100%": { transform: "translate3d(0,0,0)" },
        },
        // optional micro-interactions
        pulseGlow: {
          "0%,100%": { boxShadow: "0 0 0 0 rgba(20,184,166,0.0)" },
          "50%": { boxShadow: "0 0 0 14px rgba(20,184,166,0.10)" },
        },
        shimmer: {
          "0%": { opacity: 0.15 },
          "50%": { opacity: 0.35 },
          "100%": { opacity: 0.15 },
        },

        moveInBottom: {
          "0%": {
            opacity: "0",
            transform: "translateY(100px)",
          },
          "80%": {
            transform: "translateY(-10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },

        flutterIn: {
          "0%": {
            transform: "translate(-100%, -100%) rotate(-20deg) scale(1.5)",
            opacity: "0",
          },
          "60%": {
            transform: "translate(10%, 10%) rotate(5deg) scale(1.1)",
            opacity: "1",
          },
          "100%": {
            transform: "translate(0, 0) rotate(0deg) scale(1)",
            opacity: "1",
          },
        },
      },
      animation: {
        "wave-slow": "waveSlide 26s linear infinite",
        "wave-fast": "waveSlideReverse 18s linear infinite",
        "float-soft": "floatSoft 12s ease-in-out infinite",
        "pulse-glow": "pulseGlow 2.6s ease-in-out infinite",
        shimmer: "shimmer 8s ease-in-out infinite",

        "move-in-bottom": "moveInBottom 1s ease-out 0.75s both",
        "move-in-bottom-delayed": "moveInBottom 1s ease-out 1.5s both",
      },
    },
  },
  plugins: [],
};
