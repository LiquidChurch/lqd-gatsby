import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Imgix from 'react-imgix'

import './styles.css'
/**
 * Hero - Feature Component
 */
export default (props) => {
  var imgUrl = props.featuredImage.node.sourceUrl.split("/")
  
  const formatter = new Intl.DateTimeFormat('en-US', { month: 'short',  day: 'numeric',   year: 'numeric'});
  const formattedDate =  formatter.format(new Date(props.date));

  let attributions = props.attributions.nodes[0].name
  
  if (props.attributionsCo.attributions !== null) {
    props.attributionsCo.attributions.forEach(item => {
        attributions = attributions + ", " + item.name
    })
  }
  
  return (
    <section className="fullwidth-section">
    <Container className={'hero-image-container-fixed'}>
      <Row>  
        <Imgix 
          src={process.env.IMGIX_URL + imgUrl[4] + "/" + imgUrl[5]}
          className={'hero-image-fixed'}
          sizes="100vw" />
      </Row>
      <Row>
        <Col xs={{span:12, order:1}} md={{span:8, order:1}}>
          <h2 className="font-h2 feature-hero-title">{props.title}</h2>
        </Col>
          <Col xs={{span:12, order:3}} md={{span:4, order:2}}>
            <h2 className="font-h3">Social Icon Placeholder</h2>
          </Col>
          <Col xs={{span:12, order:2}} md={{span:12, order:3}}>
            <div className="font-h3 message-speaker">{attributions}</div>
            <div className="font=h3 message-date">{formattedDate}</div>
          </Col>    
      </Row>
    </Container>
    </section>
  )
}