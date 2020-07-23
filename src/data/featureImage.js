import { useStaticQuery, graphql } from "gatsby"
export const useFeaturedImage = (pageSlug) => {
  const data = useStaticQuery(
    graphql`
      query {
          allWpPage {
            nodes {
              id
              slug
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
            }
          }
        
      }
    `
  )
  
  var featureImageInfo = data.allWpPage.nodes.find(
    ({ slug }) => slug === pageSlug
  )
 
  console.log(featureImageInfo)
  return featureImageInfo
  
}
