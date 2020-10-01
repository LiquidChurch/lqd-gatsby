import React from 'react'
import Imgix from 'react-imgix'
import { Link } from 'gatsby'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import SectionHeader from '../../SectionHeader'
import { PlayArrow } from '../../../helpers/icons'
import { useRecentMessages } from "../../../data/useRecentMessages"

import "./styles.css"

/** 
 * Message Tile Block Component
 */
export default ({ message_slug,
                  bg_color,
                  padding,
                  block_title }) => {
  const messageInfo = useRecentMessages(1)

  if (messageInfo === undefined) {
    return (
    <>
    </>
    )
  }

  var imgUrl = messageInfo[0].featuredImage.node.sourceUrl.split("/")
  var partNumber = ""
  if (messageInfo[0].seriesPart.part !== "") {
    partNumber = " · Part " + messageInfo[0].seriesPart.part
  }
  
  return (
  <>
  <section className={'site-section message-tile-section ' + padding} style={{backgroundColor: bg_color}} >
  <Container>
    <Row>
      <Col>
      <Link to={"/message/" + messageInfo[0].slug}>
      <Imgix 
        src={process.env.IMGIX_URL + imgUrl[process.env.IMG_DIR_INDEX] + "/" + imgUrl[process.env.IMG_FILE_INDEX] + "?ar=16:9&fit=crop&h=607"}
        className="d-none d-sm-block message-tile-image"
        sizes="90vw" />
      <Imgix 
        src={process.env.IMGIX_URL + imgUrl[process.env.IMG_DIR_INDEX] + "/" + imgUrl[process.env.IMG_FILE_INDEX] + "?ar=1:1&fit=crop&h=607"}
        className="d-block d-sm-none message-tile-image"
        sizes="80vw" />
      </Link>
      <div className="message-tile-text-overlay">
        <h4 className="message-tile-title font-h1">{messageInfo[0].title}</h4>
        <div className="message-tile-series font-h2">
          <p>
            <Link to={'/series/' + messageInfo[0].seriesList.nodes[0].slug}>{messageInfo[0].seriesList.nodes[0].name}</Link>{partNumber}
          </p>
        </div>
      </div>
      <Link
        className="btn font-btn-large message-tile-btn-overlay"
        to={"/message/" + messageInfo[0].slug}
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