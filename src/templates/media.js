import React from 'react'
import { graphql } from "gatsby"

export default ({
  location,
  data: {
    media,
  },
}) => {
  console.log("media: ", media.title)
  const ctx = useContext(GlobalContext)
  const userAgent = typeof window.navigator === "undefined" ? "" : navigator.userAgent
  
  useEffect(() => {
    ctx.setTheme("dark")
    if (!ctx.isMobileSet) {
      ctx.setIsMobile(Boolean(userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i)))
    }     
  }, [ctx])
  
  
  return (
  <>
  </>
  )
}

export const query = graphql`
  query Media($id: String!) {
    media: wpMediaItem(id: {eq:  $id}) {
      id
      title
      altText
      caption
      description
      mediaItemUrl
      sourceUrl
      databaseId
    }
  }
`