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

export const RichTextHelper = (props) => {
  console.log("remove paragraph", props)
  if (props === undefined) {
    return ""
  }
  
  var stringLength = props.length  
  var tempString = props.substring(3, stringLength-5)
  tempString = tempString.replace(/&lt;/g, '<')
 console.log("temp string", tempString)
  return tempString
}

export const isTouchEnabled = ()  => {
  return ( 'ontouchstart' in window ) ||  
         ( navigator.maxTouchPoints > 0 ) || 
         ( navigator.msMaxTouchPoints > 0 ); 
} 
