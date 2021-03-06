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
              date
              slug
              message {
                vimeoId
                youtubeId
              }        
              featuredImage {
                node {
                  mediaItemUrl
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
    if ( (data.allWpMessage.nodes[i].publication.publishDate === null || currentDate >= Date.parse(data.allWpMessage.nodes[i].publication.publishDate.replace(/\s/g, 'T'))) &&
         (data.allWpMessage.nodes[i].publication.unpublishDate === null || currentDate < Date.parse(data.allWpMessage.nodes[i].publication.unpublishDate.replace(/\s/g, 'T'))) ) {
      returnData.push(data.allWpMessage.nodes[i])
    }
    if (returnData.length === numOfItems) {
      break
    }
  }

  return returnData
}