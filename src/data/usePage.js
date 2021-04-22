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
                  mediaItemUrl
                  caption
                  altText
                  description
                }
              }
              seo {
                title
                metaDesc
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
