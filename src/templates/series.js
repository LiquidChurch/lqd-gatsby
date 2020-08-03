import React, { useContext, useEffect } from "react"
import { Helmet } from "react-helmet"
import { graphql } from "gatsby"
//import { useGeneralSettings } from "../data/hooks"
import Parse from "react-html-parser"
import Layout from "../components/Layout"
//import MessageBlocks from "../components/MessageBlocks"
import { GlobalContext } from '../components/GlobalContext/context'
import { isTouchEnabled } from '../helpers/functions'

/** 
 * Template - Messages Component
 */
export default ({
  location,
  data: {
    series,
  },
}) => {
  const ctx = useContext(GlobalContext)
  console.log(series)
  useEffect(() => {
    ctx.setTheme("Dark")
    if (isTouchEnabled()) {
      ctx.enableTouchState()
    }
  }, [ctx])
  
  return (
    <Layout location={location}>
      <Helmet titleTemplate={`%s | Liquid Church`}>
        <title>{Parse(series.name)}</title>
      </Helmet>
      <article className="post">

      </article>
    </Layout>
  )
}

export const query = graphql`
  query Series($id: String!) {
    series: wpSeries(id: { eq: $id }) {
      id
      name
      slug
      SeriesImage {
        image {
          caption
          altText
          description
          sourceUrl
        }
      }
      messages {
        nodes {
          slug
          id
          title
          content
        }
      }
    }
  }
`
