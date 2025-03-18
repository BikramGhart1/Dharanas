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
        secondary: '#1c1d20',
        background: '#0F0F0F',
        'background-secondary': '#232D3F',
        text: '#FFFFFF',
        'text-secondary': '#858585',
        active: '#00A18F', // Lightened Teal for hover/active states
        emphasis: '#007A5A', // Lightened Dark Green for emphasis
        border: '#232D3F',
      }
    },
  },
  plugins: [],
}

