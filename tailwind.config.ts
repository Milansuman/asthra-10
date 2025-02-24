import { heroui } from '@heroui/theme';
import type { Config } from 'tailwindcss';

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    './node_modules/@heroui/theme/dist/components/(button|ripple|spinner).js',
  ],
  prefix: '',
  theme: {
<<<<<<< HEAD
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        button: {
          primary: 'hsl(var(--button-primary))',
          secondary: 'hsl(var(--button-secondary))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      cursor: {
        default: 'url("/cursor/small.png") 0 0, default',
        pointer: 'url("/cursor/point.png") 0 0, pointer',
        clicked: 'url("/cursor/clicked.png") 0 0, pointer',
        'not-allowed': 'url("/cursor/red.png") 0 0, not-allowed',
        text: 'url("/cursor/text.png") 0 0, text',
        // wait: 'url("/cursor/loading.png") 0 0, wait',
        grab: 'url("/cursor/closed.png") 0 0, grab',
        grabbing: 'url("/cursor/open.png") 0 0, grabbing',
        // move: 'url("/cursor/move.png") 0 0, move',
        // 'row-resize': 'url("/cursor/row-resize.png") 0 0, row-resize',
        // 'col-resize': 'url("/cursor/col-resize.png") 0 0, col-resize',
        // help: 'url("/cursor/help.png") 0 0, help',
        // crosshair: 'url("/cursor/crosshair.png") 0 0, crosshair',
        // 'zoom-in': 'url("/cursor/zoom-in.png") 0 0, zoom-in',
        // 'zoom-out': 'url("/cursor/zoom-out.png") 0 0, zoom-out',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('tailwindcss-motion'),
    require('@tailwindcss/container-queries'),
    require('@tailwindcss/typography'),
    require('tailwind-corner-smoothing'),
    require('tailwindcss-bg-patterns'),
    heroui(),
  ],
} satisfies Config;

export default config;
