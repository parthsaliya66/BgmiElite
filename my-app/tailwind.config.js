/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}', // Scans all JS, TS, JSX, and TSX files in src
  ],
  theme: {
    extend: {}, // Add custom theme extensions here if needed
  },
  plugins: [],
}