import React, { useContext } from 'react'
import Imgix from 'react-imgix'
import { Link } from 'gatsby'

import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import { ArrowRight } from '../../helpers/icons'
import { useImage } from "../../data/image"
import { PageModalContext } from '../PageModal/context'

import Parse from "react-html-parser"

import "./styles.css"

function StrapImage(props) {
  const image_info = useImage(props.strap_image_id)
  
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
    
  if (props.cta_slug === "open-modal") {
    return (
      <button className="btn font-btn blue-btn" onClick={ctx.toggleModal}>{props.cta_text}</button>
    )
  }
  return (
    <Link className="font-link" to={"/" + props.cta_slug}>{props.cta_text} <ArrowRight style={{fill:"#009DD1;"}} /></Link>
  )
}
/**
 * Page Strap Block Component
 */
export default ({
  cta_slug,
  cta_text,
  strap_bg_img,
  strap_color,
  strap_tag,
  strap_text,
  strap_image,
}) => {
  var hasImage = false
  
  if (strap_image !== null) {
    hasImage = true
  }
  
  return (
  <>
  <section className="fullwidth-section" style={{backgroundColor: strap_color}}>
  <Container>
    <Row>
      <StrapImage strap_image_id={strap_image} />
      <Col id={"strap-body-" + cta_slug} className={hasImage ? "vertical-center strap-pad-left" : "vertical-center"}>
        <h2 className={hasImage ? "page-strap-tag font-h1 strap-left" : "page-strap-tag font-h1"}>{Parse(strap_tag)}</h2>
        <p className={hasImage ? "page-strap-text font-large strap-left" : "page-strap-text font-large"}>{strap_text}</p>
        <div className={hasImage ? "page-strap-cta strap-left" : "page-strap-cta"}>
          <StrapLink cta_text={cta_text} cta_slug={cta_slug} />
        </div>
      </Col> 
    </Row>
  </Container>
  </section>
  </>
  )
}