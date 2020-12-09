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
  console.log('hero feature', props)
  var imgUrl = props.featuredImage.node.mediaItemUrl.split("/")
  let messageDate = ""
  if (props.publication.publishDate !== null) {
    messageDate = props.publication.publishDate.replace(/\s/g, 'T')
  } else {
    messageDate = props.date
  }

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
        date={messageDate}
        attributions={props.attributions}
        attributionsCo={props.attributionsCo}
        title={props.title}
        category={props.category}
        slug={props.slug}
      />
    </Container>
    </section>
  )
}