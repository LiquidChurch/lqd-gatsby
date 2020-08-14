import React, { useEffect, useContext, useState } from 'react'
import Imgix from 'react-imgix'
import Parse from "react-html-parser"

import Container from 'react-bootstrap/Container'

import { useImageById } from "../../data/useImage"
import { GlobalContext } from '../GlobalContext/context'

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
  console.log('hero image cta', cta)
  const ctx = useContext(GlobalContext)
  const imageInfo = useImageById(image_id)
  
  if (imageInfo === undefined) {
    return (
    <>
    </>
    )
  }
  
  const [textAreaPosition, setTextAreaPosition] = useState(0)
  var imageUrl = imageInfo.mediaItemUrl.split("/")
  
 // let textAreaHeight = 45
  useEffect (() => {
    let textAreaHeight = 45
    function setTextAreaHeight() {
      textAreaHeight = 60 + document.getElementById('hero-statement').offsetHeight + document.getElementById('hero-sidekick').offsetHeight
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
        src={"https://liquidchurch.imgix.net/" + imageUrl[4] + "/" + imageUrl[5]}
        className={'hero-image-' + image_style.split(":")[0]}
        sizes="100vw" />
      <div 
        className={'hero-image-text-area-' + image_style.split(":")[0]}
        style={ (image_style.split(":")[0] === "fixed") ? 
                ( (textAreaPosition === 60 ) ? 
                    {background: 'none', bottom: textAreaPosition + 'px', marginBottom: (15 - textAreaPosition) + 'px'} : 
                    {bottom: textAreaPosition + 'px', marginBottom: (15 - textAreaPosition) + 'px'} ) :  
                ( (image_style.split(":")[0] === 'filled') ? 
                  ( (textAreaPosition === 60) ? 
                      {background: 'none', bottom: textAreaPosition + 'px', marginBottom: -textAreaPosition + 'px'} :
                      {bottom: textAreaPosition + 'px', marginBottom: -textAreaPosition + 'px'} ) :
                  ( (textAreaPosition === 60) ?
                      {background: 'none', bottom: textAreaPosition + 'px', marginBottom: (135 - textAreaPosition) + 'px'} :
                      {bottom: textAreaPosition + 'px', marginBottom: (135 - textAreaPosition) + 'px'} ) ) }
      >
        <div id="hero-statement" className="hero-image-title">
          { statement }
        </div>
        <div id="hero-sidekick" className="hero-image-text">
          { Parse(sidekick) }
        </div>
      </div>
    </Container>
    </section>
  </>
  )
}