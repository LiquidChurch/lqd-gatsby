import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Imgix from 'react-imgix'
import { Link } from 'gatsby'

import SectionHeader from '../SectionHeader'

import './styles.css'

/**
 * Series Title Component
 */
export default (series) => {
  var imgUrl = series.SeriesImage.image.sourceUrl.split("/")

  return (
  <>
  <section className="fullwidth-section message-title-section" style={{backgroundColor: '#f8F8F8'}}>
  <Container>
    <Row>
      <SectionHeader label="Message Series" offset={0}/>
      <Col>
      <Link to={"/series/" + series.slug}>
        <Imgix
          src={"https://liquidchurch.imgix.net/" + imgUrl[4] + "/" + imgUrl[5] + "?ar=16:9&fit=crop&h=607"}
          className="message-tile-image"
          sizes="90vw" />
        
      </Link>
      </Col>
      <Col>
        <h4 className="message-tile-title font-h1">{series.name}</h4>
      </Col>
    </Row>
  </Container>
  </section>
  </>
  )
}