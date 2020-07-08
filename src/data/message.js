import { useStaticQuery, graphql } from "gatsby"
export const useMessage = (messageSlug) => {
  const { wpgraphql } = useStaticQuery(
    graphql`
      query {
        wpgraphql {
          lqdmMessages (
            first:2000
          ) {
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
      }
    `
  )
  
  var messagePageInfo = wpgraphql.lqdmMessages.nodes.find(
    ({ slug }) => slug === messageSlug
  )
  return messagePageInfo
  
}