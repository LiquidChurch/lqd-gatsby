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
                content
                featuredImage {
                  node {
                    id
                    sourceUrl
                    mediaItemUrl
                  }
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