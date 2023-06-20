import React from "react"

import Col from 'react-bootstrap/Col'
import FooterMenu from './footerMenu.js'
import FooterSharing from './footerSharing.js'
import FooterCopyright from './footerCopyright.js'


import "./styles.css"

export default () => {
  
  //lg with t&c and pp is 4,5,3
  return (
  <>
    <Col xs={{span: 12, order: 3}} sm={{span: 12, order: 3}} lg={{span: 3, order: 1}} block="true" className="footer-copyright-padding">
      <FooterCopyright />
    </Col>
    <Col xs={{span: 12, order:2}} sm={{span:12, order: 2}} lg={{span: 5, order: 2}} block="true">
      <FooterMenu />
    </Col>
    <Col xs={{span: 12, order:1}} sm={{span:12, order: 1}} lg={{span: 4, order: 3}} block="true">
      <FooterSharing />
    </Col>
  </>
  )
}