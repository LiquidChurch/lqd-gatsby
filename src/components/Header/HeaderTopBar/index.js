import React, { useContext } from "react"
import { graphql, useStaticQuery } from "gatsby"

import Col from 'react-bootstrap/Col'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import { MegaMenuContext } from '../MegaMenu/context.js'

import "./styles.css"

/**
 * The Header TopBar component.
 */
export default ({ location }) => {
  const ctx = useContext(MegaMenuContext)
  
  const {
    wpgraphql: { primaryMenu },
  } = useStaticQuery(graphql`
    query {
      wpgraphql {
        primaryMenu: menuItems(where: { location: PRIMARY }) {
          nodes {
            id
            url
            label
          }
        }
      }
    }
  `)
  
  return (
    <Navbar bg="test" variant="dark" expand="true" className="topbar d-flex">
      <Col className="topbar-icon">
        <Button className="burger-icon" variant="topbar-icon" onClick={ctx.toggleMenu}>
        </Button>{' '}
      </Col>
      <Col className="topbar-brand">
        <Button href={'/'} className="liquid-brand" variant="topbar-brand">
        </Button>{'/'}
      </Col>
      <Col className="">
        <Nav className="topbar-menu d-sm-none d-lg-flex">
            {primaryMenu.nodes.map(item => {
              const { id, label } = item
              var path = item.url.split("/")
              return (
                <Nav.Link key={id} href={'/' + path[3]} className="topbar-menu-item">
                  {label}
                </Nav.Link>
              )
            })}
        </Nav>
      </Col>
      <Col className="topbar-chop">
        <Button href="https://liquidchurchonline.com" className="topbar-chop-button" variant="outline-white" size="sm">
          Watch Church Online
        </Button>{' '}
      </Col>
      <Col className="topbar-icon">
        <Button className="magnifier-icon" variant="topbar-icon">
        </Button>{' '}
      </Col>
    </Navbar>
  )   
}