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
  useEffect(() => {
    ctx.setTheme("dark")
    if (isTouchEnabled()) {
      ctx.enableTouchState()
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