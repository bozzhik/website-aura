import {Config} from 'tailwindcss'
import {fontFamily} from 'tailwindcss/defaultTheme'

const config: Config = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './src/components/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Inter', ...fontFamily.sans],
    },
    extend: {},
  },
  plugins: [],
}
export default config
