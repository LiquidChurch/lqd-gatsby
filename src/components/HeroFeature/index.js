import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Imgix from 'react-imgix'

import TitleBlock from "../Commons/TitleBlock"
import { mediaUrlConverter } from '../../helpers/functions'

import './styles.css'
/**
 * Hero - Feature Component
 */
export default (props) => {
  var imageUrl = mediaUrlConverter(props.featuredImage.node.mediaItemUrl)
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
          src={imageUrl}
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