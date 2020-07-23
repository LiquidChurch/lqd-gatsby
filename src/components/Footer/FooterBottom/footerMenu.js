import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"

import Nav from 'react-bootstrap/Nav'

/**
 * The Footer Menu component.
 */
export default () => {
  const data = useStaticQuery(graphql`
    query {
        footerMenu: wpMenu(slug: { eq: "footer-menu" }) {
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
      <Nav className='flex-nowrap flex-row footer-menu-padding' as='ul'>
        {data.footerMenu.menuItems.nodes.map(item => {
          const { id, label } = item
          var path = item.url.split("/")
          return (
            <Nav.Item key={id} className='p-1 footer-font' as='li'>
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
}
