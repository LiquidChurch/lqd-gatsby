import React, { useContext } from "react"
import { Link, graphql, useStaticQuery } from "gatsby"

import Navbar from 'react-bootstrap/Navbar'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import { MegaMenuContext } from '../MegaMenu/context.js'
import { GlobalContext } from '../../GlobalContext/context.js'

import "./styles.css"

/**
 * The Header Menu component.
 */
export default ({ location }) => {
  const ctx = useContext(MegaMenuContext)
  const globalCtx = useContext(GlobalContext)
  let themeState = globalCtx.currentTheme.toLowerCase()
  
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
    <Navbar aria-label="Mobile Menu" fixed="bottom" bg="light" className={'mobile-menu ' + themeState} >
      <ButtonGroup className="mobile-menu-burger">
        <button
          className="btn btn-mobile-menu-burger burger-icon" 
          aria-label="Open Main Menu Drawer"
          onClick={ctx.toggleMenu}>
        </button>    
      </ButtonGroup>
      <ButtonGroup className="mobile-menu-group">
        {data.primaryMenu.menuItems.nodes.map(item => {
          const { id, label } = item
          var icon = label.replace(/\s+/g, "-").toLowerCase();  
          return (
            <Link 
              className="btn btn-mobile-menu"
              key={id} 
              to={item.url}
            >
              <div className={'mobile-menu-icon ' + icon + '-icon'}></div>
              <div className="mobile-menu-text">{label}</div>
            </Link>
          )
        })}
        <Link 
          className="btn btn-mobile-menu" 
          to="/live"
        >
          <div className="mobile-menu-chop-icon chop-icon"></div>
          <div className="mobile-menu-text two-line">Church Online</div>
        </Link>
      </ButtonGroup>
    </Navbar>
  )
}
