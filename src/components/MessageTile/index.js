import React from 'react'
import Imgix from 'react-imgix'
import { Link } from 'gatsby'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { PlayArrow } from '../../helpers/icons'
import { useMessage } from "../../data/message"

import "./styles.css"

/** 
 * Message Tile Block Component
 */
export default ({ message_slug,
                  background_color,
                  block_title }) => {
  const message_info = useMessage(message_slug)
  
  if (message_info === undefined) {
    return (
    <>
    </>
    )
  }

  var imgUrl = message_info.featured_image.split("/")
  var partNumber = ""
  if (message_info.display_order !== "") {
    partNumber = " · Part " + message_info.display_order
  }
  
  return (
  <>
  <section className="fullwidth-section message-tile-section" style={{backgroundColor: background_color}} >
  <Container>
    <Row>
      <Col xs={12}>
        <h6 className="font-section-header">{block_title}</h6>
      </Col>
      <Col>
      <Link to={"/message/" + message_info.slug}>
      <Imgix 
        src={"https://liquidchurch.imgix.net/" + imgUrl[4] + "/" + imgUrl[5] + "?ar=16:9&fit=crop&h=607"}
        className="d-none d-sm-block message-tile-image"
        sizes="90vw" />
      <Imgix 
        src={"https://liquidchurch.imgix.net/" + imgUrl[4] + "/" + imgUrl[5] + "?ar=1:1&fit=crop&h=607"}
        className="d-block d-sm-none message-tile-image"
        sizes="80vw" />
      </Link>
      <h4 className="message-tile-title">{message_info.title}</h4>
      <p className="message-tile-series">
        <Link to={"/series/" + message_info.lqdmSeriesNodes.nodes[0].slug}>{message_info.lqdmSeriesNodes.nodes[0].name}</Link>{partNumber}</p>
      <Link
        className="btn message-tile-btn"
        to={"/message/" + message_info.slug}
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