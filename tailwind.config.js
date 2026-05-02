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
        edp: {
          green:  '#00A651',
          dark:   '#006E35',
          light:  '#7DC242',
          blue:   '#0066CC',
          bg:     '#0a0e1a',
          card:   '#131929',
          sidebar:'#0d1521',
          border: 'rgba(255,255,255,0.08)',
        },
      },
      fontFamily: {
        sans:    ['var(--font-inter)', 'sans-serif'],
        display: ['var(--font-outfit)', 'sans-serif'],
      },
      animation: {
        'fade-in':    'fadeIn 0.5s ease-out',
        'slide-up':   'slideUp 0.5s ease-out',
        'slide-right':'slideRight 0.4s ease-out',
        'glow':       'glow 2s ease-in-out infinite',
        'float':      'float 3s ease-in-out infinite',
        'pulse-green':'pulseGreen 2s ease-in-out infinite',
        'count-up':   'fadeIn 0.8s ease-out',
        'shimmer':    'shimmer 1.5s infinite',
      },
      keyframes: {
        fadeIn:      { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp:     { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        slideRight:  { '0%': { opacity: '0', transform: 'translateX(-20px)' }, '100%': { opacity: '1', transform: 'translateX(0)' } },
        glow:        { '0%,100%': { boxShadow: '0 0 20px rgba(0,166,81,0.3)' }, '50%': { boxShadow: '0 0 40px rgba(0,166,81,0.6)' } },
        float:       { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
        pulseGreen:  { '0%,100%': { opacity: '1' }, '50%': { opacity: '0.5' } },
        shimmer:     { '0%': { backgroundPosition: '-200px 0' }, '100%': { backgroundPosition: 'calc(200px + 100%) 0' } },
      },
      backgroundImage: {
        'edp-gradient': 'linear-gradient(135deg, #00A651 0%, #0066CC 100%)',
        'card-gradient': 'linear-gradient(135deg, #131929 0%, #1a2235 100%)',
      },
    },
  },
  plugins: [],
}
