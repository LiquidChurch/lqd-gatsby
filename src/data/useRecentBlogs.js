import { useStaticQuery, graphql } from "gatsby"
export const useRecentBlogs = (numOfItems) => {
  const data = useStaticQuery(
    graphql`
      query {
          allWpBlog (
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
              mediaBlurb {
                blurb
              }
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
  for (i = 0; i < data.allWpBlog.nodes.length ; i++) {
    data.allWpBlog.nodes[i].category="blogs"
    returnData.push(data.allWpBlog.nodes[i])
    if (returnData.length === numOfItems) {
      break
    }
  }
  
  return returnData
}