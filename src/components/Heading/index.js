import React from "react"
import Parse from 'react-html-parser'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import './styles.css'

export default ({ 
    text, 
    alignment, 
    size, 
    background_color,
  }) => {
  
  return (
  <>
    <section className="fullwidth-section heading-section" style={{backgroundColor: background_color}}>
      <Container>
        <Row>
          <Col>
            <h1 className={'font-h1 heading-' + size.toLowerCase() + ' heading-' + alignment.toLowerCase()}>
              {Parse(text)}
            </h1>
          </Col>
        </Row>
      </Container>
    </section>
  </>
  )
}
