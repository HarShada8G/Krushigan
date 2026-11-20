/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cg: {
          dark: '#164B35',
          primary: '#164B35',
          secondary: '#287A50',
          light: '#EAF4E9',
          cream: '#F8F7F0',
          card: '#FFFFFF',
          text: '#202D25',
          muted: '#5F6F65',
          border: '#DDE7DF',
          warning: '#F4B942',
          danger: '#D9534F',
          success: '#329568',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans Devanagari', 'sans-serif'],
        devanagari: ['Noto Sans Devanagari', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(22, 75, 53, 0.08)',
        'card': '0 2px 12px 0 rgba(0, 0, 0, 0.04), 0 1px 3px 0 rgba(0, 0, 0, 0.02)',
        'touch': '0 4px 14px 0 rgba(22, 75, 53, 0.25)',
      }
    },
  },
  plugins: [],
}
