import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'

import './styles.css'

/** 
 * Message Player
 */
export default ({message}) => {
  //console.log(message)
  
  const [dimensions, setDimensions] = useState({
    height: 0,
    width: 0
  })

  let videoSrc = ""
  
  /**
  var videoUrl = message.url.split("/")
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
  */
  
  if (message.youtubeId !== null) {
    videoSrc = 'https://www.youtube.com/embed/' + message.youtubeId
  } else {
    videoSrc = 'https://player.vimeo.com/video/' + message.vimeoId
  }
  
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
    <section id="message-viewer">
      <Container fluid className="message-player-container">
        <div className="message-player">
          <iframe 
            title={message.title}
            src={videoSrc} 
            width={dimensions.width}
            height={dimensions.height}
            frameBorder="0" allow="autoplay; fullscreen" 
            allowFullScreen>
          </iframe>
        </div>
      </Container>
    </section>
    </>
  )
}