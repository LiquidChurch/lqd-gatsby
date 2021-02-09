import React from "react"

import { CopyrightIcon } from '../../../helpers/icons'

/**
 * The Footer Menu component.
 */
export default () => {

  return ( 
      <>
      <div className="screen-reader-only">Copyright 2020-2021 Liquid Church</div>  
      <span className="footer-font" aria-hidden={true} style={{color: "#757575", textDecoration:"none"}}>
        <CopyrightIcon />{'\u00A0'}2020{'\u00A0'}Liquid Church
      </span>
      <span className="footer-font no-display" aria-hidden={true}>
        <a href="\privacy-policy">{'\u00A0'}Privacy Policy{'\u00A0'}</a>
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
