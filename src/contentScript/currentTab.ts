export type TabInfo = {
  url: string
  // favicon: string
}

export function getCurrentTab(): TabInfo {
  // const getFaviconUrl = (pageUrl: string) => {
  //   const url = new URL(chrome.runtime.getURL('/_favicon/'))
  //   url.searchParams.set('pageUrl', pageUrl)
  //   url.searchParams.set('size', '32')
  //   return url.toString()
  // }

  const parseUrl = (url: string): string => {
    try {
      return new URL(url).hostname
    } catch {
      return url
    }
  }

  return {
    url: parseUrl(window.location.href),
    // favicon: getFaviconUrl(window.location.href),
  }
}
