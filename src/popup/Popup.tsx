import type {TabInfo} from '../contentScript/currentTab'
import type {MoodAnalysis} from '../contentScript/siteAnalysis'

import {useState, useEffect} from 'react'
import {cn} from '../utils'

import Snable from '../components/Snable'
import Ripple from '../components/Ripple'

const IS_PROD = process.env.NODE_ENV === 'production'
type SiteInfo = TabInfo & MoodAnalysis

export function Popup() {
  const [siteInfo, setSiteInfo] = useState<SiteInfo | null>(null)
  const [tooltip, setTooltip] = useState('')

  useEffect(() => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id!, {type: 'GET_TAB_INFO'}, (response: SiteInfo) => {
        setSiteInfo(response)
      })
    })
  }, [])

  const handleCopy = async (color: string) => {
    try {
      await navigator.clipboard.writeText(color)
      setTooltip('Copied!')
      setTimeout(() => setTooltip(''), 1500)
    } catch (err) {
      setTooltip('Failed to copy!')
    }
  }

  const getMoodEmoji = (mood: MoodAnalysis['mood']) => {
    const emojis = {
      professional: '👔',
      creative: '🎨',
      minimalist: '💎',
      confident: '🦅',
      elegant: '✨',
      practical: '💠',
    }
    return emojis[mood]
  }

  const getMoodDescription = (mood: MoodAnalysis['mood'], scheme: MoodAnalysis['colorScheme']) => {
    const descriptions = {
      professional: 'Balanced and trustworthy design',
      creative: 'Unique and expressive approach',
      minimalist: 'Clean and focused experience',
      confident: 'Strong and memorable presence',
      elegant: 'Sophisticated and refined aesthetic',
      practical: 'Functional and straightforward design',
    }
    return `${descriptions[mood]} with ${scheme} color palette`
  }

  return (
    <main className="relative p-4 pt-3 space-y-3.5 min-h-32">
      <h3 className={cn('text-lg font-medium', siteInfo ? 'text-neutral-400' : 'text-neutral-400')}>
        {siteInfo ? (
          siteInfo.url
        ) : (
          <>
            <span className="text-red-400">Data missing! </span> Please reload the page.
          </>
        )}

        <span className="text-cyan-300">{!IS_PROD && ' DEV'}</span>
      </h3>

      {siteInfo && (
        <div className="space-y-5">
          <div className="flex items-center gap-3.5">
            <span className="text-4xl">{getMoodEmoji(siteInfo.mood)}</span>

            <div className="flex flex-col">
              <span className="text-lg font-medium capitalize">{siteInfo.mood}</span>
              <span className="text-sm leading-[1.2] font-light text-neutral-400">{getMoodDescription(siteInfo.mood, siteInfo.colorScheme)}</span>
            </div>
          </div>

          <div className="flex gap-2 p-2 rounded-md bg-neutral-700/50">
            {siteInfo.mainColors.map((color, i) => (
              <div key={i} className="w-full h-12 rounded ring-1 ring-neutral-600 relative group" style={{backgroundColor: color}} onClick={() => handleCopy(color)} onMouseEnter={() => setTooltip(color)} onMouseLeave={() => setTooltip('')}>
                <span className="absolute -top-[30px] left-1/2 transform -translate-x-1/2 px-1.5 py-1 text-xs text-neutral-800 bg-neutral-200 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">{tooltip || color}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <Snable />

      <Ripple className="absolute -top-14 left-[50%] -translate-x-1/2 -z-50" />
    </main>
  )
}
