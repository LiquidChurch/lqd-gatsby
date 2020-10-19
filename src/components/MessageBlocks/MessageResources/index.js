import React from 'react'

import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import ListGroup from 'react-bootstrap/ListGroup'

import './styles.css'

const ListResources = ({title, resources}) => {
  console.log(resources)
 
  if (resources.length === 0) {
    return null
  }
  return (
    <>
    <ListGroup.Item className="resource-header">{title}</ListGroup.Item>
    {resources.map(resource => {
      return (
        <ListGroup.Item as="a" href={resource.url} bsPrefix="resource-item">{resource.resourceTitle}</ListGroup.Item>
      )
    })}
    </>
    )
}
/** 
 * Message Resources
 */
export default (lqdmMessage) => {
  var englishResources = []
  let spanishResources = []
  
  const processResource = res => {
    if (res.resourceType == null || res.url == null) {
      return
    }
    
    if (res.language == 'english' && res.resourceType != null) {
      
      switch(res.resourceType) {
        case 'video':
          res.resourceTitle = "Video Download"
          break
        case 'audio':
          res.resourceTitle = "Audio Download"
          break
        case 'notes':
          res.resourceTitle = "Notes"
          break
        case 'guide':
          res.resourceTitle = "Participant's Guide"
          break
        case 'leader':
          res.resourceTitle = "Leader's Guide"
          break 
      }
      englishResources.push(res)
    } else if (res.language == 'spanish' && res.resourceType != null) {
      spanishResources.push(res)
    }
  }
  
  if (lqdmMessage.resources.resource1.resourceType === null) {
    return null
  } 
  
  processResource(lqdmMessage.resources.resource1)
  processResource(lqdmMessage.resources.resource2)
  processResource(lqdmMessage.resources.resource3)
  processResource(lqdmMessage.resources.resource4)
  processResource(lqdmMessage.resources.resource5)
  processResource(lqdmMessage.resources.resource6)
  processResource(lqdmMessage.resources.resource7)
  processResource(lqdmMessage.resources.resource8)
  
  //console.log('english resource', englishResources)
  //console.log('spanish resource', spanishResources)
  
  return (
    <>
    <section className={'site-section both'} style={{backgroundColor: '#FFF'}}>
    <Container>
      <Row>
        <Col xs={{offset: 0, span: 12}}
             sm={{offset: 0, span: 12}}
             md={{offset: 0, span: 3}}
             lg={{offset: 1, span: 2}}>
          <div className="statement small align-left resource-title">RESOURCES:</div>
        </Col>
        <Col xs={{offset: 0, span: 12}}
             sm={{offset: 0, span: 12}}
             md={{offset: 0, span: 4}}
             lg={{offset: 1, span: 3}}>
          <ListGroup variant="flush">
            <ListResources title='' resources={englishResources} />
          </ListGroup>
        </Col>
        <Col xs={{offset: 0, span: 12}}
             sm={{offset: 0, span: 12}}
             md={{offset: 0, span: 4}}
             lg={{offset: 1, span: 3}}>
          <ListGroup variant="flush">
            <ListResources title='Spanish' resources={spanishResources} />
          </ListGroup>
        </Col>
      </Row>
    </Container>
    </section>
    </>
  )
  }

  