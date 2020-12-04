import React from 'react'
import { graphql } from "gatsby"
import { isAppView } from '../helpers/functions'

export default ({
  location,
  data: {
    media,
  },
}) => {
  console.log("media: ", media.title)
  const ctx = useContext(GlobalContext)
  
  let theme = 'dark'
  if (isAppView(location.search) === "true" || ctx.currentTheme === 'app') {
    theme = 'app'
  }
  
  useEffect(() => {
    ctx.setTheme(theme)
     let userAgent = typeof window.navigator === "undefined" ? "" : navigator.userAgent
    if (!ctx.isMobileSet) {
      ctx.setIsMobile(Boolean(userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i)))
    }     
  }, [ctx, theme])
  
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