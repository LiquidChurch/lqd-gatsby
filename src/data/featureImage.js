import { useStaticQuery, graphql } from "gatsby"
export const useFeaturedImage = (pageSlug) => {
  const { wpgraphql } = useStaticQuery(
    graphql`
      query {
        wpgraphql {
          pages (
            first:2000
          ) {
            nodes {
              id
              slug
              title
              featuredImage {
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
  
  var featureImageInfo = wpgraphql.pages.nodes.find(
    ({ slug }) => slug === pageSlug
  )
  return featureImageInfo
  
}
