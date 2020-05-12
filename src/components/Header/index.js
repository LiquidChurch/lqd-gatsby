import React from "react"
//import { Link } from "gatsby"

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import HeaderMenu from "../HeaderMenu"
import HeaderTopBar from "../HeaderTopBar"

import { useGeneralSettings } from "../../data/hooks"
import "./styles.css"


/*
const Title = ({ text, home }) =>
  home ? (
    <h1 className={`header__title`}>{text}.</h1>
  ) : (
    <h2 className={`header__title`}>
      <Link to="/">{text}.</Link>
    </h2>
  )
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
