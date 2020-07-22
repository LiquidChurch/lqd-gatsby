import React, { useEffect } from "react"
import { Helmet } from "react-helmet"
import { graphql } from "gatsby"
//import { useGeneralSettings } from "../data/hooks"
//import Parse from "react-html-parser"
//import Image from "gatsby-image"
import Layout from "../components/Layout"
import PageBlocks from "../components/PageBlocks"
//import PostHeader from "../components/PostHeader"
//import { LoadingOverlayProvider } from "../components/LoadingOverlay/context.js"
/** 
 * Homepage
 */

export default ({
  location,
  data: {
    wpgraphql: { page },
  },
}) => {
//  NProgress.start()
  
  useEffect(() => {
//    NProgress.done()
  })
  //const generalSettings = useGeneralSettings()
  const featuredImage = page?.featuredImage?.localFile?.childImageSharp?.fluid
  return (
    <Layout location={location}>
      <Helmet>
        {featuredImage && (
          <meta property="og:image" content={featuredImage.src} />
        )}
      </Helmet>
      <article className="page">
        <PageBlocks {...page} />
      </article>
    </Layout>
  )
}

export const query = graphql`
  query {
    wpgraphql {
      page(
          id: "home"
          idType: URI ) {
        blocks {
          ...AllBlocks
        }
        date
        title
        slug
      }
    }
  }
`