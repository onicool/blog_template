/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'cyber': {
          'primary': '#00ff9f',
          'secondary': '#00b8ff',
          'accent': '#ff00ff',
          'dark': '#0a0a0a',
          'light': '#1a1a1a'
        }
      },
      fontFamily: {
        'cyber': ['Orbitron', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace']
      },
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-body': '#4b5563',
            '--tw-prose-headings': '#374151',
            '--tw-prose-links': '#059669',
            '--tw-prose-code': '#059669',
            '--tw-prose-pre-bg': '#f3f4f6',
            '--tw-prose-invert-body': '#d1d5db',
            '--tw-prose-invert-headings': '#00ff9f',
            '--tw-prose-invert-links': '#00ff9f',
            '--tw-prose-invert-code': '#00ff9f',
            '--tw-prose-invert-pre-bg': '#0a0a0a',
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}