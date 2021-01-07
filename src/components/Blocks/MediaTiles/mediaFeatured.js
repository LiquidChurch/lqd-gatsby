import React, { useState, useEffect } from 'react'
import Imgix from 'react-imgix'
import Parse from 'react-html-parser'

import { Link } from 'gatsby'
import { mediaUrlConverter } from '../../../helpers/functions'

import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'


export default ({mediaItem}) => {
    
  if (mediaItem === undefined) {
    return (<></>)
  }
  const [imgUrl, setImgUrl] = useState("")
  const [profileImgUrl, setProfileImgUrl] = useState("")
  const [imgLoaded, setImgLoaded] = useState(false)
   
  useEffect(() =>{
    if (!imgLoaded) {
      let imageUrl = mediaUrlConverter(mediaItem.image)
      setImgUrl(imageUrl + "?ar=16:9&fit=crop&h=296")
      let profileImageUrl = mediaUrlConverter(mediaItem.profileImage)
      setProfileImgUrl(profileImageUrl + "?ar=1:1&fit=crop&fill-color=0FFF&mask=ellipse&h=50")
      setImgLoaded(true)
    }
  }, [imgLoaded, mediaItem])  
  
  return (
    <Col xs={{span:12, offset:0}} md={{ span: 10, offset: 1 }} className="media-tile-col">
      <div className="media-tile-card-image">
        <Link to={"/" + mediaItem.category + "/" + mediaItem.slug}>
          {imgLoaded &&
            <Imgix
              src={imgUrl}
              className="rounded media-tile-image"
              size="100vw"
            />
          }
        </Link>
      </div>
      <Card className="media-tile-card" style={{ width: '18rem' }}>
        <Card.Body className="media-tile-card-body">
        <Link to={"/" + mediaItem.category + "/" + mediaItem.slug} className="media-tile-card-link">
          <Card.Title className="media-tile-title font-h2">{mediaItem.title}</Card.Title>
          <Card.Text as="div" className="media-tile-text font-regular">{Parse(mediaItem.blurb)}</Card.Text>
          <Card.Header className="media-tile-author">
            {imgLoaded &&
              <Imgix
                src={profileImgUrl}
                className="media-tile-author-image"
              />
            }
              <div className="media-card-attribution-info">
                <div className="media-card-name">{mediaItem.attributionName}</div>
                <div className={"media-card-icon " + mediaItem.category + "-icon"}></div>
                <div className="media-card-date">{mediaItem.date}</div>
              </div>
          </Card.Header>
        </Link>
        </Card.Body>
      </Card>
    </Col>   
  )
}