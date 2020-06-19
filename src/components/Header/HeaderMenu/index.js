import React from "react"
import { graphql, useStaticQuery } from "gatsby"

import Col from 'react-bootstrap/Col'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'
import { Search } from 'react-feather';

import "./styles.css"

/**
 * The Header Menu component.
 */
export default ({ location }) => {
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
    <Navbar fixed="bottom" bg="light" className="mobile-menu">
      <ButtonGroup className="mobile-menu-burger">
        <Button variant="mobile-menu-burger" className="burger-icon"></Button>    
      </ButtonGroup>
      <ButtonGroup className="mobile-menu-group">
        {primaryMenu.nodes.map(item => {
          const { id, url, label } = item
          var path = item.url.split("/")
          return (
            <Button variant="mobile-menu" key={id} href={url}>
              <div className={'mobile-menu-icon ' + path[3] + '-icon'}></div>
              <div className="mobile-menu-text">{label}</div>
            </Button>
          )
        })}
      </ButtonGroup>
      <ButtonGroup className="mobile-menu-chop">
        <Button variant="mobile-menu">
          <div className="mobile-menu-chop-icon chop-icon"></div>
          <div className="mobile-menu-text two-line">Church Online</div>
        </Button>
      </ButtonGroup>
    </Navbar>
  )
}
