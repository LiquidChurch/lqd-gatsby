import { useStaticQuery, graphql } from "gatsby"
export const useImageById = (imageId) => {  
  const data = useStaticQuery(
    graphql`
      query {
          allWpMediaItem  {
            nodes {
              id
              databaseId
              mediaItemUrl
              altText
              caption
              description
            }
          }
        
      }
    `
  )

  var imageInfo = data.allWpMediaItem.nodes.find(
    ({ databaseId }) => databaseId === imageId
  )
  return imageInfo
}