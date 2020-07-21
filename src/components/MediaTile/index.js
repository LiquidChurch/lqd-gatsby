import React from 'react'
import Imgix from 'react-imgix'
import { Link } from 'gatsby'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

import { useMedia } from '../../data/media'
import { RemoveParagraph } from '../../helpers/functions'

import './styles.css'

/** 
 * Media Tile Block Component
 */
export default ({
  block_title,
  background_color,
  media_slug,
}) => {
  const media_info = useMedia(media_slug)
  var imgUrl = media_info.featuredImage.mediaItemUrl.split("/")
  var authorImgUrl = media_info.author.avatar.url.split("/")

  const formatter = new Intl.DateTimeFormat('en-US', { month: 'short',  day: 'numeric',   year: 'numeric'});
  const formattedDate =  formatter.format(new Date(media_info.date));
  
  const category = media_info.categories.nodes[0].slug
  
  if (media_info === undefined) {
    return (
    <>
    </>
    )
  }
  
  return (
  <>
  <section className="fullwidth-section media-tile-section" style={{backgroundColor: background_color}} >
  <Container>
    <Row>
      <Col xs={{span:12, offset:0}} md={{ span: 10, offset: 1 }}>
        <h6 className="message-tile-block-title">{block_title}</h6>
      </Col>
      <Col xs={{span:12, offset:0}} md={{ span: 10, offset: 1 }}>
        <Link to={"/" + category + "/" + media_info.slug}>
        <Imgix
          src={"https://liquidchurch.imgix.net/" + imgUrl[4] + "/" + imgUrl[5] + "?ar=16:9&fit=crop&h=296"}
          className="media-tile-image"
          sizes="50vw" />
        </Link>
        <Card className="media-tile-card" style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title className="media-tile-title"><RemoveParagraph tempString={media_info.featuredImage.caption} /></Card.Title>
            <Card.Text className="media-tile-text"><RemoveParagraph tempString={media_info.featuredImage.description} /></Card.Text>
            <Card.Header className="media-tile-author">
              <Imgix
                src={"https://liquidchurch.imgix.net/" + authorImgUrl[4] + "/" + authorImgUrl[5] + "?ar=1:1&fit=crop&mask=ellipse&h=50"}
                className="media-tile-author-image"
              />
                <div className="media-tile-author-name">{media_info.author.name}</div>
                <div className={"media-tile-icon " + category + "-icon"}></div>
                <div className="media-tile-date">{formattedDate}</div>
            </Card.Header>
          </Card.Body>
        </Card>
      </Col>   
    </Row>
  </Container>
  </section>
  </>
  )
}