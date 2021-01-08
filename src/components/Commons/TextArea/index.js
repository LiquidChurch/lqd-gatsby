import React from 'react'

import Parse from "react-html-parser"

import CallToAction from '../CallToAction'

import './styles.css'

const TextArea = ({
  keyValue,
  statement,
  font_color,
  all_caps,
  sidekick,
  cta,
  headerSize,
  size,
  spacing,
  alignment,
  theme,
  noMargin,
}) => {
  console.log('textarea', keyValue)
  const ctaObject = JSON.parse(cta)

  let sidekickTop = true
  let ctaTop = true
  let hasStatement = false
  let hasSidekick = false
  let hasCTA = false
  let textAreaId = Math.random().toString(36).substring(2, 7) + Math.random().toString(36).substring(2, 7)
  let fontColor = "#009DD1"
  let hasMargin = ""
  
  if (noMargin) {
    hasMargin = "no-margin"
  }
  
  if (theme === 'dark') {
    fontColor = '#F6F6F6'
  }
  
  if (theme === 'family') {
    fontColor = '#E16D00'
  }
  
  if (headerSize === null || headerSize === undefined) {
    headerSize = size
  }
  
  if (font_color !== undefined) {
    fontColor = font_color
  }
  
  let textTransform = "none"
  if (all_caps) {
    textTransform = "uppercase"
  }
  
  if (statement !== null && statement !== '') {
    hasStatement = true
    sidekickTop = false
    ctaTop = false
  } 
  
  if (sidekick !== null && sidekick !== '') {
    hasSidekick = true
    ctaTop = false
  }

  if (ctaObject !== null && ctaObject.rows.length !== 0) {
      
    if (typeof ctaObject.rows[0].style !== 'undefined' && ctaObject.rows[0].page_id.id !== 0) {
      hasCTA = true 
      let ctaObjectLength = ctaObject.rows.length
      ctaObject.rows.forEach((cta, i) => {
        if (i === (ctaObjectLength - 1) ) {
          ctaObject.rows[i].lastItem = true
        } else {
          ctaObject.rows[i].lastItem = false
        }
      })
    }
  }

  return (
  <>
    <h2 className={hasStatement ? 
                    'statement ' + headerSize + ' ' + spacing + ' align-' + alignment + ' sidekick-only-padding ' + hasMargin : 
                    'no-display'}
        style={{color:fontColor, textTransform: textTransform}}>
      {Parse(statement)}
    </h2>
    <div className={hasSidekick ? 
                      (sidekickTop ? 
                        'sidekick ' + size + ' ' + spacing + ' ' + theme + ' align-' + alignment + ' sidekick-only-padding': 
                        'sidekick ' + size + ' ' + spacing + ' ' + theme + ' align-' + alignment) : 
                      'no-display'}>
      {Parse(sidekick)}
    </div>
    <div className={hasCTA ? 
                      (ctaTop ? 
                        'cta ' + size + ' ' + spacing + ' align-' + alignment + ' zero-padding-top' : 
                        'cta ' + size + ' ' + spacing + ' align-' + alignment + ' half-top-padding') :
                      'no-display'}>
      {hasCTA ? 
        ctaObject.rows.map((cta, index) => {
          return (
            <CallToAction cta={cta} alignment={alignment} theme={theme} spacing={spacing} key={keyValue + '-' + index}/>
          )
        }) : ''
      }
    </div>
  </>
  )
}

export default TextArea