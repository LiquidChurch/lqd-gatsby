import React, { useContext } from "react"
import { Link } from "gatsby"
import Parse from "react-html-parser"

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Alert from 'react-bootstrap/Alert'
import { GlobalContext } from '../../GlobalContext/context'


import "./styles.css"

function ShowCtaCheck(props) {
  const showCtaToggle = props.url;
  
  if (showCtaToggle !== "") {
    return(
      <div className="notification-cta">
        <Link
          className={"btn btn-sm btn-outline-" + props.variant + " notification-cta-button"}
          to={"/" + props.url}
        >
          {props.cta}
        </Link>
      </div>
    )
    }
    return null
  }
/**
 * The Header Notification Bar component.
 */
export default ({ text, cta, url, variant }) => {
  
  //const ctx = useContext(GlobalContext)
  
  const ctx = useContext(GlobalContext)
  
  if (ctx.isNotificationOpen) {
    return (
      <Alert key="test" variant={variant} className="header-notification" 
         onClose={ctx.toggleNotification} dismissible>
        <Row className="justify-content-sm-center">
          <Col xs="auto">
            <div className="notification-text">
              {Parse(text)}
            </div>
          <ShowCtaCheck url={url} cta={cta} variant={variant} />
          </Col>
         </Row>
      </Alert>
    )
  }
  return null
}