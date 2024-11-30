/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        dark_purple: {
          DEFAULT: '#160c28',
          100: '#040208',
          500: '#160c28',
          900: '#cab8ea'
        },
        naples_yellow: {
          DEFAULT: '#efcb68',
          500: '#efcb68',
        },
        honeydew: {
          DEFAULT: '#e1efe6',
          500: '#e1efe6',
        },
        ash_gray: {
          DEFAULT: '#aeb7b3',
          500: '#aeb7b3',
        },
        rich_black: {
          DEFAULT: '#000411',
          500: '#000411',
        }
      }
    },
  },
  plugins: [],
}