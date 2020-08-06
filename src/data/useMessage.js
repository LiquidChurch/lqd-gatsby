import { useStaticQuery, graphql } from "gatsby"
export const useMessage = (messageId) => {
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
  messagePageInfo.category = "message"
  return messagePageInfo
  
}