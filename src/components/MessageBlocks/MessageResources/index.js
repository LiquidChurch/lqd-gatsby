import React from 'react'

import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import ListGroup from 'react-bootstrap/ListGroup'

import './styles.css'

const ListResources = ({title, resources}) => {
  if (resources.length === 0) {
    return null
  }
  return (
    <>
    <ListGroup.Item className="resource-header">{title}</ListGroup.Item>
    {resources.map(resource => {
      return (
        <ListGroup.Item as="a" href={resource.url} key={resource.langulage + "-" + resource.resourceType} bsPrefix="resource-item">{resource.resourceTitle}</ListGroup.Item>
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
    if (res.resourceType === null || res.url === null) {
      return
    }
    
    if (res.language === 'english' && res.resourceType !== null) {
      switch(res.resourceType) {
        case 'video':
          res.resourceTitle = "Video Download"
          res.position = 2
          break
        case 'audio':
          res.resourceTitle = "Podcast"
          res.position = 1
          break
        case 'notes':
          res.resourceTitle = "Notes"
          res.position = 3
          break
        case 'guide':
          res.resourceTitle = "Participant's Guide"
          res.position = 4
          break
        case 'leader':
          res.resourceTitle = "Leader's Guide"
          res.position = 5
          break
        default:
          break
      }
      englishResources.push(res)
    } else if (res.language === 'spanish' && res.resourceType !== null) {
      spanishResources.push(res)
    }
  }
  
  if (lqdmMessage.resources.resource1.url === null) {
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
  
  englishResources.sort((a,b) => a.position > b.position ? 1: -1)
  
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
      </Row>
    </Container>
    </section>
    </>
  )
  }

  