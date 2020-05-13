import React from "react"

import Col from 'react-bootstrap/Col'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'

import "./styles.css"

/**
 * The Header TopBar component.
 */
export default ({ title }) => {
  return (
    <Navbar bg="dark" expand="md" className="topbar">
      <Col xs={12} sm={6} block="true">
        <Navbar.Brand href="/">
          <span className="topbar-icon"></span>
          <span className="topbar-brand">
            <b>Liquid</b>Church
          </span>
        </Navbar.Brand>
      </Col>
      <Col xs={6} sm={4} className="topbar-btn">
        <Button variant="outline-primary" size="sm" className="round-btn" block>
          Church Online
        </Button>{' '}
      </Col>
      <Col xs={6} sm={2} className="topbar-btn">
        <Button variant="outline-primary" size="sm" className="round-btn" block>
          Give
        </Button>{' '}
      </Col>
    </Navbar>
  )   
}