import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Parse from "react-html-parser"
import { Link } from "gatsby"

import TitleBlock from "../../Commons/TitleBlock"

/** 
 * Message Info
 */
import './styles.css'

function TagIcon(props) {
  if (props.tagItem === undefined) {
    return (
      <>
      </>
    )
  } 
  return (
    <>
      <Link 
        to={'/tags#' + props.tagItem.slug }
        className="message-tag"
      >
        <span className='tag-icon message-tag-icon'></span>
        <span className='font-h3 message-tag-text'>{props.tagItem.name}</span>
      </Link>
    </>
  )
}

function ScriptureList(props) {  
  if (props.scriptures.nodes.length === 0) {
    return (
      <>
      </>
    )
  }
  
  let scriptures = ""
  
  props.scriptures.nodes.forEach(item => {
    if (scriptures === "") {
      scriptures = item.name 
    } else {
      scriptures = scriptures + ", " + item.name
    }
  })
  
  if (scriptures === "") {
    return (<></>)
  } else {            
    return (
      <>
        <Col xs={12} className="message-scripture">
          <h6 className="font-h3 message-speaker message-scripture-header">Scriptures: </h6>
          <div className="font-h3 message-scripture-text">{scriptures}</div>
        </Col>
      </>
    )
  }
}

export default (lqdmMessage) => {  
  return (
    <>
    <section className="fullwidth-section message-info-section">
      <Container>
        <TitleBlock
          date={lqdmMessage.publication.publishDate.replace(/\s/g, 'T')}
          attributions={lqdmMessage.attributions}
          attributionsCo={lqdmMessage.attributionsCo}
          title={lqdmMessage.title}
          category="messages"
          slug={lqdmMessage.slug}
        />
        <hr className="message-hr" />
        <Row>
          <Col xs={12}>
            <div className="font-medium message-description">{Parse(lqdmMessage.content)}</div>
          </Col>
          <ScriptureList scriptures={lqdmMessage.scriptures} />
          <Col xs={12}>
            <div className="message-tag-cloud">
            {lqdmMessage.tags.nodes.map(item => {
             return (
                <TagIcon tagItem={item} key={'tag-item-' + item.id}/>
             )
            })}
            </div>
          </Col>
        </Row>
      </Container>
    </section>    
    </>
  )
}