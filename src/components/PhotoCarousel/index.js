import React, { useState } from 'react'
import Imgix from 'react-imgix'

import Carousel from 'react-bootstrap/Carousel'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { useImageById } from "../../data/useImage"
import { mediaUrlConverter } from '../../helpers/functions'

import './styles.css'

export default ({ images }) => {
  let imagesObject = JSON.parse(images)
  let imagesInfo = []

  imagesObject.rows.forEach(item => {
    imagesInfo.push(useImageById(item.image))
  })
  let carouselControl = true
  
  if (imagesInfo.length <= 1) {
    carouselControl = false
  }
  
  const [carouselIndex, setCarouselIndex] = useState(0)
  
  const setCarousel = (index, e) => {
    setCarouselIndex(index)
  }
  
  return (
    <>
      <section className={'fullwidth-section'} id="image-carousel">
        <Container className={'hero-image-container-fixed'}>
          <Row>
            <Col xs={12}>
              <Carousel
                controls={false}
                indicators={false}
                activeIndex={carouselIndex}
                onSelect={setCarousel}
              >
                {imagesInfo.map(image => {
                  var imageUrl = mediaUrlConverter(image.mediaItemUrl)
                  return (
                    <Carousel.Item
                      key={'carouse-image-item-' + image.id}>
                      <Imgix 
                        src={imageUrl + "?ar=16:9&fit=crop&corner-radius=20,20,20,20"}
                        className={'carousel-image'}
                        sizes="110vw" />
                    </Carousel.Item>
                  )
                })}
              </Carousel>
            </Col>
            <Col sm={{span:12, offset:0}} md={{span:10, offset:1}} lg={{span:8, offset:2}}>
              <div className={carouselControl ? 'carousel-control' : 'carousel-control-hidden'}>
              {imagesInfo.map((image, index) => {               
                var imageUrl = mediaUrlConverter(image.mediaItemUrl)               
                var buttonWidth = 100 / imagesInfo.length
                return (
                      <button className={'carousel-control-button'} 
                         style={{width: buttonWidth + '%'}}
                         onClick={() => setCarousel(index)}
                         key={'carousel-control-image-link-' + image.id}>
                        <Imgix 
                          src={imageUrl + "?ar=16:9&fit=crop&h=120&corner-radius=20,20,20,20"}
                          className={(carouselIndex===index) ? 'carousel-control-image' : 'carousel-control-image greyed'}
                          height={93}
                        />
                      </button>
                )
              })}
                </div>
                </Col>
          </Row>
        </Container>
      </section>
    </>
  )
}