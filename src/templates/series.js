import React, { useContext, useEffect } from "react"
import { Helmet } from "react-helmet"
import { graphql } from "gatsby"
import Parse from "react-html-parser"
import Layout from "../components/Layout"
import { GlobalContext } from '../components/GlobalContext/context'
import { getDate } from '../helpers/functions'

import SeriesHero from "../components/SeriesHero"
import MediaTiles from "../components/Blocks/MediaTiles"
import SeriesTiles from "../components/Blocks/SeriesTiles"
import Heading from "../components/Blocks/Heading"
/** 
 * Template - Series Component
 */
export default ({
  location,
  data: {
    series,
  },
}) => {
  console.log("series: ", series.name)
  const ctx = useContext(GlobalContext)
  const userAgent = typeof window.navigator === "undefined" ? "" : navigator.userAgent  
  const currentDate = getDate(location.search)
  useEffect(() => {
    ctx.setTheme("light")
    if (!ctx.isMobileSet) {
      ctx.setIsMobile(Boolean(userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i)))
    }
  }, [ctx, userAgent])
  
  let messagesInfo = []
 
  series.messages.nodes.forEach(message => {
    
    if ( (message.publication.publishDate === null || currentDate >= Date.parse(message.publication.publishDate.replace(/\s/g, 'T'))) &&
         (message.publication.unpublishDate === null || currentDate < Date.parse(message.publication.unpublishDate.replace(/\s/g, 'T'))) ) {
    
      let attributions = "Liquid Church" 

      message.attributions.nodes.forEach(item => {
        if (attributions === "Liquid Church") {
          attributions = item.name 
        } else {
          attributions = attributions + ", " + item.name
        }
      })
      

      const formatter = new Intl.DateTimeFormat('en-US', { month: 'short',  day: 'numeric',   year: 'numeric'});
      const formattedDate =  formatter.format(new Date(message.publication.publishDate.replace(/\s/g, 'T')));

      let profileImgSrc = process.env.LOGO_IMG
      if (message.attributions.nodes.length !== 0 && message.attributions.nodes[0].profileImage.image !== null) {
        profileImgSrc = message.attributions.nodes[0].profileImage.image.sourceUrl
      }

      messagesInfo.push({
        "category": "messages",
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
        "profileImage": profileImgSrc,
      })
    }
  })  
  
  messagesInfo.sort((a,b) => a.seriesPart > b.seriesPart ? 1: -1)

  return (
    <Layout location={location}>
      <Helmet titleTemplate={`%s | Liquid Church`}>
        <title>{Parse(series.name)}</title>
      </Helmet>
      <article className="page">
        <SeriesHero {...series} />
      <Heading
          text="Messages in this Series"
          alignment="left"
          size="small"
          all_caps="true"
          add_padding=""
          font_color="#565656"
          padding="top"
          bg_color="#F8F8F8"
      />    
      <MediaTiles 
        type=""
        display_type="grid"
        bg_color="#F8F8F8"
        padding='bottom'
        media_list={messagesInfo} />
      <Heading
          text="Other Message Series"
          alignment="left"
          size="small"
          all_caps="true"
          add_padding=""
          font_color="#565656"
          padding="none"
          bg_color="#F8F8F8"
      />    
        <SeriesTiles
          type='recent'
          num_items={-1}
          exclude_id={series.id}
          layout='grid'
          series_list=''
          bg_color='#F6F6F6' 
          padding='bottom' />
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
      description
      SeriesImage {
        date
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
         publication {
             unpublishDate
             publishDate
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
