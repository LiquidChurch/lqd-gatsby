import { useStaticQuery, graphql } from "gatsby"
export const useRecentMessages = (numOfItems) => {
  const data = useStaticQuery(
    graphql`
      query {
          allWpMessage (
              limit: 50
              sort: {fields: date, order: DESC}
            ) {
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
  
  let returnData = []
  let i
  for (i = 0; i < data.allWpMessage.nodes.length ; i++) {
    returnData.push(data.allWpMessage.nodes[i]) 
    if (returnData.length === numOfItems) {
      break
    }
  }
  
  return returnData
}