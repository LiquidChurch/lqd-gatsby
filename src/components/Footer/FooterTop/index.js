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
          <Link to="/app" className="liquid-app-download">
            <div className="liquid-app-icon liquid-icon"></div>
            <div className="liquid-app-text">Download the <br /> Liquid Church App</div>
            <div className="liquid-app-arrow"><ArrowRight/></div>
          </Link>
      </Col>
      <Col xs={12} sm={6} className="footer-to-top">
        <ScrollToTop smooth className="to-top-icon" color="#009DD1"/>    
      </Col>
    </>
   )
}