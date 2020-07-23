import React from "react"
import { Helmet } from "react-helmet"
import { graphql } from "gatsby"
//import { useGeneralSettings } from "../data/hooks"
import Parse from "react-html-parser"
import Layout from "../components/Layout"
import PostBlocks from "../components/PostBlocks"

export default ({
  location,
  data: {
    lqdmMessage,
  },
}) => {
  //const generalSettings = useGeneralSettings()

  console.log('Message Load', location)
  
  return (
    <Layout location={location}>
      <Helmet titleTemplate={`%s | Liquid Church`}>
        <title>{Parse(lqdmMessage.title)}</title>
      </Helmet>
      <article className="post">
        <PostBlocks {...lqdmMessage} />
      </article>
    </Layout>
  )
}

export const query = graphql`
  query Message($id: String!) {
      lqdmMessage: wpLqdmMessage(id: { eq: $id }) {
        blocks {
          ...AllBlocks
        }
        id
        video_url
        link
        title
        status
        slug
        modifiedGmt
        modified
        video_src
        audio_src
        audio_url
        content
        excerpt
        featured_image
        notes
        display_order
        lqdmSeriesNodes {
          nodes {
            id
            name
            slug
          }
        }  
      
    }
  }
`
