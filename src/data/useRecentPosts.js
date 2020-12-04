import { useStaticQuery, graphql } from "gatsby"
export const useRecentPosts = (numOfItems, categoryDbId, currentDate) => {
  const data = useStaticQuery(
    graphql`
      query {
          allWpPost (
              sort: {fields: date, order: DESC}
            ) {
            nodes {
              id
              blocks {
                ...AllBlocks
              }
              title
              content
              categories {
                nodes {
                  databaseId
                  slug
                }
              }
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
  for (let i = 0; i < data.allWpPost.nodes.length ; i++) {
    console.log(data.allWpPost.nodes[i].categories.nodes[0].databaseId)
    console.log(categoryDbId)
    if (data.allWpPost.nodes[i].categories.nodes[0].databaseId === categoryDbId) {
      data.allWpPost.nodes[i].category=data.allWpPost.nodes[i].categories.nodes[0].slug
      if ( (data.allWpPost.nodes[i].publication.publishDate === null || currentDate >= Date.parse(data.allWpPost.nodes[i].publication.publishDate.replace(/\s/g, 'T')) ) &&
           (data.allWpPost.nodes[i].publication.unpublishDate === null || currentDate < Date.parse(data.allWpPost.nodes[i].publication.unpublishDate.replace(/\s/g, 'T')) )) {

        returnData.push(data.allWpPost.nodes[i])
      }
      if (returnData.length === numOfItems) {
        break
      }
    }
  }
  return returnData
}