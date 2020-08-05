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
    
    let speakers = "" 
  
    message.speakers.nodes.forEach(item => {
      if (speakers === "") {
        speakers = item.name 
      } else {
        speakers = speakers + ", " + item.name
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
      "seriesTitle": message.seriesList.nodes[0].name,
      "seriesPart": message.seriesPart.part,
      "seriesSpeaker": speakers,
      "showSeries": true,
      "showSpeakers": true,
      "date": formattedDate,
      "speakerImage": message.speakers.nodes[0].AuthorImage.image.sourceUrl,
    })
  })
  
  return (
    <>
      <MessagePlayer {...lqdmMessage} />
      <MessageInfo {...lqdmMessage} />
      <SeriesTitle {...seriesInfo} />
      <MediaTiles 
          type="" 
          label="Other Messages in this series" 
          background_color="#F8F8F8"
          media_list={seriesSlugs} />
    </>
  )
}