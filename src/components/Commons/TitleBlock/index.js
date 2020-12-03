import React from 'react'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import SocialIcons from '../SocialIcons'

import './styles.css'

/** 
 * Title Block Component
 */
const TitleBlock = ({
  date,
  attributions,
  attributionsCo,
  title,
  slug,
}) => {
  const formatter = new Intl.DateTimeFormat('en-US', { month: 'short',  day: 'numeric',   year: 'numeric'});
  const formattedDate =  formatter.format(new Date(date));
  
  let formattedAttributions = "Liquid Church"
  
  if (attributions.nodes.length > 0) {
    formattedAttributions = attributions.nodes[0].name
    if (attributionsCo.attributions !== null) {
      attributionsCo.attributions.forEach(item => {
          formattedAttributions = formattedAttributions + ", " + item.name
      })
    }
  }
  
  return (
    <>
    <Row className="message-info-title">
      <Col xs={{span:12, order:1}} md={{span:8, order:1}}>
        <h2 className="font-h2 message-title">{title}</h2>
      </Col>
      <Col xs={{span:12, order:3}} md={{span:4, order:2}}>
        <SocialIcons slug={slug} />
      </Col>
      <Col xs={{span:12, order:2}} md={{span:12, order:3}} className="message-subtitle">
        <div className="font-h3 message-speaker">{formattedAttributions}</div>
        <div className="font=h3 message-date">{formattedDate}</div>
      </Col>
    </Row>
    </>
  )
}

export default TitleBlock