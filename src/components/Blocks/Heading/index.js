import React from "react"
import Parse from 'react-html-parser'
//import { RichTextHelper } from "../../../helpers/functions"

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import './styles.css'

function AddHR(props) {
  if (props.showHR) {
    return (
      <hr/>
    )
  } else {
     return null
   }
}
      
 /**
 * Header Component
 */
export default ({
    keyValue,
    text, 
    alignment, 
    size, 
    font_color,
    show_hr,
    all_caps,
    add_padding,
    bg_color,
    padding,
  }) => {
  let textTransform = "none"
  if (all_caps) {
    textTransform = "uppercase"
  }
  let headerId = Math.random().toString(36).substring(2, 7) + Math.random().toString(36).substring(2, 7)
  return (
  <>
    <section className={'site-section ' + padding} style={{backgroundColor: bg_color}} key={'section-' + keyValue}>
      <Container className={add_padding ? "heading-container text-padding" : "heading-container"} key={'container-' + keyValue}>
        <Row>
          <Col>
            <h2 className={'statement ' + size + ' align-' + alignment}
                style={{color: font_color, textTransform: textTransform}}>
              {Parse(text)}
              <AddHR showHR={show_hr} />
            </h2>
          </Col>
        </Row>
      </Container>
    </section>
  </>
  )
}
