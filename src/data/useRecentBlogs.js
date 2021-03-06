import { useStaticQuery, graphql } from "gatsby"
export const useRecentBlogs = (numOfItems, currentDate) => {
  const data = useStaticQuery(
    graphql`
      query {
          allWpBlog (
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
  
  let returnData = []
  for (let i = 0; i < data.allWpBlog.nodes.length ; i++) {
    data.allWpBlog.nodes[i].category="blogs"
    if ( (data.allWpBlog.nodes[i].publication.publishDate === null || currentDate >= Date.parse(data.allWpBlog.nodes[i].publication.publishDate.replace(/\s/g, 'T')) ) &&
         (data.allWpBlog.nodes[i].publication.unpublishDate === null || currentDate < Date.parse(data.allWpBlog.nodes[i].publication.unpublishDate.replace(/\s/g, 'T')) )) {

      returnData.push(data.allWpBlog.nodes[i])
    }
    if (returnData.length === numOfItems) {
      break
    }
  }
  return returnData
}