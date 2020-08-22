import React from "react"
import Parse from 'react-html-parser'
import { RichTextHelper } from "../../helpers/functions"

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import './styles.css'

function AddHR(props) {
  console.log(props)
  if (props.showHR) {
    return (
      <hr/>
    )
  } else {
     return null
   }
}
      
export default ({ 
    text, 
    alignment, 
    size, 
    bg_color,
    font_color,
    show_hr,
    all_caps
  }) => {
  
  return (
  <>
    <section className="fullwidth-section heading-section" style={{backgroundColor: bg_color}}>
      <Container className="heading-container">
        <Row>
          <Col>
            <h1 className={'heading-' + size.toLowerCase() + ' heading-' + alignment.toLowerCase()}>
              {Parse(text)}
              <AddHR showHR={show_hr} />
            </h1>

          </Col>
        </Row>
      </Container>
    </section>
  </>
  )
}
