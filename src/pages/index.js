import React, { useEffect, useContext } from "react"
import { Helmet } from "react-helmet"
import { graphql } from "gatsby"
//import { useGeneralSettings } from "../data/hooks"
//import Parse from "react-html-parser"
//import Image from "gatsby-image"
import Layout from "../components/Layout"
import PageBlocks from "../components/PageBlocks"
import { GlobalContext } from '../components/GlobalContext/context'
//import PostHeader from "../components/PostHeader"
//import { LoadingOverlayProvider } from "../components/LoadingOverlay/context.js"
/** 
 * Homepage
 */

export default ({
  location,
  data: { 
    page,
  },
}) => {

 const ctx = useContext(GlobalContext)
  useEffect(() => {
    ctx.setTheme("Dark")
  })

  return (
    <Layout location={location}>
      <Helmet>
      </Helmet>
      <article className="page">
        <PageBlocks {...page} />
      </article>
    </Layout>
  )
}

export const query = graphql`
  query {
      page: wpPage (slug: { eq: "home" }){
        blocks {
          ...AllBlocks
        }
        date
        title
        slug
      }
    
  }
`