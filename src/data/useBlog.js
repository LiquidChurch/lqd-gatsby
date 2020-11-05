import { useStaticQuery, graphql } from "gatsby"
export const useBlog = (blogId) => {
  const data = useStaticQuery(
    graphql`
      query {
          allWpBlog {
            nodes {
              id
              databaseId
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
  
  var blogPageInfo = data.allWpBlog.nodes.find(
    ({ databaseId }) => databaseId === blogId
  )
  blogPageInfo.category = "blogs"
  return blogPageInfo
  
}
