import React, { useEffect } from "react"
import { usePromoSlug } from '../data/usePromoSlug'

export default ({
  location,
}) => {
  let locationPath = location.pathname.toLowerCase()
  let urlPath = locationPath.split("/").filter(n => n)
  console.log('404 page', urlPath)
  let subPath = ""
  
  for (let i = 1; i < urlPath.length; i++ ){
    subPath = subPath + "/" + urlPath[i]
    subPath = subPath.toLowerCase()
  }
  
  if (urlPath !==  null) {
    var foundPage = usePromoSlug(urlPath[0])
  }
  
  useEffect(() => {
    if (urlPath !== null) {      
      switch(urlPath[0]) {
        case "job":
          window.location.replace("/jobs" + subPath)
          break;
        case "blog":
          switch(urlPath[1]) {
            case "elixir":
              window.location.replace("/blogs/" + urlPath[2])
              break;
            case "liquid-parents-devotional":
              window.location.replace("/liquid-parents-devotional/" + urlPath[2])
              break;
            case "uncategorized":
              window.location.replace("/liquid-parents-devotional/" + urlPath[2])
              break;
            default:
              window.location.replace("/blogs" + subPath)          
          }
          break;  
        case "message":
          window.location.replace("/messages" + subPath)
          break;  
        default:
          if (foundPage !== null) {
            window.location.replace(foundPage.uri)
          } else {
            console.log('404 page no match', location)
            setTimeout(() => {window.location.replace('/')},1000)
          }
       }
    }
  })
  
  return (
    <>
    </>
  )
}

