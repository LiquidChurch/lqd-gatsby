import { useStaticQuery, graphql } from "gatsby"
export const useMessage = (messageSlug) => {
  const data = useStaticQuery(
    graphql`
      query {
          allWpLqdmMessage {
            nodes {
              id
              slug
              title
              content
              excerpt
              featured_image
              display_order
              lqdmSeriesNodes {
                nodes {
                  id
                  name
                  slug
                }
              }  
            }
          }
        
      }
    `
  )
  
  var messagePageInfo = data.allWpLqdmMessage.nodes.find(
    ({ slug }) => slug === messageSlug
  )
  return messagePageInfo
  
}