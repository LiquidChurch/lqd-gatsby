import React, { useContext, useEffect } from "react"
import { Helmet } from "react-helmet"
import { graphql, navigate } from "gatsby"
import { useGeneralSettings } from "../data/hooks"
import Parse from "react-html-parser"
import Layout from "../components/Layout"
import MessageBlocks from "../components/MessageBlocks"
import { GlobalContext } from '../components/GlobalContext/context'
import { getDate, isAppView } from '../helpers/functions'

/** 
 * Template - Messages Component
 */
export default ({
  location,
  data: {
    lqdmMessage,
  },
}) => {
  console.log('{"type":"messages", "name":"'+ lqdmMessage.title + '", "slug":"/messages/' + lqdmMessage.slug + '"}')
  const generalSettings = useGeneralSettings()  
  const ctx = useContext(GlobalContext)
  
  let theme = 'dark'
  if (isAppView(location.search) === "true" || ctx.currentTheme === 'app') {
    theme = 'app'
  }
  
  var pageValid = false
  if ( (lqdmMessage.publication.publishDate === null || getDate(location.search) >= Date.parse(lqdmMessage.publication.publishDate.replace(/\s/g, 'T'))) &&
       (lqdmMessage.publication.unpublishDate === null || getDate(location.search) < Date.parse(lqdmMessage.publication.unpublishDate.replace(/\s/g, 'T'))) ) {
    pageValid = true
  }
  
  useEffect(() => {
    let userAgent = typeof window.navigator === "undefined" ? "" : navigator.userAgent
    if (!ctx.isMobileSet) {
      ctx.setIsMobile(Boolean(userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i)))
    }     
    
    if (!pageValid) {
      navigate('/messages')
    }
    ctx.setTheme(theme)

    ctx.setPath(location.pathname)
  }, [ctx, theme, location.pathname, pageValid])
  
  return (
    <>
    {!pageValid ? (
      ''
     ) :
      <Layout location={location}>
        <Helmet titleTemplate={`%s | ${generalSettings.title}`}>
          <title>{Parse(lqdmMessage.title)}</title>
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
      title
      content
      attributions {
        nodes {
          id
          name
          slug
          profileImage {
            image {
              sourceUrl
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
          sourceUrl
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
