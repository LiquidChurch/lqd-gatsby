import React, { useContext, useEffect } from 'react'
import { Helmet } from "react-helmet"
import { graphql, navigate } from "gatsby"
import { useGeneralSettings } from "../data/hooks"
import Parse from "react-html-parser"
import Layout from "../components/Layout"
import { GlobalContext } from '../components/GlobalContext/context'
import { useScrollPosition } from "../helpers/useScrollPosition"
import { getDate, isAppView } from '../helpers/functions'

import { PageModalProvider } from "../components/PageModal/context.js"
import PageBlocks from "../components/PageBlocks"
import HeroFeature from "../components/HeroFeature"

/** 
 * Template - Blog Component
 */
export default ({
  location,
  data: {
    blog,
  },
}) => {
  const generalSettings = useGeneralSettings()  
  const ctx = useContext(GlobalContext)
  
  let theme = 'light'
  if (isAppView(location.search) === "true" || ctx.currentTheme === 'app') {
    theme = 'app'
  }
  
  let featuredImageUrl = "" 
  if (blog.featuredImage !== null) {
    let imgUrl = blog.featuredImage.node.mediaItemUrl.split("/")
    featuredImageUrl = process.env.IMGIX_URL + imgUrl[process.env.IMG_DIR_INDEX] + "/" + imgUrl[process.env.IMG_FILE_INDEX] + "?ar=16:9&fit=crop&h=200"
  }  

  let keywordsList = ""
  blog.tags.nodes.forEach((node, i) => {
    if (i === 0) {
      keywordsList = node.name
    } else {
      keywordsList = keywordsList + ", " + node.name
    }
  })
  blog.category="blogs"
  var pageValid = false
  if ( (blog.publication.publishDate === null || getDate(location.search) >= Date.parse(blog.publication.publishDate.replace(/\s/g, 'T'))) &&
       (blog.publication.unpublishDate === null || getDate(location.search) < Date.parse(blog.publication.unpublishDate.replace(/\s/g, 'T'))) ) {
    pageValid = true
  }

  useScrollPosition(
    ({ prevPos, currPos }) => {
      ctx.setScrollPos(-currPos.y)
    },
    null,
    false,
    false,
    100
  )
  
  useEffect(() => {
    if (!pageValid) {
      navigate('/blogs')
    } else {

      ctx.setTheme(theme)
      let userAgent = typeof window.navigator === "undefined" ? "" : navigator.userAgent
      if (!ctx.isMobileSet) {
        ctx.setIsMobile(Boolean(userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i)))
      }

      if (ctx.currPath === "") {
        ctx.setPath(location.pathname)
      }

      if (ctx.currPath !== location.pathname && ctx.prevPath !== location.pathname) {
        ctx.resetScroll()
        setTimeout(() => ctx.setPath(location.pathname),0)
      } else if (ctx.prevPath === location.pathname) {
        setTimeout(() => { window.scrollTo({
                           top: ctx.scrollPos,
                          })},100)
        ctx.setPath('back')
      } else {
        ctx.setPath(location.pathname)        
      }

    } 
  }, [ctx, theme, location, pageValid])
  
  return (
    <>
    {!pageValid ? (
      ''
     ) :    
      <Layout location={location}>
        <Helmet titleTemplate={`%s - ${generalSettings.title}`}>
          <title>{Parse(blog.title)}</title>
          <meta http-equiv="last-modified" content={blog.modified} />
          <meta name="robots" content={blog.seo.metaRobotsNoindex + ', ' + blog.seo.metaRobotsNofollow} />
          {(keywordsList !== "") && 
            <meta name="keywords" content={keywordsList} />
          }

          <meta property="og:description" content={blog.mediaBlurb.blurb} />          
          <meta property="og:locale" content="en_US" />
          <meta property="og:type" content="article" />
          <meta property="article:published_time" content={blog.publication.publishDate} />
          <meta property="og:title" content={blog.title} />
          <meta property="og:site_name" content={generalSettings.title} />
          <meta property="og:url" content={'https://liquidchurch.com/'+blog.slug} />
          {(featuredImageUrl !== "") && 
            <meta property="og:image" content={featuredImageUrl} />
          }
        </Helmet>
        <article className="page">
          <PageModalProvider>
            <HeroFeature {...blog} />
            <PageBlocks {...blog} />
          </PageModalProvider>
        </article>
      </Layout>
      }
    </>
  )
}

export const query = graphql`
  query Blog($id: String!) {
      blog: wpBlog(id: {eq: $id}) {
        id
        title
        date
        modified
        slug
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
        attributions {
          nodes {
            id
            name
            slug
            profileImage {
              image {
                mediaItemUrl
              }
            }
          }
        }
        attributionsCo {
          attributions {
            id
            name
            slug
          }
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
