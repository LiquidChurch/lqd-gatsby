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
    <Imgix 
      src={"https://liquidchurch.imgix.net/" + imgUrl[4] + "/" + imgUrl[5] + "?ar=16:9&fit=crop"}
      altText={page_info.featuredImage.altText}
      className="home-tile-image"
      sizes="100vw" />
    <h3 className="home-tile-caption">{Parse(page_info.featuredImage.caption)}</h3>
    <p className="home-tile-description">{Parse(page_info.featuredImage.description)}</p>
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
