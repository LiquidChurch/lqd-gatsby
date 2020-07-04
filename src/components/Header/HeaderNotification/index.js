import React, { useState} from "react"
import { Link } from "gatsby"
import Parse from "react-html-parser"

import Alert from 'react-bootstrap/Alert'

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
  const [show, setShow] = useState(true);
  
  if (show) {
    return (
      <Alert key="test" variant={variant} className="header-notification" 
         onClose={() => setShow(false)} dismissible>
        <div className="d-flex">
          
          <div className="notification-text">
          {Parse(text)}
          </div>
          <ShowCtaCheck url={url} cta={cta} variant={variant} />
        </div>
      </Alert>
    )
  }
  return null
}