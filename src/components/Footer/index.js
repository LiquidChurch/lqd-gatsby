import React from "react"

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

import FooterTop from './FooterTop'
import FooterBottom from './FooterBottom'

import "./styles.css"

export default () => {
  return (
    <footer id='footer' className='footer'>
    <Container fluid>
      <Row className="d-flex">
        <FooterTop />
      </Row>
      <Row className="d-flex">
        <FooterBottom />
      </Row>
    </Container>
    </footer>
  )
}
