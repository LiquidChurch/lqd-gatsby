import React from "react"
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default ({ values, 
                  ordered, 
                  start,
                  reversed
                }) => {
  console.log('values', values)
  console.log('ordered', ordered)
  console.log('start', start)
  console.log('reversed', reversed)
  
  if (!values) {
    return null
  }

  return ordered ? (
    <Container>
      <Row>
        <ol className="font-regular" start={start} reversed={reversed} dangerouslySetInnerHTML={{ __html: values }} />
      </Row>
    </Container>
  ) : (
    <Container>
      <Row>
        <ul className="font-regular" dangerouslySetInnerHTML={{ __html: values }} />
      </Row>
    </Container>
  )
}
