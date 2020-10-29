import React, { useContext, useEffect } from "react"
import { Helmet } from "react-helmet"
import { graphql } from "gatsby"
//import { useGeneralSettings } from "../data/hooks"
import Parse from "react-html-parser"
import Layout from "../components/Layout"
import MessageBlocks from "../components/MessageBlocks"
import { GlobalContext } from '../components/GlobalContext/context'
import { isTouchEnabled } from '../helpers/functions'

/** 
 * Template - Messages Component
 */
export default ({
  location,
  data: {
    lqdmMessage,
  },
}) => {
  console.log("message:", lqdmMessage.title)
  const ctx = useContext(GlobalContext)
  useEffect(() => {
    ctx.setTheme("dark")
    if (isTouchEnabled()) {
      ctx.enableTouchState()
    }
    ctx.setPath(location.pathname)
    console.log('previous path', ctx.prevPath)    
  }, [ctx, location.pathname])
  
  return (
    <Layout location={location}>
      <Helmet titleTemplate={`%s | Liquid Church`}>
        <title>{Parse(lqdmMessage.title)}</title>
      </Helmet>
      <article className="post">
        <MessageBlocks {...lqdmMessage} />
      </article>
    </Layout>
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
        url
      }        
      featuredImage {
        node {
          sourceUrl
          caption
          altText
        }
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
