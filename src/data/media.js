import { useStaticQuery, graphql } from "gatsby"
export const useMedia = (mediaSlug) => {
  const data = useStaticQuery(
    graphql`
      query {
          allWpPost {
            nodes {
              id
              slug
              title
              date
              categories {
                nodes {
                  slug
                }
              }
              featuredImage {
                node {
                  title
                  caption
                  altText
                  description
                  mediaItemUrl
                }
              }
            }
          }
        
      }
    `
  )
  
  var mediaPageInfo = data.allWpPost.nodes.find(
    ({ slug }) => slug === mediaSlug
  )
  return mediaPageInfo
  
}