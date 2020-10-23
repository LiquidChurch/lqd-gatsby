import React, { useContext, useEffect } from 'react'
import { Helmet } from "react-helmet"
import { graphql } from "gatsby"
import Parse from "react-html-parser"
import Layout from "../components/Layout"
import { GlobalContext } from '../components/GlobalContext/context'
import { isTouchEnabled } from '../helpers/functions'

import PageBlocks from "../components/PageBlocks"
import FeatureHero from "../components/HeroFeature"
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
  useEffect(() => {
    ctx.setTheme("light")
    if (isTouchEnabled()) {
      ctx.enableTouchState()
    }
  }, [ctx])
  
  return (
    <Layout location={location}>
      <Helmet titleTemplate={`%s | Liquid Church`}>
        <title>{Parse(blog.title)}</title>
      </Helmet>
      <article className="page">
        <FeatureHero {...blog} />
        <div className="blog">
          <PageBlocks {...blog} />
        </div>
      </article>
    </Layout>
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
      }
   
  }
`
