import React from "react"

import Col from 'react-bootstrap/Col'
import FooterMenu from './footerMenu.js'
import FooterSharing from './footerSharing.js'

import { CopyrightIcon } from '../../../helpers/icons'

import "./styles.css"

export default () => {
  return (
  <>
    <Col xs={{span: 12, order: 3}} sm={{span: 12, order: 3}} lg={{span: 4, order: 1}} block="true" className="footer-copyright-padding">
      <span className="footer-font">
        <CopyrightIcon/>{'\u00A0'}2020{'\u00A0'}<b>Liquid</b>Church.
      </span>
      <span className="footer-font">
        <a href="test2">{'\u00A0'}Privacy Policy{'\u00A0'}</a>
      </span>
      <span className="footer-font">
        |
      </span>
      <span className="footer-font">
        <a href="test">{'\u00A0'}Terms of Use{'\u00A0'}</a>
      </span>
    </Col>
    <Col xs={{span: 12, order:2}} sm={{span:6, order: 1}} lg={{span: 5, order: 2}} block="true">
      <FooterMenu />
    </Col>
    <Col xs={{span: 12, order:1}} sm={{span:6, order: 2}} lg={{span: 3, order: 3}} block="true">
      <FooterSharing />
    </Col>
  </>
  )
}