import React, { useContext, useEffect } from "react"
import { graphql, useStaticQuery } from "gatsby"


import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

import { slide as Menu } from 'react-burger-menu'
import { MegaMenuContext } from './context'

import { ClearIcon } from '../../../helpers/icons'
import "./styles.css"

/**
 * The MegaMenu component.
 */
const MegaMenu = () => {
  const ctx = useContext(MegaMenuContext)

  const closeTopKeyEvent = event => {
    if (event.shiftKey && event.key === 'Tab') {
      document.getElementById("bm-close-bottom").focus()  
    } else if (event.key === 'Tab') {
      document.getElementById("bm-close-top").focus()  
    } 
  }
  
  const closeBottomKeyEvent = event => {
    if (event.shiftKey && event.key === 'Tab') {
      document.getElementById("bm-close-bottom").focus()  
    } else if (event.key === 'Tab') {
      document.getElementById("bm-close-top").focus()                
    } 
  }
  
  const shiftUpEvent = event => {
    if (event.shiftKey && event.key === 'Tab') {
      document.getElementById("bm-close-bottom").focus()
    } else if (event.key === 'Tab') {  
      document.getElementById("bm-close-top").focus()
    }     
  }
  
  useEffect(() => {
    if (ctx.isMenuOpen) {
      document.getElementById("megamenu").focus()
      console.log('setting focus to megamenu')
    }
  })
  
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
   
  var mainCategory = megaMenu.nodes[0]

  var categories = []
  for (var i = 1; i < megaMenu.nodes.length; i++ ){
    categories.push(megaMenu.nodes[i])
  }

  var tabIndex = -1
  if (ctx.isMenuOpen) {
    tabIndex = 0
  } else {
    tabIndex = -1

  }
  
  return (
    <>
    <Menu
      id={ "menu-nav" }
      customBurgerIcon={ false }
      customCrossIcon={ false }
      width={ 320 }
      isOpen={ ctx.isMenuOpen }
      disableAutoFocus
      onStateChange={ (state) => ctx.stateChangeHandler(state)}
    > 
      <Container fluid>
        <div 
            id='megamenu' 
            className="screen-reader-only" 
            aria-hidden={!ctx.isMenuOpen}
            tabIndex={tabIndex} 
            onKeyDown={shiftUpEvent}
            aria-label="Main Menu Drawer Open"
          >
              Main Menu Open
        </div>
        <Button
          id="bm-close-top"
          className="bm-cross-button"
          tabIndex={tabIndex} 
          aria-hidden={!ctx.isMenuOpen}
          aria-label="Close Main Menu Drawer"
          onClick={ctx.toggleMenu} 
          onKeyDown={closeTopKeyEvent}
        >
          <ClearIcon />
        </Button>
        <Row className="bm-maincat">
          {mainCategory.childItems.nodes.map(mainItem => {
            const { id, label } = mainItem
            var path = mainItem.url.split("/")
            var icon = label.replace(/\s+/g, "-").toLowerCase();
            return (
              <a key={id} 
                id={'megamenu-' + label} 
                aria-label={label} 
                aria-hidden={!ctx.isMenuOpen}
                tabIndex={tabIndex} 
                className="menu-item" 
                href={"/" + path[3]}>
                <span className={icon + '-icon bm-icon'}></span>
                <span className="bm-text">{label}</span>
              </a>
            )
          })}
        </Row>
        <hr className="bm-hr" />
        <Row className="bm-subcat">
          {categories.map(category => {
            return (
              <Col xs={6} key={category.id}>
              <p className="bm-subcat-header" aria-hidden={true}>{category.label}</p>
              {category.childItems.nodes.map(item => {
                const { id, label } = item
                var path = item.url.split("/")
                return (
                <a key={id}
                  id={'megamenu-' + category.label + '-' + label} 
                  aria-label={category.label + " " + label} 
                  aria-hidden={!ctx.isMenuOpen}
                  tabIndex={tabIndex} 
                  className="bm-subcat-item" 
                  href={"/" + path[3]}>
                  {label}
                </a>
                )
              })}
              </Col>
            )
          })}
        </Row>
        <Button
          id="bm-close-bottom"
          className="bm-cross-button"
          tabIndex={tabIndex} 
          aria-hidden={!ctx.isMenuOpen}
          aria-label="Close Main Menu Drawer"
          onClick={ctx.toggleMenu} 
          onKeyDown={closeBottomKeyEvent}
        >
          <ClearIcon />
        </Button>
      </Container>
     </Menu>
    </>
  )
}

export default MegaMenu;