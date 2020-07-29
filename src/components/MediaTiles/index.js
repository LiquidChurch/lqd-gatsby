import React from 'react'
import Imgix from 'react-imgix'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import SectionHeader from '../SectionHeader'
import ComponentSlider from '../ComponentSlider'

import { useRecentMessages } from '../../data/recentMessages'
import { useRecentPosts } from '../../data/recentPosts'

import './styles.css'

function MediaCard(props) {
  return (
  <>
    <Card className="media-card">
      <Imgix
        className="card-img-top"
        src={props.mediaItem.image}
        width={262}
      />
      <Card.Title className="media-card-title font-h2">{props.mediaItem.title}</Card.Title>
    </Card>
  </>
  )  
}

export default ({
    label,
    background_color,
    type,
    media_list,
  }) => {
  
  let mediaLists = []

  if (type.toLowerCase() === "recent messages") {
    let tempItems = useRecentMessages()
    tempItems.map(item => {
      mediaLists.push( {
        "title": item.title,
        "image": item.featured_image,
        "id": item.id
      })
    })
  }
  
  if (type.toLowerCase() === "recent blogs") {
    let tempItems = useRecentPosts("blog")
    tempItems.map(item => {
      mediaLists.push( {
        "title": item.title,
        "image": item.featuredImage.node.mediaItemUrl,
        "id": item.id
      })
    })
  }
  
  if (mediaLists === undefined) {
    return (
    <>
    </>
    )
  } 
  
  return (
  <>
    <section className="fullwidth-section media-cards" style={{backgroundColor: background_color}} >
      <Container>
        <Row>
        <SectionHeader label={label} offset={0}/>
        </Row>
          <ComponentSlider>
            {mediaLists.map(item => {
              return (
                  <MediaCard mediaItem={item} key={'Media-lists-' + item.id} />
              )
            })}
          </ComponentSlider>
      </Container>
    </section>
  </>
  )
}