import React from "react"
import { useLocation } from '@reach/router';

import MessagePlayer from "./MessagePlayer"
import MessageInfo from "./MessageInfo"
import MessageResources from "./MessageResources"
import SeriesTitle from "../SeriesTitle"
import MediaTiles from "../Blocks/MediaTiles"
import Heading from "../Blocks/Heading"

import { PageModalProvider } from "../PageModal/context.js"

import { getDate } from '../../helpers/functions'
import { useSeries } from "../../data/useSeries"

/** 
 * Message Blocks
 */
export default (lqdmMessage) => {
  const seriesInfo = useSeries(lqdmMessage.seriesList.nodes[0].slug, getDate(useLocation().search))
  let seriesSlugs = []
 
  seriesInfo.messages.nodes.forEach(message => {
    
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
    
    seriesSlugs.push({
      "category": "messages",
      "title": message.title,
      "image": message.featuredImage.node.mediaItemUrl,
      "id": message.id,
      "slug": message.slug,
      "showBlurb": false,
      "blurb": message.content,
      "showSeries": true,
      "seriesTitle": message.seriesList.nodes[0].name,
      "seriesPart": message.seriesPart.part,
      "showAttribution": true,
      "attributionName": attributions,
      "profileImage": profileImgSrc,
      "date": formattedDate,
    })
  })
  
  return (
    <>
      <PageModalProvider>
      <MessagePlayer {...lqdmMessage} />
      <MessageInfo {...lqdmMessage} />
      <MessageResources {...lqdmMessage} />
      <Heading
          text="Message Series"
          alignment="left"
          size="small"
          all_caps="true"
          add_padding="true"
          font_color="#565656"
          padding="top"
          bg_color="#F8F8F8"
      />
      <SeriesTitle {...seriesInfo} />
      <Heading
          text="Messages in this series"
          alignment="left"
          size="small"
          all_caps="true"
          add_padding=""
          font_color="#565656"
          padding="top"
          bg_color="#F8F8F8"
      />    
      <MediaTiles 
          type="internal" 
          display_type="grid"
          bg_color="#F8F8F8"
          padding="bottom"
          media_list={seriesSlugs} />
      </PageModalProvider>
    </>
  )
}