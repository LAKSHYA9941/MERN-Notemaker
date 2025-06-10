/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Enable dark mode via class
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Light theme
        primary: '#071952',
        secondary: '#0B666A',
        accent: '#35A29F',
        highlight: '#97FEED',
        // Dark theme (glowy night)
        'night-black': '#09090b',
        'night-purple': '#a259f7',
        'night-yellow': '#ffe066',
        'night-ice': '#e0f7fa',
        'night-glass': 'rgba(255,255,255,0.08)',
      },
      boxShadow: {
        'glow-white': '0 4px 32px 0 rgba(255,255,255,0.4)',
        'glow-purple': '0 4px 32px 0 #a259f7',
      },
      textShadow: {
        'glow': '0 0 8px rgba(224,247,250,0.6)',
      },
    },
  },
  plugins: [],
} 