import React, { useContext } from "react"
import { graphql, useStaticQuery } from "gatsby"

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { slide as Menu } from 'react-burger-menu'
import { MegaMenuContext } from './context'
import "./styles.css"

const MegaMenu = () => {
  const ctx = useContext(MegaMenuContext)

  const {
    wpgraphql: { megaMenu },
  } = useStaticQuery(graphql`
    query {
      wpgraphql {
        megaMenu: menuItems(where: { location: MEGAMENU }) {
          nodes {
            id
            url
            label
            childItems {
              nodes {
              id
              url
              label
              }
            }
          }
        }
      }
    }
  `)
   
  console.log(megaMenu.nodes[0].childItems.nodes)
  var mainCategory = megaMenu.nodes[0]
  
  var categories = []
  for (var i = 1; i < megaMenu.nodes.length; i++ ){
    categories.push(megaMenu.nodes[i])
  }
  
  return (
    <>
    <Menu
      customBurgerIcon={ false }
      width={320}
      isOpen={ ctx.isMenuOpen }
      onStateChange={(state) => ctx.stateChangeHandler(state)}
    >     
      {mainCategory.childItems.nodes.map(mainItem => {
        const { id, label } = mainItem
        var path = mainItem.url.split("/")
        var icon = label.replace(/\s+/g, "-").toLowerCase();
        console.log(icon)
        return (
          <a key={id} className="menu-item" href={"/" + path[3]}>
            <span className={icon + '-icon bm-icon'}></span>
            <span className="bm-text">{label}</span>
          </a>
        )
      })}
      <Container fluid>
      <Row className="bm-subcat">
      {categories.map(category => {
        console.log(category.label)
        return (
          <Col xs={6} key={category.id}>
          <p className="bm-subcat-header">{category.label}</p>
        
          {category.childItems.nodes.map(item => {
            const { id, label } = item
            console.log("->", item.label)
            var path = item.url.split("/")
            return (
            <a key={id} className="bm-subcat-item" href={"/" + path[3]}>
              {label}
            </a>
            )
          })}
          
          </Col>
        )
      })}
      </Row>
      </Container>
      
     </Menu>
    </>
  )
}

export default MegaMenu;