/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary:  { 400:"#4ade80", 500:"#22c55e", 600:"#16a34a", 700:"#15803d" },
        logo:     { 400:"#f87171", 500:"#ef4444", 600:"#dc2626" },
        dark:     { 900:"#020c06", 800:"#071a0e", 700:"#0f2d18", 600:"#1a4028" },
      },
      fontFamily: {
        display: ["'Exo 2'", "sans-serif"],
        body:    ["'DM Sans'", "sans-serif"],
        mono:    ["'JetBrains Mono'", "monospace"],
      },
      animation: {
        float:      "float 6s ease-in-out infinite",
        "spin-slow":"spin 10s linear infinite",
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%":     { transform: "translateY(-16px)" },
        },
      },
      boxShadow: {
        glow:    "0 0 24px rgba(34,197,94,0.45), 0 0 60px rgba(34,197,94,0.15)",
        "glow-r":"0 0 24px rgba(239,68,68,0.45)",
        glass:   "0 8px 32px rgba(0,0,0,0.4)",
      },
    },
  },
  plugins: [],
};
