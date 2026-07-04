/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
      },
    },
    extend: {
      colors: {
        // 柑橘主题色板
        citrus: {
          50: "#FFF8EB",
          100: "#FFEFC6",
          200: "#FFDD88",
          300: "#FFC54A",
          400: "#FBB225",
          500: "#F59E0B", // 主色：柑橘金
          600: "#D97706",
          700: "#B45309",
          800: "#92400E",
          900: "#78350F",
        },
        leaf: {
          50: "#F0FDF4",
          100: "#DCFCE7",
          200: "#BBF7D0",
          300: "#86EFAC",
          400: "#4ADE80",
          500: "#16A34A", // 辅色：柑橘叶绿
          600: "#15803D",
          700: "#166534",
          800: "#14532D",
          900: "#052E16",
        },
        soil: {
          900: "#1C1410", // 深暖棕背景
          800: "#2A1F18",
          700: "#3D2E22",
          600: "#5A4434",
          500: "#7A6149",
        },
        cream: "#FAF6EE", // 米白卡片
      },
      fontFamily: {
        display: ['"ZCOOL XiaoWei"', "serif"],
        body: ['"Noto Sans SC"', "sans-serif"],
        mono: ['"Space Grotesk"', "monospace"],
      },
      boxShadow: {
        citrus: "0 10px 30px -10px rgba(245, 158, 11, 0.45)",
        card: "0 8px 30px -12px rgba(28, 20, 16, 0.5)",
        glow: "0 0 40px rgba(245, 158, 11, 0.35)",
      },
      backgroundImage: {
        "citrus-radial":
          "radial-gradient(circle at 30% 20%, rgba(245,158,11,0.18), transparent 55%), radial-gradient(circle at 80% 80%, rgba(22,163,74,0.14), transparent 50%)",
        "grain":
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")",
      },
      keyframes: {
        "scan-line": {
          "0%": { transform: "translateY(0)", opacity: "0" },
          "10%": { opacity: "1" },
          "90%": { opacity: "1" },
          "100%": { transform: "translateY(100%)", opacity: "0" },
        },
        "float-leaf": {
          "0%,100%": { transform: "translateY(0) rotate(-6deg)" },
          "50%": { transform: "translateY(-14px) rotate(6deg)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.8)", opacity: "0.7" },
          "100%": { transform: "scale(1.6)", opacity: "0" },
        },
      },
      animation: {
        "scan-line": "scan-line 2.2s ease-in-out infinite",
        "float-leaf": "float-leaf 6s ease-in-out infinite",
        "fade-up": "fade-up 0.6s ease-out both",
        "pulse-ring": "pulse-ring 1.8s ease-out infinite",
      },
    },
  },
  plugins: [],
};
