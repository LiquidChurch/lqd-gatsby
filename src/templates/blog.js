import React, { useContext, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import { GlobalContext } from '../components/GlobalContext/context'
import { Helmet } from "react-helmet"
import { graphql } from "gatsby"
import { useGeneralSettings } from "../data/hooks"
import Parse from "react-html-parser"
import Layout from "../components/Layout"
import PageBlocks from "../components/PageBlocks"
import FeatureHero from "../components/HeroFeature"


export default ({
  location,
  data: {
    blog,
  },
}) => {
  const generalSettings = useGeneralSettings()
  const ctx = useContext(GlobalContext)
  useEffect(() => {
    ctx.setTheme("Light")
  }, [ctx])
  
  return (
    <Layout location={location}>
      <Helmet titleTemplate={`%s | ${generalSettings.title}`}>
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
