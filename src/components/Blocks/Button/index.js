import React from "react"
import { AnchorLink as Link } from "gatsby-plugin-anchor-links";
import { useLocation } from '@reach/router';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Dropdown from 'react-bootstrap/Dropdown'

import { ArrowRight } from '../../../helpers/icons'
import { useFeaturedImage } from "../../../data/featureImage"
import { getDate } from '../../../helpers/functions'

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

function DropdownButton({objDropdown}) {
  return (
  <>
    <Dropdown.Menu
      bsPrefix='button-dropdown-menu'
      >
      {objDropdown.map((dropdown, index) => {
        return (  
          <Dropdown.Item
            href={dropdown.uri}
            key={dropdown.id + '-' + index}
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
    keyValue,
    text, 
    alignment,
    page,
    url_append,
    btn_color, 
    btn_outline,
    bg_color,
    padding,
    font_color,
    has_arrow,
    has_icon,
    min_width,
    text_float,
    add_padding,
    dropdown,
    size,
    block_on,
    block_off,
  }) => {
  const currentDate = getDate(useLocation().search)
  let isPublished = false
  if ((block_on === null || currentDate >= Date.parse(block_on)) &&
      (block_off === null || currentDate < Date.parse(block_off))) {
    isPublished = true
  } 
  
  let objPage = JSON.parse(page)
  let pageInfo = {}
  let linkUrl = ""
  
  if (objPage !== null && objPage.id !== 0) {
    pageInfo = useFeaturedImage(objPage.id)
    if ((pageInfo.publication.publishDate === null || currentDate >= Date.parse(pageInfo.publication.publishDate.replace(/\s/g, 'T'))) &&
      (pageInfo.publication.unpublishDate === null || currentDate < Date.parse(pageInfo.publication.unpublishDate.replace(/\s/g, 'T')))) {
    } else {
      return (<></>)
    }
              
    linkUrl = pageInfo.uri
  
    if (linkUrl.charAt(linkUrl.length - 1) === '/') {
      linkUrl = linkUrl.substr(0, linkUrl.length - 1);
    }
    
    if (url_append !== null && url_append !== undefined) {
      linkUrl = linkUrl + url_append
    }          
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
  // Need to check for null condition
  let objDropdown = JSON.parse(dropdown)
  let dropdownItemList = []

  if ((objDropdown !== null && objDropdown.rows.length !== 0) && typeof(objDropdown.rows[0].page) !== "undefined") {
    objDropdown.rows.forEach((object) => {
      let temp = useFeaturedImage(object.page.id) 
      if ((temp.publication.publishDate === null || currentDate >= Date.parse(temp.publication.publishDate.replace(/\s/g, 'T'))) &&
          (temp.publication.unpublishDate === null || currentDate < Date.parse(temp.publication.unpublishDate.replace(/\s/g, 'T')))) {
        temp["text"]=object.text
        dropdownItemList.push(temp)
      } 
    })
  }

  return (
  <>
    {isPublished &&
      <section className={'site-section ' + padding} style={{backgroundColor: bg_color}}>
        <Container className={add_padding ? "text-padding" : ""}>
          <Row>
            <Col className={'cta ' + size  + ' align-' + alignment}>
              {(dropdownItemList.length > 0) ?
                <Dropdown>
                  <Dropdown.Toggle 
                      id={'dropdown-button-' + keyValue}
                      className={'cta-button button-dropdown ' + alignment}
                      style={{minWidth: min_width/16 + 'em',
                              color:fontColor,
                              backgroundColor: btnColor,
                              border: border}}>
                    <span className={'button-text ' + text_float}>{text}</span>
                  </Dropdown.Toggle>
                  <DropdownButton objDropdown={dropdownItemList}/>
                </Dropdown>
              :
                <Link 
                  to={linkUrl}
                  className={'cta-button button-' + alignment}
                  style={{minWidth: min_width/28 + 'em',
                          color:fontColor,
                          backgroundColor: btnColor,
                          border: border}}
                  stripHash
                >
                  <ButtonIcon hasIcon={has_icon} />
                  <span className={'button-text ' + text_float}>{text}</span>
                  <ButtonArrow hasArrow={has_arrow} />
                </Link>
              }
            </Col>
          </Row>
        </Container>
      </section>
    }
  </>
  )
}
