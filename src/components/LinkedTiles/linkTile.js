import React from "react"
import Parse from 'react-html-parser'
import Imgix from 'react-imgix'
import Col from 'react-bootstrap/Col'
import { useLocation } from '@reach/router';
import { Link } from 'gatsby'

import { useFeaturedImage } from "../../data/featureImage"
import { getDate, mediaUrlConverter } from '../../helpers/functions'

export default ({ page_slug_id }) => {  
  const page_info = useFeaturedImage(page_slug_id)
  if (page_info === undefined) {
    return (<></>)
  }

  const currentDate = getDate(useLocation().search)
  if ((page_info.publication.publishDate === null || currentDate >= Date.parse(page_info.publication.publishDate.replace(/\s/g, 'T'))) &&
      (page_info.publication.unpublishDate === null || currentDate < Date.parse(page_info.publication.unpublishDate.replace(/\s/g, 'T')))) {
  } else {
    return (<></>)
  }

  var imageUrl = mediaUrlConverter(page_info.featuredImage.node.mediaItemUrl)
  return (
    <>
    <Col sm={12} md={6} lg={4} key={"linked-tile-img-" + page_slug_id}>
      <Link 
        to={page_info.uri}
        key={"linked-tile-img-1" + page_info.databaseId}
      >
      <div className="linked-tile">
        <Imgix 
          src={imageUrl + "?ar=16:9&fit=crop&h=296&exp=-7"}
          altText={page_info.featuredImage.node.altText}
          className="linked-tile-image"
        />   
        <h2 className="linked-tile-title">{Parse(page_info.featuredImage.node.caption)}</h2>
      </div>
      </Link>
    </Col>
    </>
  )
}
