import React from 'react'

import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Imgix from 'react-imgix'

import FeaturedAttribute from './featured'
import TiledAttribute from './tiled'

import './styles.css'

export default ({
  layout,
  attribution_list,
  show_blurb,
  show_email,
  bg_color,
  padding,
}) => {
  const attributionObject = JSON.parse(attribution_list)

  if (attributionObject.rows.length  === 0) {
    return (
    <>
    </>
    )
  }
  
  let featuredAttributionObject = []
  let tiledAttributionObject = []
  
  switch(layout) {
    case 'list':
      for (var i = 0; i < attributionObject.rows.length; i++ ) {
        featuredAttributionObject.push(attributionObject.rows[i])
      }
      break
    case 'tile':
      for (var i = 0; i < attributionObject.rows.length; i++ ) {
        tiledAttributionObject.push(attributionObject.rows[i])
      }
      break
    case 'hybrid':
      featuredAttributionObject.push(attributionObject.rows[0])
      if (attributionObject.rows.length > 1) {
        for (var i = 1; i < attributionObject.rows.length; i++ ) {
          tiledAttributionObject.push(attributionObject.rows[i])
        }
      } 
      break
  }
 
  return (
  <>
  <section className={'site-section ' + padding} style={{backgroundColor: bg_color}}>
    <Container>
      <Row>
        { featuredAttributionObject.map(attribution => {
          return (
            <Col xs={12} className="attribution-profile">
              <FeaturedAttribute attribute={attributionObject.rows[0].attribution} showBlurb={show_blurb} showEmail={show_email} />
            </Col>
          )
        })}
        { tiledAttributionObject.map(attribution => {
          return (
            <Col sm={12} md={6} lg={4} className="attribution-secondary-profile">
              <TiledAttribute attribute={attribution.attribution} showBlurb={show_blurb} showEmail={show_email} />
            </Col>
          )
        })}
      </Row>
    </Container>
    </section>
  </>
  )
}