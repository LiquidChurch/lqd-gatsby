import React, { useContext } from 'react'
import Imgix from 'react-imgix'
import { Link } from 'gatsby'

import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import CallToAction from '../CallToAction'
import { ArrowForward } from '../../helpers/icons'
import { useImageById } from "../../data/useImage"
import { usePageById } from "../../data/usePage"
import { PageModalContext } from '../PageModal/context'

import Parse from "react-html-parser"

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

function StrapLink(props) {
  const ctx = useContext(PageModalContext)
  
  if (props.cta_slug === null) {
    return (
    <>
    </>
    )
  }
  
  if (props.cta_slug === "open-modal") {
    return (
      <button className="btn font-btn blue-btn" onClick={ctx.toggleModal}>{props.cta_text}</button>
    )
  }
  return (
    <Link className="font-link" to={"/" + props.cta_slug}>{props.cta_text} <ArrowForward style={{fill:"#009DD1;"}} /></Link>
  )
}
/**
 * Page Strap Block Component
 */
export default ({
  statement,
  sidekick,
  bg_color,
  image_id,
  cta,
}) => {
  const ctaObject = JSON.parse(cta)



  
  var hasImage = false
  if (image_id !== null && image_id !== undefined && image_id !== 0) {
    console.log('image_id', image_id)
    hasImage = true
  }
  
  return (
  <>
  <section className="fullwidth-section page-strap-section" style={{backgroundColor: bg_color}}>
  <Container>
    <Row>
      <StrapImage strap_image_id={image_id} />
      <Col id={"strap-body-" + image_id} className={hasImage ? "vertical-center strap-pad-left" : "vertical-center"}>
        <h2 className={hasImage ? "page-strap-tag font-h1 strap-left" : "page-strap-tag font-h1"}>{Parse(statement)}</h2>
        <div className={hasImage ? "page-strap-text font-large strap-left" : "page-strap-text font-large"}>{Parse(sidekick)}</div>
        <div className={hasImage ? "page-strap-cta font-medium strap-left" : "page-strap-cta font-medium"}>
          {
            ctaObject.rows.map(cta => {
              return (
                <CallToAction cta={cta} />
              )
            })
          }
        </div>
      </Col> 
    </Row>
  </Container>
  </section>
  </>
  )
}