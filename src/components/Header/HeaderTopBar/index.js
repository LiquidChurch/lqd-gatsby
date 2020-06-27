import React, { useContext, useState, useEffect } from "react"
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
  
  useEffect(() => {
    if (!ctx.isMenuOpen) {
      if (menuOpen) {
        document.getElementById("liquid-header").focus()
        console.log('setting focus to liquid header')
        setMenuOpen(!menuOpen)
      }
      } else {
        setMenuOpen(true)
      }
  })
  
  const [focusOn, setFocusOn] = useState(false)
  const [menuOpen, setMenuOpen] = useState(true)
  
  const brandKeyEvent = event => {
    if (event.key === 'Tab') {
      console.log("brand tab")
      setFocusOn(true)
    }
  }
  
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
    <Navbar aria-label="Header Menu" bg="test" variant="dark" expand="true" className="topbar d-flex">
      <Col className="topbar-icon">
        <Button
          id='header-icon'
          className="burger-icon" 
          variant="topbar-icon"
          aria-label="Open Main Menu Drawer" 
          tabIndex="0"
          onClick={ctx.toggleMenu}
        >
        </Button>{''}
      </Col>
      <Col className="topbar-brand">
        <Button
          id='liquid-header'
          href={'/'} 
          aria-label="Liquid Church Home"
          className="liquid-brand"
          variant={focusOn ? "topbar-brand-focus" : "topbar-brand"}
          onKeyDown={brandKeyEvent}>
        </Button>{''}
      </Col>
      <Col className="">
        <Nav className="topbar-menu d-sm-none d-lg-flex">
        {primaryMenu.nodes.map(item => {
          const { id, label } = item
          var path = item.url.split("/")
          return (
            <Button
              variant="topbar-menu"
              key={id} 
              href={'/' + path[3]} 
              className="topbar-menu-item"
            >
              {label}
            </Button>
          )
        })}
        </Nav>
      </Col>
      <Col className="topbar-chop">
        <Button 
          href="https://liquidchurchonline.com" 
          className="topbar-chop-button" 
          variant="outline-white" 
          size="sm">
          Watch Church Online
        </Button>{' '}
      </Col>
      <Col className="topbar-icon">
        <Button 
          className="magnifier-icon" 
        aria-label="search website"
          variant="topbar-icon">
        </Button>{' '}
      </Col>
    </Navbar>
  )   
}