import { useStaticQuery, graphql } from "gatsby"
export const useBlog = (blogId) => {
  const data = useStaticQuery(
    graphql`
      query {
          allWpBlog (
              sort: {fields: date, order: DESC}
            ){
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
