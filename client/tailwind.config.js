export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#FBF7EE',
          100: '#F5EDD8',
          200: '#E8D5A3',
          300: '#D9BC78',
          400: '#C9A24D',
          500: '#B08A3A',
          600: '#8A6A2A',
          700: '#6E5420',
          800: '#523E18',
          900: '#362910',
          950: '#1F1708',
        },
        ink: '#0F0F10',
        'ink-soft': '#5A5A62',
        cream: '#FAF7F1',
        blush: '#F3EEE4',
        leaf: {
          50: '#F4F8F3',
          100: '#E6EFE4',
          500: '#6C8F6E',
          600: '#557555',
          700: '#415C42',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"Inter"', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 6px 24px -8px rgba(138, 106, 42, 0.18)',
        card: '0 2px 12px -2px rgba(20, 20, 20, 0.08)',
      },
      borderRadius: {
        blob: '1.75rem',
      },
      keyframes: {
        'fade-up': { '0%': { opacity: '0', transform: 'translateY(12px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        'fade-in': { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        'slide-in-right': { '0%': { transform: 'translateX(100%)' }, '100%': { transform: 'translateX(0)' } },
        'slide': { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-100%)' } },
      },
      animation: {
        'fade-up': 'fade-up 0.5s ease-out both',
        'fade-in': 'fade-in 0.4s ease-out both',
        'slide-in-right': 'slide-in-right 0.28s ease-out both',
      },
    },
  },
  plugins: [],
};