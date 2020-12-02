import React from 'react'
import Imgix from 'react-imgix'
import Parse from 'react-html-parser'
import Col from 'react-bootstrap/Col'
import { useLocation } from '@reach/router';
import { Link } from 'gatsby'

import { useFeaturedImage } from "../../data/featureImage"
import { getDate } from '../../helpers/functions'

export default ({ page_slug_id, cta_text }) => {  
  const page_info = useFeaturedImage(page_slug_id)
  console.log(cta_text)
  if (page_info === undefined) {
    return (<></>)
  }
  
  if (cta_text === '') {
    cta_text = 'Learn More'          
  }
            
  cta_text = cta_text.toUpperCase()
    
  const currentDate = getDate(useLocation().search)
  if ((page_info.publication.publishDate === null || currentDate >= Date.parse(page_info.publication.publishDate.replace(/\s/g, 'T'))) &&
      (page_info.publication.unpublishDate === null || currentDate < Date.parse(page_info.publication.unpublishDate.replace(/\s/g, 'T')))) {
  } else {
    return (<></>)
  }
  
  var imgUrl = page_info.featuredImage.node.mediaItemUrl.split("/")
  
  return (
  <>
  <Col key={"home-tile-" + page_slug_id} xs={12} md={6} className="home-tile">
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
      {cta_text}
    </Link>
  </Col>
  </>
  )
}
