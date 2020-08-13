import React from "react"
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

export default ({ values, 
                  ordered, 
                  start,
                  reversed
                }) => {
  
  if (!values) {
    return null
  }

  return ordered ? (
    <Container>
      <Row>
        <ol className="font-medium" start={start} reversed={reversed} dangerouslySetInnerHTML={{ __html: values }} />
      </Row>
    </Container>
  ) : (
    <Container>
      <Row>
        <ul className="font-medium" dangerouslySetInnerHTML={{ __html: values }} />
      </Row>
    </Container>
  )
}
