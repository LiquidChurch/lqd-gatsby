import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Imgix from 'react-imgix'
import Parse from "react-html-parser"

import { mediaUrlConverter } from '../../helpers/functions'

import './styles.css'
/**
 * Series Hero Component
 */
export default (series) => {
  
  var imageUrl = mediaUrlConverter(series.SeriesImage.image.mediaItemUrl)
  return (
    <section className="fullwidth-section">
    <Container className={'hero-image-container-fixed'}>
      <Row>  
        <Imgix 
          src={imageUrl}
          className={'hero-image-fixed'}
          sizes="100vw" />
      </Row>
      <Row>
        <Col xs={{ span:10, offset: 1}} >
          <div className="font-regular series-hero-description">{Parse(series.description)}</div>
        </Col>
      </Row>
    </Container>
    </section>
  )
}