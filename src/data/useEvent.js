import { useStaticQuery, graphql } from "gatsby"
export const useEventById = (eventId) => {
  const data = useStaticQuery(
    graphql`
      query {
          allWpEvent {
            nodes {
              id
              databaseId
              title
              slug
              uri
              featuredImage {
                node {
                  mediaItemUrl
                  caption
                  altText
                  description
                }
              }
              publication {
                  unpublishDate
                  publishDate
                  promoSlug
                }
              contentType {
                node {
                  label
                }
              }
              mediaBlurb {
                blurb
              }
              EventInfo {
                active
                audience
                date
              }
            }
         } 
      }
    `
  )
  
  var eventInfo = data.allWpEvent.nodes.find(
    ({ databaseId }) => databaseId === eventId
  )
  
  if (eventInfo !== undefined) {
    return eventInfo
  }
  
  return null
}
