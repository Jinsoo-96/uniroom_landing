/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{svelte,js,ts}"],
  theme: {
    extend: {
      colors: {
        purple: {
          50: "#f8f7ff",
          100: "#f0f0f8",
          200: "#e8e6ff",
          300: "#dad8ff",
          400: "#c9c6ff",
          500: "#7c4dff",
          600: "#6a3de8",
          700: "#5935c2",
        },
      },
    },
  },
  plugins: [],
};
