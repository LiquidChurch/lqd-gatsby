import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Parse from "react-html-parser"
import { Link } from "gatsby"

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
        to={'/tag/' + props.tagItem.slug }
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
  
  return (
    <>
      <h6 className="font-h3 message-speaker message-scripture-header">Scriptures: </h6>
      <div className="font-h3 message-scripture-text">{scriptures}</div>
    </>
  )
}

export default (lqdmMessage) => {
  const formatter = new Intl.DateTimeFormat('en-US', { month: 'short',  day: 'numeric',   year: 'numeric'});
  const formattedDate =  formatter.format(new Date(lqdmMessage.date));
  let attributions = lqdmMessage.attributions.nodes[0].name
  
  if (lqdmMessage.attributionsCo.attributions !== null) {
    lqdmMessage.attributionsCo.attributions.forEach(item => {
        attributions = attributions + ", " + item.name
    })
  }
  
  return (
    <>
    <section className="fullwidth-section message-info-section">
      <Container>
        <Row className="message-info-title">
          <Col xs={{span:12, order:1}} md={{span:8, order:1}}>
            <h2 className="font-h2 message-title">{lqdmMessage.title}</h2>
          </Col>
          <Col xs={{span:12, order:3}} md={{span:4, order:2}}>
            <h2 className="font-h3">Social Icon Placeholder</h2>
          </Col>
          <Col xs={{span:12, order:2}} md={{span:12, order:3}}>
            <div className="font-h3 message-speaker">{attributions}</div>
            <div className="font=h3 message-date">{formattedDate}</div>
          </Col>
        </Row>
        <hr className="message-hr" />
        <Row>
          <Col xs={12}>
            <div className="font-large message-description">{Parse(lqdmMessage.content)}</div>
          </Col>
          <Col xs={12} className="message-scripture">
            <ScriptureList scriptures={lqdmMessage.scriptures} />
          </Col>
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