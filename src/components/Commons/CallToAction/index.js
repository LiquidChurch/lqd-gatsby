import React from 'react'
import { Link } from 'gatsby'
import { useLocation } from '@reach/router';

import { ArrowForwardBtn, ArrowForwardText } from '../../../helpers/icons'
import { usePageById } from '../../../data/usePage'
import { getDate } from '../../../helpers/functions'
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
    
  const currentDate = getDate(useLocation().search)
  if ((pageInfo.publication.publishDate === null || currentDate >= Date.parse(pageInfo.publication.publishDate.replace(/\s/g, 'T'))) &&
      (pageInfo.publication.unpublishDate === null || currentDate < Date.parse(pageInfo.publication.unpublishDate.replace(/\s/g, 'T')))) {
  } else {
    return (<></>)
  }
  
  let linkUrl = pageInfo.uri
  
  if (linkUrl.charAt(linkUrl.length - 1) == '/') {
    linkUrl = linkUrl.substr(0, linkUrl.length - 1);
  }
    
  if (cta.url_append !== null && cta.url_append !== undefined) {
    linkUrl = linkUrl + cta.url_append
  }
          
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
            to={linkUrl}>
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