import React from "react"
import { Link } from "gatsby"
import ScrollToTop from "react-scroll-to-top"

import Col from 'react-bootstrap/Col'

import { ArrowRight } from '../../../helpers/icons'
import "./styles.css"


export default () => {
  
  return (
    <>
      <Col xs={12} sm={6} className="footer-liquid-app">
          <div className="liquid-app liquid-icon">
          </div>
          <Link to="/app" className="liquid-app-text">
            Download the <br /> Liquid Church App <ArrowRight/>
          </Link>
      </Col>
      <Col xs={12} sm={6} className="footer-to-top">
        <ScrollToTop smooth className="to-top-icon" color="#009DD1" fill-opacity="0"/>    
      </Col>
    </>
   )
}