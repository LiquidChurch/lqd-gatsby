import React, { useEffect, useState } from 'react'

/**
 * Video Player
 */
const VideoPlayer = ({
  url,
  title,
}) => {
  var videoUrl = url.split("/")
  
  const [dimensions, setDimensions] = useState({
    height: 0,
    width: 0
  })

  let videoSrc = ""
  switch(videoUrl[2]) {
    case 'vimeo.com':
      videoSrc = 'https://player.vimeo.com/video/' + videoUrl[3]
      break
    case 'youtu.be':
      videoSrc = 'https://www.youtube.com/embed/' + videoUrl[3]
      break
    default:
      break
  }
  
  useEffect(() => {
    function setWidth() {
      if (window.innerWidth > 1199) {
        setDimensions ({ width:1080, height:1080/1.78})
      } else if (window.innerWidth > 991) {
        setDimensions ({ width:900, height:900/1.78})
      } else if (window.innerWidth > 767) {
        setDimensions ({ width:660, height:660/1.78})
      } else if (window.innerWidth > 575) {
        setDimensions ({ width:480, height:480/1.78})
      } else {
        setDimensions ({ width: window.innerWidth - 60 , height: (window.innerWidth - 60)/1.78})
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
      <div style={{
            textAlign:'center',
            width:dimensions.width,
            height:(dimensions.height - 1),
            borderRadius:'1em',
            overflow: 'hidden',
            zIndex: 1,
            margin: '0 auto',
            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
            willChange: 'transform',
          }}>
        <iframe 
          src={videoSrc} 
          width={dimensions.width}
          height={dimensions.height}
          title={title}
          frameBorder="0" allow="autoplay; fullscreen" 
          allowFullScreen>
        </iframe>
      </div>
    </>
  )
}

export default VideoPlayer