import React, { useContext } from "react"
import { Link, graphql, useStaticQuery } from "gatsby"

import Navbar from 'react-bootstrap/Navbar'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import { MegaMenuContext } from '../MegaMenu/context.js'

import "./styles.css"

/**
 * The Header Menu component.
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
    <Navbar aria-label="Mobile Menu" fixed="bottom" bg="light" className="mobile-menu">
      <ButtonGroup className="mobile-menu-burger">
        <a
          className="btn btn-mobile-menu-burger burger-icon" 
          aria-label="Open Main Menu Drawer"
          onClick={ctx.toggleMenu}>
        </a>    
      </ButtonGroup>
      <ButtonGroup className="mobile-menu-group">
        {primaryMenu.nodes.map(item => {
          const { id, label } = item
          var path = item.url.split("/")
          return (
            <Link 
              className="btn btn-mobile-menu"
              key={id} 
              to={'/' + path[3]}
            >
              <div className={'mobile-menu-icon ' + path[3] + '-icon'}></div>
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
