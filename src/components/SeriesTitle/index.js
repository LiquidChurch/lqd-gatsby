import React from 'react'
import Parse from 'react-html-parser'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Imgix from 'react-imgix'
import { Link } from 'gatsby'

import { mediaUrlConverter } from '../../helpers/functions'

import './styles.css'

/**
 * Series Title Component
 */
export default (series) => {
  var imageUrl = mediaUrlConverter(series.SeriesImage.image.mediaItemUrl)
  let padding = "bottom"
  let bg_color = "#F8F8F8"
  return (
  <>
  <section className={'site-section ' + padding} style={{backgroundColor: bg_color}}>    
  <Container>
    <Row>
      <Col xs={12} lg={6}>
      <Link to={"/series/" + series.slug}>
        <Imgix
          src={imageUrl + "?ar=16:9&fit=crop&h=545"}
          className="message-tile-image"
          sizes="90vw" />
      </Link>
      </Col>
      <Col xs={12} lg={6}>
        <div className="series-title-block">
          <Link to={"/series/" + series.slug}>
            <h4 className="font-h2 series-title">{series.name}</h4>
          </Link>
          <div className="font-regular series-description">{Parse(series.description)}</div>
        </div>
      </Col>
    </Row>
  </Container>
  </section>
  </>
  )
}