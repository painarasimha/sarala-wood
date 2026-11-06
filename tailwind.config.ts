import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './content/**/*.{ts,tsx}'],
  theme: {
    extend: {
      // Tailwind only ships opacity in steps of 5, so `text-bronze/72` would
      // silently produce no rule at all. Every whole percent is registered
      // here so a colour/opacity pair can never fail quietly.
      opacity: Object.fromEntries(
        Array.from({ length: 101 }, (_, i) => [String(i), String(i / 100)])
      ),
      colors: {
        /* The page is paper. The only wood on it is the work itself. */
        paper: '#F3EEE4',
        'paper-2': '#EDE6D8',
        mat: '#FDFBF7',
        ink: '#191310',
        'ink-2': '#4C4137', // 8.1:1 on paper
        'ink-3': '#756657', // 4.6:1 on paper — captions and labels only
        bronze: '#855D34', // 5.3:1 on paper
        'bronze-2': '#A98247', // for use on the dark ground
        dark: '#15110E',
        'dark-ink': '#E9E1D2',
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'EB Garamond', 'Georgia', 'serif'],
        // Roman inscriptional capitals — letterforms that were cut, not drawn.
        caps: ['var(--font-caps)', 'Marcellus', 'Georgia', 'serif'],
      },
      fontSize: {
        label: ['0.78rem', { lineHeight: '1.4', letterSpacing: '0.2em' }],
        d1: ['clamp(2.5rem, 5.4vw, 4.5rem)', { lineHeight: '1.04', letterSpacing: '-0.008em' }],
        d2: ['clamp(1.95rem, 3.5vw, 3rem)', { lineHeight: '1.1', letterSpacing: '-0.008em' }],
        d3: ['clamp(1.3rem, 1.9vw, 1.6rem)', { lineHeight: '1.22' }],
        lead: ['clamp(1.0625rem, 1.3vw, 1.22rem)', { lineHeight: '1.66' }],
        body: ['1.0625rem', { lineHeight: '1.7' }],
        small: ['0.98rem', { lineHeight: '1.6' }],
        cap: ['0.75rem', { lineHeight: '1.45', letterSpacing: '0.07em' }],
      },
      spacing: {
        gutter: 'var(--gutter)',
        section: 'clamp(5rem, 10vw, 10rem)',
      },
      maxWidth: {
        wrap: '1240px',
        prose: '60ch',
        narrow: '44ch',
      },
      transitionTimingFunction: {
        carve: 'cubic-bezier(0.2, 0.7, 0.2, 1)',
      },
      transitionDuration: {
        500: '500ms',
        800: '800ms',
        1100: '1100ms',
      },
      keyframes: {
        'enter-up': {
          from: { transform: 'translateY(20px)' },
          to: { transform: 'translateY(0)' },
        },
        'enter-line': {
          from: { transform: 'translateY(108%)' },
          to: { transform: 'translateY(0)' },
        },
      },
      animation: {
        'enter-up': 'enter-up 620ms cubic-bezier(0.2,0.7,0.2,1) both',
        'enter-line': 'enter-line 620ms cubic-bezier(0.2,0.7,0.2,1) both',
      },
    },
  },
  plugins: [],
}

export default config
