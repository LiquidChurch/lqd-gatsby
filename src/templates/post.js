import React, { useContext, useEffect } from "react"
import { Helmet } from "react-helmet"
import { graphql } from "gatsby"
import { useGeneralSettings } from "../data/hooks"
import Parse from "react-html-parser"
import Layout from "../components/Layout"
import PageBlocks from "../components/PageBlocks"
import { GlobalContext } from '../components/GlobalContext/context'
import { isTouchEnabled } from '../helpers/functions'

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
  useEffect(() => {
    ctx.setTheme("light")
    if (isTouchEnabled()) {
      ctx.enableTouchState()
    }
    ctx.setPath(location.pathname)
  }, [ctx, location.pathname])
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
        date
        excerpt
        title
        slug
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
