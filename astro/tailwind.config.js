/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // <-- Enable dark mode using class strategy
  content: [
    './src/**/*.{astro,html,js,jsx,ts,tsx}',
    './components/**/*.{astro,html,js,jsx,ts,tsx}',
    './layouts/**/*.{astro,html,js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#ffffff',
          dark: '#0b0c10',
        },
        text: {
          DEFAULT: '#1e293b',
          dark: '#f8fafc',
        },
        primary: {
          DEFAULT: '#38bdf8',
          dark: '#0ea5e9',
        },
        secondary: {
          DEFAULT: '#64748b',
        },
        accent: {
          DEFAULT: '#9333ea',
        },
      },
      fontFamily: {
        sans: ["'Inter'", 'sans-serif'],
        heading: ["'Space Grotesk'", 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
