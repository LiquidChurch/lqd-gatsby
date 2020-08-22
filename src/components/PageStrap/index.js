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
  cta,
  bg_color,
  padding,
  alignment,
  image_id,
}) => {
  const ctaObject = JSON.parse(cta)
  
  var sidekickTop = true
  var ctaTop = true
  var hasStatement = false
  var hasSidekick = false
  var hasCTA = false
  
  if (statement !== null && statement !== '') {
    hasStatement = true
    sidekickTop = false
    ctaTop = false
  } 
  
  if (sidekick !== null && sidekick !== '') {
    hasSidekick = true
    ctaTop = false
  }

  if (ctaObject.rows[0].style !== undefined) {
    hasCTA = true
    
    let ctaObjectLength = ctaObject.rows.length
    ctaObject.rows.forEach((cta, i) => {
      if (i === (ctaObjectLength - 1) ) {
        ctaObject.rows[i].lastItem = true
      } else {
        ctaObject.rows[i].lastItem = false
      }
    })
  }
  
  
  var hasImage = false
  if (image_id !== null && image_id !== undefined && image_id !== 0) {
    hasImage = true
  }
  
  return (
  <>
  <section className={'site-section ' + padding} style={{backgroundColor: bg_color}}>
  <Container>
    <Row>
      <StrapImage strap_image_id={image_id} />
      <Col className={"vertical-center"}>
        <h2 className={hasStatement ? 'page-strap-tag font-h1 align-' + alignment : 'no-display'}>{Parse(statement)}</h2>
        <div className={hasSidekick ? (sidekickTop ? 'page-strap-text font-large zero-padding-top align-' + alignment : 'page-strap-text font-large align-' + alignment) : 'no-display'}>{Parse(sidekick)}</div>
        <div className={hasCTA ? (ctaTop ? 'page-strap-cta font-medium zero-padding-top align-' + alignment : 'page-strap-cta font-medium align-' + alignment ) :'no-display'}>
          {hasCTA ? 
              ctaObject.rows.map(cta => {
                return (
                  <CallToAction cta={cta} alignment={alignment}/>
                )
              })
             : ''
          }
        </div>
      </Col> 
    </Row>
  </Container>
  </section>
  </>
  )
}