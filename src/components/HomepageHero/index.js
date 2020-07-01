import React from "react"

import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Image from 'react-bootstrap/Image'

import "./styles.css"
/**
 * Page Hero component.
 */
export default ({ 
  hero_text,
  hero_image,
}) => {  
  return (
    <Container fluid className="homepage-hero-container">
      <Row>
        <Col xs={12}>
          <Image src={"https://liquidchurch.imgix.net" + hero_image} fluid/>
        </Col>
      </Row>
    </Container>
  )
}
