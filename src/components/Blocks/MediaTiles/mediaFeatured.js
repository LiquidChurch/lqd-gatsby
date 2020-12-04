import React from 'react'
import Imgix from 'react-imgix'
import Parse from 'react-html-parser'

import { Link } from 'gatsby'

import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'


export default ({mediaItem}) => {
  console.log('mediaFeature', mediaItem)
  if (mediaItem === undefined) {
    return (<></>)
  }
  
  var imgUrl = mediaItem.image.split("/")
  var profileImgUrl = mediaItem.profileImage.split("/")
  
  return (
    <Col xs={{span:12, offset:0}} md={{ span: 10, offset: 1 }} className="media-tile-col">
      <div className="media-tile-card-image">
        <Link to={"/" + mediaItem.category + "/" + mediaItem.slug}>
          <Imgix
            src={process.env.IMGIX_URL + imgUrl[process.env.IMG_DIR_INDEX] + "/" + imgUrl[process.env.IMG_FILE_INDEX] + "?ar=16:9&fit=crop&h=296"}
            className="rounded media-tile-image"
            size="100vw"
            />
        </Link>
      </div>
      <Card className="media-tile-card" style={{ width: '18rem' }}>
        <Card.Body className="media-tile-card-body">
        <Link to={"/" + mediaItem.category + "/" + mediaItem.slug} className="media-tile-card-link">
          <Card.Title className="media-tile-title font-h2">{mediaItem.title}</Card.Title>
          <Card.Text as="div" className="media-tile-text font-regular">{Parse(mediaItem.blurb)}</Card.Text>
          <Card.Header className="media-tile-author">
            <Imgix
              src={process.env.IMGIX_URL + profileImgUrl[process.env.IMG_DIR_INDEX] + "/" + profileImgUrl[process.env.IMG_FILE_INDEX] + "?ar=1:1&fit=crop&fill-color=0FFF&mask=ellipse&h=50"}
              className="media-tile-author-image"
            />
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