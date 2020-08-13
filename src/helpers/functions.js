export const isLocalAbsoluteUrl = (url, siteUrl) => {
  if (-1 !== normalizeUrlPrefix(url).indexOf(normalizeUrlPrefix(siteUrl))) {
    return true
  }

  return false
}

export const isRelativeUrl = url => 0 === url.indexOf("/")

export const normalizeUrlPrefix = url => url.replace(/(^\w+:|^)\/\//, "")

export const getRelativeUrl = (url, siteUrl) => {
  const normalizedUrl = url.replace(/(^\w+:|^)\/\//, "")
  const normalizedSiteUrl = siteUrl.replace(/(^\w+:|^)\/\//, "")

  return normalizedUrl.replace(normalizedSiteUrl, "")
}

export const RemoveParagraph = (props) => {
  var stringLength = props.tempString.length  
  var tempString = props.tempString.substring(3, stringLength-5)
  return tempString
}

export const isTouchEnabled = ()  => {
  return ( 'ontouchstart' in window ) ||  
         ( navigator.maxTouchPoints > 0 ) || 
         ( navigator.msMaxTouchPoints > 0 ); 
} 
