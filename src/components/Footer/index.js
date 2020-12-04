import React, { useContext } from "react"

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

import FooterTop from './FooterTop'
import FooterBottom from './FooterBottom'

import { GlobalContext } from '../GlobalContext/context.js'

import "./styles.css"

export default () => {
  const globalCtx = useContext(GlobalContext)
    
  var themeState = globalCtx.currentTheme.toLowerCase()
    
  return (
    <footer id='footer' className={'footer ' + themeState}>
    <Container>
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
