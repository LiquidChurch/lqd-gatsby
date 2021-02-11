import React, { useEffect, useContext } from "react"
import { Helmet } from "react-helmet"
import { graphql } from "gatsby"
import { useGeneralSettings } from "../data/hooks"
//import Parse from "react-html-parser"
//import Image from "gatsby-image"
import Layout from "../components/Layout"
import PageBlocks from "../components/PageBlocks"
import { GlobalContext } from '../components/GlobalContext/context'
import { getDate, isAppView, RichTextHelper, mediaUrlConverter } from '../helpers/functions'
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
  const generalSettings = useGeneralSettings()
  const ctx = useContext(GlobalContext)

  let theme = 'dark'
  if (isAppView(location.search) === "true" || ctx.currentTheme === 'app') {
    theme = 'app'
  }
  
  let featuredImageUrl = "" 
  if (page.featuredImage !== null) {
    featuredImageUrl = mediaUrlConverter(page.featuredImage.node.mediaItemUrl)
  }
  
  let description = ""
  if (page.seo.metaDesc !== "") {
    description = page.seo.metaDesc
  } else {
    description = RichTextHelper(page.featuredImage.node.description)
  }
    
  
  let keywordsList = ""
  page.search_terms.nodes.forEach((node, i) => {
    if (i === 0) {
      keywordsList = node.name
    } else {
      keywordsList = keywordsList + ", " + node.name
    }
  })

  useEffect(() => {
    ctx.setTheme(theme)
    ctx.setPath(location.pathname)
    ctx.setDate(getDate(location.search))
  }, [ctx, theme, location])

  return (
    <Layout location={location}>
      <Helmet titleTemplate={`%s - ${generalSettings.title}`}>
        <meta http-equiv="last-modified" content={page.modified} />
        <meta name="robots" content={page.seo.metaRobotsNoindex + ', ' + page.seo.metaRobotsNofollow} />

        <meta property="og:description" content={description} />
        <meta property="description" content={description} />

        {(keywordsList !== "") && 
          <meta name="keywords" content={keywordsList} />
        }       
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={page.title + ' - ' + generalSettings.title} />
        <meta property="og:site_name" content={generalSettings.title} />
        <meta property="og:url" content={'https://liquidchurch.com'} />
        {(featuredImageUrl !== "") && 
          <meta property="og:image" content={featuredImageUrl + '?ar=16:9&fit=crop&h=630'} />
        }
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
        modified
        themeState {
          state
        }
        publication {
          unpublishDate
          publishDate
        }
        search_terms {
          nodes {
            name
          }
        }
        featuredImage {
          node {
            title
            caption 
            altText
            description
            mediaItemUrl
          }
        }
        seo {
          metaRobotsNofollow
          metaRobotsNoindex
          metaDesc
        }
        pageImage {
          image1 {
            caption 
            altText
            description
            mediaItemUrl
          }
          image2 {
            caption 
            altText
            description
            mediaItemUrl
          }
          image3 {
            caption 
            altText
            description
            mediaItemUrl
          }
          image4 {
            caption 
            altText
            description
            mediaItemUrl
          }
          image5 {
            caption 
            altText
            description
            mediaItemUrl
          }
          image6 {
            caption 
            altText
            description
            mediaItemUrl
          }
          image7 {
            caption 
            altText
            description
            mediaItemUrl
          }
          image8 {
            caption 
            altText
            description
            mediaItemUrl
          }
        }
      }
    }
`