import React, { useState} from "react"
import Parse from "react-html-parser"

import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'

import "./styles.css"

function ShowCtaCheck(props) {
  const showCtaToggle = props.url;
  
  if (showCtaToggle !== "") {
    return(
      <div className="notification-cta">
        <Button variant="outline-primary" 
              size="sm" 
              className="round-btn notification-cta-button"
              href={props.url}>
          {props.cta}
        </Button>
      </div>
    )
    }
    return null
  }
/**
 * The Header Notification Bar component.
 */
export default ({ text, cta, url }) => {
  const [show, setShow] = useState(true);
  
  if (show) {
    return (
      <Alert key="test" variant="success" className="header-notification" 
         onClose={() => setShow(false)} dismissible>
        <div className="d-flex">
          
          <div className="notification-text">
          {Parse(text)}
          </div>
          <ShowCtaCheck url={url} cta={cta} />
        </div>
      </Alert>
    )
  }
  return null
}