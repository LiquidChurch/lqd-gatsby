import React, { useEffect, useState } from "react"
import Imgix from "react-imgix";

import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'

import "./styles.css"

/**
 * Homepage Hero component.
 */
export default ({
  hero_tag,
  hero_text,
  hero_image,
  cta_label,
  cta_url,
}) => {
  
  useEffect(() => {
    const timer1 = setTimeout(() => {
      setRunEffect(!runEffect)
      
    }, 1500);
    return () => clearTimeout(timer1);
  }, []);
  
  const [runEffect, setRunEffect] = useState(false)
  return (
    <Container fluid className="homepage-hero-container">
      <Row>
        <Col xs={12} className={runEffect ? "homepage-hero-image loaded" : "homepage-hero-image"}>
          <Imgix src={"https://liquidchurch.imgix.net" + hero_image + "?gam=50"} sizes="100vw" />
        </Col>
        <span className={runEffect ? "homepage-hero-tag loaded" : "homepage-hero-tag"}>{hero_tag}</span>
        <span className={runEffect ? "homepage-hero-text loaded" : "homepage-hero-text"}>{hero_text}</span>
        <span className="homepage-hero-cta"><Button variant="primary" className="homepage-hero-button">{cta_label}</Button></span>
      </Row>
    </Container>
  )
}
