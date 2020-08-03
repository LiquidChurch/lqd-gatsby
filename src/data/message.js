import { useStaticQuery, graphql } from "gatsby"
export const useMessage = (messageSlug) => {
  const data = useStaticQuery(
    graphql`
      query {
          allWpMessage {
            nodes {
              id
              blocks {
                ...AllBlocks
              }
              title
              content
              speakers {
                nodes {
                  name
                  id
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
    ({ slug }) => slug === messageSlug
  )
  return messagePageInfo
  
}