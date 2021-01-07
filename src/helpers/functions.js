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
  return props
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

export const isAppView = (searchValue) => {
  var query = searchValue.substring(1);

  var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) === 'appView') {
            return decodeURIComponent(pair[1])
        }
    }
    return ''
}

export const mediaUrlConverter = (wpMediaUrl) => {
  let tempUrlArray = wpMediaUrl.split("/")
  
  let imgixUrl = process.env.IMGIX_URL
  for (let i = process.env.IMG_DIR_INDEX; i < tempUrlArray.length; i++) {
    imgixUrl = imgixUrl + '/' + tempUrlArray[i]
  }
  return imgixUrl
}