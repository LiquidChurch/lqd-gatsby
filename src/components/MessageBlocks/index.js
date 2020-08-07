import React from "react"

import MessagePlayer from "../MessagePlayer"
import MessageInfo from "../MessageInfo"
import SeriesTitle from "../SeriesTitle"
import MediaTiles from "../MediaTiles"

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
      <SeriesTitle {...seriesInfo} />
      <MediaTiles 
          type="" 
          display_type="grid"
          label="Other Messages in this series" 
          background_color="#F8F8F8"
          media_list={seriesSlugs} />
    </>
  )
}