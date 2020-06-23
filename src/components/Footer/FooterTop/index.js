import React from "react"

import Col from 'react-bootstrap/Col'

import { ArrowRight } from '../../../helpers/icons'
import "./styles.css"

export default () => {
  return (
    <>
      <Col xs={12} sm={6} className="footer-liquid-app">
          <div className="liquid-app liquid-icon">
          </div>
          <a href="/" className="liquid-app-text">
            Download the <br /> Liquid Church App <ArrowRight/>
          </a>
      </Col>
      <Col xs={12} sm={6} className="footer-to-top">
          <div className="to-top to-top-icon">
          </div>
      </Col>
    </>
   )
}