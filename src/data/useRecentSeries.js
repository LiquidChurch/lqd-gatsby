import { useStaticQuery, graphql } from "gatsby"
export const useRecentSeries = (numOfItems, excludeId) => {
  const data = useStaticQuery(
    graphql `
      query {
        allWpSeries (
            sort: {fields: SeriesImage___date, order: DESC}
          ){
          nodes {
            id
            name
            slug
            description
            SeriesImage {
              date
              image {
                caption
                altText
                description
                sourceUrl
              }
            }
            messages {
               nodes {
                 slug
                 id
                 title
                 date
                 content
                 featuredImage {
                   node {
                     id
                     sourceUrl
                     mediaItemUrl
                   }
                 }
                 attributions {
                  nodes {
                    id
                    name
                    slug
                    profileImage {
                      image {
                        sourceUrl
                      }
                    }
                  }
                }
                attributionsCo {
                  attributions {
                    id
                    name
                    slug
                  }
                }

                seriesList {
                  nodes {
                    name
                    id
                    slug
                  }
                }
                seriesPart {
                  part
                } 
              }
            }
          }
        }
      }
    `
  )

  let returnData = []
  let i
  for (i = 0; i < data.allWpSeries.nodes.length ; i++) {
    if (data.allWpSeries.nodes[i].id !== excludeId) {
      data.allWpSeries.nodes[i].category="series"
      returnData.push(data.allWpSeries.nodes[i])
      if (returnData.length === numOfItems) {
        break
      }
    }
  }
  
  return returnData
}