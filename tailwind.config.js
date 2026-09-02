/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        heading: ['Outfit', 'system-ui', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
      colors: {
        cream: '#FFFDF5',
        dark: '#1E293B',
        accent: {
          DEFAULT: '#8B5CF6',
          hover: '#7C3AED',
          light: '#F3E8FF',
        },
        secondary: {
          DEFAULT: '#F472B6',
          hover: '#EC4899',
          light: '#FCE7F3',
        },
        tertiary: {
          DEFAULT: '#FBBF24',
          hover: '#F59E0B',
          light: '#FEF3C7',
        },
        quaternary: {
          DEFAULT: '#34D399',
          hover: '#10B981',
          light: '#D1FAE5',
        },
        muted: {
          DEFAULT: '#F1F5F9',
          foreground: '#64748B',
        },
        border: '#E2E8F0',
      },
      boxShadow: {
        'pop': '4px 4px 0px 0px #1E293B',
        'pop-hover': '6px 6px 0px 0px #1E293B',
        'pop-active': '2px 2px 0px 0px #1E293B',
        'pop-lg': '8px 8px 0px 0px #1E293B',
        'pop-pink': '4px 4px 0px 0px #F472B6',
        'pop-amber': '4px 4px 0px 0px #FBBF24',
        'pop-mint': '4px 4px 0px 0px #34D399',
        'pop-violet': '4px 4px 0px 0px #8B5CF6',
        'pop-soft': '4px 4px 0px 0px #CBD5E1',
      },
      transitionTimingFunction: {
        'bounce-pop': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      animation: {
        'bounce-in': 'bounceIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        'wiggle': 'wiggle 0.4s ease-in-out',
      },
      keyframes: {
        bounceIn: {
          '0%': { transform: 'scale(0.92)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(-3deg)' },
          '75%': { transform: 'rotate(3deg)' },
        }
      }
    },
  },
  plugins: [],
}
