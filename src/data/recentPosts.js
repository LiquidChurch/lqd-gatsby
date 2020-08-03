import { useStaticQuery, graphql } from "gatsby"
export const useRecentPosts = (postType) => {
  const data = useStaticQuery(
    graphql`
      query {
          allWpPost ( 
              sort: {fields: date, order: DESC}
            ) {
            nodes {
              id
              slug
              title
              date
              categories {
                nodes {
                  slug
                }
              }
              featuredImage {
                node {
                  title
                  caption
                  altText
                  description
                  mediaItemUrl
                }
              }
              author {
                node {
                  avatar {
                    url
                  }
                  name
                }
              }
            }
          }
        }
    `
  )
  
  
  let returnData = []
  let i
  for (i = 0; i < data.allWpPost.nodes.length ; i++) {
    if (data.allWpPost.nodes[i].categories.nodes[0].slug === postType) {
      returnData.push(data.allWpPost.nodes[i]) 
    }
    if (returnData.length === 5) {
      break
    }
  }
  
  return returnData
}