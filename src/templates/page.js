import React, { useContext, useEffect } from "react"

import { Helmet } from "react-helmet"
import { graphql, navigate } from "gatsby"
import { useGeneralSettings } from "../data/hooks"
import Parse from "react-html-parser"
import Layout from "../components/Layout"
import PageBlocks from "../components/PageBlocks"
import { GlobalContext } from '../components/GlobalContext/context'
//import { isTouchEnabled, getDate } from '../helpers/functions'
import { getDate, isAppView, RichTextHelper } from '../helpers/functions'
import { usePageById } from '../data/usePage'
//import useDeviceDetect from '../helpers/useDeviceDetection'

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
  console.log(location)
  const generalSettings = useGeneralSettings()
  const ctx = useContext(GlobalContext)
  
  let parentPageUri = "/"
  
  if (page.parentDatabaseId !== null) {
    parentPageUri = usePageById(page.parentDatabaseId).uri
  }

  let pageValid = false
  if ( (page.publication.publishDate === null || getDate(location.search) >= Date.parse(page.publication.publishDate.replace(/\s/g, 'T'))) &&
       (page.publication.unpublishDate === null || getDate(location.search) < Date.parse(page.publication.unpublishDate.replace(/\s/g, 'T'))) ) {
    pageValid = true
  }

  let theme = "dark"
  if (page.themeState !== null) {
    theme = page.themeState.state
  }
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
    
  var externalRedirectBlock = page.blocks.find(
    ({ __typename }) => __typename === "WpBlockLabExternalRedirectBlock"
  )
  
  let hasExternalRedirect = false
  
  if (externalRedirectBlock !== undefined) {
    hasExternalRedirect = true
    pageValid = false
  }
  
  useEffect(() => {
    let userAgent = typeof window.navigator === "undefined" ? "" : navigator.userAgent;    
    if (!ctx.isMobileSet) {
      ctx.setIsMobile(Boolean(userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i)))
    } 
    
    if (hasExternalRedirect) {
      //add in open in new tab attempt
      if (ctx.currPath !== 'external') {
        ctx.setPath("external")
        if (externalRedirectBlock.attributes.new_tab && !ctx.isMobile) {
          window.open(externalRedirectBlock.attributes.external_url) 
        } else {
          window.location.replace(externalRedirectBlock.attributes.external_url)
        }
      }
      
      setTimeout(() => {
        if (ctx.prevPath !== "" && ctx.prevPath !== location.pathname) {
          window.location.replace(ctx.prevPath)
        } else if (ctx.prevPath === "") {
          window.location.replace(parentPageUri)
        }
      },1500)      
    } else if (!pageValid) {
      navigate('/404')  
    } else {        
      ctx.setTheme(theme)
      ctx.setPath(location.pathname)
    }
  }, [ctx, theme, externalRedirectBlock, hasExternalRedirect, location, pageValid, parentPageUri])
  
  return (
    <>
    {!pageValid ? (
      ''
     ) :
      <Layout location={location}>
        <Helmet titleTemplate={`%s - ${generalSettings.title}`}>
          <title>{Parse(page.title)}</title>
          <meta http-equiv="last-modified" content={page.modified} />
          <meta name="robots" content={page.seo.metaRobotsNoindex + ", " + page.seo.metaRobotsNofollow} />
          {(featuredImageUrl !== "") &&
            <meta property="og:description" content={RichTextHelper(page.featuredImage.node.description)} />
          }
          {(keywordsList !== "") && 
            <meta name="keywords" content={keywordsList} />
          }
          <meta name="description" content={page.seo.metaDesc} />          
          <meta property="og:locale" content="en_US" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content={page.title + ' - ' + generalSettings.title} />
          <meta property="og:site_name" content={generalSettings.title} />
          <meta property="og:url" content={'https://liquidchurch.com'+page.uri} />
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
        uri
        modified
        themeState {
          state
        }
        parentDatabaseId
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
