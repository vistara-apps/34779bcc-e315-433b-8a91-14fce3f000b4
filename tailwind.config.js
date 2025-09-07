/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: 'hsl(210, 80%, 95%)',
          100: 'hsl(210, 80%, 90%)',
          500: 'hsl(210, 80%, 50%)',
          600: 'hsl(210, 80%, 45%)',
          700: 'hsl(210, 80%, 40%)',
        },
        accent: {
          50: 'hsl(160, 70%, 95%)',
          100: 'hsl(160, 70%, 90%)',
          500: 'hsl(160, 70%, 40%)',
          600: 'hsl(160, 70%, 35%)',
        },
        background: 'hsl(220, 15%, 95%)',
        surface: 'hsl(220, 15%, 100%)',
        purple: {
          500: '#8B5CF6',
          600: '#7C3AED',
          700: '#6D28D9',
        }
      },
      borderRadius: {
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
      },
      spacing: {
        'sm': '4px',
        'md': '8px',
        'lg': '16px',
      },
      boxShadow: {
        'card': '0 4px 12px hsla(0,0%,0%,0.08)',
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-in-out',
        'slide-up': 'slideUp 0.2s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
