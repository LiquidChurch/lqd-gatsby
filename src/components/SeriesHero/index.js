import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Imgix from 'react-imgix'
import Parse from "react-html-parser"

import './styles.css'
/**
 * Series Hero Component
 */
export default (series) => {
  
  var imgUrl = series.SeriesImage.image.sourceUrl.split("/")
  
  return (
    <section className="fullwidth-section">
    <Container className={'hero-image-container-fixed'}>
      <Row>  
        <Imgix 
          src={process.env.IMGIX_URL + imgUrl[process.env.IMG_DIR_INDEX] + "/" + imgUrl[process.env.IMG_FILE_INDEX]}
          className={'hero-image-fixed'}
          sizes="100vw" />
      </Row>
      <Row>
        <Col xs={{ span:10, offset: 1}} >
          <div className="font-large series-hero-description">{Parse(series.description)}</div>
        </Col>
      </Row>
    </Container>
    </section>
  )
}