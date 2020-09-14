import React from 'react'

import Parse from "react-html-parser"

import CallToAction from '../CallToAction'

import './styles.css'

const TextArea = ({
  statement,
  font_color,
  all_caps,
  sidekick,
  cta,
  size,
  spacing,
  alignment,
  theme,
}) => {
  console.log('sidekick', sidekick)
  const ctaObject = JSON.parse(cta)
  
  let sidekickTop = true
  let ctaTop = true
  let hasStatement = false
  let hasSidekick = false
  let hasCTA = false
  let fontColor = "#009DD1"
  
  if (theme === 'dark') {
    fontColor = '#FFF'
  }
  
  if (font_color !== undefined || font_color !== "#009DD1") {
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
    if (typeof ctaObject.rows[0].style !== 'undefined') {
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
                    'statement ' + size + ' ' + spacing + ' ' + theme + ' align-' + alignment : 
                    'no-display'}
        style={{color:fontColor, textTransform: textTransform}}>
      {Parse(statement)}
    </h2>
    <div className={hasSidekick ? 
                      (sidekickTop ? 
                        'sidekick ' + size + ' ' + spacing + ' ' + theme + ' align-' + alignment + ' zero-padding-top' : 
                        'sidekick ' + size + ' ' + spacing + ' ' + theme + ' align-' + alignment) : 
                      'no-display'}>
      {Parse(sidekick)}
    </div>
    <div className={hasCTA ? 
                      (ctaTop ? 
                        'cta ' + size + ' ' + spacing + ' ' + theme + ' align-' + alignment + ' zero-padding-top' : 
                        'cta ' + size + ' ' + spacing + ' ' + theme + ' align-' + alignment ) :
                      'no-display'}>
      {hasCTA ? 
        ctaObject.rows.map(cta => {
          return (
            <CallToAction cta={cta} alignment={alignment} spacing={spacing}/>
          )
        }) : ''
      }
    </div>
  </>
  )
}

export default TextArea