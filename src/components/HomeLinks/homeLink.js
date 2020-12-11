import React, { useState, useEffect } from 'react'
import Imgix from 'react-imgix'
import Parse from 'react-html-parser'
import Col from 'react-bootstrap/Col'
import { useLocation } from '@reach/router';
import { Link } from 'gatsby'

import { useFeaturedImage } from "../../data/featureImage"
import { getDate } from '../../helpers/functions'

export default ({ page_slug_id, cta_text }) => {  
  const page_info = useFeaturedImage(page_slug_id)
  if (page_info === undefined) {
    return (<></>)
  }
  
  const [imgUrl, setImgUrl] = useState("")
  const [linkTo, setLinkTo] = useState("")
  const [caption, setCaption] = useState("")
  const [description, setDescription] = useState("")
  const [imgLoaded, setImgLoaded] = useState(false)
  
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
  
  //var imgUrl = page_info.featuredImage.node.mediaItemUrl.split("/")

  useEffect(() =>{
    if (!imgLoaded) {
      let imgArray = page_info.featuredImage.node.mediaItemUrl.split("/")
      setImgUrl(process.env.IMGIX_URL + imgArray[process.env.IMG_DIR_INDEX] + "/" + imgArray[process.env.IMG_FILE_INDEX] + "?ar=16:9&fit=crop&h=296")
      setLinkTo(page_info.uri)
      setCaption(page_info.featuredImage.node.caption)
      setDescription(page_info.featuredImage.node.description)
      setImgLoaded(true)
    }
  }, [imgLoaded, page_info.featuredImage])  
    
  return (
  <>
  {imgLoaded && 
  <Col key={"home-tile-" + page_slug_id} xs={12} md={6} className="home-tile">
    <Link 
      to={linkTo}
      key={"home-tile-image-" + page_info.databaseId}
    >
      <Imgix 
        src={imgUrl}
        altText={page_info.featuredImage.altText}
        className="home-tile-image"
        sizes="100vw" />
    <h3 className="home-tile-caption font-h2">{Parse(caption)}</h3>
    <div className="home-tile-description font-h3">{Parse(description)}</div>
    </Link>
    <Link
      className="btn font-btn"
      key={"home-tile-button" + page_info.databaseId}
      to={linkTo}
    >
      {cta_text}
    </Link>
  </Col>
  }
  </>
  )
}
