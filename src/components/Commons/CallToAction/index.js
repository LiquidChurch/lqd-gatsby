import React from 'react'
import { Link } from 'gatsby'

import { ArrowForwardBtn, ArrowForwardText } from '../../../helpers/icons'
import { usePageById } from '../../../data/usePage'

import './styles.css'

/**
 * Call To Action Component
 */
const CallToAction = ({
  cta,
  alignment,
  spacing,
  theme,
}) => {
  let pageId = 0
  
  if (cta.page_id !== undefined) {
    pageId = cta.page_id.id
  } 

  let pageInfo = usePageById(pageId)

  let icon = ''
  let fontColor = '#FFF'
  let btnColor = '#009DD1'
  let border = '0px'
  
  switch(cta.style) {
    case 'button':
      fontColor = '#FFF'
      if (cta.font_color !== '' && cta.font_color !== undefined) {
        fontColor = cta.font_color
      } 
      if (cta.btn_color !== '' && cta.btn_color !== undefined) {
        btnColor = cta.btn_color
      } else {
        if (theme === "dark") {
          btnColor = '#009DD1'
        } else if (theme === "family") {
          btnColor = '#E16D00'
        }
      }
      if (cta.btn_outline) {
        border = '2px solid'
      }
      break
    default :
      fontColor = '#009DD1'
      if (cta.font_color !== '' && cta.font_color !== undefined) {
        fontColor = cta.font_color
      }
    }
  
  if (cta.show_icon !== undefined && cta.show_icon !== "none") {
    icon = cta.show_icon
  }
  
  return (
    <>
      {pageId === 0 ? 
      '' :
      <Link className={cta.lastItem ? 
                        'cta-' + cta.style + ' ' + alignment : 
                        'cta-' + cta.style + ' ' + alignment + ' ' + spacing} 
            style={{color:fontColor, 
                    backgroundColor: btnColor,
                    border: border}}
            to={pageInfo.uri}>
        <span className={ (icon === '') ? 
                          '' :
                          cta.show_icon + '-icon cta-icon'}
              style={{backgroundColor:fontColor}}>
        </span>
        <div className="cta-label"
             style={{color:cta.font_color}}>
          {cta.label}
        </div>
        {cta.show_arrow ?
          (cta.style === 'text') ? 
            <ArrowForwardText/> :
            <ArrowForwardBtn />
           :
          ''
        }
      </Link>
      }
    </>
  )
}

export default CallToAction