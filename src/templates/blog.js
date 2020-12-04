import React, { useContext, useEffect } from 'react'
import { Helmet } from "react-helmet"
import { graphql, navigate } from "gatsby"
import { useGeneralSettings } from "../data/hooks"
import Parse from "react-html-parser"
import Layout from "../components/Layout"
import { GlobalContext } from '../components/GlobalContext/context'
import { getDate, isAppView } from '../helpers/functions'

import PageBlocks from "../components/PageBlocks"
import HeroFeature from "../components/HeroFeature"
import { PageModalProvider } from "../components/PageModal/context.js"

/** 
 * Template - Blog Component
 */
export default ({
  location,
  data: {
    blog,
  },
}) => {
  console.log("blog: ", blog.title)
  const generalSettings = useGeneralSettings()  
  const ctx = useContext(GlobalContext)
  
  let theme = 'light'
  if (isAppView(location.search) === "true" || ctx.currentTheme === 'app') {
    theme = 'app'
  }
  
  var pageValid = false
  if ( (blog.publication.publishDate === null || getDate(location.search) >= Date.parse(blog.publication.publishDate.replace(/\s/g, 'T'))) &&
       (blog.publication.unpublishDate === null || getDate(location.search) < Date.parse(blog.publication.unpublishDate.replace(/\s/g, 'T'))) ) {
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
        <Helmet titleTemplate={`%s | ${generalSettings.title}`}>
          <title>{Parse(blog.title)}</title>
        </Helmet>
        <article className="page">
          <PageModalProvider>
          <HeroFeature {...blog} />
          <div className="blog">
            <PageBlocks {...blog} />
          </div>
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
