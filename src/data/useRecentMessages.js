import { useStaticQuery, graphql } from "gatsby"

export const useRecentMessages = (numOfItems, currentDate) => {
  const data = useStaticQuery(
    graphql`
      query {
          allWpMessage (
              limit: 100
              sort: {fields: date, order: DESC}
            ) {
            nodes {
              id
              blocks {
                ...AllBlocks
              }
              title
              content
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
              date
              slug
              message {
                url
              }        
              featuredImage {
                node {
                  sourceUrl
                  caption
                  altText
                }
              }
              publication {
                  unpublishDate
                  publishDate
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
              scriptures {
                nodes {
                  id
                  name
                  slug
                }
              }
              tags {
                nodes {
                  id
                  name
                  slug
                }
              }
            }
          }
        }
    `
  )
  
  let returnData = []
  let i
  for (i = 0; i < data.allWpMessage.nodes.length ; i++) {
    data.allWpMessage.nodes[i].category="messages"
    if ( (data.allWpMessage.nodes[i].publication.publishDate === null || currentDate >= Date.parse(data.allWpMessage.nodes[i].publication.publishDate + "T00:00:00")) &&
         (data.allWpMessage.nodes[i].publication.unpublishDate === null || currentDate < Date.parse(data.allWpMessage.nodes[i].publication.unpublishDate + "T00:00:00")) ) {
      returnData.push(data.allWpMessage.nodes[i])
    }
    if (returnData.length === numOfItems) {
      break
    }
  }
  
  return returnData
}