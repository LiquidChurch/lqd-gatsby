import React, { useState } from 'react'
import Imgix from 'react-imgix'
import { Link } from 'gatsby'
import { useLocation } from '@reach/router';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { getDate, mediaUrlConverter } from '../../../helpers/functions'
import { PlayArrow } from '../../../helpers/icons'
import { useRecentMessages } from "../../../data/useRecentMessages"

import "./styles.css"

function MessageImage(props) {
  return (
    <>
      <Link to={"/messages/" + props.messageSlug}>
      <Imgix 
        src={props.imageUrl + "?ar=16:9&fit=crop&h=607"}
        className="d-none d-md-block message-tile-image"
        sizes="90vw" />
      <Imgix 
        src={props.imageUrl + "?ar=1:1&fit=crop&h=607"}
        className="d-block d-md-none message-tile-image"
        sizes="90vw" />
      </Link>
    </>
  )
}
/** 
 * Message Tile Block Component
 */
export default ({ keyValue,
                  bg_color,
                  padding }) => {
  const [imgUrl, setImgUrl] = useState("")
  const [imgLoaded, setImgLoaded] = useState(false)
  
  let messageInfo = useRecentMessages(1, getDate(useLocation().search))

  if (messageInfo === undefined || messageInfo[0] === undefined) {
  } else {
    if (!imgLoaded) {
      let imageUrl = mediaUrlConverter(messageInfo[0].featuredImage.node.mediaItemUrl)
      setImgUrl(imageUrl)
      setImgLoaded(true)
    }
  }

  let partNumber = ""
  let messageTitle = ""
  let messageSlug = ""
  let seriesSlug = ""
  let seriesTitle = ""
  
  if (imgLoaded) {
    if (messageInfo[0].seriesPart.part !== null && messageInfo[0].seriesPart.part !== "") {
      partNumber = " · Part " + messageInfo[0].seriesPart.part
    }
    messageTitle = messageInfo[0].title
    messageSlug = messageInfo[0].slug
    seriesTitle = messageInfo[0].seriesList.nodes[0].name
    seriesSlug = messageInfo[0].seriesList.nodes[0].slug
  }

  return (
  <>
  <section className={'site-section message-tile-section ' + padding} style={{backgroundColor: bg_color}} key={'section-' + keyValue}>
  <Container key={'container-' + keyValue}>
    <Row>
      <Col>
    <div className="message-tile">
      {imgLoaded && 
        <MessageImage
          messageSlug = {messageSlug}
          imageUrl = {imgUrl}
        />
      }
    </div>
      <div className="message-tile-text-overlay">
        <div className="message-tile-title font-h1">
          <Link to={"/messages/" + messageSlug}>{messageTitle}</Link>
        </div>
        <div className="message-tile-series font-h2">
          <p>
            <Link to={'/series/' + seriesSlug}>{seriesTitle}</Link>{partNumber}
          </p>
        </div>
      </div>
      <Link
        className="btn font-btn-large message-tile-btn-overlay"
        to={"/messages/" + messageSlug}
      > 
        <PlayArrow style={{fill:"#fff;"}} /> Watch
      </Link>
      </Col>
    </Row>
  </Container>
  </section>
  </>
  )
}