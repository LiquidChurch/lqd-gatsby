import React from 'react'
import Imgix from 'react-imgix'
import Parse from 'react-html-parser'
import { Link } from 'gatsby'

import { useFeaturedImage } from "../../data/featureImage"

export default ({ page_slug_id }) => {  
  const page_info = useFeaturedImage(page_slug_id)
  if (page_info === undefined) {
    return (
    <>
    </>
    )
  }
  
  var imgUrl = page_info.featuredImage.node.mediaItemUrl.split("/")
  
  return (
  <>
    <Link 
      to={page_info.uri}
      key={"home-tile-image-" + page_info.databaseId}
    >
    <Imgix 
      src={process.env.IMGIX_URL + imgUrl[process.env.IMG_DIR_INDEX] + "/" + imgUrl[process.env.IMG_FILE_INDEX] + "?ar=16:9&fit=crop&h=296"}
      altText={page_info.featuredImage.altText}
      className="home-tile-image"
      sizes="100vw" />
    </Link>
    <h3 className="home-tile-caption font-h2">{Parse(page_info.featuredImage.node.caption)}</h3>
    <div className="home-tile-description font-h3">{Parse(page_info.featuredImage.node.description)}</div>
    <Link
      className="btn font-btn"
      key={"home-tile-button" + page_info.databaseId}
      to={page_info.uri}
    >
      LEARN MORE
    </Link>
  </>
  )
}
