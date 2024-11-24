console.info('contentScript is running')

import {getCurrentTab} from './currentTab'
import {analyzeSite} from './siteAnalysis'

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'GET_TAB_INFO') {
    sendResponse({
      ...getCurrentTab(),
      ...analyzeSite(),
    })
  }
})
