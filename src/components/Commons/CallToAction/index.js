import React from 'react'
import { Link } from 'gatsby'

import { ArrowForward } from '../../../helpers/icons'
import { usePageById } from '../../../data/usePage'

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

const CallToAction = ({
  cta,
  alignment,
  spacing,
}) => {
  let pageId = 0
  
  if (cta.page_id !== undefined) {
    pageId = cta.page_id.id
  } 
  console.log('cta', cta)
  let pageInfo = usePageById(pageId)

  let icon = ""
  let iconColor = ""
  if (cta.show_icon !== undefined && cta.show_icon !== "none") {
    icon = cta.show_icon
    if (cta.style === "button" && cta.font_color !== "") {
      iconColor = "#FFF"
    } 
  }
 
  let fontColor = ''
  let btnColor = ''
  let border = '0px'
  
  switch(cta.style) {
    case 'button':
      if (cta.font_color !== '') {
        fontColor = cta.font_color
      } else {
        fontColor = '#FFF'
      }
      if (cta.btn_color !== '') {
        btnColor = cta.btn_color
      } else {
        btnColor = '#009DD1'
      }
      if (cta.btn_outline) {
        border = '2px solid'
      }
      break
    default :
      if (cta.font_color !== '') {
        fontColor = cta.font_color
      } else {
        fontColor = '#009DD1'
      }
  }

  return (
    <>
      {pageId === 0 ? 
      '' :
      <Link className={cta.lastItem ? 
                        'cta-' + cta.style + ' font-link ' + alignment : 
                        'cta-' + cta.style + ' font-link ' + alignment + ' ' + spacing} 
            style={{color:fontColor, 
                    backgroundColor: btnColor,
                    border: border}}
            to={'/' + pageInfo.slug}>
        <span className={ (icon === '') ? 
                          '' :
                          cta.show_icon + '-icon cta-icon'}
              style={{backgroundColor:iconColor}}>
        </span>
        <div className="cta-label"
             style={{color:cta.font_color}}>
          {cta.label}
        </div>
        <ShowArrow showArrow={cta.show_arrow}/>
      </Link>
      }
    </>
  )
}

export default CallToAction