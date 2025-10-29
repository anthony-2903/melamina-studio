// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0d6efd", // color principal
        secondary: "#6610f2", // color secundario
        accent: "#f59e0b", // acento
        foreground: "#111827", // texto principal
        "primary-foreground": "#ffffff",
        muted: "#f3f4f6", // fondo suave
        "muted-foreground": "#6b7280", // texto suave
        background: "#ffffff", // fondo general
        card: "#ffffff", // fondo de tarjetas
        "card-foreground": "#111827",
        border: "#e5e7eb", // para border-border
      },
      fontFamily: {
        heading: ["'Poppins'", "sans-serif"], // ejemplo
      },
    },
  },
  plugins: [],
}
