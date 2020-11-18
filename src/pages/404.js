import React, { useEffect } from "react"
import Layout from "../components/Layout"
import { usePromoSlug } from '../data/usePromoSlug'
import { navigate } from "gatsby"
//import Button from "../components/Button"

export default ({
  location,
}) => {
  
  //const navigate = useNavigate();
  
  let urlPath = location.pathname.split("/").filter(n => n)
  
  let subPath = ""
  
  for (let i = 1; i < urlPath.length; i++ ){
    subPath = subPath + "/" + urlPath[i]
  }
  
  console.log('urlpath', urlPath[0])
  console.log('subpath', subPath)
  
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
        console.log('foundPage', foundPage)
        window.location.replace(foundPage.uri)
      } else {
        //window.location.replace('/')
      }
     }
    }
  })
  
  
  return (
    <>
    </>
  )
}

