import React from "react"
import { graphql, useStaticQuery } from "gatsby"

import Col from 'react-bootstrap/Col'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
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
    primaryMenu && (
      <Navbar expand="md" className="nav-menu">
        <Col xs={{span:2, order:1}}  md={{span:8, order:1}} lg={{span:9, order:1}} className="toggle-adjust">
          <Navbar.Toggle aria-controls="navbar-menu"  />
          <Navbar.Collapse id="navbar-menu">
            <Nav>
                {primaryMenu.nodes.map(item => {
                  const { id, url, label } = item
                  return (
                    <Nav.Link key={id} href={url} className="nav-menu-item">
                      {label}
                    </Nav.Link>
                  )
                })}
            </Nav>
          </Navbar.Collapse>
        </Col>
        <Col xs={{ span:10, order:2}} md={{ span:4, order:2}} lg={{ span:3, order:2}} 
             className="nav-search">
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Search"
              aria-label="Search"
              aria-describedby="search-field"
              className="round-btn"
              size="sm"
            />
            <InputGroup.Append>
              <InputGroup.Text id="search-field" className="round-btn" size="sm">
                <Search size={15}/>
              </InputGroup.Text>
            </InputGroup.Append>
         </InputGroup>
        </Col>
      </Navbar>
    )
  )
}
