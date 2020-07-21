import React from 'react'
import Imgix from 'react-imgix'
import Parse from 'react-html-parser'
import { Link } from 'gatsby'

import { useFeaturedImage } from "../../data/featureImage"

export default ({ page_slug }) => {
  const page_info = useFeaturedImage(page_slug)
  if (page_info === undefined) {
    return (
    <>
    </>
    )
  }
  
  var imgUrl = page_info.featuredImage.mediaItemUrl.split("/")
  
  return (
  <>
    <Link to={"/" + page_info.slug}>
    <Imgix 
      src={"https://liquidchurch.imgix.net/" + imgUrl[4] + "/" + imgUrl[5] + "?ar=16:9&fit=crop&h=296"}
      altText={page_info.featuredImage.altText}
      className="home-tile-image"
      sizes="100vw" />
    </Link>
    <h3 className="home-tile-caption">{Parse(page_info.featuredImage.caption)}</h3>
    <div className="home-tile-description">{Parse(page_info.featuredImage.description)}</div>
    <Link
      className="btn home-tile-btn"
      key={page_info.id}
      to={"/" + page_info.slug}
    >
      LEARN MORE
    </Link>
  </>
  )
}
