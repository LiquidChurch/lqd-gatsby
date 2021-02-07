import React, { useContext, useEffect } from "react"

import { Helmet } from "react-helmet"
import { graphql, navigate } from "gatsby"
import { useGeneralSettings } from "../data/hooks"
import Parse from "react-html-parser"
import Layout from "../components/Layout"
import PageBlocks from "../components/PageBlocks"
import { GlobalContext } from '../components/GlobalContext/context'
import { AnchorLink as Link } from "gatsby-plugin-anchor-links";

//import { isTouchEnabled, getDate } from '../helpers/functions'
import { getDate, isAppView, RichTextHelper } from '../helpers/functions'
import { usePageById } from '../data/usePage'
//import useDeviceDetect from '../helpers/useDeviceDetection'

function hashLinkScroll() {
  const { hash } = window.location;
  if (hash !== '') {
    // Push onto callback queue so it runs after the DOM is updated,
    // this is required when navigating from a different page so that
    // the element is rendered on the page before trying to getElementById.
    setTimeout(() => {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
      }     
    }, 1000);
  }
}

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
    
  if (page.blocks !== null) {
  var externalRedirectBlock = page.blocks.find(
    ({ __typename }) => __typename === "WpBlockLabExternalRedirectBlock"
  )
  }
  
  let hasExternalRedirect = false
  
  if (externalRedirectBlock !== undefined) {
    hasExternalRedirect = true
    pageValid = false
  }
  
  useEffect(() => {
    
    let userAgent = typeof window.navigator === "undefined" ? "" : navigator.userAgent.toLowerCase()
    if (!ctx.isMobileSet) {
      ctx.setIsMobile(Boolean(userAgent.match(/android|blackBerry|iphone|ipad|ipod|opera mini|iemobile|wpdesktop/i)))
    
      if (userAgent.indexOf('safari') !== -1) { 
        if (userAgent.indexOf('chrome') > -1) {
          ctx.setIsChrome(true)
        } else {
          ctx.setIsChrome(false)
        }
      } 
    } 
    
    
    
    if (hasExternalRedirect) {
      //add in open in new tab attempt
      if (ctx.currPath !== 'external') {
        ctx.setPath("external")
        if (externalRedirectBlock.attributes.new_tab && !ctx.isMobile && ctx.isChrome) {
          window.open(externalRedirectBlock.attributes.external_url, '_blank', 'noreferrer') 
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
      },2500)      
    } else if (!pageValid) {
      navigate('/404')  
    } else {        
      ctx.setTheme(theme)
      ctx.setPath(location.pathname)
      
      hashLinkScroll()
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
          <meta name="robots" content={page.seo.metaRobotsNoindex + ', ' + page.seo.metaRobotsNofollow} />
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
          <meta property="og:url" content={'https://liquidchurch.com'+page.uri} />
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
        search_terms {
          nodes {
            name
          }
        }
        seo {
          metaRobotsNofollow
          metaRobotsNoindex
        }
        featuredImage {
          node {
            caption 
            altText
            description
            mediaItemUrl
          }
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
