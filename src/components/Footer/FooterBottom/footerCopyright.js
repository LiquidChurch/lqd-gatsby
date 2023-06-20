import React from "react"

import { CopyrightIcon } from '../../../helpers/icons'


/**
 * The Footer Menu component.
 */
export default () => {
  const getCurrentYear = () => {
    return new Date().getFullYear();
  };
  
  return ( 
      <>
      <div className="screen-reader-only">Copyright 2020-{getCurrentYear()} Liquid Church</div>  
      <span className="footer-font" aria-hidden={true} style={{color: "#757575", textDecoration:"none"}}>
        <CopyrightIcon />{'\u00A0'}2020–⁠{getCurrentYear()}{'\u00A0'}Liquid Church
      </span>
      <span className="footer-font no-display" aria-hidden={true}>
        <a href="\privacy">{'\u00A0'}Privacy Policy{'\u00A0'}</a>
      </span>
      <span className="footer-font no-display" aria-hidden={true}>
        |
      </span>
      <span className="footer-font no-display" aria-hidden={true}>
        <a href="\terms-of-use">{'\u00A0'}Terms of Use{'\u00A0'}</a>
      </span>
      </>
    )
}
