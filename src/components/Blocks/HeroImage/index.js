import React, { useEffect, useState } from 'react'
import Imgix from 'react-imgix'

import Container from 'react-bootstrap/Container'
import TextArea from '../../Commons/TextArea'

import { useImageById } from '../../../data/useImage'

import './styles.css'

/**
 * Hero Image Block Component
 */
export default ({
  image_id,
  image_style,
  statement,
  sidekick,
  cta,
  bg_color,
  padding,
  spacing,
  alignment,
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
  
  const [textAreaPosition, setTextAreaPosition] = useState(0)
  var imageUrl = imageInfo.mediaItemUrl.split("/")
  
  useEffect (() => {
    function setTextAreaHeight() {
      let textAreaHeight = 66
      textAreaHeight = (!document.getElementById('hero-text-area') ? 0 : document.getElementById('hero-text-area').offsetHeight)
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
        src={process.env.IMGIX_URL + imageUrl[process.env.IMG_DIR_INDEX] + "/" + imageUrl[process.env.IMG_FILE_INDEX] + "?ar=16:9&fit=crop"}
        className={'hero-image-' + image_style.split(":")[0]}
        sizes="100vh" />
      <div 
        id={'hero-text-area'}
        className={'hero-image-text-area-' + image_style.split(":")[0] + ' ' + color}
        style={ (image_style.split(":")[0] === "fixed") ? 
                ( (textAreaPosition <= 60 ) ? 
                    {background: 'none', bottom: (textAreaPosition) + 'px', marginBottom: (-10 - textAreaPosition) + 'px'} : 
                    {bottom: (textAreaPosition - 49) + 'px', marginBottom: (60 - textAreaPosition) + 'px'} ) :  
                ( (image_style.split(":")[0] === 'filled') ? 
                  ( (textAreaPosition <= 60) ? 
                      {background: 'none', bottom: textAreaPosition + 'px'} :
                      {bottom: textAreaPosition + 'px'} ) :
                  ( (textAreaPosition <= 60) ?
                      {background: 'none', bottom: textAreaPosition + 'px', marginBottom: (135 - textAreaPosition) + 'px'} :
                      {bottom: (textAreaPosition - 10)+ 'px', marginBottom: (135 - textAreaPosition) + 'px'} ) ) }
      >
        <TextArea
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