import React, { useEffect, useState } from 'react'
import Imgix from 'react-imgix'

import Container from 'react-bootstrap/Container'
import TextArea from '../../Commons/TextArea'

import { mediaUrlConverter } from '../../../helpers/functions'
import { useImageById } from '../../../data/useImage'


import './styles.css'

/**
 * Hero Image Block Component
 */
export default ({
  keyValue,
  image_id,
  image_style,
  statement,
  sidekick,
  cta,
  bg_color,
  padding,
  spacing,
  alignment,
  position,
  size,
  color,  
}) => {
  const imageInfo = useImageById(image_id)

  if (imageInfo === undefined) {
    return (
    <>
    </>
    )
  }
  
  if (position === null) {
    position = "50% 0"
  }
  console.log('hero-image position', position)
  
  const [textAreaPosition, setTextAreaPosition] = useState(0)
  const [ imageHeight, setImageHeight ] = useState(200)
  var imageUrl = mediaUrlConverter(imageInfo.mediaItemUrl)
  
  useEffect (() => {
    function setTextAreaHeight() {
      let textAreaHeight = 66
      textAreaHeight = (!document.getElementById('hero-text-area') ? 0 : document.getElementById('hero-text-area').offsetHeight)
      setTextAreaPosition(textAreaHeight)
      setImageHeight(window.innerHeight * 0.8)
    }
    
    setTextAreaHeight()
    window.addEventListener('resize', setTextAreaHeight)  
  }, [])
  
  return (
  <>
    <section id="hero-image" className="fullwidth-section" style={{backgroundColor: bg_color}}>
    <Container fluid 
               className={'hero-image-container-' + image_style.split(":")[0]}
      >
      <div style={{objectPosition: position}}>
      <Imgix 
        src={imageUrl}
        className={'hero-image-' + image_style.split(":")[0]}
        height={imageHeight}
        sizes="100vh" />
      </div>
      <div 
        id={'hero-text-area'}
        className={'hero-image-text-area-' + image_style.split(":")[0] + ' ' + color}
        style={ (image_style.split(":")[0] === "fixed") ? 
                ( (textAreaPosition <= 110 ) ? 
                    {background: 'none', bottom: (textAreaPosition) + 'px', marginBottom: (49 - textAreaPosition) + 'px'} : 
                    {bottom: (textAreaPosition - 49) + 'px', marginBottom: (60 - textAreaPosition) + 'px'} ) :  
                ( (image_style.split(":")[0] === 'filled') ? 
                  ( (textAreaPosition <= 110) ? 
                      {background: 'none', bottom: textAreaPosition + 'px'} :
                      {bottom: textAreaPosition + 'px'} ) :
                  ( (textAreaPosition <= 110) ?
                      {background: 'none', bottom: textAreaPosition + 'px', marginBottom: (135 - textAreaPosition) + 'px'} :
                      {bottom: (textAreaPosition - 10)+ 'px', marginBottom: (135 - textAreaPosition) + 'px'} ) ) }
      >
        <TextArea
          keyValue={keyValue + '-hero-image'}
          statement={statement}
          sidekick={sidekick}
          cta={cta}
          alignment={alignment}
          size={size}
          spacing={spacing}
          theme={color}
        />
      </div>
    </Container>
    </section>
  </>
  )
}