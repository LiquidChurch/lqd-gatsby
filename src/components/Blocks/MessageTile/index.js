import React, { useEffect, useState } from 'react'
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
  const [msgInfoObject, setMsgInfoObject] = useState({})
  var messageInfo = useRecentMessages(1, getDate(useLocation().search))
  
  useEffect(() => {
    let imageInfo = {}
    if (messageInfo[0] !== null) {
      imageInfo = messageInfo[0]
    }
    if (!imgLoaded) {
      
      let imageUrl = mediaUrlConverter(imageInfo.featuredImage.node.mediaItemUrl)
      setImgUrl(imageUrl)
      
      let tempPartNumber =''
      if (imageInfo.seriesPart.part !== null && imageInfo.seriesPart.part !== "") {
        tempPartNumber = " · Part " + imageInfo.seriesPart.part
      }
      
      let msgInfo = {
        'messageTitle': imageInfo.title,
        'messageSlug': imageInfo.slug,
        'partNumber': tempPartNumber,
        'seriesTitle': imageInfo.seriesList.nodes[0].name,
        'seriesSlug': imageInfo.seriesList.nodes[0].slug
      }
      
      setMsgInfoObject(msgInfo)
      
      setImgLoaded(true)
    }
  },[setImgUrl,imgLoaded, setImgLoaded,messageInfo,setMsgInfoObject])
  
  return (
  <>
  <section className={'site-section message-tile-section ' + padding} style={{backgroundColor: bg_color}} key={'section-' + keyValue}>
  <Container key={'container-' + keyValue}>
    <Row>
      <Col>
    <div className="message-tile">
      {imgLoaded && 
        <MessageImage
          messageSlug = {msgInfoObject.messageSlug}
          imageUrl = {imgUrl}
        />
      }
    </div>
      <div className="message-tile-text-overlay">
        <div className="message-tile-title font-h1">
          <Link to={"/messages/" + msgInfoObject.messageSlug}>{msgInfoObject.messageTitle}</Link>
        </div>
        <div className="message-tile-series font-h2">
          <p>
            <Link to={'/series/' + msgInfoObject.seriesSlug}>{msgInfoObject.seriesTitle}</Link>{msgInfoObject.partNumber}
          </p>
        </div>
      </div>
      <Link
        className="btn font-btn-large message-tile-btn-overlay"
        to={"/messages/" + msgInfoObject.messageSlug}
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