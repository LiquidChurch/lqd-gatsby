import React from "react"
import { graphql, useStaticQuery } from "gatsby"

import Nav from 'react-bootstrap/Nav'

export default () => {
  const {
    wpgraphql: { socialMenu },
  } = useStaticQuery(graphql`
    query {
      wpgraphql {
        socialMenu: menuItems(where: { location: SOCIAL }) {
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
    socialMenu && (
      <Nav className='flex-nowrap flex-row footer-social-padding' as='ul'>
        {socialMenu.nodes.map(item => {
          const { id, url, label } = item
          var socialIcon = label.toLowerCase()
          return (
            <Nav.Item key={id} className="p-2" as='li'>
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
  )
}