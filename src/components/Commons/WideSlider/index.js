import React, { useContext, useState, useEffect } from 'react'
import Row from 'react-bootstrap/Row'

import { GlobalContext } from '../../GlobalContext/context'
import { ArrowRight, ArrowLeft } from '../../../helpers/icons'
import "./styles.css"

const shiftWidth = 259.5 + 18;

/** 
 * Wide Slider
 */
export default (props) => {
  const [contentWidth, setContentWidth] = useState(0)
  const [sliderWidth, setSliderWidth] = useState(0)
  const [currentMarginLeft, setMarginLeft] = useState(0)
  const [sliderPosition, setSliderPosition] = useState("start")
  const [isTouchDevice, setIsTouchDevice] = useState(true)
  
  const ctx = useContext(GlobalContext)

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
        marginLeft = currentMarginLeft + remainingWidth + 0;
        setSliderPosition("end")
      } else {
        marginLeft = currentMarginLeft + shiftWidth;
        //setSliderPosition("middle")
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
      //setSliderPosition("middle")
    } else {
      marginLeft = 0;
      setSliderPosition("start")
    }

    setMarginLeft(marginLeft)
  }
  
  let componentClass = ""
      
  useEffect(() => {  
    let userAgent = typeof window.navigator === "undefined" ? "" : navigator.userAgent.toLowerCase()
      
    if (!ctx.isMobileSet) {
      console.log(userAgent)
      
      if (Boolean(userAgent.match(/android|blackBerry|iphone|ipad|ipod|opera mini|iemobile|wpdesktop/i))) {
        ctx.setIsMobile(true)
        setIsTouchDevice(true)
        
        if (sliderPosition !== "touch") {
          setSliderPosition("touch")
          setMarginLeft(9)
        }
      } else {
        ctx.setIsMobile(false)
        setIsTouchDevice(false)
      }

      if (userAgent.indexOf('safari') !== -1) { 
        if (userAgent.indexOf('chrome') > -1) {
          ctx.setIsChrome(true)
        } else {
          ctx.setIsChrome(false)
        }
      } 
    } else {
      if (ctx.isMobile) {
        console.log('isMobile', ctx.isMobile)
        setIsTouchDevice(true)
        if (sliderPosition !== "touch") {
          setSliderPosition("touch")
          setMarginLeft(9)
        }
      } else {
        setIsTouchDevice(false)
      }
    }
    
    function setWidth() {
      let contentOffsetWidth = 0
      let componentOffsetWidth = 0
      
      if (document.getElementById('content-slider-' + props.sliderId) !== null) {
        contentOffsetWidth = document.getElementById('content-slider-' + props.sliderId).offsetWidth
      } else {
        return
      }
      
      setContentWidth(contentOffsetWidth)
      
      if (document.getElementById('component-slider-' + props.sliderId) !== null) {
        componentOffsetWidth = document.getElementById('component-slider-' + props.sliderId).offsetWidth
      } else {
        return
      }

      if (sliderWidth !== componentOffsetWidth) {
        const sliderDifference = componentOffsetWidth - sliderWidth
        setSliderWidth(componentOffsetWidth)
        
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
    
    let timeoutId = null;
    const resizeListener = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {setWidth()}, 150)
    }
    setWidth()
    window.addEventListener('resize', resizeListener)

    return _ => {
      window.removeEventListener('resize', resizeListener)
    }
  }, [ctx, componentClass])
 
  return (
   <>
    <div id={'component-slider-' + props.sliderId} className={'component-slider-' + sliderPosition}>
      <RenderLeftArrow />  
      <RenderRightArrow />
      <div className={'component-slider ' + sliderPosition}>
        <Row 
          id={'content-slider-' + props.sliderId}
          className={isTouchDevice ? 'flex-nowrap no-scroll-bar component-row-touch' : 'flex-nowrap no-scroll-bar component-row'}
          style={{marginLeft: '-' + currentMarginLeft + 'px' }}
        >
          {props.children}
        </Row>
      </div>
    </div>
    </>
  )
}
