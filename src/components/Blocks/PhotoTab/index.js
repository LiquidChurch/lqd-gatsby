import React from 'react'
import Imgix from 'react-imgix'

import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import TextArea from '../../Commons/TextArea'

import { useImageById } from "../../../data/useImage"

import Parse from "react-html-parser"
import { RichTextHelper } from "../../../helpers/functions"

import "./photoTab.css"

/**
 * PhotoTab Block Component
 */
export default ({
  location,
  image_id,
  header,
  text_block,
  cta,
  header_secondary,
  text_block_secondary,
  cta_secondary,
  bg_color,
  padding,
  spacing,
  alignment,
  header_size,
  size,  
}) => {
  const imageInfo = useImageById(image_id)

  if (imageInfo === undefined) {
    return(
      <>
      </>
    )
  }
  var imgUrl = imageInfo.mediaItemUrl.split("/")
  
  var imgOrder = 1
  var textOrder = 2
  
  if (location === "right") {
    imgOrder = 2
    textOrder = 1
  }

  if (text_block !== "" || text_block !== null) { 
    var textBlock = RichTextHelper(text_block)
  }

  if (text_block_secondary !== "" || text_block_secondary !== null) { 
    var textBlockSecondary = RichTextHelper(text_block_secondary)
  }
  
  let hasSecondary = true
  if (header_secondary === null && text_block_secondary === null) {
    console.log('no secondary block')
    hasSecondary = false
  }
  
  return (
  <>
  <section className={'site-section ' + padding} style={{backgroundColor: bg_color}}>
  <Container>
    <Row className="photo-tab-row">
      <Col xs={{span: 12, order: 1}} md={{span: 6, order: imgOrder}} 
          className={(imgOrder === 1) ? "photo-tab-image-col photo-tab-left" : "photo-tab-image-col"}>
        <Imgix 
          src={process.env.IMGIX_URL + imgUrl[4] + "/" + imgUrl[5] + "?ar=1:1&fit=crop&h=525"}
          size="100vw"
          className="photo-tab-image"
          />
      </Col>    
      <Col  xs={{span: 12, order: 2}} md={{span: 6, order: textOrder}} className="photo-tab-body-col" id={"photo-tab-body-" + image_id}>
        <TextArea 
          statement={header}
          sidekick={textBlock}
          cta={cta}
          alignment={alignment}
          headerSize={header_size}
          size={size}
          spacing={spacing}
          theme={'light'}
          noMargin={true}
        />
        <div className={hasSecondary ? "text-padding" : ''} ></div>
        <TextArea 
          statement={header_secondary}
          sidekick={textBlockSecondary}
          cta={cta_secondary}
          alignment={alignment}
          headerSize={header_size}
          size={size}
          spacing={spacing}
          theme={'light'}
          noMargin={true}
        />    
      </Col>
    </Row>    
  </Container>
  </section>
  </>
  )
}
