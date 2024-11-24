import {Config} from 'tailwindcss'
import {fontFamily} from 'tailwindcss/defaultTheme'

const config: Config = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './src/components/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Inter', ...fontFamily.sans],
    },
    extend: {
      colors: {
        background: '#0A0A0A',
        foreground: '#e6e6e6',
        primary: {
          DEFAULT: '#93ACC5',
          light: '#CED9E3',
          dark: '#3E5366',
        },
      },
    },
  },
  plugins: [],
}
export default config
