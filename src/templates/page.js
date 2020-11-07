import React, { useContext, useEffect } from "react"

import { Helmet } from "react-helmet"
import { graphql, navigate } from "gatsby"
import { useGeneralSettings } from "../data/hooks"
import Parse from "react-html-parser"
import Layout from "../components/Layout"
import PageBlocks from "../components/PageBlocks"
import { GlobalContext } from '../components/GlobalContext/context'
import { isTouchEnabled, getDate } from '../helpers/functions'

/** 
 * Template - Page Component
 */
export default ({
  location,
  data: {
    page,
  },
}) => {
  console.log("page: ", page.title)
  const generalSettings = useGeneralSettings()
  const ctx = useContext(GlobalContext)
  var pageValid = false
  if ( (page.publication.publishDate === null || getDate(location.search) >= Date.parse(page.publication.publishDate)) &&
       (page.publication.unpublishDate === null || getDate(location.search) < Date.parse(page.publication.unpublishDate)) ) {
    pageValid = true
  }
 //  ctx.setDate(getDate(location.search))
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
    pageValid = false
  }
  
  useEffect(() => {
    if (hasExternalRedirect) {
      console.log('external redirect new tab', externalRedirectBlock.attributes.new_tab)
      //add in open in new tab attempt
      if (ctx.currPath !== 'external') {
        ctx.setPath("external")
        if (externalRedirectBlock.attributes.new_tab) {
          window.open(externalRedirectBlock.attributes.external_url) 
        } else {
          window.location.replace(externalRedirectBlock.attributes.external_url)
        }
      }

      
      // comment
      // window.location.replace(externalRedirectBlock.attributes.external_url)
      // comment 
      //if (externalRedirectBlock.attributes.external_url.slice(0, 6) === "mailto") {
      //  setTimeout(() => {window.history.back()},100)
      //}
      setTimeout(() => {
        
        if (ctx.prevPath !== location.pathname) {
          window.location.replace(ctx.prevPath)
          //window.history.back()
          //console.log(ctx.currPath)
          //RedirectPrevious(ctx.currPath)
        }
      },500)      
    } else if (!pageValid) {
      navigate('/')  
    } else {        
      ctx.setTheme(theme)
      if (isTouchEnabled()) {
        ctx.enableTouchState()
      }
      ctx.setPath(location.pathname)
    }

  }, [ctx, theme, externalRedirectBlock, hasExternalRedirect, location.pathname, pageValid])
  
  return (
    <>
    {!pageValid ? (
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
        publication {
          unpublishDate
          publishDate
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
