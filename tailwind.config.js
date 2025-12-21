/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: '#0f172a',
        card: '#111827',
        brand: {
          DEFAULT: '#22d3ee',
          accent: '#a78bfa',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Segoe UI', 'sans-serif'],
      },
      boxShadow: {
        elevated: '0 12px 40px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  plugins: [],
}
