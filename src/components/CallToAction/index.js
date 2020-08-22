import React from 'react'
import { Link } from 'gatsby'

import { ArrowForward } from '../../helpers/icons'
import { usePageById } from '../../data/usePage'

import './styles.css'


function ShowArrow(props) {
  if (props.showArrow) {
    return (
    <ArrowForward />
    )
  }
  return null
}
/**
 * Call To Action Component
 */

export default (props) => {
  
      console.log('cta alignment', props)
      
  if (props.cta.style === undefined || props.cta.page_id === undefined) {
    return null
  }
  
  let pageInfo = null
  if (props.cta.page_id !== undefined) {
    pageInfo = usePageById(props.cta.page_id.id)
  }
  
  let icon = ""
  let iconColor = ""
  if (props.cta.show_icon !== undefined && props.cta.show_icon !== "none") {
    icon = props.cta.show_icon
    if (props.cta.style === "button" && props.cta.font_color != "") {
      iconColor = "#FFF"
    } 
  }
 
  return (
    <>
      <Link className={props.cta.lastItem ? 'cta-' + props.cta.style + ' font-link ' + props.alignment : 'cta-' + props.cta.style + ' font-link ' + props.alignment + ' cta-margin'} 
            style={{color:props.cta.font_color, 
                    backgroundColor: props.cta.btn_color}}
            to={"/" + pageInfo.slug}>
        <span className={(icon === '') ? '' : props.cta.show_icon + '-icon cta-icon'}
              style={{backgroundColor:iconColor}}></span>
        <div className="cta-label"
              style={{color:props.cta.font_color}}>{props.cta.label}</div>
        <ShowArrow showArrow={props.cta.show_arrow}/>
      </Link>
    </>
  )
}