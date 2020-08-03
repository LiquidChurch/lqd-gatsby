import React, { useContext, useEffect } from "react"
import { Helmet } from "react-helmet"
import { graphql } from "gatsby"
import { useGeneralSettings } from "../data/hooks"
import Parse from "react-html-parser"
import Layout from "../components/Layout"
import PageBlocks from "../components/PageBlocks"
import { GlobalContext } from '../components/GlobalContext/context'
import { isTouchEnabled } from '../helpers/functions'

/** 
 * Template - Page Component
 */
export default ({
  location,
  data: {
    page,
  },
}) => {
  const generalSettings = useGeneralSettings()
  const ctx = useContext(GlobalContext)
 // const featuredImage = page?.featuredImage?.localFile?.childImageSharp?.fluid
  
  var heroBlock = page.blocks.find(
    ({ __typename }) => __typename === "WpBlockLabHeroImageBlock"
  )
  
  let theme = "Dark"
  if (heroBlock !== undefined) {
    theme = heroBlock.attributes.theme_style
  } 

  useEffect(() => {
    ctx.setTheme(theme)    
    if (isTouchEnabled()) {
      ctx.enableTouchState()
    }
  }, [ctx, theme])
  
  return (
    <>
    <Layout location={location}>
      <Helmet titleTemplate={`%s | ${generalSettings.title} `}>
        <title>{Parse(page.title)}</title>
      </Helmet>
        <article className="page">
          <PageBlocks {...page} />
        </article>
    </Layout>
    </>
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
