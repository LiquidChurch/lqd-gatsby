import { useStaticQuery, graphql } from "gatsby"
export const useImage = (imageId) => {
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
  
  console.log(imageId)
  console.log(data)
  var imageInfo = data.allWpMediaItem.nodes.find(
    ({ databaseId }) => databaseId === imageId
  )
  return imageInfo
}