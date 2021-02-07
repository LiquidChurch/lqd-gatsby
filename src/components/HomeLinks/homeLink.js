import React, { useState, useEffect } from 'react'
import Imgix from 'react-imgix'
import Parse from 'react-html-parser'
import Col from 'react-bootstrap/Col'
import { useLocation } from '@reach/router';
import { AnchorLink as Link } from "gatsby-plugin-anchor-links";

import { useFeaturedImage } from "../../data/featureImage"
import { useImageById } from "../../data/useImage"

import { getDate, mediaUrlConverter } from '../../helpers/functions'


export default ({ 
  page_slug_id, 
  cta_text,
  alt_image,
  url_append,
}) => {  
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
  
  let altImage = ""
  if (alt_image !== undefined) {
    altImage = useImageById(alt_image)
  }

  useEffect(() =>{
    
    if (!imgLoaded) {
      let imageUrl = ""
      if (altImage === "") {
        imageUrl = mediaUrlConverter(page_info.featuredImage.node.mediaItemUrl)
        setCaption(page_info.featuredImage.node.caption)
        setDescription(page_info.featuredImage.node.description)
      } else {
        imageUrl = mediaUrlConverter(altImage.mediaItemUrl)
        setCaption(altImage.caption)
        setDescription(altImage.description)
      }
      setImgUrl(imageUrl + "?ar=16:9&fit=crop&h=296")
      
      if (url_append !== null && url_append !== undefined) {
        setLinkTo(page_info.uri + url_append)
      } else {
        setLinkTo(page_info.uri)
      }

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
