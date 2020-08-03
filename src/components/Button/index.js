import React from "react"

import { Link } from "gatsby"

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { ArrowRight } from '../../helpers/icons'
import { useFeaturedImage } from "../../data/featureImage"

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


export default ({ 
    text, 
    alignment,
    page,
    color, 
    background_color,
    has_arrow,
    has_icon,
    min_width,
    text_float,
  }) => {
  
  var objPage = JSON.parse(page)
  const pageInfo = useFeaturedImage(objPage.id)
  
  return (
  <>
    <section className="fullwidth-section" style={{backgroundColor: background_color}}>
      <Container>
        <Row>
          <Col>
            <Link 
              to={pageInfo.uri}
              className="btn font-btn-xlarge blue-btn"
              style={{minWidth: min_width/28 + 'em'}}
            >
              <ButtonIcon hasIcon={has_icon} />
              <span className={'button-text button-text-float-' + text_float}>{text}</span>
              <ButtonArrow hasArrow={has_arrow} />
            </Link>
          </Col>
        </Row>
      </Container>
    </section>
  </>
  )
}
