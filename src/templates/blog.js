import React, { useContext, useEffect } from 'react'
import { Helmet } from "react-helmet"
import { graphql, navigate } from "gatsby"
import Parse from "react-html-parser"
import Layout from "../components/Layout"
import { GlobalContext } from '../components/GlobalContext/context'
import { isTouchEnabled, getDate } from '../helpers/functions'

import PageBlocks from "../components/PageBlocks"
import FeatureHero from "../components/HeroFeature"
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
  const ctx = useContext(GlobalContext)
  
  var pageValid = false
  if ( (blog.publication.publishDate === null || getDate(location.search) >= Date.parse(blog.publication.publishDate)) &&
       (blog.publication.unpublishDate === null || getDate(location.search) < Date.parse(blog.publication.unpublishDate)) ) {
    pageValid = true
  }
  
  useEffect(() => {
    if (!pageValid) {
      navigate('/blogs')
    }    
    ctx.setTheme("light")
    if (isTouchEnabled()) {
      ctx.enableTouchState()
    }
  }, [ctx])
  
  return (
    <>
    {!pageValid ? (
      ''
     ) :    
      <Layout location={location}>
        <Helmet titleTemplate={`%s | Liquid Church`}>
          <title>{Parse(blog.title)}</title>
        </Helmet>
        <article className="page">
          <PageModalProvider>
          <FeatureHero {...blog} />
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
            hometileDelist
            unpublishDate
            publishDate
          }
        }
    }
`
