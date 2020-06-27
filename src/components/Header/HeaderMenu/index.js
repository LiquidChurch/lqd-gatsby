import React, { useContext } from "react"
import { graphql, useStaticQuery } from "gatsby"

import Navbar from 'react-bootstrap/Navbar'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'
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
        <Button variant="mobile-menu-burger" 
          aria-label="Open Main Menu Drawer"
          className="burger-icon" 
          onClick={ctx.toggleMenu}>
        </Button>    
      </ButtonGroup>
      <ButtonGroup className="mobile-menu-group">
        {primaryMenu.nodes.map(item => {
          const { id, label } = item
          var path = item.url.split("/")
          return (
            <Button variant="mobile-menu" key={id} href={'/' + path[3]}>
              <div className={'mobile-menu-icon ' + path[3] + '-icon'}></div>
              <div className="mobile-menu-text">{label}</div>
            </Button>
          )
        })}
        <Button variant="mobile-menu" href="https://liquidchurchonline.com">
          <div className="mobile-menu-chop-icon chop-icon"></div>
          <div className="mobile-menu-text two-line">Church Online</div>
        </Button>
      </ButtonGroup>
    </Navbar>
  )
}
