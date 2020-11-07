import React from 'react'
import Imgix from 'react-imgix'
import { useLocation } from '@reach/router';

import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import TextArea from '../../Commons/TextArea'
import Heading from "../../Blocks/Heading"
import CallToAction from '../../Commons/CallToAction'
import { useImageById } from "../../../data/useImage"
import { ClassicTextHelper, getDate } from "../../../helpers/functions.js"

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
  color,
  bg_color,
  padding,
  spacing,
  alignment,
  header_size,
  size,
  block_on,
  block_off,
}) => {
  const currentDate = getDate(useLocation().search)
  let isPublished = false
  if ((block_on === null || currentDate >= Date.parse(block_on)) &&
      (block_off === null || currentDate < Date.parse(block_off))) {
    isPublished = true
  }
  
  const imageInfo = useImageById(image_id)
  const ctaObject = JSON.parse(cta)
  let hasCTA = false
  let textAreaId = ""
  if (ctaObject !== null && ctaObject.rows.length !== 0) {
      
    if (typeof ctaObject.rows[0].style !== 'undefined') {
      hasCTA = true
      textAreaId = Math.random().toString(36).substring(2, 7) + Math.random().toString(36).substring(2, 7) 
      let ctaObjectLength = ctaObject.rows.length
      ctaObject.rows.forEach((cta, i) => {
        if (i === (ctaObjectLength - 1) ) {
          ctaObject.rows[i].lastItem = true
        } else {
          ctaObject.rows[i].lastItem = false
        }
      })
    }
  }
  
  if (imageInfo === undefined) {
    return(
      <>
      </>
    )
  }
  var imgUrl = imageInfo.mediaItemUrl.split("/")
  
  var isAlternative = false
  var altTopPadding = "top"
  var headerColor = "#009DD1"
  if (location.substr(location.length - 3) === 'alt') {
    isAlternative = true
    if (padding === "none" || padding === "bottom") {
      altTopPadding = "none"
    }
    
    if (color === "dark") {
      headerColor = "#FFF"
    }
    
    if (color === "family") {
      headerColor = "#E16D00"
    }
    if (padding === "top" || padding === "none") {
      padding = "none"    
    } else {
      padding = "bottom"
    }
  }
  
  var imgOrder = 1
  var textOrder = 2
  
  if (location.slice(0,3) === "rig") {
    imgOrder = 2
    textOrder = 1
  }
  
  if (text_block !== "<p></p>" || text_block !== null) { 
    //var textBlock = RichTextHelper(text_block)
    var textBlock = ClassicTextHelper(text_block)
  }

  let hasSecondary = false
  
  if (text_block_secondary !== "<p></p>" && text_block_secondary !== null) { 
    var textBlockSecondary = ClassicTextHelper(text_block_secondary)
    hasSecondary = true
  }
  
  if (header_secondary !== null) {
    hasSecondary = true
  }
  
  return (
  <>
  {isPublished &&
   <>
    {isAlternative &&
      <Heading
        text={header}
        alignment="center"
        size={header_size}
        all_caps={false}
        add_padding={true}
        font_color={headerColor}
        padding={altTopPadding}
        bg_color={bg_color}
      />
    }
    <section className={'site-section ' + padding} style={{backgroundColor: bg_color}}>
    <Container>
      <Row className="photo-tab-row">
        <Col xs={{span: 12, order: 1}} md={{span: 6, order: imgOrder}} 
            className={(imgOrder === 1) ? "photo-tab-image-col photo-tab-left" : "photo-tab-image-col"}>
          <Imgix 
            src={process.env.IMGIX_URL + imgUrl[process.env.IMG_DIR_INDEX] + "/" + imgUrl[process.env.IMG_FILE_INDEX] + "?ar=1:1&fit=crop&h=525"}
            className="photo-tab-image"
            height={525}
            />
        </Col>    
        <Col  xs={{span: 12, order: 2}} md={{span: 6, order: textOrder}} className="photo-tab-body-col" id={"photo-tab-body-" + image_id}>
          <TextArea 
            statement={isAlternative ? null : header}
            sidekick={textBlock}
            cta={isAlternative ? null : cta}
            alignment={alignment}
            headerSize={header_size}
            size={size}
            spacing={spacing}
            theme={color}
            noMargin={true}
          />
          <div className={hasSecondary ? "text-padding" : ''}></div>
          <TextArea 
            statement={header_secondary}
            sidekick={textBlockSecondary}
            cta={cta_secondary}
            alignment={alignment}
            headerSize={header_size}
            size={size}
            spacing={spacing}
            theme={color}
            noMargin={true}
          />    
        </Col>
      </Row>
      <Row>
        {isAlternative &&
        <Col className={'cta ' + header_size + ' half-top-padding'}>
          {hasCTA ? 
            ctaObject.rows.map(cta => {
              return (
                <CallToAction cta={cta} alignment="center" spacing="tall" theme={color} key={textAreaId + '-' + cta.page_id.id}/>
              )
            }) : ''
          }
          </Col>
        }
      </Row>
    </Container>
    </section>
  </>
  }
  </>
  )
}
