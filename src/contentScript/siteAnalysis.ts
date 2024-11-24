export type MoodAnalysis = {
  mood: 'professional' | 'creative' | 'minimalist' | 'confident' | 'elegant' | 'practical'
  mainColors: string[]
  colorScheme: 'monochromatic' | 'analogous' | 'complementary' | 'practical' | 'vibrant'
}

type RGB = {r: number; g: number; b: number}

export function analyzeSite(): MoodAnalysis {
  const elements = document.querySelectorAll('*')
  const colorMap = new Map<string, number>()

  elements.forEach((el) => {
    const styles = window.getComputedStyle(el)
    ;['backgroundColor', 'color', 'borderColor'].forEach((prop) => {
      const color = styles[prop as 'backgroundColor' | 'color' | 'borderColor']
      if (color && color !== 'rgba(0, 0, 0, 0)' && color !== 'transparent' && color !== 'rgb(255, 255, 255)' && color !== '#ffffff' && color !== '#fff') {
        colorMap.set(color, (colorMap.get(color) || 0) + 1)
      }
    })
  })

  const sortedColors = Array.from(colorMap.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([color]) => parseColor(color))
    .filter((c): c is RGB => c !== null)
    .reduce((unique, color) => {
      const isDuplicate = unique.some((existingColor) => isSimilarColor(color, existingColor))
      if (!isDuplicate) unique.push(color)
      return unique
    }, [] as RGB[])

  const mainColors = sortedColors.slice(0, 5).map(rgbToHex)
  const colorScheme = analyzeColorScheme(sortedColors)
  const mood = analyzeMood(sortedColors, colorScheme)

  return {
    mood,
    mainColors: mainColors.length ? mainColors : ['#e0e0e0'],
    colorScheme,
  }
}

function isSimilarColor(color1: RGB, color2: RGB): boolean {
  const threshold = 30
  return Math.abs(color1.r - color2.r) < threshold && Math.abs(color1.g - color2.g) < threshold && Math.abs(color1.b - color2.b) < threshold
}

function parseColor(color: string): RGB | null {
  if (color.startsWith('rgba')) {
    const match = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/)
    if (match) {
      return {
        r: parseInt(match[1]),
        g: parseInt(match[2]),
        b: parseInt(match[3]),
      }
    }
  }

  if (color.startsWith('rgb')) {
    const match = color.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)/)
    if (match) {
      return {
        r: parseInt(match[1]),
        g: parseInt(match[2]),
        b: parseInt(match[3]),
      }
    }
  }

  if (color.startsWith('#')) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color)
    if (result) {
      return {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    }
  }
  return null
}

function getColorBrightness({r, g, b}: RGB): number {
  return (r * 299 + g * 587 + b * 114) / 1000
}

function getColorSaturation({r, g, b}: RGB): number {
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  return max === 0 ? 0 : (max - min) / max
}

function analyzeColorScheme(colors: RGB[]): MoodAnalysis['colorScheme'] {
  if (colors.length === 0) return 'practical'

  const saturations = colors.map(getColorSaturation)
  const avgSaturation = saturations.reduce((a, b) => a + b, 0) / saturations.length

  const hues = colors.map(({r, g, b}) => Math.atan2(Math.sqrt(3) * (g - b), 2 * r - g - b))
  const hueDiffs = hues.map((h, i) => Math.abs(h - hues[0]))
  const avgHueDiff = hueDiffs.reduce((a, b) => a + b, 0) / hueDiffs.length

  if (avgSaturation < 0.2) return 'practical'
  if (avgHueDiff < 0.5) return 'monochromatic'
  if (avgHueDiff < 1.5) return 'analogous'
  if (avgSaturation > 0.6) return 'vibrant'
  return 'complementary'
}

function analyzeMood(colors: RGB[], scheme: MoodAnalysis['colorScheme']): MoodAnalysis['mood'] {
  if (colors.length === 0) return 'practical'

  const brightnesses = colors.map(getColorBrightness)
  const saturations = colors.map(getColorSaturation)

  const avgSaturation = saturations.reduce((a, b) => a + b, 0) / saturations.length
  const contrast = Math.max(...brightnesses) - Math.min(...brightnesses)

  if (scheme === 'monochromatic' && avgSaturation < 0.4) return 'professional'
  if (colors.length < 4 && contrast > 100) return 'minimalist'
  if (avgSaturation > 0.6 && scheme === 'vibrant') return 'creative'
  if (avgSaturation < 0.3 && contrast > 150) return 'elegant'
  if (avgSaturation > 0.5 && scheme === 'complementary') return 'confident'

  return 'practical'
}

function rgbToHex({r, g, b}: RGB): string {
  return (
    '#' +
    [r, g, b]
      .map((x) => {
        const hex = x.toString(16)
        return hex.length === 1 ? '0' + hex : hex
      })
      .join('')
  )
}
