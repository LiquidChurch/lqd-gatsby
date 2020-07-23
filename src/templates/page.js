import React from "react"
import { Helmet } from "react-helmet"
import { graphql } from "gatsby"
import { useGeneralSettings } from "../data/hooks"
import Parse from "react-html-parser"
import Layout from "../components/Layout"
import PageBlocks from "../components/PageBlocks"


export default ({
  location,
  data: {
    page,
  },
}) => {
  const generalSettings = useGeneralSettings()
 // const featuredImage = page?.featuredImage?.localFile?.childImageSharp?.fluid

  return (
    <Layout location={location}>
      <Helmet titleTemplate={`%s | ${generalSettings.title} `}>
        <title>{Parse(page.title)}</title>
      </Helmet>
        <article className="page">
          <PageBlocks {...page} />

        </article>
    </Layout>
  )
}

export const query = graphql`
  query Page($id: String!) {
      page: wpPage(id: { eq: $id}) {
        blocks {
          ...AllBlocks
        }
        date
        title
        slug
        featuredImage {
          node {
            title
            caption 
            altText
            description 
            mediaItemUrl
          }
        }
      }
    
  }
`
