import React from "react"
import { Helmet } from "react-helmet"
import { graphql } from "gatsby"
import { useGeneralSettings } from "../data/hooks"
import Parse from "react-html-parser"
import Layout from "../components/Layout"
import PostBlocks from "../components/PostBlocks"
import PostHeader from "../components/PostHeader"

export default ({
  location,
  data: {
    wpgraphql: { post },
  },
}) => {
  const generalSettings = useGeneralSettings()

  console.log('Post Load', location)
  
  return (
    <Layout location={location}>
      <Helmet titleTemplate={`%s | ${generalSettings.title}`}>
        <title>{Parse(post.title)}</title>
        {post?.featuredImage && (
          <meta property="og:image" content={post?.featuredImage?.src} />
        )}
      </Helmet>
      <article className="post">
        <PostHeader {...post} />
        <PostBlocks {...post} />
      </article>
    </Layout>
  )
}

export const query = graphql`
  query Post($id: String!) {
      post: wpPost(id: {eq: $id}) {
        blocks {
          ...AllBlocks
        }
        date
        excerpt
        title
        slug
        author {
          node {
            avatar {
              url
            }
            description
            nickname
            firstName
            lastName
            username
          }
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
