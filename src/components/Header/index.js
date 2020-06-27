import React from "react"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { useGeneralSettings } from "../../data/hooks"
import "./styles.css"

import HeaderNotification from "./HeaderNotification"
import HeaderMenu from "./HeaderMenu"
import HeaderTopBar from "./HeaderTopBar"

import { MegaMenuProvider } from "./MegaMenu/context.js"
import MegaMenu from "./MegaMenu"

function NotificationToggleCheck(props) {
  const notificationToggled = props.notificationToggle;
  
  if (notificationToggled === "checked") {
    return (
       <Row>
          <Col>
            <HeaderNotification 
              text={props.notificationText}
              cta={props.notificationCta}
              url={props.notificationUrl} />
          </Col>
        </Row>
    )
  }
  return null
}

/**
 * The Header component.
 */
export default ({ home = false, location }) => {
  const { title, notificationBarToggle, notificationBarText, notificationBarCta, notificationBarUrl } = useGeneralSettings()
    
  return (
    <header id='header' className={`header`}>
      <MegaMenuProvider>
      <MegaMenu />
      <NotificationToggleCheck 
        notificationToggle={notificationBarToggle}
        notificationText={notificationBarText}
        notificationCta={notificationBarCta}
        notificationUrl={notificationBarUrl} />
      <Row>
        <Col>
          <HeaderTopBar title={title} />
        </Col>
      </Row>
      <Row>
        <Col>
          <HeaderMenu />
        </Col>
      </Row>
      </MegaMenuProvider>
    </header>
  )
}
