import React, { useContext, useState, useEffect } from 'react'
import Row from 'react-bootstrap/Row'

import { GlobalContext } from '../../GlobalContext/context'
import { ArrowRight, ArrowLeft } from '../../../helpers/icons'
import "./styles.css"

const shiftWidth = 266 + 12;

/** 
 * Wide Slider
 */
export default (props) => {
  const [contentWidth, setContentWidth] = useState(0)
  const [sliderWidth, setSliderWidth] = useState(0)
  const [currentMarginLeft, setMarginLeft] = useState(0)
  
  const ctx = useContext(GlobalContext)

  let componentClass = ""
  if (ctx.touchEnabled) {
    componentClass='component-row-touch'
  } else {
    componentClass='component-row'
  }
  
  const RenderRightArrow = () => {
    const remainingWidth = contentWidth - (sliderWidth) - currentMarginLeft;
    if (remainingWidth > 0) {
      return (
        <button className="caret caret-right" onClick={handleRightClicked}>
          <ArrowRight />
        </button>
      );
    }
    return null;
  }

  const RenderLeftArrow = () => {
    if (currentMarginLeft > 0) {
      return (
        <button className="caret caret-left" onClick={handleLeftClicked}>
          <ArrowLeft />
        </button>
      );
    }
    return null;
  }

  const handleRightClicked = () => {
    let marginLeft;
    let remainingWidth = contentWidth - (sliderWidth) - currentMarginLeft
    
    if (remainingWidth > 0) {
      if (remainingWidth <= shiftWidth) {
        marginLeft = currentMarginLeft + remainingWidth;
      } else {
        marginLeft = currentMarginLeft + shiftWidth;
      }
    } else {
      marginLeft = currentMarginLeft;
    }
    
    setMarginLeft(marginLeft)
  }
  
  const handleLeftClicked = () => {
    let marginLeft;
    
    if (currentMarginLeft > shiftWidth) {
      marginLeft = currentMarginLeft - shiftWidth;
    } else {
      marginLeft = 0;
    }

    setMarginLeft(marginLeft)
  }
  
    
  useEffect(() => {
    function setWidth() {      
      if (typeof(document.getElementById('content-slider-' + props.sliderId)) !== 'undefined') {
      setContentWidth(document.getElementById('content-slider-' + props.sliderId).offsetWidth)

      if (sliderWidth !== document.getElementById('component-slider-' + props.sliderId).offsetWidth) {
        const sliderDifference = (document.getElementById('component-slider-' + props.sliderId).offsetWidth) - sliderWidth
        setSliderWidth(document.getElementById('component-slider-' + props.sliderId).offsetWidth)
        
        let marginLeft
        
        if (sliderDifference > 0) {
          marginLeft = currentMarginLeft - sliderDifference
          if (marginLeft <= 0) {
            marginLeft = 0
          } 
          setMarginLeft(marginLeft)
        }
      }
      }
    }
    
    if (document.getElementById('content-slider-' + props.sliderId) != null) {
      setWidth()    
    }
    
    window.addEventListener('resize', setWidth)
    
    return _ => {
      window.removeEventListener('resize', setWidth)
    }
  })
 
  return (
   <>
    <div id={'component-slider-' + props.sliderId}>
      <RenderLeftArrow />  
      <RenderRightArrow />
      <div className="component-slider">
        <Row 
          id={'content-slider-' + props.sliderId}
          className={'flex-nowrap no-scroll-bar ' + componentClass}
          style={{marginLeft: '-' + currentMarginLeft + 'px' }}
        >
          {props.children}
        </Row>
      </div>
    </div>
    </>
  )
}
