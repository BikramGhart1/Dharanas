/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary: '#008170',
        secondary: '#005B41',
        background: '#0F0F0F',
        'background-secondary': '#232D3F',
        text: '#FFFFFF',
        'text-secondary': '#E0E0E0',
        active: '#00A18F', // Lightened Teal for hover/active states
        emphasis: '#007A5A', // Lightened Dark Green for emphasis
        border: '#232D3F',
      }
    },
  },
  plugins: [],
}

