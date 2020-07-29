import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import './styles.css'

export default (lqdmMessage) => {
  console.log(lqdmMessage)
  var videoUrl = lqdmMessage.video_url.split("/")
  
  const [dimensions, setDimensions] = useState({
    height: 0,
    width: 0
  })

  useEffect(() => {
    function setWidth() {
      if (window.innerWidth > 1119) {
        setDimensions ({ width:1120, height:629})
      } else if (window.innerWidth > 728) {
        setDimensions ({ width:728, height:409})
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
            src={'https://player.vimeo.com/video/' + videoUrl[3]} 
            width={dimensions.width}
            height={dimensions.height}
            frameBorder="0" allow="autoplay; fullscreen" 
            allowFullScreen>
          </iframe>
        </div>
      </Container>
    </section>
    <section className="fullwidth-section message-info-section">
      <Container>
        <Row className="message-info-title">
          <Col>
            <h2 className="font-h2">{lqdmMessage.title}</h2>
          </Col>
        </Row>
      </Container>
    </section>
    </>
  )
}