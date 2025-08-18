/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./widgets/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // 👇 NEW — phone-focused breakpoints
      screens: {
        "2xs": "320px", // very small iPhones
        xs: "360px", // small Android
        sm: "640px",
        md: "768px",
        lg: "1024px",
        nav: "1024px", // show desktop header from here
        xl: "1280px",
      },
      // 👇 NEW — consistent side padding on small screens
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "1.25rem",
          md: "1.5rem",
        },
      },

      animationDelay: { 500: "500ms" },

      // (your token colors unchanged)
      colors: {
        brand: {
          50: "var(--brand-50)",
          100: "var(--brand-100)",
          200: "var(--brand-200)",
          300: "var(--brand-300)",
          400: "var(--brand-400)",
          500: "var(--brand-500)",
          600: "var(--brand-600)",
          700: "var(--brand-700)",
          800: "var(--brand-800)",
          900: "var(--brand-900)",
          950: "var(--brand-950)",
          DEFAULT: "var(--brand-600)",
        },
        cta: {
          50: "var(--cta-50)",
          100: "var(--cta-100)",
          200: "var(--cta-200)",
          300: "var(--cta-300)",
          400: "var(--cta-400)",
          500: "var(--cta-500)",
          600: "var(--cta-600)",
          700: "var(--cta-700)",
          800: "var(--cta-800)",
          900: "var(--cta-900)",
          DEFAULT: "var(--cta-700)",
        },
        surface: {
          0: "var(--surface-0)",
          1: "var(--surface-1)",
          2: "var(--surface-2)",
          3: "var(--surface-3)",
        },
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          muted: "var(--text-muted)",
          inverse: "var(--text-inverse)",
        },
        border: {
          DEFAULT: "var(--border)",
          subtle: "var(--border-subtle)",
          strong: "var(--border-strong)",
        },
        ring: { DEFAULT: "var(--ring)", subtle: "var(--ring-subtle)" },
        effect: {
          glowA: "var(--effect-glow-a)",
          glowB: "var(--effect-glow-b)",
          haloA: "var(--effect-halo-a)",
          haloB: "var(--effect-halo-b)",
          wireStart: "var(--effect-wire-start)",
          wireEnd: "var(--effect-wire-end)",
          dot: "var(--effect-dot)",
        },
      },

      keyframes: {
        waveSlide: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
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
        pulseGlow: {
          "0%,100%": { boxShadow: "0 0 0 0 rgba(0,0,0,0)" },
          "50%": { boxShadow: "0 0 0 14px var(--ring-pulse)" },
        },
        shimmer: {
          "0%": { opacity: 0.15 },
          "50%": { opacity: 0.35 },
          "100%": { opacity: 0.15 },
        },
        moveInBottom: {
          "0%": { opacity: "0", transform: "translateY(100px)" },
          "80%": { transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        flutterIn: {
          "0%": {
            transform: "translate(-100%,-100%) rotate(-20deg) scale(1.5)",
            opacity: "0",
          },
          "60%": {
            transform: "translate(10%,10%) rotate(5deg) scale(1.1)",
            opacity: "1",
          },
          "100%": {
            transform: "translate(0,0) rotate(0) scale(1)",
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
