import React, { useContext, useEffect } from "react"
import { Helmet } from "react-helmet"
import { graphql } from "gatsby"
//import { useGeneralSettings } from "../data/hooks"
import Parse from "react-html-parser"
import Layout from "../components/Layout"
//import MessageBlocks from "../components/MessageBlocks"
import { GlobalContext } from '../components/GlobalContext/context'
import { isTouchEnabled } from '../helpers/functions'

import SeriesTitle from "../components/SeriesTitle"
import MediaTiles from "../components/MediaTiles"
/** 
 * Template - Messages Component
 */
export default ({
  location,
  data: {
    series,
  },
}) => {
  console.log(series)
  
  let messagesInfo = []
 
  series.messages.nodes.forEach(message => {
    
    let attributions = "" 
  
    message.attributions.nodes.forEach(item => {
      if (attributions === "") {
        attributions = item.name 
      } else {
        attributions = attributions + ", " + item.name
      }
    })

    const formatter = new Intl.DateTimeFormat('en-US', { month: 'short',  day: 'numeric',   year: 'numeric'});
    const formattedDate =  formatter.format(new Date(message.date));

    messagesInfo.push({
      "category": "message",
      "title": message.title,
      "image": message.featuredImage.node.mediaItemUrl,
      "id": message.id,
      "slug": message.slug,
      "showBlurb": true,
      "blurb": message.content,
      "showSeries": true,
      "seriesTitle": message.seriesList.nodes[0].name,
      "seriesPart": message.seriesPart.part,
      "showAttribution": true,
      "date": formattedDate,
      "attributionName": attributions,
      "profileImage": message.attributions.nodes[0].profileImage.image.sourceUrl,
    })
  })  
  
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
        <SeriesTitle {...series} />
        <MediaTiles 
          type=""
          label=""
          background_color="#F8F8F8"
          media_list={messagesInfo} />
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
          date
          content
          featuredImage {
            node {
              id
              sourceUrl
              mediaItemUrl
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
          seriesList {
            nodes {
              name
              id
              slug
            }
          }
          seriesPart {
            part
          } 
        }
      }
    }
  }
`
