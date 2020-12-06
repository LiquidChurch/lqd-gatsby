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
  console.log('{"type":"blogs", "name":"'+ blog.title + '", "slug":"/blogs/' + blog.slug + '"}')
  const generalSettings = useGeneralSettings()  
  const ctx = useContext(GlobalContext)
  
  let theme = 'light'
  if (isAppView(location.search) === "true" || ctx.currentTheme === 'app') {
    theme = 'app'
  }
  
  let featuredImageUrl = "" 
  if (blog.featuredImage !== null) {
    let imgUrl = blog.featuredImage.node.sourceUrl.split("/")
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
        <Helmet titleTemplate={`%s - ${generalSettings.title}`}>
          <title>{Parse(blog.title)}</title>
          <meta http-equiv="last-modified" content={blog.modified} />
          <meta name="robots" content={"index, no-follow"} />
          {(blog.seo.metaDesc !== "") &&
            <meta name="description" content={blog.seo.metaDesc} />          
          }
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
        modified
        slug
        mediaBlurb {
          blurb
        }
        seo {
          metaDesc
          focuskw
        }              
        tags {
          nodes {
            id
            name
            slug
          }
        }
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
