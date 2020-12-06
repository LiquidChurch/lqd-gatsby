import React, { useEffect, useContext } from "react"
import { Helmet } from "react-helmet"
import { graphql } from "gatsby"
import { useGeneralSettings } from "../data/hooks"
//import Parse from "react-html-parser"
//import Image from "gatsby-image"
import Layout from "../components/Layout"
import PageBlocks from "../components/PageBlocks"
import { GlobalContext } from '../components/GlobalContext/context'
import { getDate, isAppView, RichTextHelper } from '../helpers/functions'
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
  console.log("index")
  const generalSettings = useGeneralSettings()
  const ctx = useContext(GlobalContext)

  let theme = 'dark'
  if (isAppView(location.search) === "true" || ctx.currentTheme === 'app') {
    theme = 'app'
  }
  
  let featuredImageUrl = "" 
  if (page.featuredImage !== null) {
    let imgUrl = page.featuredImage.node.mediaItemUrl.split("/")
    featuredImageUrl = process.env.IMGIX_URL + imgUrl[process.env.IMG_DIR_INDEX] + "/" + imgUrl[process.env.IMG_FILE_INDEX] + "?ar=16:9&fit=crop&h=200"
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
        <meta name="robots" content={page.seo.metaRobotsNoindex + ", " + page.seo.metaRobotsNofollow} />
        {(featuredImageUrl !== "") &&
          <meta property="og:description" content={RichTextHelper(page.featuredImage.node.description)} />
        }
        {(keywordsList !== "") && 
          <meta name="keywords" content={keywordsList} />
        }       
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={page.title + ' - ' + generalSettings.title} />
        <meta property="og:site_name" content={generalSettings.title} />
        <meta property="og:url" content={'https://liquidchurch.com'} />
        {(page.seo.metaDesc !== "") &&
          <meta property="og:description" content={page.seo.metaDesc} />
        }
        {(featuredImageUrl !== "") && 
          <meta property="og:image" content={featuredImageUrl} />
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
        seo {
          metaDesc
          cornerstone
          focuskw
          metaRobotsNoindex
          metaRobotsNofollow
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