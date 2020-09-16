import React from "react"

import MessagePlayer from "../MessagePlayer"
import MessageInfo from "../MessageInfo"
import SeriesTitle from "../SeriesTitle"
import MediaTiles from "../Blocks/MediaTiles"
import Heading from "../Blocks/Heading"

import { useSeries } from "../../data/useSeries"

/** 
 * Message Blocks
 */
export default (lqdmMessage) => {
  const seriesInfo = useSeries(lqdmMessage.seriesList.nodes[0].slug)
  let seriesSlugs = []
 
  seriesInfo.messages.nodes.forEach(message => {
    
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

    seriesSlugs.push({
      "category": "message",
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
      "profileImage": message.attributions.nodes[0].profileImage.image.sourceUrl,
      "date": formattedDate,
    })
  })
  
  return (
    <>
      <MessagePlayer {...lqdmMessage} />
      <MessageInfo {...lqdmMessage} />
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
          text="Other Messages in this series"
          alignment="left"
          size="small"
          all_caps="true"
          add_padding=""
          font_color="#565656"
          padding="none"
          bg_color="#F8F8F8"
      />    
      <MediaTiles 
          type="" 
          display_type="grid"
          bg_color="#F8F8F8"
          padding="bottom"
          media_list={seriesSlugs} />
    </>
  )
}