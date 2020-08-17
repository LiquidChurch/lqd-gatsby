import React, { useState } from 'react'
import Imgix from 'react-imgix'

import Carousel from 'react-bootstrap/Carousel'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { useImageById } from "../../data/useImage"

import './styles.css'

export default ({ images }) => {
  let imagesObject = JSON.parse(images)
  let imagesInfo = []

  imagesObject.rows.forEach(item => {
    imagesInfo.push(useImageById(item.image))
  })
  
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

                  var imgUrl = image.mediaItemUrl.split("/")
                  return (
                    <Carousel.Item>
                      <Imgix 
                        src={"https://liquidchurch.imgix.net/" + imgUrl[4] + "/" + imgUrl[5] + "?ar=16:9&fit=crop&corner-radius=10,10,10,10"}
                        key={'carouse-image-' + image.id}
                        className={'carousel-image'}
                        sizes="100vw" />
                    </Carousel.Item>
                  )
                })}
              </Carousel>
            </Col>
            <Col sm={{span:12, offset:0}} md={{span:10, offset:1}} lg={{span:8, offset:2}}>
              <div className={'carousel-control'}>
              {imagesInfo.map((image, index) => {
                var imgUrl = image.mediaItemUrl.split("/")
                var buttonWidth = 100 / imagesInfo.length
                return (
                      <a className={'carousel-control-button'} 
                         style={{width: buttonWidth + '%'}}
                         onClick={() => setCarousel(index)}>
                      <Imgix 
                        src={"https://liquidchurch.imgix.net/" + imgUrl[4] + "/" + imgUrl[5] + "?ar=16:9&fit=crop&h=120&corner-radius=10,10,10,10"}
                        key={'carousel-control-image-' + image.id}
                        className={(carouselIndex===index) ? 'carousel-control-image' : 'carousel-control-image greyed'}
                       />
                      </a>
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