import { useStaticQuery, graphql } from "gatsby"
export const useFeaturedImage = (pageSlugId) => {
  const data = useStaticQuery(
    graphql`
      query {
          allWpPage {
            nodes {
              id
              databaseId
              slug
              uri
              title
              featuredImage {
                node {
                  title
                  caption
                  altText
                  description
                  mediaItemUrl
                }
              }
              publication {
                  unpublishDate
                  publishDate
              }
            }
          }
        
      }
    `
  )
  
  var featureImageInfo = data.allWpPage.nodes.find(
    ({ databaseId }) => databaseId === pageSlugId
  )
 
  return featureImageInfo 
}