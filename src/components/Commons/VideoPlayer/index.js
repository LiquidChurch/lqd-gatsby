import React, { useEffect, useState } from 'react'

/**
 * Video Player
 */
const VideoPlayer = ({
  url,
}) => {
  var videoUrl = url.split("/")
  
  const [dimensions, setDimensions] = useState({
    height: 0,
    width: 0
  })

  useEffect(() => {
    function setWidth() {
      if (window.innerWidth > 1199) {
        setDimensions ({ width:1120, height:1120/1.78})
      } else if (window.innerWidth > 991) {
        setDimensions ({ width:940, height:940/1.78})
      } else if (window.innerWidth > 767) {
        setDimensions ({ width:700, height:700/1.78})
      } else if (window.innerWidth > 575) {
        setDimensions ({ width:520, height:520/1.78})
      } else {
        setDimensions ({ width: window.innerWidth, height: (window.innerWidth)/1.78})
      }
    }
    
    setWidth()
    window.addEventListener('resize', setWidth)  
    
    return _ => {
      window.removeEventListener('resize', setWidth)
    }
  }, [])

  return (
    <>
      <div style={{width:'100vw', textAlign:'center'}}>
        <iframe 
          src={'https://player.vimeo.com/video/' + videoUrl[3]} 
          width={dimensions.width}
          height={dimensions.height}
          frameBorder="0" allow="autoplay; fullscreen" 
          allowFullScreen>
        </iframe>
      </div>
    </>
  )
}

export default VideoPlayer