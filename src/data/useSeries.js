import { useStaticQuery, graphql } from "gatsby"
export const useSeries = (seriesSlug, currentDate) => {
  const data = useStaticQuery(
    graphql `
      query {
        allWpSeries {
          nodes {
            id
            name
            slug
            description
            SeriesImage {
              image {
                caption
                altText
                description
                mediaItemUrl
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
                     mediaItemUrl
                   }
                 }
                 publication {
                     unpublishDate
                     publishDate
                   }
                 attributions {
                  nodes {
                    id
                    name
                    slug
                    profileImage {
                      image {
                        mediaItemUrl
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
  
  if (seriesPageInfo !== undefined) {
    seriesPageInfo["category"] = "messages"
    
    for (let i=0; i < seriesPageInfo.messages.nodes.length; i++) {
      if ( (seriesPageInfo.messages.nodes[i].publication.publishDate === null || currentDate >= Date.parse(seriesPageInfo.messages.nodes[i].publication.publishDate.replace(/\s/g, 'T'))) &&
           (seriesPageInfo.messages.nodes[i].publication.unpublishDate === null || currentDate < Date.parse(seriesPageInfo.messages.nodes[i].publication.unpublishDate.replace(/\s/g, 'T'))) ) {
      } else {
        seriesPageInfo.messages.nodes.splice(i, 1)
      }
    }
    
    seriesPageInfo.messages.nodes.sort((a,b) => a.publication.publishDate > b.publication.publishDate ? 1: -1)
    return seriesPageInfo
  }
  
  return null
}