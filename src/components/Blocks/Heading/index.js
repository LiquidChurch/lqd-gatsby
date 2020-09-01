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
  console.log('addPadding', add_padding)
 
  return (
  <>
    <section className={'site-section ' + padding} style={{backgroundColor: bg_color}}>
      <Container className={add_padding ? "heading-container text-padding" : "heading-container"}>
        <Row>
          <Col>
            <h2 className={'statement ' + size + ' align-' + alignment}
                style={{color: font_color}}>
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