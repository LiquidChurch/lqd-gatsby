import React, { useContext, useEffect } from "react"
import { Helmet } from "react-helmet"
import { graphql, navigate } from "gatsby"
import { useGeneralSettings } from "../data/hooks"
import Parse from "react-html-parser"
import Layout from "../components/Layout"
import PageBlocks from "../components/PageBlocks"
import { GlobalContext } from '../components/GlobalContext/context'
import { getDate } from '../helpers/functions'

import HeroFeature from "../components/HeroFeature"

export default ({
  location,
  data: {
    post,
  },
}) => {
  console.log("post: ", post.title)
  const generalSettings = useGeneralSettings()
  const ctx = useContext(GlobalContext)
  
  var pageValid = false
  if ( (post.publication.publishDate === null || getDate(location.search) >= Date.parse(post.publication.publishDate.replace(/\s/g, 'T'))) &&
       (post.publication.unpublishDate === null || getDate(location.search) < Date.parse(post.publication.unpublishDate.replace(/\s/g, 'T'))) ) {
    pageValid = true
  }

  useEffect(() => {
    if (!pageValid) {
      navigate('')
    }
    
    ctx.setTheme("light")
    let userAgent = typeof window.navigator === "undefined" ? "" : navigator.userAgent
    if (!ctx.isMobileSet) {
      ctx.setIsMobile(Boolean(userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i)))
    }   
    ctx.setPath(location.pathname)
  }, [ctx, location, pageValid])
  return (
    <Layout location={location}>
      <Helmet titleTemplate={`%s | ${generalSettings.title}`}>
        <title>{Parse(post.title)}</title>
      </Helmet>
      <article className="page">
        <HeroFeature {...post} />
        <PageBlocks {...post} />
      </article>
    </Layout>
  )
}

export const query = graphql`
  query Post($id: String!) {
      post: wpPost(id: {eq: $id}) {
        title
        date
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
        blocks {
          ...AllBlocks
        }
        featuredImage {
          node {
            altText
            sourceUrl
          } 
        }
        publication {
          unpublishDate
          publishDate
        }
      }
  }
`
