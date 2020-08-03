import React, { useContext, useState, useEffect } from "react"
import { Link, graphql, useStaticQuery } from "gatsby"

import Col from 'react-bootstrap/Col'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { MegaMenuContext } from '../MegaMenu/context.js'
import { GlobalContext } from '../../GlobalContext/context.js'

import "./styles.css"

/**
 * The Header TopBar component.
 */
export default ({ location }) => {
  const ctx = useContext(MegaMenuContext)
  const globalCtx = useContext(GlobalContext)
  
  const [focusOn, setFocusOn] = useState(false)
  const [menuOpen, setMenuOpen] = useState(true)
  
  var themeState = globalCtx.currentTheme.toLowerCase()

  useEffect(() => {
    if (!ctx.isMenuOpen) {
      if (menuOpen) {
        document.getElementById("liquid-header").focus()
        setMenuOpen(!menuOpen)
      }
      } else {
        setMenuOpen(true)
      }
  }, [ctx.isMenuOpen, menuOpen])
  
  const brandKeyEvent = event => {
    if (event.key === 'Tab') {
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
    <Navbar aria-label="Header Menu" bg="test" variant="dark" expand="true" className={'topbar-' + themeState + ' d-flex'}>
      <Col className="topbar-icon">
        <button
          id='header-icon'
          className={'btn btn-topbar-icon burger-icon topbar-icon-' + themeState} 
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
          className={focusOn ? "btn btn-topbar-brand-focus liquid-brand theme-icon-" + themeState : "btn btn-topbar-brand liquid-brand theme-icon-" + themeState}
          onKeyDown={brandKeyEvent}>
        </Link>
      </Col>
      <Col className="">
        <Nav className="topbar-menu d-sm-none d-lg-flex">
        {data.primaryMenu.menuItems.nodes.map(item => {
          const { id, label } = item
          return (
            <Link
              key={id} 
              to={item.url} 
              className={'btn topbar-menu-item btn-topbar-menu-' + themeState}
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
          className={'btn btn-sm topbar-chop-button topbar-button-' + themeState}
        >
          Watch Church Online
        </Link>
      </Col>
      <Col className="topbar-icon">
        <Link 
          className={'btn btn-topbar-icon magnifier-icon topbar-icon-' + themeState} 
          to="/search"
        >
        </Link>
      </Col>
    </Navbar>
  )   
}