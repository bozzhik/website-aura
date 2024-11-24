import {useState, useEffect} from 'react'
import type {TabInfo} from '../contentScript/currentTab'
import type {MoodAnalysis} from '../contentScript/siteAnalysis'
import Ripple from '../components/Ripple'

type SiteInfo = TabInfo & MoodAnalysis

export function Popup() {
  const [siteInfo, setSiteInfo] = useState<SiteInfo | null>(null)

  useEffect(() => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id!, {type: 'GET_TAB_INFO'}, (response: SiteInfo) => {
        setSiteInfo(response)
      })
    })
  }, [])

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
    <main className="relative p-4 pt-3 space-y-3.5">
      {siteInfo && (
        <>
          <h3 className="text-lg font-medium text-neutral-400">{siteInfo.url}</h3>

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
                <div key={i} className="w-full h-12 rounded ring-1 ring-neutral-600" style={{backgroundColor: color}} title={color} />
              ))}
            </div>
          </div>
        </>
      )}

      <Ripple className="absolute -top-14 left-[50%] -translate-x-1/2 -z-50" />
    </main>
  )
}
