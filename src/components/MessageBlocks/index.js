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
  console.log(seriesInfo)
  
  let seriesSlugs = []
 
  seriesInfo.messages.nodes.forEach(message => {
    seriesSlugs.push({
      "category": "message",
      "title": message.title,
      "image": message.featuredImage.node.mediaItemUrl,
      "id": message.id,
      "slug": message.slug
    })
    console.log(message)
  })
  
  console.log(seriesSlugs)
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