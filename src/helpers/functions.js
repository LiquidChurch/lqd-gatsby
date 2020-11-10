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
  if (props === undefined || props === null) {
    return ""
  }  
  var stringLength = props.length
  var tempString = props.substring(3, stringLength-5)
  tempString = tempString.replace(/&lt;/g, '<')
  tempString = tempString.replace(/<\/?p[^>]*>/g, "")                      
  return tempString
}

export const ClassicTextHelper = (props) => {
  if (props === undefined || props === null) {
    return ""
  }  
  props = props.replace(/&lt;/g, '<')
  props = props.replace(/&gt;/g, '>')
  props = props.replace(/<\/?p[^>]*>/g, "")
  return props
}

export const isTouchEnabled = ()  => {
  return ( 'ontouchstart' in window ) ||  
         ( navigator.maxTouchPoints > 0 ) || 
         ( navigator.msMaxTouchPoints > 0 ); 
} 

export const getDate = (searchValue) => {
  var query = searchValue.substring(1);

  var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) === 'setDate') {
            return Date.parse(decodeURIComponent(pair[1]))
        }
    }
  
  var d = new Date()
  var date = d.toLocaleDateString('sv-SE',)
  var hour = ('0' + d.getHours().toString()).slice(-2)
  var min = ('0' + d.getMinutes().toString()).slice(-2) 
  return Date.parse(date + "T" + hour + ":" + min + ":00")
}