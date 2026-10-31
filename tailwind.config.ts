import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './content/**/*.{ts,tsx}'],
  theme: {
    extend: {
      // Tailwind only ships opacity in steps of 5, so `text-brass/72` would
      // silently produce no rule at all. Every whole percent is registered
      // here so a colour/opacity pair can never fail quietly.
      opacity: Object.fromEntries(
        Array.from({ length: 101 }, (_, i) => [String(i), String(i / 100)])
      ),
      colors: {
        ebony: '#1c120c',
        rosewood: '#3a2016',
        teak: '#6b3f22',
        honey: '#b9814a',
        // A deepened honey for text on light grounds — #b9814a itself only
        // reaches 2.99:1 on ivory, which fails AA at any size.
        amber: '#8f5a2c',
        brass: '#c9a35f',
        sandalwood: '#efe3cf',
        ivory: '#f8f2e7',
        ink: '#2a1d15',
        muted: '#6d5745',
      },
      fontFamily: {
        serif: ['var(--font-display)', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['var(--font-body)', 'Manrope', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Strict fluid type scale
        // 0.75rem = 12px: the floor for legible text on a phone.
        eyebrow: ['0.75rem', { lineHeight: '1.2', letterSpacing: '0.3em' }],
        'd1': ['clamp(3rem, 8.2vw, 7.4rem)', { lineHeight: '0.98', letterSpacing: '-0.015em' }],
        'd2': ['clamp(2.4rem, 5.4vw, 4.6rem)', { lineHeight: '1.04', letterSpacing: '-0.012em' }],
        'd3': ['clamp(1.9rem, 3.2vw, 2.9rem)', { lineHeight: '1.1', letterSpacing: '-0.008em' }],
        'd4': ['clamp(1.45rem, 2.1vw, 1.95rem)', { lineHeight: '1.18' }],
        'lead': ['clamp(1.02rem, 1.25vw, 1.18rem)', { lineHeight: '1.75' }],
        'body': ['0.975rem', { lineHeight: '1.78' }],
        'small': ['0.86rem', { lineHeight: '1.65' }],
      },
      spacing: {
        gutter: 'var(--gutter)',
        section: 'clamp(5.5rem, 10vw, 9.5rem)',
        'section-lg': 'clamp(7rem, 13vw, 12rem)',
      },
      maxWidth: {
        wrap: '1380px',
        prose: '58ch',
        narrow: '46ch',
      },
      transitionTimingFunction: {
        carve: 'cubic-bezier(0.22, 0.75, 0.2, 1)',
        chisel: 'cubic-bezier(0.65, 0, 0.35, 1)',
      },
      transitionDuration: {
        600: '600ms',
        900: '900ms',
        1200: '1200ms',
      },
      borderRadius: {
        arch: '999px 999px 6px 6px',
      },
      boxShadow: {
        lift: '0 40px 90px -36px rgba(58, 32, 22, 0.55)',
        seal: '0 18px 44px -14px rgba(0, 0, 0, 0.5)',
      },
      keyframes: {
        'slow-push': { from: { transform: 'scale(1.14)' }, to: { transform: 'scale(1)' } },
        'cue': {
          '0%': { transform: 'scaleY(0)', transformOrigin: 'top' },
          '50%': { transform: 'scaleY(1)', transformOrigin: 'top' },
          '51%': { transformOrigin: 'bottom' },
          '100%': { transform: 'scaleY(0)', transformOrigin: 'bottom' },
        },
        'draw': { from: { strokeDashoffset: '1' }, to: { strokeDashoffset: '0' } },
      },
      animation: {
        'slow-push': 'slow-push 14s cubic-bezier(0.2,0.6,0.2,1) forwards',
        cue: 'cue 2.6s cubic-bezier(0.65,0,0.35,1) infinite',
      },
    },
  },
  plugins: [],
}

export default config
