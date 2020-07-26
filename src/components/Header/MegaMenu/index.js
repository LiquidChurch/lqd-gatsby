import React, { useContext, useEffect } from "react"
import { Link, graphql, useStaticQuery } from "gatsby"

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

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
    }
  })
  
  const data = useStaticQuery(graphql`
    query {
        megaMenu: wpMenu(slug: { eq: "mega-menu" }) {
          menuItems {
            nodes {
              id
              url
              label
              parentId
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
  
  var mainCategory = data.megaMenu.menuItems.nodes[0]

  var categories = []
  for (var i = 1; i < data.megaMenu.menuItems.nodes.length; i++ ){
    if (data.megaMenu.menuItems.nodes[i].parentId === null) {
      categories.push(data.megaMenu.menuItems.nodes[i])
    }
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
            role="button"
            aria-hidden={!ctx.isMenuOpen}
            tabIndex={tabIndex} 
            onKeyDown={shiftUpEvent}
            aria-label="Main Menu Drawer Open"
          >
              Main Menu Open
        </div>
        <button
          id="bm-close-top"
          className="btn bm-cross-button"
          tabIndex={tabIndex} 
          aria-hidden={!ctx.isMenuOpen}
          aria-label="Close Main Menu Drawer"
          onClick={ctx.toggleMenu} 
          onKeyDown={closeTopKeyEvent}
        >
          <ClearIcon />
        </button>
        <Row className="bm-maincat">
          {mainCategory.childItems.nodes.map(mainItem => {
            const { id, label } = mainItem
            var icon = label.replace(/\s+/g, "-").toLowerCase();
            return (
              <Link key={id} 
                id={'megamenu-' + label} 
                aria-label={label} 
                aria-hidden={!ctx.isMenuOpen}
                tabIndex={tabIndex} 
                className="menu-item" 
                to={mainItem.url}>
                <span className={icon + '-icon bm-icon'}></span>
                <span className="bm-text">{label}</span>
              </Link>
            )
          })}
        </Row>
        <hr className="bm-hr" />
        <Row className="bm-subcat">
          {categories.map(category => {
            return (
              <Col xs={6} key={category.id}>
              <p className="bm-subcat-header" aria-hidden={true}>{category.label}</p>
              <ul className="bm-subcat-list">
              {category.childItems.nodes.map(item => {
                const { id, label } = item
                return (
                <li key={id} className="bm-subcat-list-item">
                <Link 
                  id={'megamenu-' + category.label + '-' + label} 
                  aria-label={category.label + " " + label} 
                  aria-hidden={!ctx.isMenuOpen}
                  tabIndex={tabIndex} 
                  className="bm-subcat-item" 
                  to={item.url}>
                  {label}
                </Link>
                </li>
                )
              })}
              </ul>
              </Col>
            )
          })}
        </Row>
        <button
          id="bm-close-bottom"
          className="btn bm-cross-button"
          tabIndex={tabIndex} 
          aria-hidden={!ctx.isMenuOpen}
          aria-label="Close Main Menu Drawer"
          onClick={ctx.toggleMenu} 
          onKeyDown={closeBottomKeyEvent}
        >
          <ClearIcon />
        </button>
      </Container>
     </Menu>
    </>
  )
}

export default MegaMenu;