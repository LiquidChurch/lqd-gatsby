import React from 'react'

import Container from 'react-bootstrap/Container'
//import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

import Parse from "react-html-parser"

import './styles.css'


export default ({
  items,
  bg_color,
  padding,
}) => {
  
  const itemsObject = JSON.parse(items)
  
  return (
  <>
  <section className={'site-section ' + padding} style={{backgroundColor: bg_color}}>
    <Container>
      <Row>
        <Accordion className='accordion-full-width'>
            {itemsObject.rows.map(function(item, index) {
              console.log(item)
              return (
                <Card className="accordion-card">     
                  <Accordion.Toggle as={Card.Header} variant="link" className="accordion-card-header" eventKey={index.toString()}>
                    {item.question}
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey={index.toString()}>
                    <Card.Body className="accordion-card-body">{Parse(item.answer)}</Card.Body>
                  </Accordion.Collapse>
                </Card>
              )
            })}
        </Accordion>
      </Row>
    </Container>
    </section>
  </>
  )
  
}