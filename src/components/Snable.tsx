import {useState} from 'react'
import {cn} from '../utils'

const snableExtension = 'https://chromewebstore.google.com/detail/snable-ui-inspector-css-s/gahcgpjomnmmmpimaodmdbaappflalkn'

export default function Snable() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className={cn('!mt-2.5', 'flex items-center gap-2 p-1.5 rounded-md bg-neutral-700/40', 'group cursor-pointer')}>
      <a className="flex items-center gap-[9px]" href={snableExtension} target="_blank">
        <div className={cn('p-2 size-[38px]', 'bg-[#1F1F1F] rounded-lg grid place-items-center')}>
          <div className={cn('size-full bg-white rounded-full', 'group-hover:scale-[1.1] group-hover:bg-white/80 duration-300')}></div>
        </div>

        <div className="flex-1">
          <p className="text-xs leading-[1.3]">
            Snable is here! Get complete version and unlock advanced tools. <span className={cn('!leading-none text-neutral-400 border-b border-b-neutral-400', 'group-hover:border-transparent duration-200')}>Install</span>
          </p>
        </div>
      </a>

      <button onClick={() => setIsVisible(false)} className="px-1 py-1.5  stroke-neutral-400 hover:stroke-neutral-500 duration-200">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </button>
    </div>
  )
}
