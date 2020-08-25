import React, { useEffect, useContext, useState } from 'react'
import Imgix from 'react-imgix'
import Parse from "react-html-parser"

import Container from 'react-bootstrap/Container'

import { useImageById } from '../../data/useImage'
import { GlobalContext } from '../GlobalContext/context'
import CallToAction from '../CallToAction'

import './styles.css'

/**
 * Hero Image Block Component
 */
export default ({
  image_id,
  image_style,
  bg_color,
  statement,
  sidekick,
  cta,
}) => {
  const ctx = useContext(GlobalContext)
  const imageInfo = useImageById(image_id)
  const alignment = 'center'
// Text Area Creation  
  const ctaObject = JSON.parse(cta)
  var ctaTop = true
  var hasCTA = false 
  var sidekickTop = true
  var hasStatement = false
  var hasSidekick = false
  
  if (statement !== null && statement !== '') {
    hasStatement = true
    sidekickTop = false
    ctaTop = false
  } 
  
  if (sidekick !== null && sidekick !== '') {
    hasSidekick = true
    ctaTop = false
  }
  console.log('ctaObject', ctaObject)
  
  if (ctaObject.rows.length !== 0 && ctaObject.rows[0].style !== undefined) {
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
  
// End Text Area Creation


  if (imageInfo === undefined) {
    return (
    <>
    </>
    )
  }
  
  const [textAreaPosition, setTextAreaPosition] = useState(0)
  var imageUrl = imageInfo.mediaItemUrl.split("/")
  
  useEffect (() => {

    function setTextAreaHeight() {
      let textAreaHeight = 60
      
      textAreaHeight = 60 + 
                       (!document.getElementById('hero-statement') ? 0 : document.getElementById('hero-statement').offsetHeight) + 
                       (!document.getElementById('hero-sidekick') ? 0 : document.getElementById('hero-sidekick').offsetHeight) +
                       (!document.getElementById('hero-cta') ? 0 : document.getElementById('hero-cta').offsetHeight)
      
      console.log('text area height', textAreaHeight)
      setTextAreaPosition(textAreaHeight)
    }
    
    setTextAreaHeight()
    window.addEventListener('resize', setTextAreaHeight)  
  }, [])
  
  return (
  <>
    <section id="hero-image" className="fullwidth-section" style={{backgroundColor: bg_color}}>
    <Container fluid className={'hero-image-container-' + image_style.split(":")[0]}>
      <Imgix 
        src={"https://liquidchurch.imgix.net/" + imageUrl[4] + "/" + imageUrl[5] + "?ar=16:9&fit=crop"}
        className={'hero-image-' + image_style.split(":")[0]}
        sizes="100vw" />
      <div 
        className={'hero-image-text-area-' + image_style.split(":")[0]}
        style={ (image_style.split(":")[0] === "fixed") ? 
                ( (textAreaPosition <= 60 ) ? 
                    {background: 'none', bottom: textAreaPosition + 'px', marginBottom: (-10 - textAreaPosition) + 'px'} : 
                    {bottom: textAreaPosition + 'px', marginBottom: (15 - textAreaPosition - 25) + 'px'} ) :  
                ( (image_style.split(":")[0] === 'filled') ? 
                  ( (textAreaPosition <= 60) ? 
                      {background: 'none', bottom: textAreaPosition + 'px', marginBottom: -textAreaPosition + 'px'} :
                      {bottom: textAreaPosition + 'px', marginBottom: -textAreaPosition + 'px'} ) :
                  ( (textAreaPosition <= 60) ?
                      {background: 'none', bottom: textAreaPosition + 'px', marginBottom: (135 - textAreaPosition) + 'px'} :
                      {bottom: (textAreaPosition - 10)+ 'px', marginBottom: (135 - textAreaPosition) + 'px'} ) ) }
      >
        <h2 id="hero-statement" className={hasStatement ? 'hero-image-tag font-h1 align-' + alignment : 'no-display'}>
          {Parse(statement)}
        </h2>
        <div id="hero-sidekick" className={hasSidekick ? (sidekickTop ? 'hero-image-text font-large zero-padding-top align-' + alignment : 'hero-image-text font-large align-' + alignment) : 'no-display'}>
          {Parse(sidekick)}
        </div>
        <div className={hasCTA ? (ctaTop ? 'hero-image-cta font-medium zero-padding-top align-' + alignment : 'hero-image-cta font-medium align-' + alignment ) :'no-display'}>
          {hasCTA ? 
              ctaObject.rows.map(cta => {
                return (
                  <CallToAction cta={cta} alignment={alignment}/>
                )
              })
             : ''
          }
        </div>
      </div>
    </Container>
    </section>
  </>
  )
}