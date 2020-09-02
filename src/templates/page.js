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
  
  let theme = "dark"
  if (page.themeState !== null) {
    theme = page.themeState.state
  }
 
  var externalRedirectBlock = page.blocks.find(
    ({ __typename }) => __typename === "WpBlockLabExternalRedirectBlock"
  )
  
  let hasExternalRedirect = false
  
  if (externalRedirectBlock !== undefined) {
    hasExternalRedirect = true
  }
  
  useEffect(() => {
    if (hasExternalRedirect) {
      window.location.replace(externalRedirectBlock.attributes.external_url)
    }
        
    ctx.setTheme(theme)    
    if (isTouchEnabled()) {
      ctx.enableTouchState()
    }
  }, [ctx, theme, externalRedirectBlock, hasExternalRedirect])
  
  return (
    <>
    {hasExternalRedirect ? (
      ''
     ) :
      <Layout location={location}>
        <Helmet titleTemplate={`%s | ${generalSettings.title} `}>
          <title>{Parse(page.title)}</title>
        </Helmet>
          <article className="page">
            <PageBlocks {...page} />
          </article>
      </Layout>
    }
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
        themeState {
          state
        }
        featuredImage {
          node {
            title
            caption 
            altText
            description
            sourceUrl
            mediaItemUrl
          }
        }
        pageImage {
          image1 {
            title
            caption 
            altText
            description
            sourceUrl
            mediaItemUrl
          }
          image2 {
            title
            caption 
            altText
            description
            sourceUrl
            mediaItemUrl
          }
          image3 {
            title
            caption 
            altText
            description
            sourceUrl
            mediaItemUrl
          }
          image4 {
            title
            caption 
            altText
            description
            sourceUrl
            mediaItemUrl
          }
          image5 {
            title
            caption 
            altText
            description
            sourceUrl
            mediaItemUrl
          }
          image6 {
            title
            caption 
            altText
            description
            sourceUrl
            mediaItemUrl
          }
          image7 {
            title
            caption 
            altText
            description
            sourceUrl
            mediaItemUrl
          }
          image8 {
            title
            caption 
            altText
            description
            sourceUrl
            mediaItemUrl
          }
          image9 {
            title
            caption 
            altText
            description
            sourceUrl
            mediaItemUrl
          }
          image10 {
            title
            caption 
            altText
            description
            sourceUrl
            mediaItemUrl
          }          
        }
      }
    
  }
`
