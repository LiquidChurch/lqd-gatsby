import React from "react"
// import { MaybeLink } from "../../helpers/hoc"
// import { useGeneralSettings } from "../../data/hooks"
import { graphql, useStaticQuery } from "gatsby"
// import { getRelativeUrl } from "../../helpers/functions"

import Col from 'react-bootstrap/Col'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import { Search } from 'react-feather';

import "./styles.css"

/**
 * The HeaderMenu component.
 */
export default ({ location }) => {
  const {
    wpgraphql: { primaryMenu },
  } = useStaticQuery(graphql`
    query {
      wpgraphql {
        primaryMenu: menuItems(where: { location: PRIMARY }) {
          nodes {
            url
            label
          }
        }
      }
    }
  `)

 // const { url: siteURL } = useGeneralSettings()

  return ( 
    primaryMenu && (
      <Navbar expand="md" className="navigation">
        <Col xs={{span:2, order:1}}  md={{span:8, order:1}} lg={{span:9, order:1}} className="toggle-adjust">
          <Navbar.Toggle aria-controls="basic-navbar-nav"  />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
                {primaryMenu.nodes.map(item => {
                  const { label, url } = item
                  // const currentPath = getRelativeUrl(url, siteURL)
                  return (
                    <Nav.Link href={url} className="equal-width">{label}</Nav.Link>
                  )
                })}
            </Nav>
          </Navbar.Collapse>
        </Col>
        <Col xs={{ span:10, order:2}} md={{ span:4, order:2}} lg={{ span:3, order:2}} 
             className="search-top">
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Search"
              aria-label="Search"
              aria-describedby="search-field"
              className="round-btn"
              size="sm"
            />
            <InputGroup.Append>
              <InputGroup.Text id="search-field" className="round-btn" size="sm"><Search size={15}/></InputGroup.Text>
            </InputGroup.Append>
         </InputGroup>
        </Col>

      </Navbar>
    )
  )
}
