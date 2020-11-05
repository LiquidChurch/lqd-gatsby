import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Imgix from 'react-imgix'

import TitleBlock from "../Commons/TitleBlock"
import './styles.css'
/**
 * Hero - Feature Component
 */
export default (props) => {
  console.log(props)
  var imgUrl = props.featuredImage.node.sourceUrl.split("/")
  
  return (
    <section className="fullwidth-section">
    <Container className={'hero-image-container-fixed'}>
      <Row>  
        <Imgix 
          src={process.env.IMGIX_URL + imgUrl[process.env.IMG_DIR_INDEX] + "/" + imgUrl[process.env.IMG_FILE_INDEX]}
          className={'hero-featured-image'}
          sizes="100vw" />
      </Row>
      <TitleBlock 
        date={props.publication.publishDate}
        attributions={props.attributions}
        attributionsCo={props.attributionCo}
        title={props.title}
        slut={props.slug}
      />
    </Container>
    </section>
  )
}