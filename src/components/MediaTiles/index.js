import React, { useEffect } from 'react'
import Imgix from 'react-imgix'

import { Link } from 'gatsby'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import SectionHeader from '../SectionHeader'
import ComponentSlider from '../ComponentSlider'

import { useRecentMessages } from '../../data/recentMessages'
import { useRecentPosts } from '../../data/recentPosts'

import './styles.css'

function MediaCard(props) {
  var imgUrl = props.mediaItem.image.split("/")
  return (
  <>
    <Link
      to={"/" + props.mediaItem.category + "/" + props.mediaItem.slug}>
    <Card className="media-card">
      <Imgix
        className="card-img-top"
        src={"https://liquidchurch.imgix.net/" + imgUrl[4] + "/" + imgUrl[5] + "?ar=16:9&fit=crop&w=262"}
        width={262}
      />
      <Card.Title className="media-card-title font-h2">{props.mediaItem.title}</Card.Title>
    </Card>
    </Link>
  </>
  )  
}

function isTouchEnabled() { 
  return ( 'ontouchstart' in window ) ||  
         ( navigator.maxTouchPoints > 0 ) || 
         ( navigator.msMaxTouchPoints > 0 ); 
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
    //console.log(tempItems)
    tempItems.map(item => {
      mediaLists.push( {
        "category": "message",
        "title": item.title,
        "image": item.featured_image,
        "id": item.id,
        "slug": item.slug,
      })
    })
  }
  
  if (type.toLowerCase() === "recent blogs") {
    let tempItems = useRecentPosts("blog")
    //console.log(tempItems)
    tempItems.map(item => {
      mediaLists.push( {
        "category": "blog",
        "title": item.title,
        "image": item.featuredImage.node.mediaItemUrl,
        "id": item.id,
        "slug": item.slug,
      })
    })
  }
  
  if (mediaLists === undefined) {
    return (
    <>
    </>
    )
  } 

  let sliderClass = ""
      
  useEffect(() => {
  if (isTouchEnabled()) {
    sliderClass = "-touch"
  }
  })
  
  return (
  <>
    <section className="fullwidth-section media-cards" style={{backgroundColor: background_color}} >
      <Container>
        <Row>
        <SectionHeader label={label} offset={0}/>
        </Row>
          <ComponentSlider touchClass={sliderClass}>
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