import React from "react"
import Layout from "../components/Layout"
import { usePromoSlug } from '../data/usePromoSlug'
import { navigate } from "gatsby"
//import Button from "../components/Button"

export default ({
  location,
}) => {
  console.log(location)
  console.log('404', location.pathname.substring(1))
  var foundPage = usePromoSlug(location.pathname.substring(1))

  if (foundPage !== null) {
    console.log('foundPage', foundPage)
    window.location.replace(foundPage.uri)
  } else {
    window.location.replace('/')
  }
  
  return (
    <>
    </>
  )
}

