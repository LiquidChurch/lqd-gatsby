import React, { useContext, useState, useEffect } from "react"
import { Link, graphql, useStaticQuery } from "gatsby"

import Col from 'react-bootstrap/Col'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { MegaMenuContext } from '../MegaMenu/context.js'

import "./styles.css"

/**
 * The Header TopBar component.
 */
export default ({ location }) => {
  const ctx = useContext(MegaMenuContext)
  const [focusOn, setFocusOn] = useState(false)
  const [menuOpen, setMenuOpen] = useState(true)
  
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
  }, [ctx.isMenuOpen, menuOpen])
  
  const brandKeyEvent = event => {
    if (event.key === 'Tab') {
      console.log("brand tab")
      setFocusOn(true)
    }
  }
  
  const data = useStaticQuery(graphql`
    query {
        primaryMenu: wpMenu(slug: { eq: "main-menu" }) {
          menuItems {
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
        <button
          id='header-icon'
          className="btn btn-topbar-icon burger-icon" 
          aria-label="Open Main Menu Drawer" 
          tabIndex="0"
          onClick={ctx.toggleMenu}
        >
        </button>
      </Col>
      <Col className="topbar-brand">
        <Link
          id='liquid-header'
          to="/" 
          aria-label="Liquid Church Home"
          className={focusOn ? "btn btn-topbar-brand-focus liquid-brand" : "btn btn-topbar-brand liquid-brand"}
          onKeyDown={brandKeyEvent}>
        </Link>
      </Col>
      <Col className="">
        <Nav className="topbar-menu d-sm-none d-lg-flex">
        {data.primaryMenu.menuItems.nodes.map(item => {
          const { id, label } = item
          var path = item.url.split("/")
          return (
            <Link
              key={id} 
              to={'/' + path[3]} 
              className="btn btn-topbar-menu topbar-menu-item"
            >
              {label}
            </Link>
          )
        })}
        </Nav>
      </Col>
      <Col className="topbar-chop">
        <Link
          to="/live" 
          className="btn btn-sm btn-outline-white topbar-chop-button" 
        >
          Watch Church Online
        </Link>
      </Col>
      <Col className="topbar-icon">
        <Link 
          className="btn btn-topbar-icon magnifier-icon" 
          to="/search"
        >
        </Link>
      </Col>
    </Navbar>
  )   
}