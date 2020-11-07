import { useStaticQuery, graphql } from "gatsby"
export const usePageById = (pageId) => {
  const data = useStaticQuery(
    graphql`
      query {
          allWpPage {
            nodes {
              id
              databaseId
              title
              slug
              uri
              featuredImage {
                node {
                  sourceUrl
                  caption
                  altText
                }
              }
              publication {
                  unpublishDate
                  publishDate
                }
              contentType {
                node {
                  label
                }
              }
            }
         } 
      }
    `
  )
  
  var pageInfo = data.allWpPage.nodes.find(
    ({ databaseId }) => databaseId === pageId
  )
  
  if (pageInfo !== undefined) {
    return pageInfo
  }
  
  return null
}
