import { useStaticQuery, graphql } from "gatsby"
export const usePromoSlug = (promoSlug, currentDate) => {
  const data = useStaticQuery(
    graphql`
      query {
          allWpPage {
            nodes {
              id
              slug
              uri
              publication {
                unpublishDate
                publishDate
                promoSlug
              }
            }
          }
        }
      `
    )

  let returnItem = null
  
  for (let i = 0; i < data.allWpPage.nodes.length; i++) {
    if (data.allWpPage.nodes[i].publication.promoSlug !== null && data.allWpPage.nodes[i].publication.promoSlug.toLowerCase() === promoSlug.toLowerCase()) {
      
      returnItem = data.allWpPage.nodes[i]
      break;
    }
  }
  
  if (returnItem !== null) {
    if ( (returnItem.publication.publishDate === null || currentDate >= Date.parse(returnItem.publication.publishDate.replace(/\s/g, 'T')) ) &&
         (returnItem.publication.unpublishDate === null || currentDate < Date.parse(returnItem.publication.unpublishDate.replace(/\s/g, 'T')) )) {
      return returnItem
    }
  }
  
  return null
}