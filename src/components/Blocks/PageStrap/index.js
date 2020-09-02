import React from 'react'
import Imgix from 'react-imgix'

import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import TextArea from '../../Commons/TextArea'

import { useImageById } from "../../../data/useImage"
//import { PageModalContext } from '../../PageModal/context'

import "./styles.css"

function StrapImage(props) {
  const image_info = useImageById(props.strap_image_id)
  
  if (image_info !== undefined) {
    var imgUrl = image_info.mediaItemUrl.split("/")
    return (
      <Col xs={12} sm={12} md={4} lg={3} className="page-strap-image-col">
        <Imgix 
          src={"https://liquidchurch.imgix.net/" + imgUrl[4] + "/" + imgUrl[5] + "?h=296"}
          className="page-strap-image"
          sizes="40vw" />
      </Col>
    )
  }  
  return null
}


/**
 * Page Strap Block Component
 */
export default ({
  statement,
  sidekick,
  cta,
  bg_color,
  padding,
  spacing,
  alignment,
  size,
  color,
  image_id,
}) => {
  //var hasImage = false
  //if (image_id !== null && image_id !== undefined && image_id !== 0) {
  //  hasImage = true
  //}

  return (
  <>
  <section className={'site-section ' + padding} style={{backgroundColor: bg_color}}>
  <Container>
    <Row>
      <StrapImage strap_image_id={image_id} />
      <Col className={"page-strap-col vertical-center"}>
        <TextArea 
          statement={statement}
          sidekick={sidekick}
          cta={cta}
          alignment={alignment}
          size={size}
          spacing={spacing}
          theme={color}
        />
      </Col> 
    </Row>
  </Container>
  </section>
  </>
  )
}