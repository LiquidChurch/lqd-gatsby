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
      <Nav className='flex-nowrap flex-row-reverse footer-social-padding' as='ul'>
        {socialMenu.nodes.map(item => {
          const { id, url, label } = item
          var socialIcon = label.toLowerCase()
          console.log(socialIcon)
          return (
            <Nav.Item className="p-2" as='li'>
              <Nav.Link key={id} href={url} className={'social-icon ' + socialIcon + '-icon'}></Nav.Link>
            </Nav.Item>
          )
        })}
      </Nav>    
    )
  )
}