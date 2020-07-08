import { useStaticQuery, graphql } from "gatsby"
export const useImage = (imageId) => {
  const { wpgraphql } = useStaticQuery(
    graphql`
      query {
        wpgraphql {
          mediaItems (
            first:2000
          ) {
            nodes {
              id
              mediaItemId
              mediaItemUrl
              altText
              caption
              description
            }
          }
        }
      }
    `
  )
  
  var imageInfo = wpgraphql.mediaItems.nodes.find(
    ({ mediaItemId }) => mediaItemId === imageId
  )
  return imageInfo
}