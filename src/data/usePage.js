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
              featuredImage {
                node {
                  sourceUrl
                  caption
                  altText
                }
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
