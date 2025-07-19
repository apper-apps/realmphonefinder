/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#00897B",
        secondary: "#FF6F00",
        accent: "#00ACC1",
        success: "#43A047",
        warning: "#FB8C00",
        error: "#E53935",
        info: "#1E88E5",
      },
      fontFamily: {
        display: ["Plus Jakarta Sans", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      animation: {
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-subtle': 'bounce 0.3s ease-out',
        'scale-hover': 'scale 0.2s ease-out',
      },
      boxShadow: {
        'card': '0 2px 4px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 4px 8px rgba(0, 0, 0, 0.15)',
        'floating': '0 8px 16px rgba(0, 0, 0, 0.2)',
      },
    },
  },
  plugins: [],
}