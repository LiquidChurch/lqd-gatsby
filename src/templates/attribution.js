import React from "react"

/** 
 * Template - Attribution Component
 */
export default ({
  location,
  data: {
    attribution,
  },
}) => {
  console.log("attribution: ", attribution.name)
  return (
  <>
  </>
  )
}

export const query = graphql`
  query Attribution($id: String!) {
    attribution: wpAttribution(id: { eq: $id }) {
      id
      databaseId
      name
      slug
      description
      profileImage {
        image {
          id
          mediaItemUrl
          sourceUrl
        }
        blurb
        role
      }
    }
  }
`