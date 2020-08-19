import { useStaticQuery, graphql } from "gatsby"

export const useCampusById = (campusId) => {  
  const data = useStaticQuery(
    graphql`
      query {
          allWpCampus  {
            nodes {
              id
              databaseId
              name
              slug
              description
              googleMap {
                label
                lat
                lng
                text
                title
              }
            }
          }
        
      }
    `
  )

  var campusInfo = data.allWpCampus.nodes.find(
    ({ databaseId }) => databaseId === campusId
  )
  return campusInfo
}