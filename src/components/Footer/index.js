import React from "react"

import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Navbar from 'react-bootstrap/Navbar'

import FooterTop from './FooterTop'
import FooterBottom from './FooterBottom'

import { CopyrightIconSm, FacebookIcon, InstagramIcon, YouTubeIcon, TwitterIcon } from '../../helpers/icons'

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
