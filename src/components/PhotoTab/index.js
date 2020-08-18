import React from 'react'
import Imgix from 'react-imgix'
import { Link } from 'gatsby'

import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import CallToAction from '../CallToAction'
import { useImageById } from "../../data/useImage"
import { usePageSlugById } from "../../data/usePage"

import Parse from "react-html-parser"
import { RichTextHelper } from "../../helpers/functions"

import "./photoTab.css"

/**
 * PhotoTab Block Component
 */
export default ({
  location,
  image_id,
  bg_color,
  header,
  text_block,
  header_secondary,
  text_block_secondary,
  cta,
}) => {
  const ctaObject = JSON.parse(cta)
  
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
  
  return (
  <>
  <section className="fullwidth-section" style={{backgroundColor: bg_color}}>
  <Container>
    <Row className="photo-tab-row">
      <Col xs={{span: 12, order: 1}} md={{span: 6, order: imgOrder}} 
          className={(imgOrder === 1) ? "photo-tab-image-col photo-tab-left" : "photo-tab-image-col"}>
        <Imgix 
          src={"https://liquidchurch.imgix.net/" + imgUrl[4] + "/" + imgUrl[5] + "?ar=1:1&fit=crop&h=545"}
          className="photo-tab-image"
          />
      </Col>    
      <Col  xs={{span: 12, order: 2}} md={{span: 6, order: textOrder}} className="photo-tab-body-col" id={"photo-tab-body-" + image_id}>
        <h2 className={(textOrder === 1) ? "photo-tab-tag photo-tab-left font-h1" :"photo-tab-tag font-h1"}>{Parse(header)}</h2>
        <div className={(textOrder === 1) ? "photo-tab-text photo-tab-left font-regular" : "photo-tab-text font-regular"}>{Parse(textBlock)}</div>
        <div className={(textOrder === 1) ? "photo-tab-cta photo-tab-left" : "photo-tab-cta"}>
          {
            ctaObject.rows.map(cta => {
              return (
                <CallToAction cta={cta} />
              )
            })
          }
        </div>
        <h2 className={(textOrder === 1) ? "photo-tab-tag photo-tab-left font-h1" :"photo-tab-tag font-h1"}>{Parse(header_secondary)}</h2>
        <div className={(textOrder === 1) ? "photo-tab-text photo-tab-left font-regular" : "photo-tab-text font-regular"}>{Parse(textBlockSecondary)}</div>
      </Col>
    </Row>    
  </Container>
  </section>
  </>
  )
}
