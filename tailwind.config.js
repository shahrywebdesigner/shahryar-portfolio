
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Space Grotesk', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        base: {
          900: '#080B4A',
          800: '#10136B',
          700: '#191D83',
          600: '#25299B',
        },
        electric: {
          DEFAULT: '#42B8FF',
          50: '#E5F5FF',
          400: '#62C5FF',
          500: '#42B8FF',
          600: '#218FE8',
        },
        violet: {
          DEFAULT: '#3936C9',
          400: '#625FEA',
          500: '#4845D8',
          600: '#302DB5',
        },
      },
      animation: {
        aurora: 'aurora 12s ease infinite',
        'spin-slow': 'spin 20s linear infinite',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'float-badge': 'floatBadge 3s ease-in-out infinite',
        'pulse-ring': 'pulseRing 2s ease-in-out infinite',
      },
      keyframes: {
        aurora: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        floatBadge: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseRing: {
          '0%, 100%': {
            boxShadow: '0 0 0 0 rgba(66, 184, 255, 0.4)',
          },
          '50%': {
            boxShadow: '0 0 0 12px rgba(66, 184, 255, 0)',
          },
        },
      },
    },
  },
  plugins: [],
};
