import React, { useEffect } from "react"

import { Link } from "gatsby"

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Dropdown from 'react-bootstrap/Dropdown'

import { ArrowRight } from '../../../helpers/icons'
import { useFeaturedImage } from "../../../data/featureImage"

import "./styles.css"

      
function ButtonArrow(props) {  
  if (props.hasArrow) {
    return (
    <>
      <span className="button-arrow">
      <ArrowRight style={{fill:"#009DD1;"}} />
      </span>
    </>
    )
  } else {
    return (
    <>
    </>
    )
  }
} 

function ButtonIcon(props) {
  if (props.hasIcon !== "" && props.hasIcon !== "none") {
    return (
      <>
      <span className="button-icon">
        <div className={'icon ' + props.hasIcon + "-icon"}>
        </div>
      </span>
      </>
    )
  } else {
    return (
    <>
    </>
    )
  }
}

function DropdownButton({objDropdown, dropdownWidth}) {
  console.log(objDropdown)
  console.log(dropdownWidth)
  
  return (
  <>
    <Dropdown.Menu
      bsPrefix='button-dropdown-menu'
      >
      {objDropdown.rows.map(dropdown => {
        return (
          <Dropdown.Item
            >{dropdown.text}</Dropdown.Item>         
      )
    })}
    </Dropdown.Menu>
  </>
  )
}
/**
 * Button Component
 */

export default ({ 
    text, 
    alignment,
    page,
    btn_color, 
    btn_outline,
    bg_color,
    padding,
    font_color,
    has_arrow,
    has_icon,
    min_width,
    text_float,
    dropdown,
  }) => {
  let objPage = JSON.parse(page)
  
  let pageInfo = {}
  if (objPage !== null) {
    pageInfo = useFeaturedImage(objPage.id)
  } else {
    pageInfo["uri"] = ''
  }
  
  let fontColor = ''
  let btnColor = ''
  let border = '0px'
  
  if (font_color !== '') {
    fontColor = font_color
  } else {
    fontColor = '#FFF'
  }
  if (btn_color !== '') {
    btnColor = btn_color
  } else {
    btnColor = '#009DD1'
  }
  if (btn_outline) {
    border = '2px solid'
  }

  
  let objDropdown = JSON.parse(dropdown)
  let hasDropdown = false
  //let dropdownId = Math.random().toString(36).substring(2, 7) + Math.random().toString(36).substring(2, 7)

  if (objDropdown.rows[0].page !== undefined && objDropdown.rows[0].page.id !== 0) {
    hasDropdown = true
  }
  
  let dropdownId = Math.random().toString(36).substring(2, 7) + Math.random().toString(36).substring(2, 7)    
  let dropdownWidth = 0
  useEffect (() => {
    console.log('dropdownId', dropdownId)
    function setDropdownWidth() {
      dropdownWidth = (!document.getElementById('dropdown-button-' + dropdownId) ? 0 : document.getElementById('dropdown-button-' + dropdownId).offsetHeight)
      console.log('dropdownWidth', dropdownWidth)
    }
    
    setDropdownWidth()    
    window.addEventListener('resize', setDropdownWidth)  
  }, [dropdownWidth, dropdownId])
  
  return (
  <>
    <section className={'site-section ' + padding} style={{backgroundColor: bg_color}}>
      <Container>
        <Row>
          <Col className={'cta large align-' + alignment}>
            {hasDropdown ?
              <Dropdown>
                <Dropdown.Toggle 
                    id={'dropdown-button-' + dropdownId}
                    className={'cta-button button-dropdown font-link ' + alignment}
                    style={{minWidth: min_width/16 + 'em',
                            color:fontColor,
                            backgroundColor: btnColor,
                            border: border}}>
                  <span className={'button-text button-text-float-' + text_float}>{text}</span>
                </Dropdown.Toggle>
                <DropdownButton objDropdown={objDropdown} dropdownWidth={100}/>
              </Dropdown>
            :
              <Link 
                to={pageInfo.uri}
                className={'cta-button font-link ' + alignment}
                style={{minWidth: min_width/28 + 'em',
                        color:fontColor,
                        backgroundColor: btnColor,
                        border: border}}
              >
                <ButtonIcon hasIcon={has_icon} />
                <span className={'button-text button-text-float-' + text_float}>{text}</span>
                <ButtonArrow hasArrow={has_arrow} />
              </Link>
            }
          </Col>
        </Row>
      </Container>
    </section>
  </>
  )
}
