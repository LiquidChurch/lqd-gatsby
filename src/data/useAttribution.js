import { useStaticQuery, graphql } from "gatsby"
export const useAttributionById = (attributionId) => {
  const data = useStaticQuery(
    graphql`
      query {
          allWpAttribution {
            nodes {
              id
              databaseId
              name
              slug
              description
              profileImage {
                image {
                  id
                  mediaItemUrl
                  sourceUrl
                }
                blurb
                role
              }
            }
          }
        }
      `
    )
  
  var attributionInfo = data.allWpAttribution.nodes.find(
    ({ databaseId }) => databaseId === attributionId
  )

  if (attributionInfo !== undefined) {
    return attributionInfo
  }
  
  return null
}