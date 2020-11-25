import { useStaticQuery, graphql } from "gatsby"
export const useRecentSeries = (numOfItems, currentDate, excludeId) => {
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
          }
        }
      }
    `
  )

  let returnData = []
  let i
  for (i = 0; i < data.allWpSeries.nodes.length ; i++) {
    if (data.allWpSeries.nodes[i].id !== excludeId && 
        currentDate >= Date.parse(data.allWpSeries.nodes[i].SeriesImage.date+'T19:00:00')) {
      
      data.allWpSeries.nodes[i].category="series"
      returnData.push(data.allWpSeries.nodes[i])
      if (returnData.length === numOfItems) {
        break
      }
    }
  }

  returnData.sort((a,b) => a.SeriesImage.date < b.SeriesImage.date ? 1: -1)
  
  return returnData
}