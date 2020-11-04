import React from 'react'

import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

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
      for (let i = 0; i < attributionObject.rows.length; i++ ) {
        featuredAttributionObject.push(attributionObject.rows[i])
      }
      break
    case 'tile':
      for (let j = 0; j < attributionObject.rows.length; j++ ) {
        tiledAttributionObject.push(attributionObject.rows[j])
      }
      break
    default:
      featuredAttributionObject.push(attributionObject.rows[0])
      if (attributionObject.rows.length > 1) {
        for (let k = 1; k < attributionObject.rows.length; k++ ) {
          tiledAttributionObject.push(attributionObject.rows[k])
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
            <Col xs={12} className="attribution-profile" key={attribution.attribution.id}>
              <FeaturedAttribute attribute={attribution.attribution} showBlurb={show_blurb} showEmail={show_email} />
            </Col>
          )
        })}
        { tiledAttributionObject.map(attribution => {
          return (
            <Col sm={12} md={6} lg={4} className="attribution-secondary-profile" key={attribution.attribution.id}>
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