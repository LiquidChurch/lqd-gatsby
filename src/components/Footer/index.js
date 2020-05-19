import React from "react"

import Nav from 'react-bootstrap/Nav'
import Col from 'react-bootstrap/Col'
import Navbar from 'react-bootstrap/Navbar'

import FooterMenu from './FooterMenu'


import { CopyrightIconSm, FacebookIcon, InstagramIcon, YouTubeIcon, TwitterIcon } from '../../helpers/icons'

import "./styles.css"

export default () => {
  return (
    <footer id='footer' className='footer'>
      
      <Navbar sticky="bottom" bg="dark" expand="md" className="d-flex bottombar">
        <Col xs={{span: 12, order:2}} md={{span:5, order:1}} block="true" className='footer-copyright'>
          <Navbar.Brand className='flex-nowrap'>
            <span className="footer-copyright-icon">
              <CopyrightIconSm/>2020
            </span>
            <span className="footer-brand">
              <b>Liquid</b>Church
            </span>
            <span className="footer-copyright-links">
              {'\u00A0'}|{'\u00A0'}
            </span>
            <span className="footer-copyright-links">
              <a href="test">terms and condition</a>
            </span>
            <span className="footer-copyright-links">
              {'\u00A0'}|{'\u00A0'}
            </span>
            <span className="footer-copyright-links">      
              <a href="test2">privacy policy</a>
            </span>
          </Navbar.Brand>
        </Col>
        <Col xs={{span:8, order:1}} md={{span:5, order:2}} block="true" className='footer-links'>
          <FooterMenu />
        </Col>
        <Col xs={{span:3, order:1}} md={{span:2, order:3}} block="true">
          <Nav className='flex-nowrap flex-row-reverse social-icons-group' as='ul'>
            <Nav.Item className="p-2 social-icon" as='li'>
              <Nav.Link href=""><FacebookIcon/></Nav.Link>
            </Nav.Item>
            <Nav.Item className="p-2 social-icon" as='li'>
              <Nav.Link href=""><InstagramIcon/></Nav.Link>
            </Nav.Item>
            <Nav.Item className="p-2 social-icon" as='li'>
              <Nav.Link href=""><YouTubeIcon/></Nav.Link>
            </Nav.Item>
            <Nav.Item className="p-2 social-icon" as='li'>
              <Nav.Link href=""><TwitterIcon/></Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>  
      </Navbar>
    </footer>
  )
}
