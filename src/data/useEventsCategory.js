import { useStaticQuery, graphql } from "gatsby"
export const useEventsByCategory = (categoryId) => {
  const data = useStaticQuery(
    graphql`
      query {
          allWpEvent {
            nodes {
              id
              date
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
              event_categories {
                nodes {
                  databaseId
                }
              }
            }
         } 
      }
    `
  )
  
  let events = []
  
  data.allWpEvent.nodes.forEach((item, index) => {
    if (item.event_categories.nodes.length === 0) {
      return
    } else {
      item.event_categories.nodes.forEach(category => {
        if (category.databaseId === categoryId) {
          events.push(data.allWpEvent.nodes[index])
        }
      })
    }
  })
                                                
  if (events.length > 0) {
    events.sort((a, b) => {
      if (a.date > b.date) {
        return 1
      } else {
        return -1
      }
    })
    return events
  }
  
  return null
}
