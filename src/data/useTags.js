import { useStaticQuery, graphql } from "gatsby"

export const useTags = (tag, currentDate) => {
  const data = useStaticQuery(
    graphql`
      query {
          allWpTag {
            nodes {
              name
              messages {
                nodes {
                  id
                  slug
                  title
                  content
                  featuredImage {
                    node {
                      mediaItemUrl
                    }
                  }
                }
              }
            }
         } 
      }
    `
  )
  
  var tagInfo = data.allWpTag.nodes.find(
    ({ name }) => name.toLowerCase() === tag.toLowerCase()
  )
  
  if (tagInfo !== undefined) {
    return tagInfo
  }
  
  return null
}