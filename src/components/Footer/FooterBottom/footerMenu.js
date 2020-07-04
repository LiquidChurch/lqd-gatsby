import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"

import Nav from 'react-bootstrap/Nav'

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
      <Nav className='flex-nowrap flex-row footer-menu-padding' as='ul'>
        {footerMenu.nodes.map(item => {
          const { id, label } = item
          var path = item.url.split("/")
          return (
            <Nav.Item key={id} className='p-2 footer-font' as='li'>
              <Link 
                className="nav-link"
                to={'/' + path[3]}
              >
                {label}
              </Link>
            </Nav.Item>
          )
        })}
      </Nav>
    )
  )
}
