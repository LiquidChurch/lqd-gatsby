import { useStaticQuery, graphql } from "gatsby"
export const useSeries = (seriesSlug) => {
  const data = useStaticQuery(
    graphql `
      query {
        allWpSeries {
          nodes {
            id
            name
            slug
            SeriesImage {
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

  var seriesPageInfo = data.allWpSeries.nodes.find(
    ({ slug }) => slug === seriesSlug
  )
  
  return seriesPageInfo
}