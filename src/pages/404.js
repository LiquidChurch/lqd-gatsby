import React, { useEffect } from "react"
import { usePromoSlug } from '../data/usePromoSlug'

export default ({
  location,
}) => {
  console.log('404 page')
  //const navigate = useNavigate();
  
  let urlPath = location.pathname.split("/").filter(n => n)
  
  let subPath = ""
  
  for (let i = 1; i < urlPath.length; i++ ){
    subPath = subPath + "/" + urlPath[i]
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
      window.location.replace("/blogs" + subPath)
      break;  
    case "message":
      window.location.replace("/messages" + subPath)
      break;  
    default:
      if (foundPage !== null) {
        window.location.replace(foundPage.uri)
      } else {
        window.location.replace('/')
      }
     }
    }
  })
  
  
  return (
    <>
    </>
  )
}

