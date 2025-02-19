/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        Dom : "#015d4e",
        DomDark: '#6d76ab',
        Comp : "#f7f8ff",
        Accent: "#0d4ba0",
        NewDomDark: '#014137',
        NewComp : "#007b9a",
        NewAccent: "#748cd2",
      },
    },
  },
  plugins: [],
}
