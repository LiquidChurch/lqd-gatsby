import React from "react"
import { graphql, useStaticQuery } from "gatsby"

import Nav from 'react-bootstrap/Nav'

import "./styles.css"

/**
 * The Footer Menu component.
 */
export default () => {
  const {
    wpgraphql: { footerMenu },
  } = useStaticQuery(graphql`
    query {
      wpgraphql {
        footerMenu: menuItems(where: { location: FOOTER }) {
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
    footerMenu && (
      <Nav className='flex-nowrap flex-row' as='ul'>
        {footerMenu.nodes.map(item => {
          const { id, url, label } = item
          return (
            <Nav.Item className='p-2' as='li'>
              <Nav.Link key={id} href={url}>
                {label}
              </Nav.Link>
            </Nav.Item>
          )
        })}
      </Nav>
    )
  )
}
