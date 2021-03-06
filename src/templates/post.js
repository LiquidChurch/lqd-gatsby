import React, { useContext, useEffect } from "react"
import { Helmet } from "react-helmet"
import { graphql, navigate } from "gatsby"
import { useGeneralSettings } from "../data/hooks"
import Parse from "react-html-parser"
import Layout from "../components/Layout"
import PageBlocks from "../components/PageBlocks"
import { GlobalContext } from '../components/GlobalContext/context'
import { getDate, isAppView } from '../helpers/functions'

import HeroFeature from "../components/HeroFeature"

export default ({
  location,
  data: {
    post,
  },
}) => {
  const generalSettings = useGeneralSettings()
  const ctx = useContext(GlobalContext)

  let theme = 'light'
  if (isAppView(location.search) === "true" || ctx.currentTheme === 'app') {
    theme = 'app'
  }
  
  let featuredImageUrl = "" 
  if (post.featuredImage !== null) {
    let imgUrl = post.featuredImage.node.mediaItemUrl.split("/")
    featuredImageUrl = process.env.IMGIX_URL + imgUrl[process.env.IMG_DIR_INDEX] + "/" + imgUrl[process.env.IMG_FILE_INDEX] + "?ar=16:9&fit=crop&h=200"
  }  

  let keywordsList = ""
  post.tags.nodes.forEach((node, i) => {
    if (i === 0) {
      keywordsList = node.name
    } else {
      keywordsList = keywordsList + ", " + node.name
    }
  })
  
  post.category=post.categories.nodes[0].slug
  var pageValid = false
  if ( (post.publication.publishDate === null || getDate(location.search) >= Date.parse(post.publication.publishDate.replace(/\s/g, 'T'))) &&
       (post.publication.unpublishDate === null || getDate(location.search) < Date.parse(post.publication.unpublishDate.replace(/\s/g, 'T'))) ) {
    pageValid = true
  }

  useEffect(() => {
    if (!pageValid) {
      navigate('')
    }
    
    ctx.setTheme(theme)
    let userAgent = typeof window.navigator === "undefined" ? "" : navigator.userAgent
    if (!ctx.isMobileSet) {
      ctx.setIsMobile(Boolean(userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i)))
    }   
    ctx.setPath(location.pathname)
  }, [ctx, theme, location, pageValid])
  return (
    <Layout location={location}>
      <Helmet titleTemplate={`%s - ${generalSettings.title}`}>
        <title>{Parse(post.title)}</title>
        <meta http-equiv="last-modified" content={post.modified} />
        <meta name="robots" content={"index, no-follow"} />
        {(keywordsList !== "") && 
          <meta name="keywords" content={keywordsList} />
        }
        {(post.mediaBlurb.blurb !== "" && post.mediaBlurb.blurb !== null) &&
          <meta property="og:description" content={post.mediaBlurb.blurb} />
        }
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={post.publication.publishDate} />
        <meta property="og:title" content={post.title} />
        <meta property="og:site_name" content={generalSettings.title} />
        <meta property="og:url" content={'https://liquidchurch.com/'+post.categories.nodes[0].slug + '/' + post.slug} />
        {(featuredImageUrl !== "") && 
          <meta property="og:image" content={featuredImageUrl} />
        }
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
        modified
        slug
        categories {
          nodes {
            databaseId
            slug
          }
        }
        mediaBlurb {
          blurb
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
                mediaItemUrl
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
            mediaItemUrl
          } 
        }
        publication {
          unpublishDate
          publishDate
        }
      }
  }
`
