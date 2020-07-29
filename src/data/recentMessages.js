import { useStaticQuery, graphql } from "gatsby"
export const useRecentMessages = () => {
  const data = useStaticQuery(
    graphql`
      query {
          allWpLqdmMessage ( 
              limit: 4
              sort: {fields: date, order: DESC}
            ) {
            nodes {
              id
              slug
              date
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
  return data.allWpLqdmMessage.nodes  
}