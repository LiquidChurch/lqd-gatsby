import React from 'react'
import { Link } from 'gatsby'

import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import { ArrowRight } from '../../helpers/icons'

import Parse from "react-html-parser"

import "./styles.css"

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
}) => {
  
  return (
  <>
  <section className="fullwidth-section" style={{backgroundColor: strap_color}}>
  <Container>
    <Row>
      <Col>
        <h2 className="page-strap-tag">{Parse(strap_tag)}</h2>
        <p className="page-strap-text">{strap_text}</p>
        <div className="page-strap-cta">
          <Link className="page-strap-cta-text" to={cta_slug}>{cta_text} <ArrowRight style={{fill:"#009DD1;"}} /></Link>
        </div>
      </Col> 
    </Row>
  </Container>
  </section>
  </>
  )
}