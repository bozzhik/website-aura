import {useState, useEffect} from 'react'
import type {TabInfo} from '../contentScript/currentTab'
import Ripple from '../components/Ripple'

export function Popup() {
  const [tabInfo, setTabInfo] = useState<TabInfo | null>(null)

  useEffect(() => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id!, {type: 'GET_TAB_INFO'}, (response: {url: string}) => {
        setTabInfo(response)
      })
    })
  }, [])

  return (
    <main className="relative px-4 py-3 space-y-3">
      {tabInfo && <h3 className="text-lg font-medium">{tabInfo.url}</h3>}

      <div>{/* add mood analyze here */}</div>

      <Ripple className="absolute -top-14 left-[50%] -translate-x-1/2 -z-50 " />
    </main>
  )
}
