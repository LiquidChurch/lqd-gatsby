import React from 'react'
import Parse from 'react-html-parser'

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
  <section className={'site-section ' + 'bottom'} style={{backgroundColor: '#F8F8F8'}}>    
  <Container>
    <Row>
      <Col xs={12} lg={6}>
      <Link to={"/series/" + series.slug}>
        <Imgix
          src={"https://liquidchurch.imgix.net/" + imgUrl[4] + "/" + imgUrl[5] + "?ar=16:9&fit=crop&h=607"}
          className="message-tile-image"
          sizes="90vw" />
        
      </Link>
      </Col>
      <Col xs={12} lg={6}>
        <div className="series-title-block">
          <h4 className="font-h2 series-title">{series.name}</h4>
          <div className="font-regular series-description">{Parse(series.description)}</div>
        </div>
      </Col>
    </Row>
  </Container>
  </section>
  </>
  )
}