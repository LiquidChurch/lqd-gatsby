import React from 'react'
import Imgix from 'react-imgix'

import Container from 'react-bootstrap/Container'

import { useImage } from "../../data/image"


import './styles.css'

/**
 * Homepage Hero component.
 */
export default ({
  hero_image_id,
  hero_title,
  hero_text,
  image_style,
}) => {
  const image_info = useImage(hero_image_id)

  if (image_info === undefined) {
    return (
    <>
    </>
    )
  }
  
  var imgUrl = image_info.mediaItemUrl.split("/")

  var imgStyle = image_style.split(":")  

  return (
  <>
    <section id="hero-image">
    <Container fluid className={'hero-image-container-' + imgStyle[0]}>
      <Imgix 
        src={"https://liquidchurch.imgix.net/" + imgUrl[4] + "/" + imgUrl[5]}
        className={'hero-image-' + imgStyle[0]}
        sizes="100vw" />
    </Container>
    </section>
  </>
  )
}