import { useStaticQuery, graphql } from "gatsby"
export const useMessageById = (messageId, currentDate) => {
  const data = useStaticQuery(
    graphql`
      query {
          allWpMessage {
            nodes {
              id
              databaseId
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
                  hometileDelist
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
  
  var messagePageInfo = data.allWpMessage.nodes.find(
    ({ databaseId }) => databaseId === messageId
  )

  if (messagePageInfo !== undefined) {
    messagePageInfo["category"] = "messages"
    if ( (messagePageInfo.publication.publishDate === null || currentDate >= Date.parse(messagePageInfo.publication.publishDate)) &&
         (messagePageInfo.publication.unpublishDate === null || currentDate < Date.parse(messagePageInfo.publication.unpublishDate)) ) {
      console.log('message valid')
      return messagePageInfo
    }
  }
  
  return null
}