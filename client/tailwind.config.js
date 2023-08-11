/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
  "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors:{
       prim:"#009933",
       prim1:"#004d00"
      },
    },
  },
  plugins: [],
}

