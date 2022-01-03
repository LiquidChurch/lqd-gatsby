import React, { useContext, useEffect } from "react"
import { Helmet } from "react-helmet"
import { graphql, navigate } from "gatsby"
import { useGeneralSettings } from "../data/hooks"
import Parse from "react-html-parser"
import Layout from "../components/Layout"
import MessageBlocks from "../components/MessageBlocks"
import { GlobalContext } from '../components/GlobalContext/context'
import { useScrollPosition } from "../helpers/useScrollPosition"
import { getDate, isAppView, RichTextHelper, mediaUrlConverter } from '../helpers/functions'

/** 
 * Template - Messages Component
 */
export default ({
  location,
  data: {
    lqdmMessage,
  },
}) => {
  console.log(lqdmMessage.title)
  const generalSettings = useGeneralSettings()  
  const ctx = useContext(GlobalContext)
  
  let theme = 'dark'
  if (isAppView(location.search) === "true" || ctx.currentTheme === 'app') {
    theme = 'app'
  }

  //let featuredImageUrl = "" 
  //if (lqdmMessage.featuredImage !== null) {
  //  let imgUrl = lqdmMessage.featuredImage.node.mediaItemUrl.split("/")
  //  featuredImageUrl = process.env.IMGIX_URL + "/" + imgUrl[process.env.IMG_DIR_INDEX] + "/" + imgUrl[process.env.IMG_FILE_INDEX] + "?ar=16:9&fit=crop&h=200"
  //}  
  
  let featuredImageUrl = "" 
  if (lqdmMessage.featuredImage !== null) {
    featuredImageUrl = mediaUrlConverter(lqdmMessage.featuredImage.node.mediaItemUrl)
  }
  
  let keywordsList = ""
  lqdmMessage.tags.nodes.forEach((node, i) => {
    if (i === 0) {
      keywordsList = node.name
    } else {
      keywordsList = keywordsList + ", " + node.name
    }
  })
  
  var pageValid = false
  if ( (lqdmMessage.publication.publishDate === null || getDate(location.search) >= Date.parse(lqdmMessage.publication.publishDate.replace(/\s/g, 'T'))) &&
       (lqdmMessage.publication.unpublishDate === null || getDate(location.search) < Date.parse(lqdmMessage.publication.unpublishDate.replace(/\s/g, 'T'))) ) {
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
      navigate('/messages')
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
  }, [ctx, theme, location.pathname, pageValid])
  
  return (
    <>
    {!pageValid ? (
      ''
     ) :
      <Layout location={location}>
        <Helmet titleTemplate={`%s | ${generalSettings.title}`}>
          <title>{Parse(lqdmMessage.title)}</title>
          <meta http-equiv="last-modified" content={lqdmMessage.modified} />
          <meta name="robots" content={lqdmMessage.seo.metaRobotsNoindex + ', ' + lqdmMessage.seo.metaRobotsNofollow} />
          {(keywordsList !== "") && 
            <meta name="keywords" content={keywordsList} />
          }

          <meta property="og:description" content={RichTextHelper(lqdmMessage.content)} />          
          <meta property="og:locale" content="en_US" />
          <meta property="og:type" content="article" />
          <meta property="article:published_time" content={lqdmMessage.publication.publishDate} />
          <meta property="og:title" content={lqdmMessage.title} />
          <meta property="og:site_name" content={generalSettings.title} />
          <meta property="og:url" content={'https://liquidchurch.com/messages/'+lqdmMessage.slug} />
          {(featuredImageUrl !== "") && 
            <meta property="og:image" content={featuredImageUrl + '?ar=16:9&fit=crop&h=630'} />
          }
        </Helmet>
        <article className="post">
          <MessageBlocks {...lqdmMessage} />
        </article>
      </Layout>
    }
  </>
  )
}

export const query = graphql`
  query Message($id: String!) {
    lqdmMessage: wpMessage(id: { eq: $id }) {
      id
      blocks {
        ...AllBlocks
      }
      content
      title
      modified
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
      date
      slug
      message {
        vimeoId
        youtubeId        
      }        
      featuredImage {
        node {
          mediaItemUrl
          caption
          altText
        }
      }
      publication {
          unpublishDate
          publishDate
        }
      seriesList {
        nodes {
          name
          id
          slug
        }
      }
      seriesPart {
        part
      }  
      scriptures {
        nodes {
          id
          name
          slug
        }
      }
      tags {
        nodes {
          id
          name
          slug
        }
      }
      resources {
        resource1 {
          language
          url
          resourceType
        }
        resource2 {
          language
          resourceType
          url
        }
        resource3 {
          language
          resourceType
          url
        }
        resource4 {
          language
          resourceType
          url
        }
        resource5 {
          language
          resourceType
          url
        }
        resource6 {
          language
          resourceType
          url
        }
        resource7 {
          language
          resourceType
          url
        }
        resource8 {
          language
          resourceType
          url
        }
      }
    }
  }
`
