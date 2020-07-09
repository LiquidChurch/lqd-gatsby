import { useStaticQuery, graphql } from "gatsby"
export const useMedia = (mediaSlug) => {
  const { wpgraphql } = useStaticQuery(
    graphql`
      query {
        wpgraphql {
          posts (
            first:2000
          ) {
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
                title
                caption
                altText
                description
                mediaItemUrl
              }
              author {
                avatar {
                  url
                }
                name
              }
            }
          }
        }
      }
    `
  )
  
  var mediaPageInfo = wpgraphql.posts.nodes.find(
    ({ slug }) => slug === mediaSlug
  )
  return mediaPageInfo
  
}