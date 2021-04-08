import React, { useContext, useEffect } from 'react'
import { Helmet } from "react-helmet"
import { graphql, navigate } from "gatsby"
import { useGeneralSettings } from "../data/hooks"
import Parse from "react-html-parser"
import Layout from "../components/Layout"
import { GlobalContext } from '../components/GlobalContext/context'
import { getDate, isAppView } from '../helpers/functions'

import PageBlocks from "../components/PageBlocks"

/** 
 * Template - Blog Component
 */
export default ({
  location,
  data: {
    event,
  },
}) => {
  const generalSettings = useGeneralSettings()  
  const ctx = useContext(GlobalContext)
  
  let theme = 'light'
  if (isAppView(location.search) === "true" || ctx.currentTheme === 'app') {
    theme = 'app'
  }
  
  let featuredImageUrl = "" 
  if (event.featuredImage !== null) {
    let imgUrl = event.featuredImage.node.mediaItemUrl.split("/")
    featuredImageUrl = process.env.IMGIX_URL + imgUrl[process.env.IMG_DIR_INDEX] + "/" + imgUrl[process.env.IMG_FILE_INDEX] + "?ar=16:9&fit=crop&h=200"
  }  

  let keywordsList = ""
  event.tags.nodes.forEach((node, i) => {
    if (i === 0) {
      keywordsList = node.name
    } else {
      keywordsList = keywordsList + ", " + node.name
    }
  })
  event.category="events"
  var pageValid = false
  if ( (event.publication.publishDate === null || getDate(location.search) >= Date.parse(event.publication.publishDate.replace(/\s/g, 'T'))) &&
       (event.publication.unpublishDate === null || getDate(location.search) < Date.parse(event.publication.unpublishDate.replace(/\s/g, 'T'))) ) {
    pageValid = true
  }
  
  useEffect(() => {
    if (!pageValid) {
      navigate('/blogs')
    }    
    ctx.setTheme(theme)
    let userAgent = typeof window.navigator === "undefined" ? "" : navigator.userAgent
    if (!ctx.isMobileSet) {
      ctx.setIsMobile(Boolean(userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i)))
    }
    ctx.setPath(location.pathname)
  }, [ctx, theme, location, pageValid])
  
  return (
    <>
    {!pageValid ? (
      ''
     ) :    
      <Layout location={location}>
        <Helmet titleTemplate={`%s - ${generalSettings.title}`}>
          <title>{Parse(event.title)}</title>
          <meta http-equiv="last-modified" content={event.modified} />
          <meta name="robots" content={event.seo.metaRobotsNoindex + ', ' + event.seo.metaRobotsNofollow} />
          {(keywordsList !== "") && 
            <meta name="keywords" content={keywordsList} />
          }

          <meta property="og:description" content={event.mediaBlurb.blurb} />          
          <meta property="og:locale" content="en_US" />
          <meta property="og:type" content="article" />
          <meta property="article:published_time" content={event.publication.publishDate} />
          <meta property="og:title" content={event.title} />
          <meta property="og:site_name" content={generalSettings.title} />
          <meta property="og:url" content={'https://liquidchurch.com/event/'+event.slug} />
          {(featuredImageUrl !== "") && 
            <meta property="og:image" content={featuredImageUrl} />
          }
        </Helmet>
        <article className="page">
          <PageBlocks {...event} />
        </article>
      </Layout>
      }
    </>
  )
}

export const query = graphql`
  query Event($id: String!) {
      event: wpEvent(id: {eq: $id}) {
        id
        date
        title
        modified
        slug
        EventInfo {
          audience
          date
        }
        mediaBlurb {
          blurb
        }
        tags {
          nodes {
            id
            name
            slug
          }
        }
        seo {
          metaRobotsNofollow
          metaRobotsNoindex
        }
        blocks {
          ...AllBlocks
        }
        featuredImage {
          node {
            altText
            mediaItemUrl
          } 
        }
        eventCategories {
          nodes {
            id
            databaseId
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
        publication {
          unpublishDate
          publishDate
        }
      }
    }
`
