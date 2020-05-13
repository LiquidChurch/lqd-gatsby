import React from "react"

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { useGeneralSettings } from "../../data/hooks"
import "./styles.css"

import HeaderMenu from "../HeaderMenu"
import HeaderTopBar from "../HeaderTopBar"

/**
 * The Header component.
 */
export default ({ home = false, location }) => {
  const { title } = useGeneralSettings()
  return (
    <header className={`header`}>
      <Row>
        <Col>
          <HeaderTopBar title={title} />
        </Col>
      </Row>
      <Row>
        <Col>
          <HeaderMenu location={location} />
        </Col>
      </Row>
    </header>
  )
}
