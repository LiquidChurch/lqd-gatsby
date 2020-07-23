import React from "react"
import { graphql, useStaticQuery } from "gatsby"

import Nav from 'react-bootstrap/Nav'

export default () => {
  const data = useStaticQuery(graphql`
    query {
        socialMenu: wpMenu(slug: { eq: "social-menu" }) {
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
      <Nav className='flex-nowrap flex-row footer-social-padding' as='ul'>
        {data.socialMenu.menuItems.nodes.map(item => {
          const { id, url, label } = item
          var socialIcon = label.toLowerCase()
          return (
            <Nav.Item key={id} className="p-1" as='li'>
              <Nav.Link 
                href={url} 
                aria-label={label} 
                className={'social-icon ' + socialIcon + '-icon'}
                target="_blank"
              >
              </Nav.Link>
            </Nav.Item>
          )
        })}
      </Nav>    
    )
  
}